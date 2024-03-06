import { Block } from "./Block.js";


class ZBlock extends Block{

    class = 'z-block';

    shape = [
        [[0, 1], [1, 0], [1, 1], [2, 0]],
        [[0, 0], [0, 1], [1, 1], [1, 2]],
    ];

    constructor ( boardSizeX, boardSizeY ) {
        super(boardSizeX, boardSizeY);
        
        this.positionY = -3;
    }

}

export { ZBlock }