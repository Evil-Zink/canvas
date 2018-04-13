var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

//默认画笔粗细
var lineWidth = 5;

/*设置canvas全屏*/
aotuCanvas(canvas);
//监听用户动作
listenToUser(canvas);
//功能初始化
var usingEraser = false;
pen.onclick = function(){
  usingEraser = false;
  pen.classList.add('active');
  eraser.classList.remove('active');
  context.strokeStyle = 'black';
  context.fillStyle = 'black';
  black.classList.add('active');
}
eraser.onclick = function(){
  usingEraser = true;
  eraser.classList.add('active');
  pen.classList.remove('active');
  black.classList.remove('active');
  red.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
  yellow.classList.remove('active');
}
clear.onclick = function(){
  context.clearRect(0, 0, canvas.width, canvas.height)
}
save.onclick = function(){
  var url = canvas.toDataURL('image/png');
  var a  = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = '我的绘画';
  a.target = '_blank';
  a.click();
}

black.onclick = function(){
  context.strokeStyle = 'black';
  context.fillStyle = 'black';
  black.classList.add('active');
  red.classList.remove('active');
  green.classList.remove('active');
  yellow.classList.remove('active');
  blue.classList.remove('active');
}
red.onclick = function(){
  context.strokeStyle = 'red';
  context.fillStyle = 'red';
  red.classList.add('active');
  black.classList.remove('active');
  green.classList.remove('active');
  yellow.classList.remove('active');
  blue.classList.remove('active');
}
green.onclick = function(){
  context.strokeStyle = 'green';
  context.fillStyle = 'green';  
  green.classList.add('active');  
  black.classList.remove('active');
  red.classList.remove('active');
  yellow.classList.remove('active');
  blue.classList.remove('active');
}
blue.onclick = function(){
  context.strokeStyle = 'blue';
  context.fillStyle = 'blue';  
  blue.classList.add('active');  
  black.classList.remove('active');
  red.classList.remove('active');
  yellow.classList.remove('active');
  green.classList.remove('active');
}
yellow.onclick = function(){
  context.strokeStyle = 'yellow';
  context.fillStyle = 'yellow';
  yellow.classList.add('active');
  black.classList.remove('active');
  red.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
}

thin.onclick = function(){
  lineWidth = 3;
}
medium.onclick = function(){
  lineWidth = 5;
}
thick.onclick = function(){
  lineWidth = 7;
}

/******设置一个全屏的白色canvas*****/
context.fillStyle = 'white';
context.fillRect(0,0,canvas.width, canvas.height);

/****获取视口宽高***/
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

/******监听用户移动鼠标or手指，设备特性检测******/
function listenToUser(canvas){
  var using = false;
  var lastPoint={x:undefined, y:undefined};
  //特性检测
  if(document.body.ontouchstart !== undefined){
    //触屏设备
    canvas.ontouchstart = function(down){
      var x = down.touches[0].clientX;
      var y = down.touches[0].clientY;
      using = true;
      if(usingEraser){
        context.clearRect(x-25,y-25,50,50);
      }else{
        lastPoint = {"x":x, "y":y};
        console.log(lastPoint);
      }
    }
    canvas.ontouchmove = function(move){
      console.log('移动');
      var x = move.touches[0].clientX;
      var y = move.touches[0].clientY;
      if(!using){return;}
      if(usingEraser){
          context.clearRect(x-25,y-25,50,50);
      }else{
         var newPoint = {x:x, y:y};
         drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
         lastPoint = newPoint;
      }
    }
    canvas.ontouchend = function(){
      console.log('离开');
      using = false;    
    }    
  }else{
    //非触屏设备
    canvas.onmousedown = function(down){
      var x = down.clientX;
      var y = down.clientY;
      using = true;
      if(usingEraser){
        context.clearRect(x-25,y-25,50,50);
      }else{
        lastPoint = {"x":x, "y":y};
      }
    }
    canvas.onmousemove = function(move){
      var x = move.clientX;
      var y = move.clientY;
      if(!using){return;}
      if(usingEraser){
          context.clearRect(x-25,y-25,50,50);
      }else{
         var newPoint = {x:x, y:y};
         drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
         lastPoint = newPoint;
      }
    }
  
  
    canvas.onmouseup = function(up){
      using = false;
    }
  }
}

function drawCircle(x,y,radius){
  context.beginPath();
  context.arc(x,y,radius,0,Math.PI*2);
  context.fill();
}


function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1,y1);//起点
  context.lineTo(x2,y2);//终点
  context.lineWidth = lineWidth;
  context.stroke();
  context.closePath();
}


