class DrawingRectangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.rectWidth = 0;
        this.rectHeight = 0;
        this.controlPointArray = [];
        this.onControlPt = null;
        this.resizeMode = null;
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
            if (this.rectWidth < 0 && this.rectHeight < 0) {
                if (this.dragOrigDiff[0] >= this.rectWidth && this.dragOrigDiff[1] >= this.rectHeight && this.dragOrigDiff[0] <= 0 && this.dragOrigDiff[1] <= 0) {
                    this.canMove = true;
                }      
            } else if (this.rectWidth > 0 && this.rectHeight > 0) {
                if (this.dragOrigDiff[0] <= this.rectWidth && this.dragOrigDiff[1] <= this.rectHeight && this.dragOrigDiff[0] >= 0 && this.dragOrigDiff[1] >= 0) {
                    this.canMove = true;      
                }
            } else if (this.rectWidth < 0 && this.rectHeight > 0) {
                if (this.dragOrigDiff[0] >= this.rectWidth && this.dragOrigDiff[1] <= this.rectHeight && this.dragOrigDiff[0] <= 0 && this.dragOrigDiff[1] >= 0) {
                    this.canMove = true;      
                }
            } else if (this.rectWidth < 0 && this.rectHeight > 0) {
                if (this.dragOrigDiff[0] <= this.rectWidth && this.dragOrigDiff[1] >= this.rectHeight && this.dragOrigDiff[0] >= 0 && this.dragOrigDiff[1] <= 0) {
                    this.canMove = true;      
                }
            }
        }
    }

    onDragging(coord, event) {
        // console.log(this.onControlPt);
        // console.log(this.doneSizing);
        if (!this.doneSizing) {
            // this.doneSizing = false; // new
            this.rectWidth = coord[0] - this.orig[0];
            this.rectHeight = coord[1] - this.orig[1];
            this.controlPointArray = [];
            this.drawRect(this.contextDraft, this.orig, this.rectWidth, this. rectHeight)
        } else if (this.resizeMode === 'right' || this.resizeMode === 'left') {
            this.rectWidth = coord[0] - this.orig[0];
            this.controlPointArray = [];
            this.drawRect(this.contextDraft, this.orig, this.rectWidth, this.rectHeight)
        } else if (this.resizeMode === 'top' || this.resizeMode === 'bottom') {
            this.rectHeight = coord[1] - this.orig[1];
            this.controlPointArray = [];
            this.drawRect(this.contextDraft, this.orig, this.rectWidth, this.rectHeight)
        } else if (this.resizeMode === 'top-right' || this.resizeMode === 'top-left' || this.resizeMode === 'bottom-right' || this.resizeMode === 'bottom-left') {
            this.rectWidth = coord[0] - this.orig[0];
            this.rectHeight = coord[1] - this.orig[1];
            this.controlPointArray = [];
            this.drawRect(this.contextDraft, this.orig, this.rectWidth, this.rectHeight)
        } else if (this.canMove) {
                    this.orig = [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]];
                    this.controlPointArray = [];
                    this.drawRect(this.contextDraft, this.orig, this.rectWidth, this.rectHeight);
                }
    }
    
    onMouseMove(coord) { 
        if (this.controlPointArray.length !== 0) {
            this.onControlPt = ifOnPath(this.controlPointArray, coord);
            // console.log(this.onControlPt);
        }
    }

    onMouseUp(coord) {
        if (!this.doneSizing) {
            this.doneSizing = true;
            drawControlPt(this.controlPointArray, this.orig, this.rectWidth, this.rectHeight);
        } else if (this.canMove) {
            this.canMove = false;
                // this.drawRect(this.contextReal, this.orig, this.rectWidth, this. rectHeight)
                // canvasControl.clearRect(0, 0, canvasControl.width, canvasControl.height);
                // this.controlPointArray = [];
                // this.doneSizing = false;
                // this.canMove = false;
        }
    }

    onMouseLeave(coord) {
        if (this.doneSizing) {
            this.drawRect(this.contextReal, this.orig, this.rectWidth, this.rectHeight)
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
        if (context != this.contextReal) {
            drawControlPt(this.controlPointArray, this.orig, this.rectWidth, this.rectHeight);
        }
    }
    
}