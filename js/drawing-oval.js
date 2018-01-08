class DrawingOval extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.radiusX = 0;
        this.radiusY = 0;
        this.orig = 0;
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
            // console.log('centerPt:' + coord);
        } else if (this.onControlPt == this.controlPointArray[6]) {
            this.resizeMode = 'right';
        } else if (this.onControlPt == this.controlPointArray[1]) {
            this.resizeMode = 'left';
        } else if (this.onControlPt == this.controlPointArray[3]) {
            this.resizeMode = 'top';
        } else if (this.onControlPt == this.controlPointArray[4]) {
            this.resizeMode = 'bottom';
        } else if (this.onControlPt == this.controlPointArray[0]) {
            this.resizeMode = 'top-left';
        } else if (this.onControlPt == this.controlPointArray[2]) {
            this.resizeMode = 'bottom-left';
        } else if (this.onControlPt == this.controlPointArray[5]) {
            this.resizeMode = 'top-right';
        } else if (this.onControlPt == this.controlPointArray[7]) {
            this.resizeMode = 'bottom-right';
        } else {
            this.resizeMode = null;
            this.dragOrigDiff = [coord[0] - this.orig[0], coord[1] - this.orig[1]];
            // console.log(this.dragOrigDiff);
            // console.log(Math.abs(this.dragOrigDiff[0]) <= this.radiusX && Math.abs(this.dragOrigDiff[1]) <= this.radiusY);
            if (Math.abs(this.dragOrigDiff[0]) <= this.radiusX && Math.abs(this.dragOrigDiff[1]) <= this.radiusY) {
                this.canMove = true;
            };
        };
    }
    
    onDragging(coord, event) {
        if (!this.doneSizing) {
            this.radiusX = Math.abs((this.orig[0] - coord[0]));
            this.radiusY = Math.abs((this.orig[1] - coord[1]));
            // console.log(this.radiusX);
            // console.log(this.radiusY);
            this.drawOval(this.contextDraft, this.orig, this.radiusX, this.radiusY);
            this.controlPointArray = [];
            drawControlPt(this.controlPointArray, [this.orig[0] - this.radiusX, this.orig[1] - this.radiusY], this.radiusX * 2, this.radiusY * 2);
        } else if (this.resizeMode === 'right' || this.resizeMode === 'left') {
            this.radiusX = Math.abs(coord[0] - this.orig[0]);
            this.drawOval(this.contextDraft, this.orig, this.radiusX, this.radiusY);
            this.controlPointArray = [];
            drawControlPt(this.controlPointArray, [this.orig[0] - this.radiusX, this.orig[1] - this.radiusY], this.radiusX * 2, this.radiusY * 2);
        } else if (this.resizeMode === 'top' || this.resizeMode === 'bottom') {
            this.radiusY = Math.abs(coord[1] - this.orig[1]);
            this.drawOval(this.contextDraft, this.orig, this.radiusX, this.radiusY);
            this.controlPointArray = [];
            drawControlPt(this.controlPointArray, [this.orig[0] - this.radiusX, this.orig[1] - this.radiusY], this.radiusX * 2, this.radiusY * 2);
        } else if (this.resizeMode === 'top-right' || this.resizeMode === 'top-left' || this.resizeMode === 'bottom-right' || this.resizeMode === 'bottom-left') {
            this.radiusX = Math.abs(coord[0] - this.orig[0]);
            this.radiusY = Math.abs(coord[1] - this.orig[1]);
            this.drawOval(this.contextDraft, this.orig, this.radiusX, this.radiusY);
            this.controlPointArray = [];
            drawControlPt(this.controlPointArray, [this.orig[0] - this.radiusX, this.orig[1] - this.radiusY], this.radiusX * 2, this.radiusY * 2);
        } else {
            if (this.canMove) {
                this.orig = [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]];
                this.drawOval(this.contextDraft, this.orig, this.radiusX, this.radiusY);
                this.controlPointArray = [];
                drawControlPt(this.controlPointArray, [this.orig[0] - this.radiusX, this.orig[1] - this.radiusY], this.radiusX * 2, this.radiusY * 2);
            }
        }
    }

    onMouseMove(coord) {
        if (this.controlPointArray.length !== 0) {
            this.onControlPt = ifOnPath(this.controlPointArray, coord);
            console.log(this.onControlPt);
        } else if(this.doneSizing) {
            this.drawOval(this.context, this.orig, this.radiusX, this.radiusY);
        }
    }
    onMouseUp(coord) {
        if (!this.doneSizing) {
            this.doneSizing = true;
        } else {
            if (this.canMove) {
                this.drawOval(this.context, this.orig, this.radiusX, this.radiusY);
                this.radiusX = 0;
                this.radiusY = 0;
                this.doneSizing = false;
                this.canMove = false;
            }
        }
    }

    onMouseLeave() { }
    onMouseEnter() { }

    drawOval(context, coord, radiusX, radiusY) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        context.beginPath();
        context.ellipse(coord[0], coord[1], radiusX, radiusY, 0, 0, 2 * Math.PI);
        context.fill();
    }
}