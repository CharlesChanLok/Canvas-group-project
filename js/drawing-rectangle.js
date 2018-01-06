class DrawingRectangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.rectWidth = 0;
        this.rectHeight = 0;
        this.doneSizing = false;
        this.canMove = false;
        this.dragOrigDiff;

    }

    onMouseDown(coord, event) {
        if (!this.doneSizing) {
            this.orig = coord;
        } else {
            this.dragOrigDiff = [coord[0] - this.orig[0], coord[1] - this.orig[1]];
            console.log('diff: ' + this.dragOrigDiff);
            console.log('size: ' + [this.rectWidth, this.rectHeight]);
            // console.log(Math.abs(this.dragOrigDiff[0]) <= this.rectWidth / 2 && Math.abs(this.dragOrigDiff[1]) <= this.rectHeight / 2));
            if (this.dragOrigDiff[0] <= this.rectWidth && this.dragOrigDiff[1] <= this.rectHeight) {
                this.canMove = true;      
                // console.log('This can move');
                };
        }
    }

    onDragging(coord, event) {
        if (!this.doneSizing) {
            this.rectWidth = coord[0] - this.orig[0];
            this.rectHeight = coord[1] - this.orig[1];
            this.DrawRect(this.contextDraft, this.orig, this.rectWidth, this. rectHeight)
        } else {    
                // console.log(this.dragOrigDiff);
                if (this.canMove) {
                    this.DrawRect(this.contextDraft, [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]], this.rectWidth, this. rectHeight)
                }
        }
    }
    
    onMouseMove() { }
    onMouseUp(coord) {
        if (!this.doneSizing) {
            this.doneSizing = true;
        } else {
            if (this.canMove) {
                this.DrawRect(this.contextReal, [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]], this.rectWidth, this. rectHeight)
                this.doneSizing = false;
                this.canMove = false;
            }
        }
    }
    onMouseLeave() { }
    onMouseEnter() { }

    DrawRect(context, coord, width, height) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        context.fillRect(coord[0], coord[1], width, height);
    }
}