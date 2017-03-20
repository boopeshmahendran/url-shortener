var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var base58 = require('./base58');
var config = require('./config');

var app = express();

var port = process.env.PORT || 3000;

mongoose.connect(`mongodb://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`)
var Url = require('./models/urls');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// url shorten route
app.post('/api/shorten', function(req, res){
  var newUrl = Url({
    longUrl: req.body.longUrl
  });

  Url.findOne(newUrl, function(err, url) {
    var shortUrl = config.webhost;
    if (err) {
      console.log(err);
      res.json({
        error: 'Database error',
        msg: err
      });
    }
    if (url) {
      shortUrl += base58.encode(url._id);
      res.json({ shortUrl });
    }
    else {
      newUrl.save(function(err) {
        if (err) console.log(err);
        shortUrl += base58.encode(newUrl._id);
        res.json({ shortUrl });
      });
    }
  });
});

// url redirection route
app.get('/:encodedId', function(req, res) {
  Url.findById(base58.decode(req.params.encodedId), function(err, url) {
    if (err) console.log (err);
    if (url) res.redirect(url.longUrl);
    else res.redirect(config.webhost);
  });
});

var server = app.listen(port, function() {
  console.log('Server started on port 3000');
});
