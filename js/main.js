$(function() {
  var drawingArea = $("#drawing-area");
  var $canvas = drawingArea.find("canvas");
  var canvas = $canvas[0];
  var ctx = canvas.getContext("2d");

  var resizeCanvas = function() {
    canvas.width = drawingArea.width();
    canvas.height = drawingArea.height();
  }

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

  resizeCanvas();
  $canvas.bind(new EventHandler);
  $(window).resize(resizeCanvas);
});
