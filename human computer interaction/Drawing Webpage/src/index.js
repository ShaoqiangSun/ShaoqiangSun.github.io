window.addEventListener('load', () => {
  /* use document.addEventListener to add additional two functions for interactivity
  "mouseup" for stopPainting and "mousedown" for startPainting (10pts)
  */
  document.addEventListener('mousedown', startPainting);
  document.addEventListener('mousemove', sketch); // when mouse move, we draw the lines
  document.addEventListener('mouseup', stopPainting);
});

const canvas = document.querySelector('#canvas');

// Context for the canvas for 2 dimensional operations
const ctx = canvas.getContext('2d');

// use document.getElementById to get the slider and the corresponding value

var slider = document.getElementById("linecap");
var output_v = document.getElementById("value");
output_v.innerHTML = slider.value;


//use document.getElementByName to get the line color

var radio = document.getElementsByName("linecolor");


// define the current mode : draw or earse
var tooltype = 'draw';

// Stores the initial position of the cursor
let coord = { x: 0, y: 0 };

// This is the flag that we are going to use to 
// trigger drawing
let paint = false;

// Updates the coordianates of the cursor when 
// an event e is triggered to the coordinates where 
// the said event is triggered.
function getPosition(event) {
  coord.x = event.clientX - canvas.offsetLeft;
  coord.y = event.clientY - canvas.offsetTop;
}

// // The following function trigeer the flag to start draw (10pts)
function startPainting(event) {

  /* your code is here */
  paint = true;
  getPosition(event);
}

// // The following function trigeer the flag to stop draw (10pts)
function stopPainting() {

  /* your code is here */
  paint = false;
}

function sketch(event) {
  // if !paint is true, this function does nothing. (3pts)
  /* your code is here */
  if (!paint) {
    return;
  }
  // Prepare drawing calss (ctx.beginPath function) (3pts)
  /* your code is here */
  ctx.beginPath();

  // assign the value of linewidth to ctx.lineWidth (3pts)
  /* your code is here */
  ctx.lineWidth = slider.value;

  // Sets the end of the lines drawn
  // to a round shape.
  ctx.lineCap = 'round';

  // judge whether you aim to draw or earse

  if (tooltype == 'erase') {
    // (2pts)
    /* your code is here */
    ctx.strokeStyle = "white";
  }
  else {
    // (5pts)
    /* check every element in radio and change the style to the selected color */
    /* your code is here */
    if (radio[0].checked) {
      ctx.strokeStyle = "green";
    }
    else if (radio[1].checked) {
      ctx.strokeStyle = "red";
    }
    else if (radio[2].checked) {
      ctx.strokeStyle = "blue";
    }
    else {
      ctx.strokeStyle = "black";
    }
  }

  // The cursor to start drawing
  // moves to this coordinate (ctx.moveTo function) (3pts)

  /* your code is here */
  ctx.moveTo(coord.x, coord.y);

  // The position of the cursor
  // gets updated as we move the
  // mouse around. 
  getPosition(event);

  // A line is traced from start
  // coordinate to this coordinate (ctx.lineTo function) (3pts)

  /* your code is here */
  ctx.lineTo(coord.x, coord.y);

  // call ctx.stroke to draw the line. (3pts)
  /* your code is here */
  ctx.stroke();
}

/* define a fucntion that can change the draw or erase mode 
when user clicks the corresponding button on HTML (5pts)

*/

/* your code is here */
click_button = function (mode) {
  tooltype = mode;
}

slider.oninput = function () {
  output_v.innerHTML = this.value;
}

function resizeCanvas() {
  var canvas = document.getElementById('canvas');
  var rect = canvas.getBoundingClientRect();


  canvas.width = rect.width;
  canvas.height = rect.height;
}


resizeCanvas();


window.addEventListener('resize', resizeCanvas);

