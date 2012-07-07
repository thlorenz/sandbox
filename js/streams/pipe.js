var util = require('util')
  , stream = require('stream')
  ;

function Publisher () {
  stream.Stream.call(this);
  this.readable = true;
}

util.inherits(Publisher, stream.Stream);

function Subscriber () {
  stream.Stream.call(this);
  this.writeable = true;
}

util.inherits(Subscriber, stream.Stream);

var publisher = new Publisher();
var subscriber = new Subscriber();

subscriber.on('pipe', function (pipe) {
  pipe
    .on('data', function (data) {
      console.log('Data: ', data);
    })
    .on('cmd', function (cmd) {
      console.log('Command: ', cmd.text);
      cmd.run();
    });
});


publisher.pipe(subscriber);

publisher.emit('data', 'hello');
publisher.emit('data', 'world');

publisher.emit('cmd', { 
      text: 'have fun!'
    , run: function () { console.log('we are having so much fun!'); }
});
