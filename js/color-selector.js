function selectColor(event) {
    contextDraft.fillStyle = event.target.value;
    contextReal.fillStyle = event.target.value;
    contextReal.strokeStyle = event.target.value;
}