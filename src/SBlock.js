import { Block } from "./Block.js";


class SBlock extends Block{

    class = 's-block';

    shape = [
        [[0, 0], [1, 0], [1, 1], [2, 1]],
        [[0, 1], [0, 2], [1, 0], [1, 1]],
    ];

    constructor ( boardSizeX, boardSizeY ) {
        super(boardSizeX, boardSizeY);
        
        this.positionY = -3;
    }

}

export { SBlock }