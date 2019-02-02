
const $ = window.$ = window.jQuery = require('jQuery');
require('jquery-ui');
const PathGen = require('./PathGen.js');
const Translation2d = require('./Translation2d.js');
const Rotation2d = require('./Rotation2d.js');
const Pose2d = require('./Pose2d.js');

let waypoints = [];
let splinePoints = [];
let ctx;
let ctxBackground;
let image;
let imageFlipped;
let wto;
const change = 'propertychange change click keyup input paste';
let animating = false;

const fieldWidth = 886; // inches
const fieldHeight = 360; // inches
const xOffset = 120;
const yOffset = 180;
const width = 1604; // pixels
const height = 651; // pixels

const robotWidth = 28; // inches
const robotHeight = 33; // inches

const waypointRadius = 7;
const splineWidth = 2;

const kEps = 1E-9;
const pi = Math.PI;

function d2r(d) {
  return d * (Math.PI / 180);
}

function r2d(r) {
  return r * (180 / Math.PI);
}

function fillRobot(position, heading, color) {
  const previous = ctx.globalCompositeOperation;
  ctx.globalCompositeOperation = 'destination-over';

  const translation = position.translation;

  ctx.translate(translation.drawX, translation.drawY);
  ctx.rotate(-heading);

  const w = robotWidth * (width / fieldWidth);
  const h = robotHeight * (height / fieldHeight);
  ctx.fillStyle = color || 'rgba(0, 0, 0, 0)';
  ctx.fillRect(-h / 2, -w / 2, h, w);

  ctx.rotate(heading);
  ctx.translate(-translation.drawX, -translation.drawY);

  ctx.globalCompositeOperation = previous;
}

const r = Math.sqrt(Math.pow(robotWidth, 2) + Math.pow(robotHeight, 2)) / 2;
const t = Math.atan2(robotHeight, robotWidth);

function drawRobot(position, heading) {
  const h = heading;
  console.warn('drawPoint');
  const angles = [h + (pi / 2) + t, h - (pi / 2) + t, h + (pi / 2) - t, h - (pi / 2) - t];
  const points = [];
  angles.forEach((angle) => {
    const point = new Translation2d(position.translation.x + (r * Math.cos(angle)),
      position.translation.y + (r * Math.sin(angle)));
    points.push(point);
    point.draw(Math.abs(angle - heading) < pi / 2 ? '#00AAFF' : '#0066FF', splineWidth, ctx);
  });
}

function init() {
  const width = 1604;
  const height = 651;
  const field = $('#field');
  const background = $('#background');
  const canvases = $('#canvases');
  const widthString = `${width / 1.5}px`;
  const heightString = `${height / 1.5}px`;
  let ctx;

  field.css('width', widthString);
  field.css('height', heightString);
  background.css('width', widthString);
  background.css('height', heightString);
  canvases.css('width', widthString);
  canvases.css('height', heightString);

  ctx = document.getElementById('field').getContext('2d');
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#FF0000';

  ctxBackground = document.getElementById('background').getContext('2d');
  ctxBackground.canvas.width = width;
  ctxBackground.canvas.height = height;
  ctx.clearRect(0, 0, width, height);

  image = new Image();
  image.src = 'img/field.png';
  image.onload = function () {
    ctxBackground.drawImage(image, 0, 0, width, height);
    update();
  };
  imageFlipped = new Image();
  imageFlipped.src = 'img/fieldFlipped.png';
  rebind();
}

function clear() {
  ctx = document.getElementById('field').getContext('2d');
  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = '#FF0000';

  ctxBackground.clearRect(0, 0, width, height);
  ctxBackground.fillStyle = '#FF0000';
  ctxBackground.drawImage(flipped ? imageFlipped : image, 0, 0, width, height);
}

function rebind() {
  const change = 'propertychange change click keyup input paste';
  const input = $('input');
  input.unbind(change);
  input.bind(change, () => {
    clearTimeout(wto);
    wto = setTimeout(() => {
      update();
    }, 500);
  });
}

function addPoint() {
  let prev;
  if (waypoints.length > 0) prev = waypoints[waypoints.length - 1].translation;
  else prev = new Translation2d(50, 50);
  $('tbody').append(`${'<tr>' + "<td class='drag-handler'></td>"
        + "<td class='x'><input type='number' value='"}${prev.x + 50}'></td>`
        + `<td class='y'><input type='number' value='${prev.y + 50}'></td>`
        + '<td class=\'heading\'><input type=\'number\' value=\'0\'></td>'
        + '<td class=\'comments\'><input type=\'search\' placeholder=\'Comments\'></td>'
        + '<td class=\'enabled\'><input type=\'checkbox\' checked></td>'
        + '<td class=\'delete\'><button onclick=\'$(this).parent().parent().remove();update()\'>&times;</button></td></tr>');
  update();
  rebind();
}

function draw(style) {
  clear();
  drawWaypoints();

  switch (style) {
    // waypoints only
    case 1:
      break;
      // all
    case 2:
      drawSplines(true);
      drawSplines(false);
      break;
    case 3:
      animate();
      break;
  }
}

function update() {
  if (animating) {
    return;
  }

  waypoints = [];
  // let data = ;
  $('tbody').children('tr').each(function () {
    console.log('waypoint');
    const x = parseInt($($($(this).children()).children()[0]).val());
    const y = parseInt($($($(this).children()).children()[1]).val());
    let heading = parseInt($($($(this).children()).children()[2]).val());
    if (isNaN(heading)) {
      heading = 0;
    }
    const comment = ($($($(this).children()).children()[3]).val());
    const enabled = ($($($(this).children()).children()[4]).prop('checked'));
    if (enabled) {
      waypoints.push(new Pose2d(new Translation2d(x, y), Rotation2d.fromDegrees(heading), comment));
    }
  });

  draw(1);
  console.log(waypoints);
  splinePoints = [];
  splinePoints = PathGen.generatePath(waypoints);
  console.log(splinePoints);

  draw(2);
}

let flipped = false;
function flipField() {
  flipped = !flipped;
  ctx.drawImage(flipped ? imageFlipped : image, 0, 0, width, height);
  update();
}

function drawWaypoints() {
  waypoints.forEach((waypoint) => {
    waypoint.draw(true, waypointRadius, ctx);
    drawRobot(waypoint, waypoint.rotation.getRadians());
  });
}

let animation;

function animate() {
  drawSplines(false, true);
}

function drawSplines(fill, animate) {
  animate = animate || false;
  let i = 0;

  if (animate) {
    clearInterval(animation);

    animation = setInterval(() => {
      if (i === splinePoints.length) {
        animating = false;
        clearInterval(animation);
        return;
      }

      animating = true;

      const splinePoint = splinePoints[i];
      const hue = Math.round(180 * (i++ / splinePoints.length));

      const previous = ctx.globalCompositeOperation;
      fillRobot(splinePoint, splinePoint.rotation.getRadians(), `hsla(${hue}, 100%, 50%, 0.025)`);
      ctx.globalCompositeOperation = 'source-over';
      drawRobot(splinePoint, splinePoint.rotation.getRadians());
      splinePoint.draw(false, splineWidth, ctx);
      ctx.globalCompositeOperation = previous;
    }, 25);
  } else {
    splinePoints.forEach((splinePoint) => {
      splinePoint.draw(false, splineWidth, ctx);

      if (fill) {
        const hue = Math.round(180 * (i++ / splinePoints.length));
        fillRobot(splinePoint, splinePoint.rotation.getRadians(), `hsla(${hue}, 100%, 50%, 0.025)`);
      } else {
        drawRobot(splinePoint, splinePoint.rotation.getRadians());
      }
    });
  }
}
