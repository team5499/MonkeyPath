//const $ = require('jquery'); // eslint-disable-line no-unused-vars

$(document).ready(function(){
	var points = 1
	var coords = [[0,0]]

    function createPoint(x, y){
		var point = document.createElement('span');
		point.top = (-y-309).toString();
		point.left = (x+8).toString();
		point.addClass = 'point';
		console.log(point);
		$('#dots').append(point)

	}

    function getCoords(e){
        return [e.clientX - 8, - e.clientY + 309]
    }

    $('#field').mousemove(function(e) {
        $('#coords').text('(' + getCoords(e)[0] + ', ' + getCoords(e)[1] + ')');
    });


    $('#addPoint').click(function(){
		console.log('add point');
		var tbody = $('#tbody')
		points++
		var row = document.createElement('TR');
		row.id = points.toString();

		var tdX = document.createElement('TD'); row.appendChild(tdX);
		var tdY = document.createElement('TD'); row.appendChild(tdY);
		var tdA = document.createElement('TD'); row.appendChild(tdA)

		inputX = document.createElement('input')
		inputY = document.createElement('input')
		inputA = document.createElement('input')
		//inputX.input(editPoint(points))

        inputX.class = 'x';	inputX.type = 'number';	tdX.append(inputX)
        inputY.class = 'y';	inputY.type = 'number';	tdY.append(inputY)
		inputA.class = 'a';	inputA.type = 'number';	tdA.append(inputA)

		$('#tbody').append(row)
	});
	
	createPoint(0,0)
});