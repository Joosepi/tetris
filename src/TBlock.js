import { Block } from "./Block.js";


class TBlock extends Block{

    class = 't-block';

    shape = [
        [[0, 0], [1, 0], [1, 1], [2, 0]],
        [[0, 1], [1, 0], [1, 1], [1, 2]],
        [[0, 1], [1, 0], [1, 1], [2, 1]],
        [[0, 0], [0, 1], [0, 2], [1, 1]],
    ];

    constructor ( boardSizeX, boardSizeY ) {
        super(boardSizeX, boardSizeY);
        
        this.positionY = -3;
    }

}

export { TBlock }