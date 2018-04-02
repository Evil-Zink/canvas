var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

aotuCanvas(canvas);

listenToMouse(canvas);


var usingEraser = false;
eraser.onclick = function(){
  usingEraser = true;
  actions.className = "actions x";
}

brush.onclick = function(){
  usingEraser = false;
  actions.className = "actions";
}


/************/

function aotuCanvas(canvas){
  changeWH();
  window.onresize = function(){
    changeWH();
}
  function changeWH(){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;

    canvas.width = pageWidth;
    canvas.height = pageHeight;
}
}

function listenToMouse(canvas){
  var using = false;
  var lastPoint={x:undefined, y:undefined};
  canvas.onmousedown = function(aaa){
    var x = aaa.clientX;
    var y = aaa.clientY;
    using = true;
    if(usingEraser){
      context.clearRect(x-5,y-5,50,50);
    }else{
      lastPoint = {"x":x, "y":y};
      console.log(lastPoint);
      drawCircle(x,y,3);
    }
}
canvas.onmousemove = function(aaa){
   var x = aaa.clientX;
   var y = aaa.clientY;
  if(!using){return;}
   if(usingEraser){
        context.clearRect(x,y,10,10);
   }else{
       var newPoint = {x:x, y:y};
       drawLine(lastPoint.x, lastPoint.y, newPoint.x,                newPoint.y);
       lastPoint = newPoint;
       console.log(lastPoint);
  }
}


canvas.onmouseup = function(aaa){
  using = false;
//   usingEraser = false;
}

}

function drawCircle(x,y,radius){
  context.beginPath();
  context.fillStyle = 'black';
  context.arc(x,y,radius,0,Math.PI*2);
  context.fill();
}


function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.strokeStyle = 'black';
  context.moveTo(x1,y1);//起点
  context.lineTo(x2,y2);//终点
  context.lineWidth = 5;
  context.stroke();
  context.closePath();
}


