import { Block } from "./Block.js";

class OBlock extends Block{

    class = 'o-block';

    shape = [
        [
            [0, 0],
            [0, 1],
            [1, 0],
            [1, 1],
        ]
    ];

    constructor ( boardSizeX, boardSizeY ) {
        super(boardSizeX, boardSizeY);
        
        this.positionY = -2;
    }
}

export { OBlock }