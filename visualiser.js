// Výběr audio a canvas elementů
const audio = document.getElementById('audio');
const canvas = document.getElementById('visualizer');
const canvasCtx = canvas.getContext('2d');

// Vytvoření zvukového kontextu
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256; // Nastavení velikosti Fast Fourier Transform (FFT) pro přesnost

// Zdroj zvuku propojený s audio kontextem
const source = audioCtx.createMediaElementSource(audio);
source.connect(analyser);
analyser.connect(audioCtx.destination);

// Pole pro frekvenční data
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength);

// Spustit vizualizaci
function draw() {
    requestAnimationFrame(draw);

    // Získání frekvenčních dat
    analyser.getByteFrequencyData(dataArray);

    // Vymazání canvasu a nastavení stylu
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
    canvasCtx.fillStyle = '#111';
    canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

    // Nastavení pruhového grafu
    const barWidth = (canvas.width / bufferLength) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];

        // Dynamické barvy podle výšky pruhu
        const red = (barHeight + 100) % 256;
        const green = (barHeight * 2) % 256;
        const blue = 200;

        canvasCtx.fillStyle = `rgb(${red},${green},${blue})`;
        canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2);

        x += barWidth + 1; // Posun na další pruh
    }
}

// Aktivace AudioContextu po spuštění zvuku
audio.addEventListener('play', () => {
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    draw();
});
