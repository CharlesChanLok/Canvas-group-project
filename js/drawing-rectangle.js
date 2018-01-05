class DrawingRectangle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.doneSizing = false;
        this.canMove = false;

    }

    onMouseDown(coord, event) {
        if (!this.doneSizing) {
            this.orig = coord;
        } else {
            if(Math.sqrt(Math.pow((this.orig[0] - coord[0]), 2)
                + Math.pow((this.orig[1] - coord[1]), 2)) <= 200) {
                this.canMove = true;      
            }
        }
    }

    onDragging(coord, event) {
        if (!this.doneSizing) {
            this.rectWidth = coord[0] - this.orig[0];
            this.rectheight = coord[1] - this.orig[1];
            this.DrawRect(this.contextDraft, this.orig, this.rectWidth, this. rectheight)
        } else {    
                if (this.canMove) {
                    this.DrawRect(this.contextDraft, coord, this.rectWidth, this. rectheight)
                    this.orig[0] = coord[0];
                    this.orig[1] = coord[1];
                }
        }
    }
    
    onMouseMove() { }
    onMouseUp(coord) {
        if (!this.doneSizing) {
            this.doneSizing = true;
        } else {
            if (this.canMove) {
                console.log(coord);
                this.DrawRect(this.contextReal, coord, this.rectWidth, this. rectheight)
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