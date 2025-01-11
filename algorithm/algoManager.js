import { sortBubble } from "./bubbleSort.js";
import { sortQuick } from "./quickSort.js";
import { sortInsertion } from "./insertionSort.js";
import { sortHeap } from "./heapSort.js";
import { state } from "../appState/appState.js";

export function getSortMoves(array) {
    switch (state.currentSort) {
      case "bubbleSort":
        return sortBubble(array);
      case "quickSort":
        return sortQuick(array);
      case "insertionSort":
        return sortInsertion(array);
      case "heapSort":
        return sortHeap(array);
      default:
        return [];
    }
}