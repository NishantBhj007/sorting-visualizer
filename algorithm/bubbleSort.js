export function sortBubble(arr) {
    const moves = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          moves.push({ indices: [j, j + 1], type: "swap" });
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return moves;
  }