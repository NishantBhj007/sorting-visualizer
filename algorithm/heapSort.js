export function sortHeap(arr) {
    const moves = [];
    function heapify(arr, n, i) {
      let largest = i;
      const left = 2 * i + 1;
      const right = 2 * i + 2;
  
      if (left < n && arr[left] > arr[largest]) largest = left;
      if (right < n && arr[right] > arr[largest]) largest = right;
  
      if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        moves.push({ indices: [i, largest], type: "swap" });
        heapify(arr, n, largest);
      }
    }
  
    for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
      heapify(arr, arr.length, i);
    }
  
    for (let i = arr.length - 1; i > 0; i--) {
      [arr[0], arr[i]] = [arr[i], arr[0]];
      moves.push({ indices: [0, i], type: "swap" });
      heapify(arr, i, 0);
    }
  
    return moves;
  }