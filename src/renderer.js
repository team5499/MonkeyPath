//const $ = require('jquery'); // eslint-disable-line no-unused-vars
//^no clue what this is

$(document).ready(function(){ //only runs when page is loaded
    function createPoint(e){ //creates an orange circle on the mouse coordinates
        x = e.clientX; //gets x coord
        y = e.clientY; //gets y coord
        console.log('(' + x + ', ' + y + ')'); //outputs coordinates to console (index>f12>console)
        document.getElementById('dots').innerHTML += '<span class="point" style="left:' + e.clientX + 'px;top:' + e.clientY + 'px;"></span>'
        //^ adds an element by editing the HTML of a div overlayed on the image
    }

    //when you move you mouse over the image, the x and y values changes in the coords element
    $('#feild').mousemove(function(e) { //if you move you mouse over the image{}
        x = e.clientX - 200; //x-intercept realtive to img
        y =  Math.round(window.innerHeight - e.clientY - (window.innerHeight/50)-2); //x-intercept realtive to img
        if(y<0){y=0} //stops negitive y values
        $('#coords').text('(' + x + ', ' + y + ')'); //changes the text to the values
    });

    //creats a dot when you click on the image
    $('body').click(createPoint); //calls create point when you click on a element(to allow you to make a dot ontop of a dot)
})