//All canvas functions taken care of here


var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var maxh = 500-10;
var maxw = 400-10;
var cenx=285;
var ceny=380;
redrawCanvas();


function onMouseDown(event) {
    var x = event.pageX - canvas.offsetLeft; 
    var y = event.pageY - canvas.offsetTop;
    console.log("x: " + x + ", y :" + y)
    //figure out the area of all the boxes and arrows

}
function showFood(imgsrc){

	redrawCanvas();
	var width=imgsrc.width;
	var height=imgsrc.height;
	var img = new Image;   

	if(width>maxw){
		var diff=maxw-width;
		width=width-diff;
		height=height-diff;
	}
	if (height>maxh){
		var diff=maxw-height;
		width=width-diff;
		height=height-diff;
	}
	diff=0;

	var halfw=width/2;
	var halfh=height/2;

	img.onload=function(){
		ctx.drawImage(imgsrc,cenx-halfw,ceny-halfh,width,height);
	}
	img=imgsrc;
}
function redrawCanvas(){
	console.log("redrawing...");
	clearCanvas();
	ctx.fillStyle = "rgba(254, 251 ,252, 0.25)";
	roundedRect(ctx, 40, 125, 400, 500, 20);
	ctx.fillRect(40, 125, 400, 500);

}

function roundedRect(ctx,x,y,width,height,radius){
    ctx.beginPath();
    ctx.moveTo(x,y+radius);
    ctx.lineTo(x,y+height-radius);
    ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
    ctx.lineTo(x+width-radius,y+height);
    ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
    ctx.lineTo(x+width,y+radius);
    ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
    ctx.lineTo(x+radius,y);
    ctx.quadraticCurveTo(x,y,x,y+radius);
    ctx.stroke();
}


canvas.addEventListener('mousedown', onMouseDown, false);

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var w = canvas.width;
  canvas.width = 1;
  canvas.width = w;
}