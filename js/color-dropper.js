var eyedropperIsActive = false;
var canvasOffset = $("#canvas-draft").offset();
var offsetX = canvasOffset.left;
var offsetY = canvasOffset.top;


function getPixelColor(x, y) {
    var pxData = contextReal.getImageData(x, y, 1, 1);
    return ("rgb(" + pxData.data[0] + "," + pxData.data[1] + "," + pxData.data[2] + ")");
}

function handleMouseMove(e) {

    if (!eyedropperIsActive) { return; }

    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // Put your mousemove stuff here
    var eyedropColor = getPixelColor(mouseX, mouseY);
    console.log(eyedropColor);

}

// Activate reading pixel colors when a #startDropper button is clicked
$("#dropper").click(function (e) { eyedropperIsActive = true; });

// if the tool is active, report the color under the mouse

$("#canvas-draft").mousemove(function (e) { handleMouseMove(e); });

// when the user clicks on the canvas, turn off the tool 
// (the last color will remain selected)
$("#canvas-draft").click(function (e) { eyedropperIsActive = false; });