class DrawingLine extends PaintFunction {
    constructor(contextReal, contextDraft, canvasReal, canvasDraft) {
        super();
        this.contextReal = contextReal;
        this.canvasReal = canvasReal;
        this.contextDraft = contextDraft;
        this.canvasDraft = canvasDraft;
        this.orig = null;
        this.pathSave = [];
        this.dragPathDiff = [];
        this.doneDrawing = false;
        this.canMove = false;
        this.contextDraft.lineWidth = 5;
        this.contextReal.lineWidth = 5;
    }

    onMouseDown(coord, event) {
        if (!this.doneDrawing) {
            this.orig = coord;
            this.pathSave.push(coord);
        } else if (this.ifOnPath(coord)) {
            this.dragPathDiff = this.pathSave.map(point => {
                return [coord[0] - point[0], coord[1] - point[1]]
            });
            this.canMove = true;
            // console.log(this.ifOnPath(coord));
            // console.log('I am on path ge!')
        }
         
    }

    onDragging(coord, event) { 
        if (!this.doneDrawing) {
            this.pathSave.push(coord);
            this.contextDraft.clearRect(0, 0, this.canvasDraft.width, this.canvasDraft.height);
            this.drawfromPath(this.contextDraft);
        } else if (this.canMove) {
            this.pathSave = this.pathSave.map((point,index) => {
                return [coord[0] - this.dragPathDiff[index][0], coord[1] - this.dragPathDiff[index][1]];
            });
            this.drawfromPath(this.contextDraft);
        }
    }
    // else {
        //     this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
        //     this.contextDraft.putImageData(this.data, coord[0] - this.origX, coord[1] - this.origY);
        // }
        // }
        
        onMouseMove() {}

        onMouseUp(coord) {
            if (!this.doneDrawing) {
                this.doneDrawing = true;
            // } else if (this.canMove) {
            //     this.drawfromPath(this.contextReal);
            //     this.pathSave = [];
            //     this.doneDrawing = false;
            //     this.canMove = false;
            }
        }
            
        onMouseLeave() {
            if (this.canMove) {
                this.drawfromPath(this.contextReal);
                this.pathSave = [];
                this.doneDrawing = false;
                this.canMove = false;
            }
        }
        
        onMouseEnter() { }
        
        drawfromPath(context) {
            this.contextDraft.clearRect(0, 0, this.canvasDraft.width, this.canvasDraft.height);
            this.pathSave.forEach((point, index) => {
                if (index === 0) {
                    context.beginPath();
                    context.moveTo(point[0], point[1]);
                }
                this.draw(context, point[0], point[1]);
            }, this);
        }

        draw(context, x, y) {
            context.lineTo(x, y);
            context.moveTo(x, y);
            context.stroke();
            context.closePath();
        }

        ifOnPath(coord) {
            let onPath = this.pathSave.filter(point =>{
                if (Math.sqrt(Math.pow(coord[0] - point[0], 2)+ Math.pow(coord[1] - point[1], 2)) <= 30) {
                    return point;}
            },this);
            return onPath[0];
        }
    }