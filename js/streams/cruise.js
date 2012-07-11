var util = require('util')
  , fs = require('fs')
  , Stream = require('stream').Stream
  , cruise
  ;

var Cruise = function (func) {
//    , args = Array.prototype.slice.call(arguments)

  Stream.call(this);
  this.writeable = this.readable = true;

  var self = this;

  var callback = function (err, res) {
    console.log(arguments);
         if (err) self.emit('error', err);
    else if (res) self.emit('data', res);
    else          self.emit('next');     
  };

  self.on('pipe', function (pipe) {
    pipe
      .on('data', function (res) {
        console.log('data', res);
        func.apply(self, [ res, callback]);
      })  
      .on('next', function () {
        console.log('next');
        func.call(self, [ callback ]);
      })
      .on('error', function (err) {
        console.log('error', err);
        self.emit('error', err);  
      });
  });
};

util.inherits(Cruise, Stream);

function Pusher () {
  Stream.call(this);
  this.writeable = this.readable = true;
}
util.inherits(Pusher, Stream);

function chain(streams) {
  if (streams.length < 2) throw new Error ('need at least two streams to chain them');

  var pusher = new Pusher();
  streams.unshift(pusher);

  for (var i = 0; i < streams.length - 1; i++) {
    var pub = streams[i]
      , sub = streams[i + 1]; 

    pub.pipe(sub);
  }
  return {
    push: function (data) {
      pusher.emit('data', data);
    }
  };
}


var list = new Cruise(fs.readdir);
var read = new Cruise(function read(files, cb) { 
  files.forEach(function (file) {
    fs.readFile(file, 'ascii', cb);
  });
});
var log  = new Cruise(function log(x, cb) { console.log(arguments); cb(); });

chain([ list, read, log ]).push('.');
