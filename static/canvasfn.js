//All canvas functions taken care of here

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


function onMouseDown(event) {
    var x = event.pageX - canvas.offsetLeft; 
    var y = event.pageY - canvas.offsetTop;
    console.log("x: " + x + ", y :" + y)
    //figure out the area of all the boxes and arrows

}
canvas.addEventListener('mousedown', onMouseDown, false);