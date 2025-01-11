let audioContext = null;
export function playNote(frequency) {
    if (audioContext == null) {
        audioContext = new (AudioContext || webLitAudioContext || window.webLitAudioContext)();
    }

    const duration = 0.1;
    const oscillator = audioContext.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.start();
    oscillator.stop(audioContext.currentTime + duration);
    const node = audioContext.createGain()
    node.gain.value = 0.1;
    node.gain.linearRampToValueAtTime(
        0, audioContext.currentTime + duration
    );
    oscillator.connect(node);
    node.connect(audioContext.destination);
}