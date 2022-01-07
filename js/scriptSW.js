var color = ['#D98880','#C39BD3','#7FB3D5','#76D7C4','#7DCEA0','#B2BABB','#85929E','#F0B27A'];
var label    = ['Jaoyo', 'Pho13','Popolare','Pataterie','Lombem','GOIKO','Fondue Chongqing','Poutine'];
var stopAngel = []; // stop angels starting from label index 1(0...label.length)
var slices = color.length;
var sliceDeg = 360/slices;
var deg = 260;
var speed = 5;
var slowDownRand = 0;
var ctx = document.getElementById('canvas').getContext('2d');
var width = document.getElementById('canvas').width; // size
var center = width/2;      // center
// var center = 150;
var isStopped = false;
var lock = false;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function oddEven(num) {
  return num % 2 ?  true : false;
}

function deg2rad(deg){ return deg * Math.PI/180; }

function drawSlice(index, deg, color){
  var sAngel;
  var current =  (index <= 0) ? deg : stopAngel[index - 1];
  if (oddEven(index)) {
    if (current <= 0) {
      sAngel = Math.abs(Math.floor(260 + sliceDeg + 10 ));
    } else {
      sAngel = Math.abs(Math.floor(current - sliceDeg + 10));
    }
    current = sAngel;
    stopAngel.push(current);
  } else {
    if (current <= 0) {
      sAngel = Math.abs(Math.floor(260 + sliceDeg - 10));
    } else {
      sAngel = Math.abs(Math.floor(current - sliceDeg - 10));
    }
    current = sAngel;
    stopAngel.push(current);
  }
  stopAngel.push
  ctx.beginPath();
  console.log(ctx);
  ctx.fillStyle = color;
  ctx.moveTo(center, center);
  ctx.arc(center, center, center, deg2rad(deg), deg2rad(deg+sliceDeg), false);
  ctx.lineTo(center, center);
  ctx.fill();
}

function drawText(deg, text) {
  ctx.save();
  ctx.translate(center, center);
  ctx.rotate(deg2rad(deg));
  ctx.textAlign = "right";
  ctx.fillStyle = "#fff";
  ctx.font = '14px';
  ctx.fillText(text, 130, 10);
  ctx.restore();
}

function drawImg() {
  ctx.clearRect(0, 0, width, width);
  for(let i=0; i<slices; i++){
    drawSlice(i, deg, color[i]);
    drawText(deg+sliceDeg/2, label[i]);
    deg += sliceDeg;
  }
  console.log("Stop Angel " + stopAngel);
}

function anim() {
  isStopped = true;
  deg += speed;
  deg %= 360;

  // Increment speed
  if(!isStopped && speed<3){
    speed = speed+1 * 0.1;
  }
  // Decrement Speed
  if(isStopped){
    if(!lock){
      lock = true;
      slowDownRand = rand(0.994, 0.998);
    }
    speed = speed>0.2 ? speed*=slowDownRand : 0;
  }
  // Stopped!
  if(lock && !speed){
    console.log("deg " + deg);
        console.log("slicedeg " + sliceDeg);
    console.log("calc " + Math.floor(((360 - 208 - 90) % 360) / sliceDeg))
    var ai = Math.floor(((360 - deg - 90) % 360) / sliceDeg); // deg 2 Array Index
    console.log(slices)
    ai = (slices+ai)%slices; // Fix negative index

    if (window.confirm("Let's eat:\n"+ label[ai])){
       var audio2 = new Audio('media/joe.mp3');
       audio2.play();
       audio2.onended = function() {
         window.location = "resto/"+ai+".html";
       };
      return true;
    }else{
      window.location = "in.html";
      return false;
    }

    ctx.arc(150,150,150,8.85131263511415, 9.748910536139757);
      ctx.fill();
    deg = 208;
      drawImg();
  }

  drawImg();
  window.requestAnimationFrame(anim);
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function play(audio) {
  audio.play();
  audio.loop = false;
}

function start() {
  var audio = new Audio('media/antoine.mp3');
  play(audio);
  anim();

  //label = shuffle(label);
  var ele = document.getElementById("canvas");
  ele.classList.add("spin-wheel");
  setTimeout(function() {
    ele.classList.remove("spin-wheel");
    deg= stopAngel[5];
    drawImg();
  }, 3000);

}
drawImg();
