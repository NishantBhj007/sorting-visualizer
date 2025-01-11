export function sortInsertion(arr) {
    const moves = [];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        moves.push({ indices: [j, j + 1], type: "swap" });
        j--;
      }
      arr[j + 1] = key;
    }
    return moves;
  }