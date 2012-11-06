$(function() {
  var DrawingArea = function(selector) {
    var drawingArea = $(selector);
    var canvas = drawingArea.find("canvas");

    this.resizeCanvas = function() {
      canvas[0].width = drawingArea.width();
      canvas[0].height = drawingArea.height();
    }
  }

  var Canvas = function(selector) {
    var $canvas = $(selector);
    var canvas = $canvas[0];
    var ctx = canvas.getContext("2d");

    this.setColor = function(color) {
      ctx.fillStyle = color;
    };

    this.stroke = function(e) {
      ctx.beginPath();
      ctx.arc(e.pageX,e.pageY,10,0,Math.PI*2);
      ctx.fill();
      ctx.closePath();
    };

    this.init = function() {
      $canvas.bind(new CanvasEventHandler(this));
    };
  }

  var CanvasEventHandler = function(canvas) {
    var drawing = false;

    this.mousedown = function(e) {
      drawing = true;
      canvas.stroke(e);
      return false;
    };

    this.mousemove = function(e) {
      if(drawing) {
        canvas.stroke(e);
      }
    };

    this.mouseup = function(e) {
      drawing = false;
    };
  };

  var ColorSelector = function(selector, canvas) {
    var colorSelector = $(selector);

    this.init = function() {
      colorSelector.find(".button").click(function() {
        var self = $(this);
        colorSelector.children().removeClass("selected");
        self.addClass("selected");
        canvas.setColor(self.css("background-color"));
      });
    };
  };

  var area = new DrawingArea("#drawing-area");
  var canvas = new Canvas("#drawing-area canvas");
  var colorSelector = new ColorSelector("#color-selector", canvas);

  area.resizeCanvas();
  canvas.init();
  colorSelector.init();

  $(window).resize(area.resizeCanvas);
});
