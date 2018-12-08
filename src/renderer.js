const $ = require('jquery'); // eslint-disable-line no-unused-vars

function getFieldCoords(e) {
  const x = e.clientX - 8;
  const y = Math.round(-e.clientY + ($('#img').height() / 2) + 8);
  return [x, y];
}

function getWindowCoords(x, y) {
  return [x, -(y - ($('#img').height() / 2) + 8)];
}


$('document').ready(() => {
  let points = 1;
  const coords = [[0, 0, 0]];

  function createPoint(x, y, a) {
    console.log('createPoint');
    const point = $('<span></span>');
    const fieldCoords = getWindowCoords(x, y);
    console.log(point);
    point.css('top', `${fieldCoords[1]}px`);
    point.css('left', `${fieldCoords[0]}px`);
    point.addClass('point');
    point.attr('X', x);
    point.attr('Y', y);
    point.attr('A', a);
    console.log(point);
    $('#dots').append(point);
    coords.push([x, y, a]);
  }

  function changePoint(info) {
    info.sort();
  }

  $('#field').mousemove((e) => {
    $('#coords').text(`(${getFieldCoords(e)[0]}, ${getFieldCoords(e)[1]})`);
  });


  $('#add_point').click(() => {
    console.log('add point');
    points += 1;
    const row = $('<tr></tr>');
    row.attr('id', points.toString());

    const tdX = $('<td></td>'); row.append(tdX);
    const tdY = $('<td></td>'); row.append(tdY);
    const tdA = $('<td></td>'); row.append(tdA);

    const inputX = $('<input>');
    const inputY = $('<input>');
    const inputA = $('<input>');

    inputX.attr('value', 0); inputX.addClass('x'); inputX.attr('type', 'number'); tdX.append(inputX);
    inputY.attr('value', 0); inputY.addClass('y'); inputY.attr('type', 'number'); tdY.append(inputY);
    inputA.attr('value', 0); inputA.addClass('a'); inputA.attr('type', 'number'); tdA.append(inputA);

    inputX.on('change', changePoint(points));
    inputY.on('change', changePoint(points));
    inputA.on('change', changePoint(points));
    console.log(row);
    $('#tbody').append(row);
  });


  $('#tbody').children()[1].id = '1'; // htmllint doesn't like numbered ids
  createPoint(0, 0, 0);
  console.log(getWindowCoords(0, 0));
  console.log('done');
});
