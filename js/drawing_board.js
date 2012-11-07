(function(window) {
  var DrawingBoard = function() {
    var canvas = new Canvas();
    var colorSelector = new ColorSelector(canvas);

    this.init = function() {
      canvas.init();
      canvas.resizeCanvas();
      colorSelector.init();
      $(window).resize(canvas.resizeCanvas);
    };
  };

  var Canvas = function() {
    var drawingArea = $("#drawing-area");
    var $canvas = drawingArea.find("canvas");
    var canvasEl = $canvas[0];
    var ctx = canvasEl.getContext("2d");

    this.init = function() {
      $canvas.bind(new CanvasEventHandler(this));
    }

    this.resizeCanvas = function() {
      canvasEl.width = drawingArea.width();
      canvasEl.height = drawingArea.height();
    }

    this.setColor = function(color) {
      ctx.fillStyle = color;
    };

    this.stroke = function(e) {
      ctx.beginPath();
      ctx.arc(e.pageX,e.pageY,10,0,Math.PI*2);
      ctx.fill();
      ctx.closePath();
    };
  };

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

  var ColorSelector = function(canvas) {
    var colorSelector = $("#color-selector");

    this.init = function() {
      colorSelector.find(".button").click(function() {
        var self = $(this);
        colorSelector.children().removeClass("selected");
        self.addClass("selected");
        canvas.setColor(self.css("background-color"));
      });
    };
  };

  window.DrawingBoard = DrawingBoard;
})(window);
