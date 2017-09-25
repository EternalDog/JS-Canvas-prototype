
data =
[
{name: "Mon", amount: 10, colour: "red"},
{name: "Tue", amount: 20, colour: "blue"},
{name: "Wed", amount: 30, colour: "yellow"},
{name: "Thu", amount: 40, colour: "green"},
{name: "Fri", amount: 50, colour: "orange"},
{name: "Sat", amount: 90, colour: "black"},
{name: "Sun", amount: 100, colour: "brown"}
];
 
var arrayLength = data.length;

var set_height = 300;
var height = 0;
var set_width = 500;
var width = 0;




window.onload = init;


function init(){
	
	document.getElementById('canvas').setAttribute("height", set_height);
	document.getElementById('canvas').setAttribute("width", set_width);
	document.getElementById('canvas2').setAttribute("height", set_height);
	document.getElementById('canvas2').setAttribute("width", set_width);
	
	chartOutline();
	//chartItems();
	animation();
	setInterval(animation,25);
	
}	


function chartOutline() {
	height = document.getElementById('canvas').height;
	width = document.getElementById('canvas').width;
	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	//side and bottom lines
	ctx.moveTo(20,20);
	ctx.lineTo(20,(height - 20));
	ctx.lineTo((width-20),(height - 20));
	ctx.stroke();
	
	var columnWidth = ((width - 40) / arrayLength);
	for (i = 0; i < arrayLength; i++) { 
		//horizontal line markers
		ctx.moveTo((columnWidth * (i + 1)) + 20, (height - 23));
		ctx.lineTo((columnWidth * (i + 1)) + 20, (height - 17));
		ctx.stroke();
		//horizontal line marker desc
		ctx.font = "10px Arial";
		ctx.fillText(data[i].name, (columnWidth * (i + 1)) + 15, (height - 5));
	}
	
	var verticalMarkerInterval = ((height - 40) / 10);
	for (i = 0; i <= 10; i++) { 
		//vertical line markers
		ctx.moveTo(17, (verticalMarkerInterval * i)-5);
		ctx.lineTo(23, (verticalMarkerInterval * i)-5);
		ctx.stroke();
		//vertical line marker desc
		ctx.font = "10px Arial";
		ctx.fillText((110 - (10 * i)), 0, ((verticalMarkerInterval * i) - 2));
	} 
	
}

function chartItems() {
	height = document.getElementById('canvas').height;
	width = document.getElementById('canvas').width;
	
	var columnWidth = ((width - 40) / arrayLength);
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	
	for (i = 0; i < arrayLength; i++) {
		ctx.beginPath();
		ctx.arc((columnWidth * (i + 1)) + 20,(height-40)*(1-(data[i].amount / 100))+20,10,0,2*Math.PI);
		ctx.fillStyle = data[i].colour;
		ctx.fill();
		ctx.stroke();
		
		ctx.font = "10px Arial";
		ctx.fillText(data[i].amount, (columnWidth * (i + 1)) + 15, (height-40)*(1-(data[i].amount / 100))+5);

	}	
}

var dog = 0;
function animation(){
	height = document.getElementById('canvas').height;
	width = document.getElementById('canvas').width;
	
	var columnWidth = ((width - 40) / arrayLength);
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	ctx.clearRect(0,0, width, height);
	chartOutline();	
	
	for (i = 0; i < arrayLength; i++) {
	
		if (dog >= data[i].amount) {
		ctx.beginPath();
		ctx.arc((columnWidth * (i + 1)) + 20,(height-40)*(1-(data[i].amount / 100))+20,10,0,2*Math.PI);
		ctx.fillStyle = data[i].colour;
		ctx.fill();
		ctx.stroke();
		
		ctx.font = "10px Arial";
		ctx.fillStyle = "black";
		ctx.fillText(data[i].amount, (columnWidth * (i + 1)) + 13, (height-40)*(1-(data[i].amount / 100))+5);
		
			
			continue;
		}
		ctx.save();
		
		ctx.beginPath();
		ctx.arc((columnWidth * (i + 1)) + 20, (height-40)*(1-(dog / 100))+17.5 ,10 , 0 ,2*Math.PI);
		ctx.fillStyle = data[i].colour;
		ctx.fill();
		ctx.stroke();

		ctx.restore();
	}
		

	//img = new Image();
	//img.src = 'icon' + Math.floor((Math.random() * 5) + 1) +'.png';	
		
	//ctx.drawImage(img, dog, dog, 20, 20);
	dog++;

	}	
	
	

function restart() {
	dog = 0;
	ctx.clearRect(0,0, width, height);
	chartOutline();	
	animation();
	setInterval(animation,25);	
}




function addDog() {
	var canvas = document.getElementById("canvas2");
	var context = canvas.getContext("2d");
	height = document.getElementById('canvas').height;
	width = document.getElementById('canvas').width;
	
	
	img = new Image();
	img.src = 'icon' + Math.floor((Math.random() * 5) + 1) +'.png';
	
	try {
		context.drawImage(img, Math.floor((Math.random() * (width*0.9)+10)), Math.floor((Math.random() * (height*0.9)+10)), 40,40);
	}
	catch(err){
		alert ("Something went wrong, no dog can appear.")
	}
	
}





/* */
	


var sketchCanvas, sketchcontext;

var going = false;

function findPos(obj) {
	
	var curleft = curtop = 0;

	if (obj.offsetParent) {


	do {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;


		} while (obj = obj.offsetParent);

	return [curleft,curtop];
	}

}

function getMousePos(originalEvent){
	
	var posx = 0;
	var posy = 0;
	if (originalEvent.pageX || originalEvent.pageY) 	{
		posx = originalEvent.pageX+(set_width*0.5);
		posy = originalEvent.pageY;
	}
	else if (originalEvent.clientX || originalEvent.clientY) 	{
		posx = originalEvent.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
		posy = originalEvent.clientY + document.body.scrollTop
			+ document.documentElement.scrollTop;
	}
	
	
	return [posx, posy];
	
}	

function draw (e) {

if (going)
{
	if (!e) var e = window.event;

	
	var coords = getMousePos(e);
	
	posx = coords[0];
	posy = coords[1];
	
	
	var totaloffset = findPos(sketchCanvas);
	
 	totalXoffset = totaloffset[0];
 	totalYoffset = totaloffset[1];

	sketchcontext.lineTo(posx-totalXoffset, posy-totalYoffset); 

	sketchcontext.stroke();
}

}

function startdraw(e) {
	
	if (!e) var e = window.event;

	var coords = getMousePos(e);
	
	posx = coords[0];
	posy = coords[1];
	
	var totaloffset = findPos(sketchCanvas);
	
 	totalXoffset = totaloffset[0];
 	totalYoffset = totaloffset[1];
 	
 	console.log("findPos: " + totalXoffset + " " + totalYoffset);
 	
 	

	going = true;
	
	sketchcontext.beginPath();

	sketchcontext.moveTo(posx-totalXoffset, posy-totalYoffset); 

}
 
function stopdraw(){
	sketchcontext.closePath();

	going = false;
	
}

function setThickness(x){
	sketchcontext.lineWidth = x;
}

function setColour(name){
	sketchcontext.strokeStyle = name;
}

function reset(){
	sketchcontext.clearRect(0,0,sketchCanvas.scrollWidth, sketchCanvas.scrollHeight);
}

function sketch_init(){
	sketchCanvas = document.getElementById("canvas2");
	sketchcontext =  sketchCanvas.getContext("2d");  
	
	sketchCanvas.setAttribute("width", set_width);
	sketchCanvas.setAttribute("height", set_height);

	sketchCanvas.onmousemove = draw;
	sketchCanvas.onmousedown = startdraw;
	sketchCanvas.onmouseup = stopdraw;
	sketchCanvas.onmouseout = stopdraw;
	

	document.getElementById("thickness").onchange = function()
													{ setThickness(this.value);};
													
	document.getElementById("pencolour").onchange = function () 
													{ setColour(this.value);};
													
	document.getElementById("clear").onclick = reset;
	document.getElementById("addDog").onclick = addDog;
	document.getElementById("save").onclick = saveImage1;

	document.getElementById("restart").onclick = restart;

	reset();	
}	

window.addEventListener("load", sketch_init);

function saveImage1(){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	

	
		
	try {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
	
	saveImage1();
	}
	catch(err)
	{
		alert("Something went wrong, cant save image.");
		
	}
}

function saveImage1(){
	var canvas = document.getElementById("canvas2");
	var context = canvas.getContext("2d");
	
	try {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;

	}
	catch(err)
	{
		alert("Something went wrong, cant save image.");
		
	}
}

function newCanvas(){
	var newCanvas = document.createElement("canvas");
	var img1 = saveImage1();
	var img2 = saveImage2();
	newCanvas.width = 100;
	newCanvas.height = 100;
	newCanvas.getContext("2d").drawImage(img1, 0, 0);
	
	return canvas;
}
























/*
function animation() {
	height = document.getElementById('canvas').height;
	width = document.getElementById('canvas').width;
	var columnWidth = ((width - 40) / arrayLength);
	
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");
	
	var dog = 0;

			
	ctx.beginPath();
	ctx.arc((columnWidth * (dog + 1)) + 20,dog+20,10,0,2*Math.PI);
	ctx.fillStyle = data[dog].colour;
	ctx.fill();
	ctx.stroke();	


	dog++;	
}
*/

/* 
		ctx.beginPath();
		ctx.arc((columnWidth * (i + 1)) + 20,(height-40)*(1-(data[i].amount / 100))+20,10,0,2*Math.PI);
		ctx.fillStyle = data[i].colour;
		ctx.fill();
		ctx.stroke();
		
		ctx.font = "10px Arial";
		ctx.fillText(data[i].amount, (columnWidth * (i + 1)) + 15, (height-40)*(1-(data[i].amount / 100))+5);

*/

/*
var x =  0;
var y = 15;
var speed = 1;

function animate() {

    reqAnimFrame = window.mozRequestAnimationFrame    ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame     ||
                window.oRequestAnimationFrame
                ;

    reqAnimFrame(animate);

    x += speed;

    if(x <= 0 || x >= 475){
        speed = 0;
    }

    draw();
}


function draw() {
	var canvas = document.getElementById("canvas");
	var ctx = canvas.getContext("2d");

	
    ctx.arc(20,20,10,0,2*Math.PI);
	context.stroke();
}

animate(); */