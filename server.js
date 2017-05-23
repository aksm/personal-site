var express = require("express");
var session = require("express-session");
var MemoryStore = require("session-memory-store")(session);
var path = require("path");
var mongoose = require("mongoose");
var Promise = require("bluebird");
// var akismet = require("akismet-api");

var app = express();
mongoose.Promise = Promise;

// Comment out for deployment
// var dotenv = require("dotenv");
// dotenv.load();

// Set port
app.set("port", process.env.PORT || 8080);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MemoryStore()
}));

// var client = akismet.client({
//   key: process.env.AKISMET_KEY,
//   blog: "http://www.albertmin.com"
// });

// client.verifyKey(function(err, valid) {
//   if (err) console.log('Akismet Error:', err.message);
//   if (valid) console.log('Akismet key verified.');
//   else console.log('Invalid akismet key.');
// });

// Set static
app.use("/", express.static(path.join(__dirname, "public")));


// Mongoose connection, error, success
mongoose.connect(process.env.MONGODB_URI);
var db = mongoose.connection;

db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Routes
// =============================================================
require("./routes/routes.js")(app);

// Listener
// =============================================================

app.listen(app.get("port"), function() {console.log("Hollaback on port: "+app.get("port"));});