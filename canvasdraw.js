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

  var EventHandler = function() {
    var drawing = false;

    this.mousedown = function(e) {
      drawing = true;
      stroke(e);
      return false;
    };

    this.mousemove = function(e) {
      if(drawing) {
        stroke(e);
      }
    };

    this.mouseup = function(e) {
      drawing = false;
    };
  };

  $canvas.bind(new EventHandler);
});
