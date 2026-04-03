// script.js - Entrance overlay with Wii-style button

// Get elements
const entryOverlay = document.getElementById('entryOverlay');
const mainContent = document.getElementById('mainContent');
const enterButton = document.getElementById('enterButton');
const entranceSound = document.getElementById('entranceSound');
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');

let musicPlaying = false;
let audioStarted = false;

// Function to handle the entrance and show main content
function startExperience() {
    if (audioStarted) return; // Prevent double firing
    audioStarted = true;

    // 1. Play entrance sound
    entranceSound.play().then(() => {
        console.log('✨ Entrance sound playing');
    }).catch(error => {
        console.error('Entrance sound error:', error);
    });

    // 2. Schedule background music to start after 2 seconds
    setTimeout(() => {
        bgMusic.play().then(() => {
            musicPlaying = true;
            musicControl.style.display = 'block';
            musicControl.innerHTML = '🔊 Music On';
            console.log('🎵 Background music started');
        }).catch(error => {
            console.error('Music error:', error);
            musicControl.style.display = 'block';
            musicControl.innerHTML = '🎵 Click to play music';
        });
    }, 2000);

    // 3. Fade out and remove the entrance overlay
    entryOverlay.style.opacity = '0';
    
    // 4. Show the main content with fade-in effect
    mainContent.style.display = 'block';
    
    // Force a reflow to ensure the transition works
    void mainContent.offsetWidth;
    mainContent.classList.add('visible');
    
    // Remove the overlay from the DOM after transition
    setTimeout(() => {
        entryOverlay.style.visibility = 'hidden';
        entryOverlay.remove();
    }, 1000);
}

// Function to toggle music on/off
function toggleMusic() {
    if (musicPlaying) {
        bgMusic.pause();
        musicControl.innerHTML = '🔇 Music Off';
        musicPlaying = false;
        console.log('Music paused by user');
    } else {
        bgMusic.play().then(() => {
            musicControl.innerHTML = '🔊 Music On';
            musicPlaying = true;
            console.log('Music resumed by user');
        }).catch(error => {
            console.error('Could not play music:', error);
        });
    }
}

// Add event listeners
enterButton.addEventListener('click', startExperience);
musicControl.onclick = toggleMusic;

// Optional: Add keyboard support (press Enter key to start)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !audioStarted && entryOverlay) {
        startExperience();
    }
});

// Optional: Preload audio to ensure faster playback when clicked
window.addEventListener('load', function() {
    // Preload audio without playing
    entranceSound.load();
    bgMusic.load();
    console.log('🎧 Audio preloaded and ready');
});