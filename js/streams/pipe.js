var util = require('util')
  , stream = require('stream')
 // , cdir = require('cdir')
  ;


function Publisher () {
  var self = this;
  stream.Stream.call(self);
  self.readable = true;
}

util.inherits(Publisher, stream.Stream);
var publisher = new Publisher();

function Subscriber () {
  var self = this;
  stream.Stream.call(self);
  self.writeable = true;
}

util.inherits(Subscriber, stream.Stream);
var subscriber = new Subscriber();

subscriber.on('pipe', function (pipe) {
  pipe.on('data', function (data) {
    console.log('Got: ', data);
  });
});


publisher.pipe(subscriber);

publisher.emit('data', 'hello world');
