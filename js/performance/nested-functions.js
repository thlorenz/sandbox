var calls = 99999999;

function notNested() {
    var start = new Date().getTime();

    function foo() { return 0; } 

    function bar () { foo(); }

    for (var i = 0; i < calls; i++) {
        bar();
    }

    console.log('Unnested took %s ticks', new Date().getTime() - start);
}

function nested () {
    var start = new Date().getTime();

    function bar () {
        function foo() { return 0; } 
        foo();
    }

    for (var i = 0; i < calls; i++) {
        bar();
    }

    console.log('Nested took %s ticks', new Date().getTime() - start);
}

function nestedReturning () {
    var start = new Date().getTime();

    var bar = (function () {
        function foo() { return 0; } 

        return function () { foo(); };

    })();

    for (var i = 0; i < calls; i++) {
        bar();
    }

    console.log('Nested returning took %s ticks', new Date().getTime() - start);
}

notNested();

nested();

nestedReturning();
