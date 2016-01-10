var express = require('express');
var router = express.Router();
var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
// var receivers = require('../receivers');
var receivers = ['alisonnganyc@gmail.com']

router.post('/submit', function(req, res, next){
  var body = req.body.header + '\n\n';
  for (var i = 0; i< req.body.dates.length; i++){
    body += '\t' + [req.body.dates[i], req.body.times[i], req.body.descs[i]].join('\t') + '\n'
  }
  body += '\n' + req.body.footer
  // setup e-mail data with unicode symbols
  sendgrid.send({
    to:       receivers,
    from: 'Tunglin Buddhist Group <tunglinbuddhistgroups@gmail.com>',
    subject: req.body.subject,
    text: body,
  }, function(err, json) {
    if (err) return console.error(err);

    console.log('Message sent: ' + info.response);
    res.sendStatus(200)
  });

})

module.exports = router;
