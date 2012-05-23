var $     =  require('jquery');

function combineThreeStreams() {
    var d1 = $.Deferred(),
        d2 = $.Deferred(),
        d3 = $.Deferred(),
        p1 = d1.promise(),
        p2 = d2.promise(),
        p3 = d3.promise();

    setTimeout(function () { d1.resolve('d1'); }, 500);
    setTimeout(function () { d2.resolve('d2'); }, 300);
    setTimeout(function () { d3.resolve('d3'); }, 100);

    function logAndLetThru(x) { console.log(x); return 'piped ' + x; }

    var streams = [
        p1.pipe(logAndLetThru),
        p2.pipe(logAndLetThru),
        p3.pipe(logAndLetThru)
    ];

    streams.forEach(function (stream) {
        stream.done(function (x) { console.log(x + ' is done'); });
    });

    $.when(p1, p2, p3)
        .then(function() { console.log('all done', arguments); },
              function () { console.log('one failed', arguments); });

    $.when(streams[0], streams[1], streams[2])
        .then(function() { console.log('all done', arguments); },
              function () { console.log('one failed', arguments); });

}

combineThreeStreams();
