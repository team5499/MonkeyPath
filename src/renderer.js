//const $ = require('jquery'); // eslint-disable-line no-unused-vars

$(document).ready(function(){
    function createPoint(e){
        x = e.clientX;
        y = e.clientY;
        console.log('(' + x + ', ' + y + ')');
        document.getElementById('dots').innerHTML += '<span id="' + id + '" class="point" style="left:' + e.clientX + 'px;top:' + e.clientY + 'px;"></span>'
    }

    $('#field').mousemove(function(e) {
        x = e.clientX - 200;
        y =  Math.round(window.innerHeight - e.clientY - (window.innerHeight/50)-2);
        if(y<0){y=0}
        $('#coords').text('(' + x + ', ' + y + ')');
    });

    $('#addPoint').click(function(){
        console.log('add point')
        var number = $('#table').children().length + 1
        console.log(number)
        var rowString = '<tr id="' + number + '"> \
                            <td><input class="x" type="number"></td> \
                            <td><input class="y" type="number"></td> \
                        </tr>'
        $('#table').append(rowString);
    });
});