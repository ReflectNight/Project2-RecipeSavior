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
}

function getMousePos(event){
	var x = event.clientX - canvas.offsetLeft; 
    var y = event.clientY - canvas.offsetTop;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var w = canvas.width;
  canvas.width = 1;
  canvas.width = w;
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

function redrawCanvas(){
	clearCanvas();
	ctx.fillStyle = "rgba(254, 251 ,252, 0.50)";
	roundedRect(ctx, 40, 125, 400, 500, 20);
	ctx.fillRect(40, 125, 400, 500);

	var canvasoverlay = new Image;
	canvasoverlay.onload=function(){
		ctx.drawImage(canvasoverlay,0,0);
	};
	canvasoverlay.src="http://i.imgur.com/Pj24Uhp.png";
}

function drawArrows(){
	var baseArrow = new Image;
	baseArrow.onload=function(){
		ctx.drawImage(baseArrow,0,0);
	}
	baseArrow.src="http://i.imgur.com/4MZkDtA.png";
}

function showFood(imgsrc){
	redrawCanvas();
	
	var img = new Image;
	
	img.onload = function(){
		var width=img.width;
		var height=img.height;
		
		//adjusts for height/width problems	
		if(width>maxw){

			var diff=maxw-width-20;
			var newW=width+diff;
			var percentdiff=newW/width;
			height=height*percentdiff;
			width=width*percentdiff;
		}
		if (height>maxh){

			var diff=maxw-height-20;
			var newH=height+diff;
			var percentdiff=newH/height;
			height=height*percentdiff;
			width=width*percentdiff;
		}
		
		diff=0;

		var halfw= width/2;
		var halfh= height/2;
		
			ctx.drawImage(img,(cenx-halfw)-45,(ceny-halfh),width,height);
	};
	if((imgsrc.indexOf("png")!=-1)||imgsrc.indexOf("jpeg")!=-1||imgsrc.indexOf("gif")!=-1||imgsrc.indexOf("jpg")!=-1)
		img.src=imgsrc;
	else
		img.src="http://i.imgur.com/uvB5FXA.png";// there is no image
}

canvas.addEventListener('mousedown', onMouseDown, false);
canvas.addEventListener('mousemove', getMousePos, false);

