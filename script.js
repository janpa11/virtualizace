// Seznam inspirativních citátů
const quotes = [
    "I dont need luck to perform, I decide when to perform good",
    "Branka má jen jednoho brankáře, ale i tak do ní padají branky",
    "No gamble No Rolex",
    "To je ale pro mojí ZIMNÍ KAPITOLU",
    "Život je Minecraft tak si ho užívej",
    "Ty píčo to je v píči",
    "Mě bolí v žaludku píčo, jako kdyby tam bojoval ježíš s démony" 
];

// Funkce pro generování náhodného citátu
function getRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Událost pro kliknutí na citátový box
const quoteBox = document.getElementById('quote');
quoteBox.addEventListener('click', () => {
    quoteBox.textContent = getRandomQuote();
});

// Zvukové soubory a nastavení
const sounds = {
    image1: new Audio('idol---ecstacy-super-slowed.mp3.fdmdownload'),
    image2: new Audio('zlatan_quotes.mp3'),
    image3: new Audio('rate-quality.mp3'),
    image4: new Audio('2nd-best-part-of-danika-house.mp3'),
    image5: new Audio('xiaomi.mp3'),
    image6: new Audio('boyna-galava.mp3'),
    image7: new Audio('dont-stop-the-music.mp3'),
    image8: new Audio('emo-prdelí.mp3')
};

// Nastavení startovních časů
const startTimes = {
    image1: 9,
    image2: 0,
    image3: 15,
    image4: 0,
    image5: 0,
    image6: 15,
    image7: 0,
    image8: 0
};

// Inicializace Web Audio API a zesílení
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function setupAudio(audioElement) {
    const source = audioContext.createMediaElementSource(audioElement);
    const gainNode = audioContext.createGain();

    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Nastavení hlasitosti (např. 3.0 = trojnásobné zesílení)
    gainNode.gain.setValueAtTime(1.0, audioContext.currentTime); // Zvýší hlasitost
    return { source, gainNode };
}

// Nastavíme každému zvuku zesílení a smyčku
Object.entries(sounds).forEach(([key, sound]) => {
    sound.loop = true;
    setupAudio(sound);

});

// Aktivace zvukového kontextu po uživatelské interakci
document.body.addEventListener('click', () => {
    audioContext.resume();
});

// Přiřazení událostí k obrázkům
document.querySelectorAll('.image-container').forEach(item => {
    const sound = sounds[item.id];
    const startTime = startTimes[item.id];

    if (sound) {
        item.addEventListener('mouseenter', () => {
            sound.currentTime = startTime; // Nastaví startovací čas
            sound.play(); // Spustí zvuk
        });

        item.addEventListener('mouseleave', () => {
            sound.pause(); // Pause zvuku
            sound.currentTime = startTime; // Reset času
        });
    }
});
