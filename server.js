var express = require("express");

var app = express();

// Comment out for deployment
// var dotenv = require("dotenv");
// dotenv.load();

// Set port
app.set("port", process.env.PORT || 8080);

// Set static
app.use(express.static("public"));
// Routes
// =============================================================
require("./routes/routes.js")(app);

// Listener
// =============================================================

app.listen(app.get("port"), function() {console.log("Hollaback on port: "+app.get("port"));});