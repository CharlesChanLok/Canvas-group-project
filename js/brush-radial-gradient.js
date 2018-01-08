class BrushRadialGradient extends PaintFunction {
    constructor(contextReal ) {
        super();
        this.context  = contextReal ;
    }

    onMouseDown(coord, event) {
        this.context.beginPath();
    }
        
    onDragging(coord) {
        this.context.beginPath();
        this.context.moveTo(coord[0], coord[1]);
        this.draw(coord[0], coord[1]);
     }
    onMouseMove() { 
    }
    onMouseUp() { }
    onMouseLeave() { }
    onMouseEnter() { }

    draw(x, y) {
        var radgrad = this.context.createRadialGradient(
            x, y, 10, x, y, 20);
        radgrad.addColorStop(0, '#000');
        radgrad.addColorStop(0.5, 'rgba(0,0,0,0.5)');
        radgrad.addColorStop(1, 'rgba(0,0,0,0)');
        this.context.fillStyle = radgrad;
        this.context.fillRect(x - 20, y - 20, 40, 40);
    }

};