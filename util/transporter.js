module.exports = function() {
  this.transport = function(nodemailer, smtpTrans) {
    return nodemailer.createTransport(smtpTrans({
          host: "smtp.mail.com",
          port: 587,
          auth: {
            user: "rbootcamp@mail.com",
            pass: process.env.MAILPASS
          }
        }));
  };
  this.options = function(type, name, email, message) {
    return {
      from: "rbootcamp@mail.com",
      to: "albert.min@gmail.com",
      subject: type+" "+name,
      text: email+"\n"+message
    };

  };
  this.send = function(options, path, transport, res) {
    transport.sendMail(options, function(error, info){
      if(error) {
        console.log(error);
      } else {
        res.redirect(path);
      }
    });
  };
};