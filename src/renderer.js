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
  let pointsNum = 0;
  const pointsList = [];

  function createPoint(x, y, a) {
    console.log('createPoint');
    const point = $('<span></span>');
    const fieldCoords = getWindowCoords(x, y);
    point.css('top', `${fieldCoords[1]}px`);
    point.css('left', `${fieldCoords[0]}px`);
    point.addClass('point');
    point.attr('x', x);
    point.attr('y', y);
    point.attr('a', a);
    point.attr('p', pointsNum.toString());
    $('#dots').append(point);
    pointsList.push(point);
  }

  function changePoint() {
    console.log('changePoint');
    const inputX = $('tr td:nth-child(1) input');
    const inputY = $('tr td:nth-child(2) input');
    console.log(inputX, inputY);
    for (let i = 0; i < inputX.length; i += 1) {
      console.log(pointsList[i]);
      const fieldCoords = getWindowCoords(inputX[i].value, inputY[i].value);
      pointsList[i].css('top', `${fieldCoords[1]}px`);
      pointsList[i].css('left', `${fieldCoords[0]}px`);
      pointsList[i].attr('x', inputX[i].value.toString());
      pointsList[i].attr('y', inputY[i].value.toString());
    }
  }

  function addRow() {
    createPoint(0, 0, 0);
    console.log('add row');
    pointsNum += 1;
    const point = pointsNum.toString();
    const row = $('<tr></tr>');
    row.attr('id', point);

    const tdX = $('<td></td>'); row.append(tdX);
    const tdY = $('<td></td>'); row.append(tdY);
    const tdA = $('<td></td>'); row.append(tdA);
    const tdC = $('<td></td>'); row.append(tdC);

    const inputX = $('<input>');
    const inputY = $('<input>');
    const inputA = $('<input>');
    const img = $('<img class="close" src="resources/close.png" alt="close">');

    inputX.attr('value', 0); inputX.addClass('x'); inputX.attr('type', 'number'); tdX.append(inputX);
    inputY.attr('value', 0); inputY.addClass('y'); inputY.attr('type', 'number'); tdY.append(inputY);
    inputA.attr('value', 0); inputA.addClass('a'); inputA.attr('type', 'number'); tdA.append(inputA);
    tdC.append(img);
    $('#tbody').append(row);
    console.log(inputX, inputY);
    // $('#add_point').click(changePoint());
    inputX.change(changePoint());
    inputY.change(changePoint());
    // inputX.change()
    // inputA.on('change', changeAngle(pointsNum));

    tdC.click(() => {
      console.log('close');
      row.remove();
    });
  }

  $('#field').mousemove((e) => {
    $('#coords').text(`(${getFieldCoords(e)[0]}, ${getFieldCoords(e)[1]})`);
  });

  $('#add_point').click(() => {
    console.log('add row via button');
    addRow();
  });
  addRow();
});
