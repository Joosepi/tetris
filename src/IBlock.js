import { Block } from "./Block.js";


class IBlock extends Block{

    class = 'i-block';

    shape = [
        [[0, 0], [1, 0], [2, 0], [3, 0]],
        [[0, 0], [0, 1], [0, 2], [0, 3]],
    ];

    constructor ( boardSizeX, boardSizeY ) {
        super(boardSizeX, boardSizeY);
        
        this.positionY = -4;
    }

}

export { IBlock }