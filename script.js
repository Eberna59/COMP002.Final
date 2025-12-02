const squares = [...document.querySelectorAll(".game-square")];
const turnEl = document.getElementById("turn");
const againBtn = document.getElementById("button-play-again");
const scoreXEl = document.getElementById("scoreboard-X");
const scoreOEl = document.getElementById("scoreboard-O");

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

let scoreX = Number(localStorage.getItem("scoreX")) || 0;
let scoreO = Number(localStorage.getItem("scoreO")) || 0;
scoreXEl.textContent = scoreX;
scoreOEl.textContent = scoreO;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

let board = Array(9).fill(null);
let player = "X";
let active = true;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

const WINS = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function updateTurn() {
    turnEl.textContent = `current Turn: ${player}`;
}
updateTurn();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getResult() {
    for (let line of WINS) {
        let [a, b, c] = line;
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            return { winner: board[a], line}
        }
    }
    if (board.every(s=> s !== null)) return { tie: true};
    return null;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function move(i) {
    if (!active || board[i]) return;
    
    board[i] = player;
    squares[i].textContent = player;

    let result = getResult();

    if (result?.winner) {
        turnEl.textContent = `${result.winner} wins`;
        Highlight(result.line);
        finish(result.winner);
        return;
    }

    if (result?.tie) {
        turnEl.textContent = "Its a tie";
        active = false;
        return;
    }

    player = player === "X" ? "O" : "X";
    updateTurn();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function Highlight(line) {
    for (let i of line) squares[i].classList.add("winner");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function finish(winner) {
    active = false;
    if (winner === "X") {
        scoreX++;
        localStorage.setItem("scoreX", scoreX);
        scoreXEl.textContent = scoreX;
    } else{
        scoreO++;
        localStorage.setItem("scoreO", scoreO);
        scoreOEl.textContent = scoreO;
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function reset().{
    board = Array(9).fill(null);
    squares.forEach(s => {
        s.textContent = "";
        s.classList.remove("winner");
    });
    player = "X";
    active = true;
    updateTurn();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////

squares.forEach((sq, i) => sq.addEventListener("click", () => move(i)));
againBtn.addEventListener("click", reset);