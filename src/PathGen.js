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
    
    // function generatePath() {
    //     console.log('ran generatePath()')
    //     var PathGen = java.import('org.team5499.monkeyLib.math.path.PathGenerator');
    //     var generated = newPathGen();
    //     var x = $(".x").val();
    //     var y = $(".y").val();
    //     var xVals;
    //     var yVals;
    //     for (i = 0; i <= x.length(); i++) {
    //         xVals.push(x[i]);
    //     }
    //     generated.generatePathSync(false, Pose2d(x[0],y[0]), 1, 1, 1, 1)   
    //     JavaSystem.out.printlnSync("hello from java");
    // }

    var Position = java.import('org.team5499.monkeyLib.math.Position');
    var JavaSystem = java.import('java.lang.System');
    JavaSystem.out.printlnSync("hello from java");
    var newPos = new Position();
    newPos.updateSync(1.0, 1.0, 1.0);

    function generatePath() {
        console.log('ran generatePath()')
        var Position2 = java.import('org.team5499.monkeyLib.math.Position');
        var PathGen = java.import('org.team5499.monkeyLib.math.path.PathGenerator');
        var generator = new PathGen();
        //var x = $(".x").val();
        //var y = $(".y").val();
        var x = [0, 1, 5]
        var y = [0, 1, 5]
        var generated = generator.generatePathSync(false, 
            Pose2d(Vector2(x[x.length], y[y.length]), Rotation2d(x[0], y[0], false)), 
            1, 1, 1, 1);   
        JavaSystem.out.printlnSync("hello from java");
        return generated;
    }
    console.log(newPos.toStringSync());

    module.exports.generatePath = () => generatePath();
    });