window.addEventListener('load', () => {
  document.addEventListener('click', click);
  document.addEventListener('mousedown', startdrawormove);
  document.addEventListener('mouseup', stopdrawormove);
  document.addEventListener('mousemove', sketch);
});

var canvas = new fabric.Canvas("canvas");

var isDown, origX, origY;

var colorinput = document.getElementById("favcolor");
var slider = document.getElementById("opacity");
var output_o = document.getElementById("value");
var colorvalue = document.getElementById('colorVal');

var shapetype = "Circle";

output_o.innerHTML = slider.value;
colorvalue.innerHTML = colorinput.value;

//the default mode is changed to "reset"
var tooltype = "reset";

var graphic;
var graphics = [];

var getObject = false;

function click(event) {
  // if users click reset, clear all shapes in the interface (10pts)

  /* your code is here */
  if (tooltype == "reset") {
    canvas.clear();
    var length = graphics.length
    for (i = 0; i < length; i++) {
      graphics.pop();
    }
  }
}

function startdrawormove(event) {
  isDown = true;

  var pointer = canvas.getPointer(event); // get mouse position
  origX = pointer.x;
  origY = pointer.y;
  if (tooltype == "draw") {
    canvas.selection = false;

    //Use fabric.Circle/Rect/Triangle to define a circle/rectangle/triangle, respectively. Each shape is for 9pts
    /* your code is here */
    if (shapetype == "Circle") {
      // add object
      graphic = new fabric.Circle({
        left: origX,
        top: origY,
        radius: 0,
        fill: colorinput.value,
      });
    }
    else if (shapetype == "Rect") {
      graphic = new fabric.Rect({
        left: origX,
        top: origY,
        width: 0,
        height: 0,
        fill: colorinput.value,
      });
    }
    else if (shapetype == "Tri") {
      graphic = new fabric.Triangle({
        left: origX,
        top: origY,
        width: 0,
        height: 0,
        fill: colorinput.value,
      });
    }

    // add the defined shape into canvas (3pts).
    /* your code is here */
    canvas.add(graphic);
    graphics.push(graphic);
  }
  else if (tooltype == "move") {
    if (getObject) {

      canvas.skipTargetFind = true;
    }

    // make all shapes selectable (4pts).
    /* your code is here */
    canvas.selection = true;
  }
  else if (tooltype == "reset") {
    canvas.selection = false;
  }
}

function stopdrawormove(event) {
  isDown = false;
}

function sketch(event) {

  if (tooltype == "draw") {
    if (!isDown) return;
    canvas.selection = false;

    var pointer = canvas.getPointer(event);
    if (shapetype == 'Circle') {
      // set the circle radius based on the mouse position (6pts)
      /* your code is here */
      var radius = Math.min(Math.abs(pointer.x - origX), Math.abs(pointer.y - origY)) / 2;
      var left = pointer.x > origX ? origX : origX - radius * 2;
      var top = pointer.y > origY ? origY : origY - radius * 2;

      graphic.set('radius', radius);
      graphic.set('left', left);
      graphic.set('top', top);
      canvas.requestRenderAll();
    }
    else if (shapetype == 'Rect' || shapetype == 'Tri') {
      // set the width and height of rectangle or triangle based on the mouse position (6pts)
      /* your code is here */
      var width = Math.abs(pointer.x - origX);
      var height = Math.abs(pointer.y - origY);
      var left = Math.min(pointer.x, origX);
      var top = Math.min(pointer.y, origY);

      graphic.set('width', width);
      graphic.set('height', height);
      graphic.set('left', left);
      graphic.set('top', top);
      canvas.requestRenderAll();
    }
  }
  else if (tooltype == "move") {

    canvas.selection = true;

    var pointer = canvas.getPointer(event);

    // move the selected shape  hint: use getActiveObject() function(8pts)
    /* your code is here */
    var object = canvas.getActiveObject();

    if (object != null) {
      getObject = true;

      object.set('left', pointer.x);
      object.set('top', pointer.y);
      object.setCoords();

      canvas.requestRenderAll();

    } else {
      getObject = false;
    }
  }
  else if (tooltype == "reset") {
    canvas.selection = false;
  }

  // get all shapes from canvas (6pts) and change the opacity of each shape (6pts)

  /* your code is here */
  for (i = 0; i < graphics.length; i++) {
    graphics[i].set("opacity", slider.value);
  }
  canvas.requestRenderAll();
}

function select_shape(shape) {
  shapetype = shape.value;
}

function use_tool(tool) {
  tooltype = tool;
}

slider.oninput = function () {
  output_o.innerHTML = this.value;
}

colorinput.oninput = function () {
  colorvalue.innerHTML = this.value;
}




