class DrawingOval extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.radiusX = 0;
        this.radiusY = 0;
        this.orig = 0;
        this.doneSizing = false;
        this.canMove = false;
        this.dragOrigDiff = 0;

    }

    onMouseDown(coord, event) {
        if (!this.doneSizing) {
            this.orig = coord;
            // console.log('centerPt:' + coord);
        } else {
            this.dragOrigDiff = [coord[0] - this.orig[0], coord[1] - this.orig[1]];
            console.log(this.dragOrigDiff);
            console.log(Math.abs(this.dragOrigDiff[0]) <= this.radiusX && Math.abs(this.dragOrigDiff[1]) <= this.radiusY);
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
        } 
        else {
            if (this.canMove) {
                this.drawOval(this.contextDraft, [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]], this.radiusX, this.radiusY);
            }
        }
    }

    onMouseMove() { }
    onMouseUp(coord) {
        if (!this.doneSizing) {
            this.doneSizing = true;
        } else {
            if (this.canMove) {
                this.drawOval(this.contextReal, [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]], this.radiusX, this.radiusY);
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