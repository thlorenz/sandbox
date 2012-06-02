var calls = 999999999;

function notNested() {

    var start = new Date().getTime();

    function foo() { return 0; } 

    function bar () {
        for (var i = 0; i < calls; i++) {
            foo();
        }
    }

    bar();

    console.log('Unnested took %s ticks', new Date().getTime() - start);
}

function nested () {
    var start = new Date().getTime();

    function bar () {
        for (var i = 0; i < calls; i++) {

            function foo() { return 0; } 

            foo();
        }
    }

    bar();

    console.log('Nested took %s ticks', new Date().getTime() - start);
}

notNested();

nested();
