var lineWidth= document.getElementById("line-width");
var outputLine = document.getElementById("lineWidth");
outputLine.innerHTML = lineWidth.value;

lineWidth.oninput = function() {
  outputLine.innerHTML = this.value;
}

var sideValue = document.getElementById("sides");
var outputSide = document.getElementById("sideValue");
outputSide.innerHTML = sideValue .value;

lineValue.oninput = function() {
  outputSide.innerHTML = this.value;
}