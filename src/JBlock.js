import { Block } from "./Block.js";


class JBlock extends Block{

    class = 'j-block';

    shape = [
        [[0, 1], [1, 1], [2, 0], [2, 1]],
        [[0, 0], [0, 1], [0, 2], [1, 2]],
        [[0, 0], [0, 1], [1, 0], [2, 0]],
        [[0, 0], [1, 0], [1, 1], [1, 2]],
    ];

    constructor ( boardSizeX, boardSizeY ) {
        super(boardSizeX, boardSizeY);
        
        this.positionY = -3;
    }

}

export { JBlock }