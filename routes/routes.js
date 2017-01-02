var exphbs = require("express-handlebars");
var nodemailer = require("nodemailer");
var smtpTrans = require("nodemailer-smtp-transport");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var showdown = require("showdown");

module.exports = function(app) {

  // Set handlebars
  app.set("views");
  app.engine("handlebars", exphbs({ defaultLayout: "main" }));
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
    res.render("index");
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
  app.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect("/");
  });

  // All admin routes
  app.get("/admin/*", auth, function (req, res, next) {
    next();
  });

  app.get("/admin/main", function(req, res) {
    BlogPost.find({}).sort({postType: 1, postDate: -1})
      .then(function(posts) {

        BlogPost.distinct("tags").exec(function(err, tags) {
          if (err) {
            console.log(err);
            res.render("admin");
          } else {
            res.render("admin", {
              "blogTag": tags,
              "blogPost": posts
            });
          }
        });
      });
  });

  app.post("/admin/blog/post", function(req, res) {
    var blogPostType = req.body.publish === "" ? "publish" : "draft";
    var tagArray = JSON.parse(req.body.blogTags);
    showdown.setFlavor("github");
    var converter = new showdown.Converter();
    var html = converter.makeHtml(req.body.blogContent);
    var blogPost = new BlogPost({
      title: req.body.blogSubject,
      body: html,
      postType: blogPostType,
      tags: tagArray
    });
    blogPost.save(function(err, doc) {
      if(err) res.send(err);
      else {
        res.redirect("/admin/main");
      }
    });
  });
};