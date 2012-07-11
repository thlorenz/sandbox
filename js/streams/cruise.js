var util = require('util')
  , fs = require('fs')
  , Stream = require('stream').Stream
  ;

var Cruise = function () {
  Stream.call(this);
  var self = this
    , args = Array.prototype.slice.call(arguments)
    , func = args.shift();

  console.log('func:', func);
  console.log('arguments', arguments);
  
  func.apply(this, args.concat(function () {
    console.log('read', arguments);
  }));

  // function is assumed to at least take one callback
}



new Cruise(fs.readFile, './cruise.js', 'utf-8');
