import { OBlock } from "./OBlock.js";
import { LBlock } from "./LBlock.js";
import { JBlock } from "./JBlock.js";
import { IBlock } from "./IBlock.js";
import { SBlock } from "./SBlock.js";
import { ZBlock } from "./ZBlock.js";
import { TBlock } from "./TBlock.js";

class GameBoard {
    allBlocks = [OBlock, LBlock, JBlock, IBlock, SBlock, ZBlock, TBlock];

    state = [];
    gameBoardTable = document.getElementById('gameboard');
    nextBoardTable = document.getElementById('next-block');
    boardSizeX;
    boardSizeY;
    currentBlock;
    nextBlock;
    intervalId;
    score = 0;

    constructor(boardSizeX, boardSizeY) {
        this.boardSizeX = boardSizeX;
        this.boardSizeY = boardSizeY;

        for (let y = 0; y < this.boardSizeY; y++) {
            let arr = [];
            for (let x = 0; x < this.boardSizeX; x++) {
                arr.push('');
            }
            this.state.push(arr);
        }

        console.log(this.state);

        document.addEventListener('keydown', e => {
            switch (e.key) {
                case 'ArrowUp':
                    this.currentBlock.nextPose();
                    this.draw();
                    break;
                case 'ArrowDown':
                    if (this.currentBlock.canGoDown(this.state)) {
                        this.currentBlock.moveDown();
                        this.draw();
                    }
                    break;
                case 'ArrowLeft':
                    if (this.currentBlock.canGoLeft(this.state)) {
                        this.currentBlock.moveLeft();
                        this.draw();
                    }
                    break;
                case 'ArrowRight':
                    if (this.currentBlock.canGoRight(this.state)) {
                        this.currentBlock.moveRight();
                        this.draw();
                    }
                    break;
                case 'p': // Pause game when 'p' key is pressed
                    this.pauseGame();
                    break;
                case 'r': // Resume game when 'r' key is pressed
                    this.resumeGame();
                    break;
            }
        });

        this.startGame();
    }

    startGame() {
        this.addNewBlock();
        this.draw();
        this.intervalId = setInterval(() => {
            if (this.currentBlock.canGoDown(this.state)) {
                this.currentBlock.moveDown();
                this.draw();
            } else {
                this.addBlockToState(this.currentBlock);
                this.checkRows();
                this.score += 10; // Increase score when a block is placed
                this.addNewBlock();
                this.draw();
                this.updateScore(); // Update score display
            }
        }, 860); // Adjust the speed of block falling
    }

    pauseGame() {
        clearInterval(this.intervalId);
    }

    resumeGame() {
        this.startGame();
    }

    updateScore() {
        document.getElementById('score').innerText = 'Score: ' + this.score;
    }

    draw() {
        this.gameBoardTable.innerHTML = '';

        for (let y = 0; y < this.boardSizeY; y++) {
            const boardRowTr = document.createElement('tr');
            for (let x = 0; x < this.boardSizeX; x++) {
                const boardCellTd = document.createElement('td');
                const id = y + '_' + x;
                boardCellTd.setAttribute('id', id);

                // draw block
                if (this.currentBlock.isOverlapingCell(id)) {
                    boardCellTd.classList.add(this.currentBlock.class);
                }

                // draw colors
                if (this.state[y][x] != '') {
                    boardCellTd.classList.add(this.state[y][x]);
                }

                boardRowTr.append(boardCellTd);
            }
            this.gameBoardTable.append(boardRowTr);
        }
    }

    addNextBlock() {
        this.nextBoardTable.innerHTML = '';

        const width = this.nextBlock.calculateWidth();
        const height = this.nextBlock.calculateHeight();

        for (let y = 0; y < height; y++) {
            const boardRowTr = document.createElement('tr');
            for (let x = 0; x < width; x++) {
                const boardCellTd = document.createElement('td');

                this.nextBlock.shape[0].forEach(el => {
                    if (el[0] == y && el[1] == x) {
                        boardCellTd.classList.add(this.nextBlock.class);
                    }
                });

                boardRowTr.append(boardCellTd);
            }

            this.nextBoardTable.append(boardRowTr);
        }
    }

    getState() {
        return this.state;
    }

    getCurrentBlock() {
        return this.currentBlock;
    }

    addNewBlock() {
        if (this.nextBlock == undefined) {
            const i = Math.floor(Math.random() * 7);
            this.currentBlock = new this.allBlocks[i](this.boardSizeX, this.boardSizeY);
        } else {
            this.currentBlock = this.nextBlock;
        }

        const i = Math.floor(Math.random() * 7);
        this.nextBlock = new this.allBlocks[i](this.boardSizeX, this.boardSizeY);
    }

    addBlockToState(block) {
        const coordinates = block.getCoordinates();
        coordinates.forEach(el => {
            this.state[el[0]][el[1]] = block.class;
        });
    }

    checkRows() {
        for (let i = 0; i < this.boardSizeY; i++) {
            const row = this.state[i];
            const c = row.filter(cell => cell == '').length;

            if (c == 0) {
                this.state.splice(i, 1);
                this.state.unshift(new Array(this.boardSizeX).fill(''));
            }
        }
    }
}

export { GameBoard };
