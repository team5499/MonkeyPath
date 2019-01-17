const $ = require('jquery');
var java = require('java');
var mvn = require('node-java-maven');
var exports = module.exports = {};

mvn(function(err, mvnResults) {
    if (err) {
        return console.error('could not resolve maven dependencies', err);
    }
    mvnResults.classpath.forEach(function(c) {
        console.log('adding ' + c + ' to classpath');
        java.classpath.push(c);
    });

    var Position = java.import('org.team5499.monkeyLib.math.Position');
    var JavaSystem = java.import('java.lang.System');
    JavaSystem.out.printlnSync("hello from java");
    var newPos = new Position();
    newPos.updateSync(1.0, 1.0, 1.0);

    function generatePath() {
        console.log('ran generatePath()')
        var PathGen = java.import('org.team5499.monkeyLib.path.PathGenerator');
        var generator = new PathGen();
        var waypoints;
        var x = $(".x").val();
        var y = $(".y").val();
        for (i = 0; i <= x.length; x++) {
           var waypoints = Pose2d(Vector2(x[i], y[i]), Rotation2d(x[i], y[i], false));
        }
        var generated = generator.generatePathSync(false, waypoints, 0, 0, 0, 0);
        JavaSystem.out.printlnSync("hello from java");
        return (generated);
    }
    console.log(newPos.toStringSync());

    module.exports.generatePath = () => generatePath();
    });
