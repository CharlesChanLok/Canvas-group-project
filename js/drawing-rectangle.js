class DrawingRectangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.Rectangle = null;
        this.rectWidth = 0;
        this.rectHeight = 0;
        this.controlPointArray = [];
        this.onControlPt = null;
        this.resizeMode = null;
        this.dragging = false;
        this.doneSizing = false;
        this.canMove = false;
        this.dragOrigDiff = null;
    }

    onMouseDown(coord, event) {
        if (!this.doneSizing) {
            this.orig = coord;
        } else if (this.onControlPt == this.controlPointArray[6]) {
            this.resizeMode = 'right';
        } else if (this.onControlPt == this.controlPointArray[1]) {
            this.resizeMode = 'left';
            this.orig[0] += this.rectWidth;
        } else if (this.onControlPt == this.controlPointArray[3]) {
            this.resizeMode = 'top';
            this.orig[1] += this.rectHeight;
        } else if (this.onControlPt == this.controlPointArray[4]) {
            this.resizeMode = 'bottom';
        } else if (this.onControlPt == this.controlPointArray[0]) {
            this.resizeMode = 'top-left';
            this.orig[0] += this.rectWidth;
            this.orig[1] += this.rectHeight;
        } else if (this.onControlPt == this.controlPointArray[2]) {
            this.resizeMode = 'bottom-left';
            this.orig[0] += this.rectWidth;
        } else if (this.onControlPt == this.controlPointArray[5]) {
            this.resizeMode = 'top-right';
            this.orig[1] += this.rectHeight;
        } else if (this.onControlPt == this.controlPointArray[7]) {
            this.resizeMode = 'bottom-right';
        } else {
            this.dragOrigDiff = [coord[0] - this.orig[0], coord[1] - this.orig[1]];
            this.resizeMode = null;
            // console.log('diff: ' + this.dragOrigDiff);
            // console.log('size: ' + [this.rectWidth, this.rectHeight]);
            if (this.dragOrigDiff[0] <= this.rectWidth && this.dragOrigDiff[0] >= 0 && this.dragOrigDiff[1] <= this.rectHeight && this.dragOrigDiff[1] >= 0) {
                this.canMove = true;      
                };
        }
    }

    onDragging(coord, event) {
        this.dragging = true; // new
        console.log(this.onControlPt);
        console.log(this.doneSizing);
        if (!this.doneSizing) {
            // this.doneSizing = false; // new
            this.rectWidth = coord[0] - this.orig[0];
            this.rectHeight = coord[1] - this.orig[1];
            this.drawRect(this.contextDraft, this.orig, this.rectWidth, this. rectHeight)
            this.controlPointArray = [];
            this.drawControlPt();
        } else if (this.resizeMode === 'right' || this.resizeMode === 'left') {
            this.rectWidth = coord[0] - this.orig[0];
            this.drawRect(this.contextDraft, this.orig, this.rectWidth, this.rectHeight)
            this.controlPointArray = [];
            this.drawControlPt();
        } else if (this.resizeMode === 'top' || this.resizeMode === 'bottom') {
            this.rectHeight = coord[1] - this.orig[1];
            this.drawRect(this.contextDraft, this.orig, this.rectWidth, this.rectHeight)
            this.controlPointArray = [];
            this.drawControlPt();
        } else if (this.resizeMode === 'top-right' || this.resizeMode === 'top-left' || this.resizeMode === 'bottom-right' || this.resizeMode === 'bottom-left') {
            this.rectWidth = coord[0] - this.orig[0];
            this.rectHeight = coord[1] - this.orig[1];
            this.drawRect(this.contextDraft, this.orig, this.rectWidth, this.rectHeight)
            this.controlPointArray = [];
            this.drawControlPt();
        } else if (this.canMove) {
                    this.orig = [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]];
                    this.drawRect(this.contextDraft, this.orig, this.rectWidth, this. rectHeight)
                    this.controlPointArray = [];
                    this.drawControlPt();
                }
    }
    
    onMouseMove(coord) { 
        // if (this.controlPointArray.length !== 0 && this.dragging != true) {   // new
        if (this.controlPointArray.length !== 0) {
            this.onControlPt = this.ifOnPath(this.controlPointArray, coord);
            console.log(this.onControlPt);
        }
    }

    onMouseUp(coord) {
        this.dragging = false;   // new
        if (!this.doneSizing) {
            this.doneSizing = true;
            this.drawControlPt();
        } else {
            if (this.canMove) {
                // this.drawRect(this.contextReal, this.orig, this.rectWidth, this. rectHeight)
                // contextControl.clearRect(0, 0, canvasControl.width, canvasControl.height);
                // this.controlPointArray = [];
                // this.doneSizing = false;
                // this.canMove = false;
            }
        }
    }
    onMouseLeave(coord) {
        if (this.doneSizing) {
            this.drawRect(this.contextReal, this.orig, this.rectWidth, this.rectHeight)
            contextControl.clearRect(0, 0, canvasControl.width, canvasControl.height);
            this.controlPointArray = [];
            this.doneSizing = false;
            this.canMove = false;
        }
     }
    onMouseEnter(coord) {
     }

    drawRect(context, coord, width, height) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        context.fillRect(coord[0], coord[1], width, height);
    }
    
    drawControlPt() {
        contextControl.clearRect(0, 0, canvasControl.width, canvasControl.height);
        this.controlPointArray.push([this.orig[0], this.orig[1]]);
        this.controlPointArray.push([this.orig[0], this.orig[1] + this.rectHeight / 2]);
        this.controlPointArray.push([this.orig[0], this.orig[1] + this.rectHeight]);
        this.controlPointArray.push([this.orig[0] + this.rectWidth / 2, this.orig[1]]);
        this.controlPointArray.push([this.orig[0] + this.rectWidth / 2, this.orig[1] + this.rectHeight]);
        this.controlPointArray.push([this.orig[0] + this.rectWidth, this.orig[1]]);
        this.controlPointArray.push([this.orig[0] + this.rectWidth, this.orig[1] + this.rectHeight / 2]);
        this.controlPointArray.push([this.orig[0] + this.rectWidth, this.orig[1] + this.rectHeight]);
        this.controlPointArray.forEach(controlPt => {
            this.drawCircle(contextControl, controlPt);
        },this);
    }

    drawCircle(context, coord) {
        context.beginPath();
        context.arc(coord[0], coord[1], 10, 0, 2 * Math.PI);
        context.fill();
    }

    ifOnPath(path, coord) {    //This is borrowed from the draw line function
        let onPath = path.filter(point => {
            if (Math.sqrt(Math.pow(coord[0] - point[0], 2) + Math.pow(coord[1] - point[1], 2)) <= 30) {
                return point;
            }
        }, this);
        return onPath[0];
    } 
}