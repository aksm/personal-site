var express = require("express");
var session = require("express-session");
var MemoryStore = require("session-memory-store")(session);
var path = require("path");
var mongoose = require("mongoose");
var Promise = require("bluebird");
var showdown = require("./util/showdown.min.js");

var app = express();
mongoose.Promise = Promise;

// Comment out for deployment
var dotenv = require("dotenv");
dotenv.load();

// Set port
app.set("port", process.env.PORT || 8080);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MemoryStore()
}));

// Mongoose connection, error, success
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});


var BlogPost = require("./models/blogPosts.js");
var BlogComment = require("./models/blogComments.js");

app.get("/api/posts", function(req, res) {
  console.log('called');
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
              } else {
                var converter = new showdown.Converter();
                for(var i = 0; i < posts.length; i++) {
                  posts[i].body = converter.makeHtml(posts[i].body);
                }
                console.log(posts);
                res.json(posts);
              }
            });
          }
        });
      });
});

// Set static
app.use("/", express.static(path.join(__dirname, "public")));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});




// Routes
// =============================================================
// require("./routes/routes.js")(app);

// Listener
// =============================================================

app.listen(app.get("port"), function() {console.log("Hollaback on port: "+app.get("port"));});