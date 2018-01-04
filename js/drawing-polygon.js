class DrawingPolygon extends PaintFunction {
    constructor(contextReal, contextDraft) {
        super();
        this.contextReal = contextReal;
        this.contextDraft = contextDraft;
    }

    onMouseDown(coord, event) {
        this.origX = coord[0];
        this.origY = coord[1];
    }
    onDragging(coord, event) {
        var sides = 5;
        var angle =108;
        var coordinates = [],
        radius = Math.sqrt(Math.pow((this.origX - coord[0]), 2) + Math.pow((this.origY - coord[1]), 2)),
        index = 0;

    for (index = 0; index < sides; index++) {
        coordinates.push({x: this.origX + radius * Math.cos(angle), y: this.origY - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    this.contextDraft.beginPath();
    this.contextDraft.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        this.contextDraft.lineTo(coordinates[index].x, coordinates[index].y);
    }

        this.contextDraft.closePath();
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);

        this.contextDraft.fill();
    }

    onMouseMove() { }
    onMouseUp(coord) {
        var sides = 5;
        var angle = 108;
        var coordinates = [],
        radius = Math.sqrt(Math.pow((this.origX - coord[0]), 2) + Math.pow((this.origY - coord[1]), 2)),
        index = 0;
        

    for (index = 0; index < sides; index++) {
        coordinates.push({x: this.origX + radius * Math.cos(angle), y: this.origY - radius * Math.sin(angle)});
        angle += (2 * Math.PI) / sides;
    }

    this.contextReal.beginPath();
    this.contextReal.moveTo(coordinates[0].x, coordinates[0].y);
    for (index = 1; index < sides; index++) {
        this.contextReal.lineTo(coordinates[index].x, coordinates[index].y);
    }

    this.contextReal.closePath();
        this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);

        this.contextReal.fill();
    }
    onMouseLeave() { }
    onMouseEnter() { }
}