var $ = require('jquery');

Object.prototype.dump = function () { 
    console.log(this.toString()); 
    if(arguments && arguments.length > 0) console.log(arguments[0].toString()); 
};

function asDeferred() {
    var deferred = $.Deferred();

    deferred.state().dump();
    deferred.resolve();
    deferred.state().dump();
    deferred.reject();
}
// asDeferred();

function asPromise() {
    var deferred = $.Deferred(),
        promise  = deferred.promise();

    promise.state().dump();
    deferred.reject();
    promise.state().dump();
}
// asPromise();

function doneFailProgressAlways() {
    function mayFail() {
        var deferred = $.Deferred();

        deferred.notify('created deferred');
        setTimeout(function() { 
            deferred.notify('creating random');
            var r = Math.random(); 
            deferred.notify('created random: ' + r);
            return r > 0.5 ? deferred.resolve() : deferred.reject();
        }, 200);

        return deferred.promise();
    }

    function done() { "done".dump(); }
    function done_later() { "done_later".dump(); }
    function fail() { "fail".dump(); }
    function progress(msg) { "progress".dump(msg);}
    function always() { "always".dump(); }

    // shorthand
    // mayFail().then(done, fail, progress);
    
    // Callbacks are guaranteed to run in the order they were attached in
    mayFail()
        .done(done)
        .done(done_later)
        .fail(fail)
        .progress(progress)
        .always(always);
}
doneFailProgressAlways();
