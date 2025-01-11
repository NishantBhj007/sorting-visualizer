export function sortQuick(arr) {
    const moves = [];
    function quickSortHelper(arr, low, high) {
      if (low < high) {
        const pivotIndex = partition(arr, low, high);
        quickSortHelper(arr, low, pivotIndex - 1);
        quickSortHelper(arr, pivotIndex + 1, high);
      }
    }
  
    function partition(arr, low, high) {
      const pivot = arr[high];
      let i = low - 1;
      for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
          i++;
          [arr[i], arr[j]] = [arr[j], arr[i]];
          moves.push({ indices: [i, j], type: "swap" });
        }
      }
      [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
      moves.push({ indices: [i + 1, high], type: "swap" });
      return i + 1;
    }
  
    quickSortHelper(arr, 0, arr.length - 1);
    return moves;
  }