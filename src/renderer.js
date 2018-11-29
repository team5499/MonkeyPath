//const $ = require('jquery'); // eslint-disable-line no-unused-vars
$(document).ready(function(){
    function createPoint(e){
        x = e.clientX;
        y = e.clientY;
        console.log('(' + x + ', ' + y + ')');
        document.getElementById('dots').innerHTML += '<span class="point" style="left:' + e.clientX + 'px;top:' + e.clientY + 'px;"></span>'
    }

    var canvas = $('#canvas')
    var ctx = canvas.getContext("2d");

    $('#feild').mousemove(function(e){
        x = e.clientX - 200;
        y =  Math.round(window.innerHeight - e.clientY - (window.innerHeight/50)-2);
        if(y<0){y=0}
        $('#coords').text('(' + x + ', ' + y + ')');
    });

    $('body').click(createPoint);
})