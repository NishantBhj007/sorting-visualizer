import { state } from "../appState/appState.js";

export function showBars(move) {
    const canvas = document.getElementById("canvas");
    canvas.innerHTML = "";
  
    state.arr.forEach((height, index) => {
      const bar = document.createElement("div");
      bar.style.height = `${height * 8}px`;
      bar.classList.add("bar");
  
      if (move && move.indices.includes(index)) {
        bar.style.backgroundColor = move.type === "swap" ? "#FFD65A" : "#F93827";
      }
      canvas.appendChild(bar);
    });
}