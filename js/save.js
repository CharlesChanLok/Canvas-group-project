/* https://stackoverflow.com/questions/923885/capture-html-canvas-as-gif-jpg-png-pdf */

function exportCanvasAsPNG(canvas) {

    let fileName = prompt("Please enter file name:");
    if (!fileName) {
        fileName = "Untitled.png"
    }
    else {
        fileName += '.png'
    }
    var MIME_TYPE = "image/png";
    var imgURL = canvas.toDataURL(MIME_TYPE, 1);
    var dlLink = document.createElement('a');
    
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}

function exportCanvasAsJPEG(canvas) {

    let fileName = prompt("Please enter file name:");
    if (!fileName) {
        fileName = "Untitled.jpeg"
    }
    else {
        fileName += '.jpeg'
    }
    var MIME_TYPE = "image/jpeg";
    var imgURL = canvas.toDataURL(MIME_TYPE, 1);
    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}
/*
function exportCanvasAsSVG(canvas, ctx) {

    var canvasSVGContext = new CanvasSVG.Deferred(); 
    canvasSVGContext.wrapCanvas(canvas);
   document.getElementById("captions").appendChild(canvasContext.getSVG());

   // let fileName = prompt("Please enter file name:") + '.jpeg';
    //var MIME_TYPE = "image/jpeg";
    var imgURL = canvas.toDataURL(MIME_TYPE, 1);
    var dlLink = document.createElement('a');
    dlLink.download = fileName;
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
} */
/*
function exportCanvasAsSVG() {

    var ctx = new C2S(canvasReal.width, canvasReal.height); //width, height of your desired svg file
    ctx.getImageData(0, 0, contextReal.width, contextReal.height);
    console.log(ctx);
    //ok lets serialize to SVG:
    var myRectangle = ctx.getSerializedSvg(true);
    console.log(myRectangle);
}
*/
/*
// This example was created using Protovis & jQuery
// Base64 provided by http://www.webtoolkit.info/
function encode_as_img_and_link(){
    // Add some critical information
    $("svg").attr({ version: '1.1' , xmlns:"http://www.w3.org/2000/svg"});
   
    var svg = $("#chart-canvas").html();
    var b64 = Base64.encode(svg);
   
    // Works in recent Webkit(Chrome)
    $("body").append($("<img src='data:image/svg+xml;base64,\n"+b64+"' alt='file.svg'/>"));
   
    // Works in Firefox 3.6 and Webit and possibly any browser which supports the data-uri
    $("body").append($("<a href-lang='image/svg+xml' href='data:image/svg+xml;base64,\n"+b64+"' title='file.svg'>Download</a>"));
   }
   

   */







