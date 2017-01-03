var exphbs = require("express-handlebars");
var nodemailer = require("nodemailer");
var smtpTrans = require("nodemailer-smtp-transport");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var showdown = require("showdown");
var mongoose = require("mongoose");

module.exports = function(app) {

  showdown.setFlavor("github");
  // Set handlebars
  app.set("views");
  app.engine("handlebars", exphbs({
    helpers: {
      dateFormat: require("handlebars-dateformat"),
      firstThree: function(index, options) {
        if(index < 3){
          return options.fn(this);
        } else {
          return options.inverse(this);
        }        
      }
    },
    defaultLayout: "main" }));
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

  // Serve main page
  app.get("/", function(req, res) {
    BlogPost.find({postType: "publish"}).sort({postType: 1, postDate: -1})
      .then(function(posts) {
        BlogPost.distinct("tags").exec(function(err, tags) {
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
              "blogPost": posts
            });
          }
        });
      });
  });

  // Individual blog posts
  app.get("/blog/page/:postid", function(req, res) {
    var postid = mongoose.Types.ObjectId(req.params.postid);
    BlogPost.findOne({postType: "publish", _id: postid})
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
              "blogPost": post
            });
          }
        });
      });

  });  

  // Email contact info
  app.post("/contact", function(req, res) {
    var transporter = nodemailer.createTransport(smtpTrans({
      host: "smtp.mail.com",
      port: 587,
      auth: {
        user: "rbootcamp@mail.com",
        pass: process.env.MAILPASS
      }
    }));
    var mailOptions = {
      from: "rbootcamp@mail.com",
      to: "albert.min@gmail.com",
      subject: "portfolio contact: "+req.body.name,
      text: req.body.email+"\n"+req.body.message
    };
    transporter.sendMail(mailOptions, function(error, info){
      if(error) {
        console.log(error);
      } else {
        res.redirect("/");
      }
    });
  });

  // Authentication middleware
  var auth = function(req, res, next) {
    if(req.session && req.session.user === process.env.ADMIN && req.session.admin) {
      return next();
    } else return res.sendStatus(401);
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

  app.get("/admin/main", function(req, res) {
    var editID = req.session.edit === undefined ? false : req.session.edit;
    BlogPost.find({}).sort({postType: 1, postDate: -1})
      .then(function(posts) {
        BlogPost.distinct("tags").exec(function(err, tags) {
          if (err) {
            console.log(err);
            res.render("admin");
          } else {
            var converter = new showdown.Converter();
            var editPost = "";
            for(var i = 0; i < posts.length; i++) {
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

  app.post("/admin/blog/post", function(req, res) {
    var query = "";
    if(req.body.editID) {
      var queryID = mongoose.Types.ObjectId(req.body.editID);
      query = {_id: queryID};
    } else {
      query = {_id: mongoose.Types.ObjectId()};      
    }
    var blogPostType = req.body.publish === "" ? "publish" : "draft";
    var tagArray = JSON.parse(req.body.blogTags);
    var blogPost = {
      title: req.body.blogSubject,
      body: req.body.blogContent,
      postType: blogPostType,
      tags: tagArray
    };
    BlogPost.findOneAndUpdate(query, blogPost, {upsert: true}, function(err, doc) {
      if(err) res.send(err);
      else {
        res.redirect("/admin/main");
      }

    });
  });
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
};