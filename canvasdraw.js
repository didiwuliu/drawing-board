$(function() {
  var $canvas = $("canvas#drawing-area");
  var canvas = $canvas[0];
  var ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var stroke = function(e) {
    ctx.beginPath();
    ctx.arc(e.pageX,e.pageY,10,0,Math.PI*2);
    ctx.fill();
    ctx.closePath();
  };

  var drawing = false;

  var mouseDown = function(e) {
    drawing = true;
    stroke(e);
    return false;
  };

  var mouseMove = function(e) {
    if(drawing) {
      stroke(e);
    }
  };

  var mouseUp = function(e) {
    drawing = false;
  };

  $canvas.mousedown(mouseDown);
  $canvas.mousemove(mouseMove);
  $canvas.mouseup(mouseUp);
});
