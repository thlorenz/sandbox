
Object.prototype.dump = function () { 
    console.log(this.toString()); 
    if(arguments && arguments.length > 0) console.log(arguments[0].toString()); 
};

