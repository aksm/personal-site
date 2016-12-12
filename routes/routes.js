var exphbs = require("express-handlebars");

module.exports = function(app) {
  app.set("views");
  app.engine("handlebars", exphbs({ defaultLayout: 'main' }));
  app.set("view engine", "handlebars");

  app.get("/", function(req, res) {
    res.render("index");
  });
};