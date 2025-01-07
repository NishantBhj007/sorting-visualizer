const n = 10;
let a = [n];

initialize();
let audioContext = null;

function playNote(frequency) {
  if (audioContext == null) {
    audioContext = new (AudioContext || webLitAudioContext || window.webLitAudioContext)();
  }
  
  const duration = 0.1;
  const oscillator = audioContext.createOscillator();
  oscillator.frequency.value = frequency;
  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
  
  const node = audioContext.createGain();
  node.gain.value = 0.1;
  node.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration);
  
  oscillator.connect(node);
  node.connect(audioContext.destination);
}

function initialize() {
  for (let i = 0; i < n; i++) {
    a[i] = Math.random() * 50;
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
  if (moves.length === 0) {
    showBars();
    return;
  }
  
  const move = moves.shift();
  const [i, j] = move.indices;
  
  if (move.type === 'swap') {
    [a[i], a[j]] = [a[j], a[i]];
  }
  
  playNote(100 + a[i] * 400);
  playNote(100 + a[j] * 400);
  
  showBars(move);
  
  setTimeout(function() {
    animate(moves);
  }, 100);
}

// Bubble Sort
function sort(a) {
  const moves = [];
  
  for (let i = 0; i < a.length; i++) {
    for (let b = 0; b < a.length - 1; b++) {
      if (a[b] > a[b + 1]) {
        moves.push({
          indices: [b, b + 1],
          type: 'swap'
        });
        let temp = a[b];
        a[b] = a[b + 1];
        a[b + 1] = temp;
      }
    }
  }
  
  return moves;
}

function showBars(move) {
  container.innerHTML = '';
  
  for (let i = 0; i < a.length; i++) {
    const bar = document.createElement('div');
    bar.style.height = a[i] * 4 + 'px';
    bar.classList.add('bar');
    
    if (move && move.indices.includes(i)) {
      bar.style.backgroundColor = move.type === 'swap' ? '#FFD65A' : '#F93827';
    }
    
    container.appendChild(bar);
  }
}

let sortButton = document.querySelector('.play');
let initButton = document.querySelector('.init');

sortButton.addEventListener('click', play);
initButton.addEventListener('click', initialize);
