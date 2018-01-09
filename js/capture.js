class Capture extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
        this.orig = null;
        this.capWidth = null;
        this.capHeight = null;
        this.doneSizing = false;
        this.canMove = false;
        this.dragOrigDiff = null;
        this.imgData = null;
        this.inAreaY = null;
        this.inAreaX = null;
    }
    onMouseDown(coord) {
        if (!this.doneSizing) {
            this.orig = coord;
        } else {
            this.dragOrigDiff = [coord[0] - this.orig[0], coord[1] - this.orig[1]];
            this.inAreaX = inArea(this.capWidth, this.dragOrigDiff[0]);
            this.inAreaY = inArea(this.capHeight, this.dragOrigDiff[1]);
            this.canMove = (this.inAreaX && this.inAreaY);
        }
    }
    onDragging(coord) {
        if (!this.doneSizing) {
            this.capWidth = coord[0] - this.orig[0];
            this.capHeight = coord[1] - this.orig[1];
            this.drawDotRect(this.contextDraft, this.orig, this.capWidth, this.capHeight);
        } else if (this.canMove) {
            this.orig = [coord[0] - this.dragOrigDiff[0], coord[1] - this.dragOrigDiff[1]];
            this.drawDotRect(this.contextDraft, this.orig, this.capWidth, this.capHeight);
            contextDraft.putImageData(this.imgData, this.orig[0], this.orig[1]);
        }
    }
    
    onMouseMove() { }
    
    onMouseUp(coord) {
        if (!this.doneSizing) {
            this.doneSizing = true;
            this.imgData = contextReal.getImageData(this.orig[0], this.orig[1], this.capWidth, this.capHeight);
            let newCanvas = $("<canvas>")
                .attr("width", Math.abs(this.capWidth))
                .attr("height", Math.abs(this.capHeight))[0];
            newCanvas.getContext("2d").putImageData(this.imgData, 0, 0);
            this.contextReal.clearRect(this.orig[0], this.orig[1], this.capWidth, this.capHeight);
            this.contextDraft.drawImage(newCanvas, this.orig[0], this.orig[1]);
        } else if (this.canMove) {
            this.canMove = false;
            this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
            this.contextDraft.putImageData(this.imgData, this.orig[0], this.orig[1]);
        }
    }

    onMouseLeave() { }
    onMouseEnter() { }
    onKeyDown() { }

    drawDotRect(context, coord, width, height) {
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        context.beginPath();
        context.setLineDash([5]);
        context.rect(coord[0], coord[1], width, height);
        context.stroke();
        context.setLineDash([]);
    }
}

