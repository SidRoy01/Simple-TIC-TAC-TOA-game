let boxes = document.querySelectorAll(".box");
let resetBtnr = document.querySelector(".reset");
let newBtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#winner");

let turnO = true;
let count = 0;

const winnPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      //playerO
      box.innerText = "O";
      box.style.color = "black";
      turnO = false;
    } else {
      //playerX
      box.innerText = "X";
      box.style.color = "red";
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

const gameDraw = () => {
  msg.innerText = "OOPS! The Game is a Draw";
  msgContainer.classList.remove("hide");
  resetBtnr.classList.add("hide");
  disableBtn();
};

const resetGame = () => {
  turnO = true;
  count = 0;
  enableBtn();
  msgContainer.classList.add("hide");
  resetBtnr.classList.remove("hide");
};

const disableBtn = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBtn = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations The Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  resetBtnr.classList.add("hide");
  disableBtn();
};

const checkWinner = () => {
  for (let pattern of winnPattern) {
    let pos1 = boxes[pattern[0]].innerText;
    let pos2 = boxes[pattern[1]].innerText;
    let pos3 = boxes[pattern[2]].innerText;

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        showWinner(pos1);
        // return true;
      }
    }
  }
};

newBtn.addEventListener("click", resetGame);
resetBtnr.addEventListener("click", resetGame);
