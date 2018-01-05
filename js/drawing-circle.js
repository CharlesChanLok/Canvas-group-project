class DrawingCircle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.doneSizing= false;
        this.canMove = false;
        this.dragOrigDiff;
    }

    onMouseDown(coord) {
        if (!this.doneSizing) {
            this.orig = coord;
            console.log('centerPt:' + coord);
        }else {
            this.dragOrigDiff = [coord[0] - this.orig[0], coord[1] - this.orig[1]];
            console.log(this.dragOrigDiff);
            if (Math.sqrt(Math.pow(this.dragOrigDiff[0], 2)
            + Math.pow(this.dragOrigDiff[1], 2)) <= this.radius) {
                this.canMove = true;
            }
        };
    }
    onDragging(coord) {
        if (!this.doneSizing) {
            this.radius = Math.sqrt(Math.pow((this.orig[0] - coord[0]), 2) 
            + Math.pow((this.orig[1] - coord[1]), 2));
            this.drawCircle(this.contextDraft, this.orig, this.radius)
        } else {
            if (this.canMove) {
                    console.log('diff: ' + this.dragOrigDiff);
                    console.log('new CenterPt: ' + [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]]);
                    this.drawCircle(this.contextDraft, [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]], this.radius)
                    // this.orig[0] = coord[0];
                    // this.orig[1] = coord[1];
                }
        }
    }
    onMouseMove() { }
    onMouseUp(coord) {
        if (!this.doneSizing) {
            this.doneSizing = true;
        } else {
            if (this.canMove) {
                this.drawCircle(this.contextReal, coord, this.radius)
                this.radius = 0;
                this.doneSizing = false;
                this.canMove = false;
            }
        }
    }
    onMouseLeave() { }
    onMouseEnter() { }

    drawCircle(context, coord, radius) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        context.beginPath();
        context.arc(coord[0], coord[1], radius, 0, 2 * Math.PI);
        context.fill();
    }
    
}