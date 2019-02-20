// Find java
require('./../node_modules/java/postInstall.js');

const java = require('java'); // node modules
const mvn = require('node-java-maven');
const Translation2d = require('./Translation2d.js');
const Rotation2d = require('./Rotation2d.js');
const Pose2d = require('./Pose2d.js');

// importing classes with node-java-maven
mvn({ packageJsonPath: `${__dirname}/../package.json` }, (err, mvnResults) => {
  if (err) {
    return console.error('could not resolve maven dependencies', err);
  }
  mvnResults.classpath.forEach((c) => {
    java.classpath.push(c);
  });

  const Vector2Java = java.import('org.team5499.monkeyLib.math.geometry.Vector2');
  const Pose2dJava = java.import('org.team5499.monkeyLib.math.geometry.Pose2d');
  const PathGeneratorJava = java.import('org.team5499.monkeyLib.path.PathGenerator');


  function generatePath(waypoints) {
    // velocities are not being handled by path gen, default values
    const generator = new PathGeneratorJava(1.0, 1.0, 1.0, 1.0);
    const splinePoints = [];
    for (let i = 0; i < waypoints.length; i += 1) { // appending waypoints with Pose2d objects
      splinePoints.push(
        Pose2dJava(Vector2Java(waypoints[i].getTranslation.x, waypoints[i].getTranslation.y),
          java.getStaticFieldValue('org.team5499.monkeyLib.math.geometry.Rotation2d', 'Companion').fromDegreesSync(waypoints[i].getRotation.getDegrees())),
      );
    }
    const splinePointsJava = java.newArray('org.team5499.monkeyLib.math.geometry.Pose2d', splinePoints);
    const generated = generator.generatePathSync(false, splinePointsJava);
    const generatedPath = [];
    for (let i = 0; i < generated.getPathLengthSync(); i += 1) {
      const pose = generated.getPoseSync(i).getPoseSync();
      generatedPath.push(new Pose2d(
        new Translation2d(
          pose.getTranslationSync().getXSync(),
          pose.getTranslationSync().getYSync(),
        ),
        Rotation2d.fromDegrees(pose.getRotationSync().getDegreesSync()),
      ));
    }
    return generatedPath;
  }

  module.exports.generatePath = points => generatePath(points);
  return console.log('Path generation initialized');
});
