function pick(event) {
  var x = event.layerX;
  var y = event.layerY;
  var pixel = contextReal.getImageData(x, y, 1, 1);
  var data = pixel.data;
  var rgba = 'rgba(' + data[0] + ', ' + data[1] +
             ', ' + data[2] + ', ' + (data[3] / 255) + ')';
  contextDraft.fillStyle = rgba;
contextReal.fillStyle = rgba;
contextReal.strokeStyle = rgba;
}