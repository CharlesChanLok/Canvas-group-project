let count = tempSave.length;
function tempSave() {
    let newSave = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);
    tempSave.push(newSave);
    (tempSave.length > 10) ? tempSave.shift() : null;
}

$('#undo').click(() => {
    (count > 0 )? count -= 1 : count = 0;
    contextReal.putImageData(tempSave[count], 0, 0);
})

$('#redo').click(() => {
    (count < tempSave )? count += 1 : count = tempSave.length;
    contextReal.putImageData(tempSave[count], 0, 0);
})