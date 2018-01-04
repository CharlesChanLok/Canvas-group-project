class ColorBucket extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
    }

    onMouseDown(coord, event) {
        this.contextReal.fillStyle = "#f44";
        this.contextReal.fill();
    }