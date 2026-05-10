const music = document.getElementById("bgMusic");
const bSom = document.getElementById("bSom");

const playlist = [
    "assets/nastelbom-lo-fi-323904.mp3",
    "assets/amaksi-lo-fi-loop-149702.mp3",
    "assets/sonican-lo-fi-music-loop-sentimental-jazzy-love-473154.mp3",
    "assets/sonican-lo-fi-background-music-loop-calm-study-462843.mp3",
    "assets/sonican-lounge-in-jazzy-lo-fi-loop-503994.mp3",
    "assets/sonican-mystical-dreams-lo-fi-loop-322546.mp3",
    "assets/sonican-bossa-nova-lofi-music-loop-2-497908.mp3"
];

let currentTrack = 0;
let started = false;

// carrega música
function loadTrack(index) {
    music.src = playlist[index];
}

// toca
function playMusic() {
    music.play();
}

// próxima faixa
music.addEventListener("ended", () => {
    fadeOut(() => {
        currentTrack++;

        if (currentTrack >= playlist.length) {
            currentTrack = 0;
        }

        loadTrack(currentTrack);
        playMusic();
        fadeIn();
    });
});

// inicia no primeiro clique
document.addEventListener("click", () => {
    if (!started) {
        loadTrack(currentTrack);
        playMusic();
        fadeIn();
        started = true;
    }
}, { once: true });

const soundOn = `
    <svg id="som" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-volume"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 8a5 5 0 0 1 0 8" /><path d="M17.7 5a9 9 0 0 1 0 14" /><path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" /></svg>
`;

const soundOff = `
    <svg id="mut" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-volume-3"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5" /><path d="M16 10l4 4m0 -4l-4 4" /></svg>
`;

// mutar/desmutar
bSom.addEventListener("click", (e) => {
    e.stopPropagation();

    music.muted = !music.muted;

    bSom.innerHTML = music.muted ? soundOff : soundOn;
});

function fadeOut(callback) {
    let volume = music.volume;

    const fade = setInterval(() => {
        if (volume > 0.05) {
            volume -= 0.05;
            music.volume = volume;
        } else {
            clearInterval(fade);
            music.volume = 0;
            callback();
        }
    }, 150);
}

function fadeIn() {
    let volume = 0;
    music.volume = 0;

    const fade = setInterval(() => {
        if (volume < 0.95) {
            volume += 0.05;
            music.volume = volume;
        } else {
            clearInterval(fade);
            music.volume = 1;
        }
    }, 150);
}