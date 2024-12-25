let boxes = document.querySelectorAll(".box");
let resetButton = document.querySelector("#reset");
let newGameBtn = document.querySelector("#new-game");
let msgContainer = document.querySelector(".msg-container");
let message = document.querySelector("#msg");


//turnO == player1 and turnX == player2
let turnO = true;
let count = 0;

const winningPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
    
};

const gameDraw = () => {
    message.innerText = `Game is a tie, You need to Draw the game.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    newGameBtn.innerText = "Draw Game";
};

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        if(turnO){
            box.innerText = "O";
            box.style.color = "darkred"
            turnO = false;
        }else{
            box.innerText = "X";
            box.style.color = "midnightblue";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});

const disableBoxes = () => {
    for(let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for(let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    message.innerText = `Congratulations, Winner is ${winner}`;
    newGameBtn.innerText = "New Game";
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for(let pattern of winningPatterns) {
        let pos1Value = boxes[pattern[0]].innerText;
        let pos2Value = boxes[pattern[1]].innerText;
        let pos3Value = boxes[pattern[2]].innerText;

        if(pos1Value != "" && pos2Value != "" && pos3Value != "") {
            if(pos1Value === pos2Value && pos2Value === pos3Value) {
                showWinner(pos1Value);
            }
        }
    }
};

newGameBtn.addEventListener("click", resetGame);
resetButton.addEventListener("click", resetGame);