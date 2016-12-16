var exphbs = require("express-handlebars");
var nodemailer = require("nodemailer");
var smtpTrans = require("nodemailer-smtp-transport");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");

module.exports = function(app) {
  app.set("views");
  app.engine("handlebars", exphbs({ defaultLayout: 'main' }));
  app.set("view engine", "handlebars");

  app.use(methodOverride('_method'));
  // Set up the Express app to handle data parsing 
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.text());
  app.use(bodyParser.json({type:"application/vnd.api+json"}));

  app.get("/", function(req, res) {
    res.render("index");
  });

  app.post("/contact", function (req, res) {
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
};