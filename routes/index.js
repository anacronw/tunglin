var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
// var receivers = require('../receivers');
var receivers = ['alisonnganyc@gmail.com']

var transporter = nodemailer.createTransport('smtps://tunglinbuddhistgroups@gmail.com:tunglin01@smtp.gmail.com');

router.post('/submit', function(req, res, next){
  var body = req.body.header + '\n\n';
  for (var i = 0; i< req.body.dates.length; i++){
    body += '\t' + [req.body.dates[i], req.body.times[i], req.body.descs[i]].join('\t') + '\n'
  }
  body += '\n' + req.body.footer
  // setup e-mail data with unicode symbols
  var mailOptions = {
      from: 'Tunglin Buddhist Group <tunglinbuddhistgroups@gmail.com>', // sender address
      to: receivers, // list of receivers
      subject: req.body.subject, // Subject line
      text: body, // plaintext body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, function(error, info){
      if(error) return console.log(error);
      console.log('Message sent: ' + info.response);
      res.sendStatus(200)
  });
})

module.exports = router;
