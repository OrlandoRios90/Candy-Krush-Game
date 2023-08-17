
const candies = ["Blue", "Yellow", "Red", "Orange", "Green", "Purple"];
let board = [];
const rows = 9;
const cols = 9;
let score = 0;

let currTile;
let targetTile;

window.onload = () => {
    startGame();

    window.setInterval(function() {
        crushCandy();
    }, 100);
}

const randomCandy = () => {
    return candies[Math.floor(Math.random() * candies.length)];
}


const startGame = () => {

    for (r = 0; r < rows; r++) {
        let row = [];
        for (c = 0; c < cols; c++) {
            //create an <img> tag and assign it an id of its position
            let tile = document.createElement("img"); 
            tile.id = r.toString() + "-" + c.toString();
            tile.src = "./images/" + randomCandy() + ".png";

            //drag functionality
            tile.addEventListener("dragstart", dragStart); //click on a candy, initialize drag process
            tile.addEventListener("dragover", dragOver);  //clicking on candy, moving mouse to drag the candy
            tile.addEventListener("dragenter", dragEnter); //dragging candy onto another candy
            tile.addEventListener("dragleave", dragLeave); //leave candy over another candy
            tile.addEventListener("drop", dragDrop); //dropping a candy over another candy
            tile.addEventListener("dragend", dragEnd); //after drag process completed, we swap candies

            document.getElementById("board").append(tile);

            row.push(tile);
        }
        board.push(row);
    }

}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    //refers to the target tile that was dropped on
    targetTile = this;
}

function dragEnd() {

    //split the id at the dash, return an array of strings
    let currCoords = currTile.id.split("-"); 
    let currRow = parseInt(currCoords[0]);
    let currCol = parseInt(currCoords[1]);
    
    let otherCoords = targetTile.id.split("-");
    let targetRow = parseInt(otherCoords[0]);
    let targetCol = parseInt(otherCoords[1]);

    let moveLeft = targetCol == currCol - 1 && targetRow == currRow;
    let moveRight = targetCol == currCol + 1 && targetRow == currRow;
    let moveUp = targetRow == currRow - 1 && targetCol == currCol;
    let moveDown = targetRow == currRow + 1 && targetCol == currCol;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown;

    

    if (isAdjacent) {
        let currImg = currTile.src;
        let targetImg = targetTile.src;
        currTile.src = targetImg;
        targetTile.src = currImg;
    }
}

function crushCandy () {
    //crushFive(), crushFour, etc...
    crushThree();
}

//function that actually "crushes" the candy and replaces it with blank tile
function replaceWithBlank(candy1,candy2,candy3) {
    if (candy1.src == candy2.src && candy2.src == candy3.src && !candy1.src.includes("blank")) {
        candy1.src = './images/blank.png';
        candy2.src = './images/blank.png';
        candy3.src = './images/blank.png';
    }
}

function crushThree () {
    //check rows for three
    for (let r = 0; r < rows; r ++){
        for (let c = 0; c< cols -2 ; c++) { //cols - 2 to check 2 candies ahead for 3 in a row
            let candy1 = board[r][c];
            let candy2 = board[r][c+1];
            let candy3 = board[r][c+2];
            replaceWithBlank(candy1,candy2,candy3);
        }
        
    }

    for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r+1][c];
            let candy3 = board[r+2][c];
            replaceWithBlank(candy1,candy2,candy3);
        }
        
    }
}