/* #20 https://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf */

function exportCanvasAsPNG(canvas) {

    let fileName =  prompt("Please enter file name:") + '.png'; 
    var MIME_TYPE = "image/png";
    var imgURL = canvas.toDataURL(MIME_TYPE);
    var dlLink = document.createElement('a');
    console.log( dlLink.download);
    dlLink.download = fileName;
    dlLink.href = imgURL;
    console.log(dlLink.href);
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}



