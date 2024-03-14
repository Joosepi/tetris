import { GameBoard } from "./src/GameBoard.js";

// const messageDiv = document.getElementById('message');
// const scoreDiv = document.getElementById('score');
// const resetBtn = document.getElementById('reset');

let timeoutID, speed;

const boardSizeX = 14;
const boardSizeY = 16;

function initGame () {

    clearTimeout(timeoutID);
    timeoutID = null;

    // score = 0;
    speed = 500;

    // messageDiv.innerText = '';
    // messageDiv.classList.add('hidden');

    const gameBoard = new GameBoard(boardSizeX, boardSizeY);
    gameBoard.addNewBlock();
    gameBoard.draw();

    (function repeat() {
        timeoutID = setTimeout(repeat, speed);
        const currentBlock = gameBoard.getCurrentBlock();
        if ( currentBlock.canGoDown(gameBoard.getState()) ) {
            currentBlock.moveDown();
        } else {
            if ( !currentBlock.getIsStopped() ) {
                gameBoard.addBlockToState(currentBlock);
                currentBlock.stop();
                gameBoard.checkRows();
                gameBoard.addNewBlock();
                gameBoard.addNextBlock();
            }
        }
        gameBoard.draw();
    })();

    // addFood();
    // updateHighScore();
    
}

initGame();