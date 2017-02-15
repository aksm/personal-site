var exphbs = require("express-handlebars");
var nodemailer = require("nodemailer");
var smtpTrans = require("nodemailer-smtp-transport");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
// var showdown = require("showdown");
var mongoose = require("mongoose");
var HandlebarsIntl = require("handlebars-intl");
var showdown = require("../util/showdown.min.js");
var Transporter = require("../util/transporter.js");

module.exports = function(app) {

  showdown.setFlavor("github");
  // Set handlebars
  app.set("views");
  var hbs = exphbs.create({
    helpers: {
      activePost: function(index, options) {
        if(index < 1){
          return options.fn(this);
        } else {
          return options.inverse(this);
        }        
      }
    },
    defaultLayout: "main"
  });

  HandlebarsIntl.registerWith(hbs.handlebars);
  app.engine("handlebars", hbs.engine);
  app.set("view engine", "handlebars");

  app.use(methodOverride('_method'));
  // Set up the Express app to handle data parsing 
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.text());
  app.use(bodyParser.json({type:"application/vnd.api+json"}));

  // Import mongoose models
  var BlogPost = require("../models/blogPosts.js");
  var BlogComment = require("../models/blogComments.js");
  var intlData = {
    "locales": "en-US",
    "formats": {
      "date": {
        "short": {
          "minute": "numeric",
          "hour": "numeric",
          "day": "numeric",
          "month": "numeric",
          "year": "numeric"          
        }
      }
    }
  };
  // Serve main page
  app.get("/", function(req, res) {
    var queryTerm = req.session.queryTerm;
    var queryTags = req.session.queryTags ? req.session.queryTags : [];
    var commentedID = req.session.commentid;
    var commentedBlogID = req.session.blogid;
    var sortType = req.session.sortType;
    var sortQuery = { createDate: -1 };
    delete req.session.queryTerm;
    delete req.session.queryTags;
    delete req.session.commentid;
    delete req.session.blogid;
    delete req.session.sortType;
    switch(sortType) {
      case "recentposted":
        sortQuery = { createDate: -1 };
      break;
      case "oldposted":
        sortQuery = { createDate: 1 };
      break;
      case "recentupdate":
        sortQuery = { postDate: -1 };
      break;
      case "oldupdate":
        sortQuery = { postDate: 1 };
      break;
      default:
        sortQuery = { createDate: -1 };
    }
    var search = false;
    var query = { postType: "posted" };
    if(queryTerm && queryTerm !== "" && queryTags.length) {
      var tags = { $all: queryTags };
      query.tags = tags;
      var searchTerm = { $search: queryTerm };
      query.$text = searchTerm;
      search = true;
    } else if (queryTerm && queryTerm !== "") {
      var searchTermOnly = { $search: queryTerm };
      query.$text = searchTermOnly;
      search = true;
    } else if(queryTags.length) {
      var tagsOnly = { $all: queryTags };
      query.tags = tagsOnly;
      search = true;
    }
    BlogPost.find(query)
      .sort(sortQuery)
      .populate("comments")
      .then(function(posts) {
        BlogPost.distinct("tags").exec(function(err, tags) {
          if (err) {
            console.log(err);
            res.render("index");
          } else {
            BlogPost.aggregate([
              { $project: { tags: 1 } },
              { $unwind: "$tags"},
              {
                $group: {
                  _id: "$tags",
                  count: {$sum: 1}
                }
              },
              {$sort: {count: -1, _id: 1}}
            ]).exec(function(err, tagcount) {
              if (err) {
                console.log(err);
                res.render("index");
              } else {
                var converter = new showdown.Converter();
                for(var i = 0; i < posts.length; i++) {
                  posts[i].body = converter.makeHtml(posts[i].body);
                }
                res.render("index", {
                  "blogTag": tags,
                  "blogPost": posts,
                  "commentID": commentedID,
                  "blogID": commentedBlogID,
                  "tagCount": tagcount,
                  "search": search,
                  "data": {intl: intlData}
                });
              }
          });
          }
        });
      });
  });

  // Individual blog posts
  app.get("/blog/page/:postid", function(req, res) {
    var id = req.params.postid;
    var idConvert = id.includes("#") ? id.split("#")[0] : id;
    var postid = mongoose.Types.ObjectId(idConvert);
    var commentedID = req.session.commentid;
    var commentedBlogID = req.session.blogid;
    delete req.session.commentid;
    delete req.session.blogid;    
    BlogPost.findOne({postType: "posted", _id: postid})
      .populate("comments")
      .then(function(post) {
        BlogPost.distinct("tags").exec(function(err, tags) {
          if (err) {
            console.log(err);
            res.render("index");
          } else {
            var converter = new showdown.Converter();
              post.body = converter.makeHtml(post.body);
            res.render("blog", {
              "blogTag": tags,
              "blogPost": post,
              "commentID": commentedID,
              "blogID": commentedBlogID,
              "data": {intl: intlData}
            });
          }
        });
      });

  });

  // Route for comment posts
  app.post("/blog/comment/post", function(req, res) {
    var newComment = new BlogComment({
      commenterName: req.body.name,
      commenterEmail: req.body.email,
      comment: req.body.comment_text
    });
    var url = req.body.source == "index" ? "/" : "/blog/page/" + req.body.comment_id;

    newComment.save(function(err, doc) {
      if(err) {
        console.log(err);
        res.redirect(url);
      } else {
        var commented = doc;
        // Create object id with article id passed from user's post
        var blogID = mongoose.Types.ObjectId(req.body.comment_id);

        // Push comment id into appropriate article's array of comments
        BlogPost.findOneAndUpdate(
          {_id: blogID},
          {$push: {"comments": doc._id}},
          {new: true},
          function(err, doc) {
            if(err) {
              console.log(err);
              res.redirect(url);
            } else {
              var type = "blog comment:";
              var name = commented.commenterName;
              var email = commented.commenterEmail;
              var message = commented.comment + "\n title: " + doc.title + "\n post: " + doc.body;
              var transporter = new Transporter();
              var transport = transporter.transport(nodemailer, smtpTrans);
              var options = transporter.options(type, name, email, message);
              req.session.commentid = commented._id;
              req.session.blogid = doc._id;
              transporter.send(options, url + "#" + commented._id, transport, res);
            }
          });
      }
    });

  });

  // Route for searching blog posts
  app.post("/blog/search", function(req, res) {
    req.session.queryTerm = req.body.search ? req.body.search : null;
    var tags = JSON.parse(req.body.tagSearch);
    req.session.queryTags = tags.length ? tags : null;
    res.redirect("/");

  });
  // Route for sorting blog posts
  app.get("/blog/sort", function(req, res) {
    req.session.sortType = req.query.sortType;
    res.redirect("/");
  });

  // Email contact info
  app.post("/contact", function(req, res) {
    var type = "portfolio contact:";
    var name = req.body.name;
    var email = req.body.email;
    var message = req.body.message;
    var transporter = new Transporter();
    var transport = transporter.transport(nodemailer, smtpTrans);
    var options = transporter.options(type, name, email, message);
    transporter.send(options, "/", transport, res);

    // var transporter = nodemailer.createTransport(smtpTrans({
    //   host: "smtp.mail.com",
    //   port: 587,
    //   auth: {
    //     user: "rbootcamp@mail.com",
    //     pass: process.env.MAILPASS
    //   }
    // }));
    // var mailOptions = {
    //   from: "rbootcamp@mail.com",
    //   to: "albert.min@gmail.com",
    //   subject: "portfolio contact: "+req.body.name,
    //   text: req.body.email+"\n"+req.body.message
    // };
    // transporter.sendMail(mailOptions, function(error, info){
    //   if(error) {
    //     console.log(error);
    //   } else {
    //     res.redirect("/");
    //   }
    // });
  });

  // Authentication middleware
  var auth = function(req, res, next) {
    if(req.session && req.session.user === process.env.ADMIN && req.session.admin) {
      return next();
    } else return res.redirect("/");
  };

  // Login route
  app.post("/login", function(req, res) {
    if(!req.body.uname || !req.body.pword) {
      res.send("login failed");
    } else if(req.body.uname === process.env.ADMIN && req.body.pword === process.env.ADMINPASS) {
      req.session.user = process.env.ADMIN;
      req.session.admin = true;
      res.redirect("/admin/main");
    }
  });

  // Logout route
  app.get("/logout", function (req, res) {
    req.session.destroy();
    res.redirect("/");
  });

  // All admin routes
  app.get("/admin/*", auth, function (req, res, next) {
    next();
  });

  // Route to serve primary admin page
  app.get("/admin/main", function(req, res) {
    var editID = req.session.edit === undefined ? false : req.session.edit;
    BlogPost.find({})
      .sort({postType: 1, postDate: -1})
      .populate("comments")
      .then(function(posts) {
        BlogPost.distinct("tags").exec(function(err, tags) {
          if (err) {
            console.log(err);
            res.render("admin");
          } else {
            var converter = new showdown.Converter();
            var editPost = "";
            for(var i = 0; i < posts.length; i++) {
              posts[i].created = "blah";
              if(editID == posts[i]._id) {
                editPost = posts[i];
                editPost.tags = JSON.stringify(editPost.tags);
                posts.splice(i, 1);
              } else {
                posts[i].body = converter.makeHtml(posts[i].body);
              }
            }
            editID = false;
            req.session.edit = undefined;
            res.render("admin", {
              "blogTag": tags,
              "blogPost": posts,
              "editPost": editPost
            });
          }
        });
      });
  });

  // Route for creating new blog posts
  app.post("/admin/blog/post", function(req, res) {
    var query = "";
    var createDate = "";
    if(req.body.editID) {
      var queryID = mongoose.Types.ObjectId(req.body.editID);
      createDate = queryID.getTimestamp();
      query = {_id: queryID};
    } else {
      query = {_id: mongoose.Types.ObjectId()};
      createDate = query._id.getTimestamp();
    }
    var blogPostType = req.body.publish === "" ? "posted" : "draft";
    var tagArray = JSON.parse(req.body.blogTags);
    var blogPost = {
      title: req.body.blogSubject,
      body: req.body.blogContent,
      postDate: new Date(),
      createDate: createDate,
      postType: blogPostType,
      tags: tagArray
    };
    BlogPost.findOneAndUpdate(query, blogPost, {upsert: true, setDefaultsOnInsert: true}, function(err, doc) {
      if(err) res.send(err);
      else {
        res.redirect("/admin/main");
      }

    });
  });

  // Route to serve post to editing form or to delete post.
  app.post("/admin/blog/edit", function(req, res) {
    if(req.body.edit === "") {
      req.session.edit = req.body.postid;
      res.redirect("/admin/main");

    } else if(req.body.delete === "") {
      var postID = mongoose.Types.ObjectId(req.body.postid);
      BlogPost.remove({_id: postID}, function(err, data) {
        if(err) {
          console.log(err);
          res.redirect("/admin/main");
        } else res.redirect("/admin/main");

      });
    }
  });

  app.post("/admin/blog/comment/delete", function(req, res) {
    var postID = mongoose.Types.ObjectId(req.body.postid);
    var commentID = mongoose.Types.ObjectId(req.body.commentid);
    BlogComment.remove({_id: commentID}, function(err, data) {
      if(err) {
        console.log(err);
        res.redirect("/admin/main");
      } else {
        BlogPost.update({_id: postID},
          {$pull: {comments: commentID}}, function(err, data) {
            if(err) {
              console.log(err);
              res.redirect("/admin/main");
            } else res.redirect("/admin/main");
          });
      }

    });
  });
};