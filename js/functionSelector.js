$('#drawing-line').click(() => {
    currentFunction = new DrawingLine(contextReal, contextDraft, canvasReal, canvasDraft);
});
$('#drawing-rectangle').click(() => {
    currentFunction = new DrawingRectangle(contextReal, contextDraft);
});
$('#drawing-circle').click(() => {
    currentFunction = new DrawingCircle(contextReal, contextDraft);
});
$('#drawing-oval').click(() => {
    currentFunction = new DrawingOval(contextReal, contextDraft);
});
$('#color-bucket').click(() => {
    currentFunction = new ColorBucket(canvasReal, contextReal);
});
$('#erasing').click(() => {
    currentFunction = new Erasing(contextReal, contextDraft);
});
$('#clearing').click(() => {
    clearAll();
});

$('#drawing-polygon').click(() => {
    currentFunction = new DrawingPolygon(contextReal, contextDraft);
});
$('#dropper').click(() => {
    currentFunction = new Dropper(contextReal);
});

$('#drawing-stline').click(() => {
    currentFunction = new DrawingStline(contextReal, contextDraft);
});

$('#color_value').change(()=>{
    update();
});

$('#upload-image').change((event) => {
    uploadImage(contextReal, canvasReal, event);
});

$('#save-PNG').click(() => {
    exportCanvasAsPNG(canvasReal);
});

$('#save-JPEG').click(() => {
    exportCanvasAsJPEG(canvasReal);
});

$('#line-width').change(() => {
    contextReal.lineWidth = document.getElementById('line-width').value;
    contextDraft.lineWidth = document.getElementById('line-width').value;

})
$('#sides').change(() => {
    sides = document.getElementById('sides').value;
})

currentFunction = new DrawingLine(contextReal, contextDraft);
// confirm leaving page
window.onbeforeunload = function () {
    return true;
};