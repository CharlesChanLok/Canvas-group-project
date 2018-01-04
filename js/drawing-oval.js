class DrawingOval extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord, event) {
        this.contextReal.fillStyle = "#f44";
        this.origX = coord[0];
        this.origY = coord[1];
    }
    
    onDragging(coord, event) {
        let radiusX = Math.abs((this.origX - coord[0]));
        let radiusY = Math.abs((this.origY - coord[1]));
        this.contextDraft.fillStyle = "#f44";
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextDraft.beginPath();
        this.contextDraft.ellipse(this.origX, this.origY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        this.contextDraft.fill();
    }

    onMouseMove() { }
    onMouseUp(coord) {
        let radiusX = Math.abs((this.origX - coord[0]));
        let radiusY = Math.abs((this.origY - coord[1]));
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        this.contextReal.beginPath();
        this.contextReal.ellipse(this.origX, this.origY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        this.contextReal.fill();
    }
    onMouseLeave() { }
    onMouseEnter() { }
}