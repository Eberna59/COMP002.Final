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