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
    const feildCoords = getWindowCoords(x, y);
    point.style.top = `${feildCoords[1]}px`;
    point.style.left = `${feildCoords[0]}px`;
    point.classList.add('point');
    point.setAttribute('X', x);
    point.setAttribute('Y', y);
    point.setAttribute('A', a);
    console.log(point);
    $('#dots').append(point);
    coords.push([x, y, a]);
  }

  $('#field').mousemove((e) => {
    $('#coords').text(`(${getFieldCoords(e)[0]}, ${getFieldCoords(e)[1]})`);
  });


  $('#addPoint').click(() => {
    console.log('add point');
    points += 1;
    const row = $('<tr></tr>');
    row.id = `_${points}`;

    const tdX = $('<tr></tr>'); row.appendChild(tdX);
    const tdY = $('<tr></tr>'); row.appendChild(tdY);
    const tdA = $('<tr></tr>'); row.appendChild(tdA);

    const inputX = $('<input>');
    const inputY = $('<input>');
    const inputA = $('<input>');

    inputX.value = 0; inputX.class = 'x'; inputX.type = 'number'; tdX.append(inputX);
    inputY.value = 0; inputY.class = 'y'; inputY.type = 'number'; tdY.append(inputY);
    inputA.value = 0; inputA.class = 'a'; inputA.type = 'number'; tdA.append(inputA);

    $('#tbody').append(row);
  });


  $('#tbody').children()[0].id = '1';
  createPoint(0, 0, 0);
  console.log(getWindowCoords(0, 0));
  console.log('done');
});
