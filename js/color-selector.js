/*
function selectColor(event) {
    contextDraft.fillStyle = event.target.value;
    contextReal.fillStyle = event.target.value;
    contextReal.strokeStyle = event.target.value;
} */

function update() {
    contextDraft.fillStyle = '#' + document.getElementById('color_value').value;
    contextReal.fillStyle = '#' + document.getElementById('color_value').value;
    contextReal.strokeStyle = '#' + document.getElementById('color_value').value;

}