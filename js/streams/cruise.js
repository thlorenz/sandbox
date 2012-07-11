var util = require('util')
  , fs = require('fs')
  , Stream = require('stream').Stream
  , cruise
  ;

var Cruise = function () {

  Stream.call(this);
  this.writeable = this.readable = true;

  var self = this
    , args = Array.prototype.slice.call(arguments)
    , func = args.shift();

  self.on('pipe', function (pipe) {
    pipe
      .on('data', function (data) {
        if (data) args = args.concat(data);

        func.apply(self, args.concat(function (err, res) {
          if (err)  self.emit('error', err); 
          else      self.emit('data', res);
        }));
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


var read = new Cruise(fs.readFile, './cruise.js', 'ascii');
var log  = new Cruise(function log(x, cb) { console.log(x); cb(); });

chain([ read, log ]).push(null);
