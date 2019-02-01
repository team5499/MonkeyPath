// Find java
require('./../node_modules/java/postInstall.js');

const java = require('java');
const mvn = require('node-java-maven');
const Translation2d = require('./Translation2d.js');
const Rotation2d = require('./Rotation2d.js');
const Pose2d = require('./Pose2d.js');

mvn({ packageJsonPath: `${__dirname}/../package.json` }, (err, mvnResults) => {
  if (err) {
    return console.error('could not resolve maven dependencies', err);
  }
  mvnResults.classpath.forEach((c) => {
    console.log(`adding ${c} to classpath`);
    java.classpath.push(c);
  });

  const Vector2Java = java.import('org.team5499.monkeyLib.math.geometry.Vector2');
  const Rotation2dJava = java.import('org.team5499.monkeyLib.math.geometry.Rotation2d');
  const Pose2dJava = java.import('org.team5499.monkeyLib.math.geometry.Pose2d');
  const PathGeneratorJava = java.import('org.team5499.monkeyLib.path.PathGenerator');


  function generatePath(points) {
    console.log(points);
    points = [new Pose2d(new Translation2d(1, 1), Rotation2d.fromDegrees(90), ''), new Pose2d(new Translation2d(3, 3), Rotation2d.fromDegrees(180), '')];
    const generator = new PathGeneratorJava(1.0, 1.0, 1.0, 1.0);
    const splinePoints = [];
    for (let i = 0; i < points.length; i += 1) {
      console.log(points[i]);
      console.log(java.getStaticFieldValue('org.team5499.monkeyLib.math.geometry.Rotation2d', 'Companion'));
      const Rotation2dCompanion = new Rotation2d();
      splinePoints.push(
        Pose2dJava(Vector2Java(points[i].getTranslation.x, points[i].getTranslation.y),
          java.getStaticFieldValue('org.team5499.monkeyLib.math.geometry.Rotation2d', 'Companion').fromDegreesSync(points[i].getRotation.getDegrees)),
      );
    }
    const splinePointsJava = java.newArray('org.team5499.monkeyLib.math.geometry.Pose2d', splinePoints);
    const generated = generator.generatePathSync(false, splinePointsJava, 1.0, 1.0, 1.0, 1.0);
    const generatedPath = [];
    for (let i = 0; i < generated.getPathLengthSync(); i += 1) {
      const pose = generated.getPoseSync(i).getPoseSync();
      generatedPath.push(new Pose2d(
        new Translation2d(pose.getTranslationSync().getXSync(), pose.getTranslationSync().getYSync()), Rotation2d.fromDegrees(pose.getRotationSync().getDegreesSync()),
      ));
    }
    console.log(generatedPath);
    return generatedPath;
  }

  module.exports.generatePath = points => generatePath(points);
  return console.log('Path generation initialized');
});
