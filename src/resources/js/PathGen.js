// Find java
require('./../node_modules/java/postInstall.js');

const java = require('java');
const mvn = require('node-java-maven');

module.exports = {};

console.log(`${__dirname}:${__filename}`);

mvn({ packageJsonPath: `${__dirname}/../package.json` }, (err, mvnResults) => {
  if (err) {
    return console.error('could not resolve maven dependencies', err);
  }
  mvnResults.classpath.forEach((c) => {
    console.log(`adding ${c} to classpath`);
    java.classpath.push(c);
  });

  const Vector2 = java.import('org.team5499.monkeyLib.math.geometry.Vector2');
  const Rotation2d = java.import('org.team5499.monkeyLib.math.geometry.Rotation2d');
  const Pose2d = java.import('org.team5499.monkeyLib.math.geometry.Pose2d');
  const PathGenerator = java.import('org.team5499.monkeyLib.path.PathGenerator');

  function generatePath(x, y) {
    console.log('running generatePath()');
    const generator = new PathGenerator(1.1, 1.1, 1.1, 1.1);
    const waypoints = [];
    var x = Double($(".x").val());
    var x = Double($(".y").val());
    const x = [0.0, 1.0, 3.0];
    const y = [0.0, 1.0, 3.0];
    for (let i = 0; i < x.length; i += 1) {
      waypoints.push(
        Pose2d(Vector2(x[i], y[i]),
          Rotation2d(x[i], y[i], false)),
      );
    }
    const waypointsJava = java.newArray('org.team5499.monkeyLib.math.geometry.Pose2d', waypoints);
    const generated = generator.generatePathSync(false, waypointsJava, 1.1, 1.1, 1.1, 1.1);
    return (generated);
  }

  module.exports.generatePath = () => generatePath();
  return console.log('Path generation initialized');
});
