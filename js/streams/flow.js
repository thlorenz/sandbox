var util = require('util')
  , Stream = require('stream').Stream
  ;

function pipeChain(streams) {
  for (var i = 0; i < streams.length - 1; i++) {
    var pub = streams[i]
      , sub = streams[i + 1]; 

    sub.on('pipe', function (pipe) {
      pipe
        .on('data', sub.onData)
        .on('end', sub.onEnd);
    });

    pub.pipe(sub);
  }
  return {
      push: function (data) {
        streams[0].emit('data', data);
      }
    , end: function () {
        streams[0].emit('end');
      }
  };
}

var Pipe = function (name) {
  Stream.call(this);

  var self = this;

  self.writeable = self.readable = true;
  self.name = name;

  self.onData = function (data) {
    console.log('%s: %s', self.name, data);
    setTimeout(function () {
      self.emit('data', data + ' ' + self.name);
    }, 200);
  };
  self.onEnd = function () {
    console.log(self.name, 'end');
    self.emit('end');
  };
};

util.inherits(Pipe, Stream);

pipeChain([
    new Pipe('uno') 
  , new Pipe('dos') 
  , new Pipe('tres')
  , new Pipe('cuatro')
  , new Pipe('cinco')
  , new Pipe('seis')
])
.push('hey');


