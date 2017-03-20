var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var url_schema = new Schema({
  _id: {
    type: String,
    index: true
  },
  longUrl: String,
  created_at: Date
});

var counter_schema = new Schema({
  _id: {
    type: String,
    required: true
  },
  seq: Number
});

var Counter = mongoose.model('Counter', counter_schema);

url_schema.pre('save', function(next) {
  var doc = this;
  Counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1}}, function(err, count) {
    if (err) next(err);
    console.log(count);
    doc._id = count.seq;
    doc.created_at = new Date();
    next();
  })
});

var Url = mongoose.model('Url', url_schema);
module.exports = Url;
