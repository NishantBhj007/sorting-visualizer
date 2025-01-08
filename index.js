import { playNote } from "./sound.js";
let playButton = document.querySelector(".play");
let initButton = document.querySelector(".init");
const n = 15;
let a = [n];
init();

function init() {
  for (let i = 0; i < n; i++) {
    a[i] = Math.floor((Math.random()) *60 );
  }
  console.log(a);

  showBars();
}

function play() {
  const copy = [...a];
  const moves = sort(copy);
  animate(moves);
}

function animate(moves) {
  if (moves.length == 0) {
    showBars();
    return;
  }
  const move = moves.shift();
  const [i, j] = move.indices;
  if (move.type == "swap") {
    [a[i], a[j]] = [a[j], a[i]];
  }

  playNote(100 + a[i] * 400);
  playNote(100 + a[j] * 400);

  showBars(move);
  setTimeout(function () {
    animate(moves);
  }, 100);
}
/// bubble sort

function sort(a) {
  const moves = [];
  for (let i = 0; i < a.length; i++) {
    for (let b = 0; b < a.length; b++) {
      if (a[b] > a[b + 1]) {
        moves.push({
          indices: [b, b + 1],
          type: "swap",
        });
        let temp = a[b];
        a[b] = a[b + 1];
        a[b + 1] = temp;
      }
    }
  }
  console.log(a);
  return moves;
}

function showBars(move) {
  container.innerHTML = "";
  for (let i = 0; i < a.length; i++) {
    const bar = document.createElement("div");
    bar.style.height = a[i] * 8 + "px";
    bar.textContent=
    bar.classList.add("bar");

    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type == "swap" ? "#FFD65A" : "#F93827";
    }
    container.appendChild(bar);
  }
}


playButton.addEventListener("click", play);
initButton.addEventListener("click", init);
