import { state } from "./appState/appState.js";
import { getSortMoves } from "./algorithm/algoManager.js";
import { animate } from "./ui/animation.js";
import { showBars } from "./ui/bars.js";

function play() {
  const copy = [...state.arr];
  state.moves = getSortMoves(copy);
  animate();
}

init();
initEventListeners();

function init() {
  state.speed = parseInt(document.getElementById("speedControl").value);
  state.moves = [];
  state.arr = Array.from({ length: state.n }, () => Math.floor(Math.random() * 60));
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
    state.currentSort = event.target.id;
    init();
  }

  speedControl.addEventListener("input", (event) => {
    state.speed = parseInt(event.target.value);
  });

  document.querySelector(".play").addEventListener("click", play);
  document.querySelector(".init").addEventListener("click", init);
}
