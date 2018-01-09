let tempSave = [];
let count;
function screenSave() {
    let newSave = contextReal.getImageData(0, 0, canvasReal.width, canvasReal.height);
    tempSave.push(newSave);
    (tempSave.length > 21) ? tempSave.shift() : null;
    count = tempSave.length;
}

$(window).onload = screenSave();

$('#undo').click(() => {
    (count > 0 )? count -= 1 : count = 0;
    console.log(count);
    contextReal.putImageData(tempSave[count], 0, 0);
})

$('#redo').click(() => {
    (count < tempSave.length - 1)? count += 1 : count = tempSave.length - 1;
    contextReal.putImageData(tempSave[count], 0, 0);
})