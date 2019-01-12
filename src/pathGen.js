
var java = require('java');
var mvn = require('node-java-maven');

mvn(function(err, mvnResults) {
    if (err) {
        return console.error('could not resolve maven dependencies', err);
    }
    mvnResults.classpath.forEach(function(c) {
        console.log('adding ' + c + ' to classpath');
        java.classpath.push(c);
    });
    
    function generatePath() {
        var PathGen = java.import('org.team5499.monkeyLib.math.path.PathGenerator');
    }

    var Position = java.import('org.team5499.monkeyLib.math.Position');
    var JavaSystem = java.import('java.lang.System');
    JavaSystem.out.printlnSync("hello from java");
    var newPos = new Position();
    newPos.updateSync(1.0, 1.0, 1.0);
    console.log(newPos.toStringSync());
});
