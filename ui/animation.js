import { state } from "../appState/appState.js";
import { playNote } from "../sound.js";
import { showBars } from "./bars.js";

export function animate() {
  if (state.moves.length === 0) {
    showBars();
    return;
  }

  const move = state.moves.shift();
  const [i, j] = move.indices;

  if (move.type === "swap") {
    [state.arr[i], state.arr[j]] = [state.arr[j], state.arr[i]];
  }

  playNote(100 + state.arr[i] * 400);
  playNote(100 + state.arr[j] * 400);
  showBars(move);

  const delay = 1000 - state.speed;
  setTimeout(() => animate(), delay);
}
