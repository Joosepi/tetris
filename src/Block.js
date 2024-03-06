class Block {

    boardSizeX;
    boardSizeY;
    
    positionY;
    positionX;

    isStopped = false;

    pose = 0

    constructor ( boardSizeX, boardSizeY ) {
        this.boardSizeX = boardSizeX;
        this.boardSizeY = boardSizeY;
        
        this.positionX = Math.floor(this.boardSizeX / 2) - 1;
    }

    isOverlapingCell ( id ) {
        let res = false;

        this.shape[this.pose].forEach( el => {
            if ( id == (el[0] + this.positionY) + '_' + (el[1] + this.positionX) ) {
                res = true;
            }
        });

        return res;
    }

    getCoordinates () {
        return this.shape[this.pose].map( cell => {
            return [cell[0] + this.positionY, cell[1] + this.positionX];
        });
    }

    canGoDown ( state ) {

        let res = true;

        if ( (this.positionY + this.calculateHeight()) >= this.boardSizeY ) {
            return false;
        }

        const coordinates = this.getCoordinates();
        coordinates.forEach( el => {
            const newY = el[0]+1;
            const newX = el[1];
            if ( newY >= 0 && newY < this.boardSizeY ) {
                if ( state[newY][newX] != '' ) {
                    res = false;
                    return false;
                }
            }
        });

        return res;

    }

    canGoLeft ( state ) {

        let res = true;

        if ( this.positionX <= 0 ) {
            return false;
        }

        const coordinates = this.getCoordinates();
        coordinates.forEach( el => {
            const newY = el[0];
            const newX = el[1]-1;
            if ( newY >= 0 && newX >= 0 && newY < this.boardSizeY && newX < this.boardSizeX ) {
                if ( state[newY][newX] != '' ) {
                    res = false;
                    return false;
                }
            }
        });

        return res;

    }

    canGoRight ( state ) {

        let res = true;

        if ( this.positionX >= (this.boardSizeX - this.calculateWidth()) ) {
            return false;
        }

        const coordinates = this.getCoordinates();
        coordinates.forEach( el => {
            const newY = el[0];
            const newX = el[1]+1;
            if ( newY >= 0 && newX >= 0 && newY < this.boardSizeY && newX < this.boardSizeX ) {
                if ( state[newY][newX] != '' ) {
                    res = false;
                    return false;
                }
            }
        });

        return res;

    }

    calculateHeight () {
        const currentShape = this.shape[this.pose];
        let height = 0;

        currentShape.forEach( el => {
            height = Math.max(height, el[0]);
        });

        return height + 1;
    }

    calculateWidth () {
        const currentShape = this.shape[this.pose];
        let width = 0;

        currentShape.forEach( el => {
            width = Math.max(width, el[1]);
        });

        return width + 1;
    }

    getIsStopped () {
        return this.isStopped;
    }

    stop () {
        this.isStopped = true;
    }

    moveDown () {
        this.positionY++;
    }

    moveLeft () {
        this.positionX--;
    }

    moveRight () {
        this.positionX++;
    }

    nextPose () {
        this.pose = (this.pose + 1) % this.shape.length;
    }

}

export { Block }