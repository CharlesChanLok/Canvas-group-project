class DrawingCircle extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.doneSizing= false;
        this.canMove = false;
    }

    onMouseDown(coord) {
        if (!this.doneSizing) {
            this.origX = coord[0];
            this.origY = coord[1];
        }else {
            if (Math.sqrt(Math.pow((this.origX - coord[0]), 2)
                + Math.pow((this.origY - coord[1]), 2)) <= 40) {
                this.canMove = true;
            }
        };
    }
    onDragging(coord) {
        if (!this.doneSizing) {
            this.radius = Math.sqrt(Math.pow((this.origX - coord[0]), 2) 
                + Math.pow((this.origY - coord[1]), 2));
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.beginPath();
            this.contextDraft.arc(this.origX, this.origY, this.radius , 0, 2 * Math.PI);
            this.contextDraft.fill();
        } else {
            if (this.canMove) {
                    this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
                    this.contextDraft.beginPath();
                    this.contextDraft.arc(coord[0], coord[1], this.radius, 0, 2 * Math.PI);
                    this.contextDraft.fill();
                    this.origX = coord[0];
                    this.origY = coord[1];
                }
        }
    }

    onMouseMove() { }
    onMouseUp(coord) {
        if (!this.doneSizing) {
            this.doneSizing = true;
        } else {
            if (this.canMove) {
                this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
                this.contextReal.beginPath();
                this.contextReal.arc(coord[0], coord[1], this.radius, 0, 2 * Math.PI);
                this.contextReal.fill();
                this.radius = 0;
                this.doneSizing = false;
                this.canMove = false;
            }
        }
    }
    onMouseLeave() { }
    onMouseEnter() { }
}