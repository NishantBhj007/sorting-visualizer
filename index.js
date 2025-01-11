import { state } from "./appState/appState.js";
import { getSortMoves } from "./algorithm/algoManager.js";
import { playNote } from "./sound.js";

let { n, arr, speed, moves, currentSort } = state;

function play() {
  const copy = [...arr];
  moves = getSortMoves(copy);
  animate(moves);
}

function animate() {
  if (moves.length === 0) {
    showBars();
    return;
  }

  const move = moves.shift();
  const [i, j] = move.indices;

  if (move.type === "swap") {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  playNote(100 + arr[i] * 400);
  playNote(100 + arr[j] * 400);
  showBars(move);

  const delay = 1000 - speed;
  setTimeout(() => animate(), delay);
}

function showBars(move) {
  const canvas = document.getElementById("canvas");
  canvas.innerHTML = "";

  arr.forEach((height, index) => {
    const bar = document.createElement("div");
    bar.style.height = `${height * 8}px`;
    bar.classList.add("bar");

    if (move && move.indices.includes(index)) {
      bar.style.backgroundColor = move.type === "swap" ? "#FFD65A" : "#F93827";
    }
    canvas.appendChild(bar);
  });
}

init();
initEventListeners();

function init() {
  speed = parseInt(document.getElementById("speedControl").value);
  moves = [];
  arr = Array.from({ length: n }, () => Math.floor(Math.random() * 60));
  showBars();
}

function initEventListeners() {
  const speedControl = document.getElementById("speedControl");
  const algorithmLinks = document.querySelectorAll(".navbar-nav .nav-link");
  algorithmLinks.forEach(link => {
    link.addEventListener("click", handleAlgorithmSelection);
  });

  function handleAlgorithmSelection(event) {
    algorithmLinks.forEach(link => link.classList.remove("selected"));
    event.target.classList.add("selected");
    currentSort = event.target.id;
    init();
  }

  speedControl.addEventListener("input", (event) => {
    speed = parseInt(event.target.value);
  });
  document.querySelector(".play").addEventListener("click", play);
  document.querySelector(".init").addEventListener("click", init);
}

