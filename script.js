// script.js - Entrance overlay with Wii-style button and pre-entry mute

// Get elements
const entryOverlay = document.getElementById('entryOverlay');
const mainContent = document.getElementById('mainContent');
const enterButton = document.getElementById('enterButton');
const entranceSound = document.getElementById('entranceSound');
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');
const entranceMuteButton = document.getElementById('entranceMuteButton');

let musicPlaying = false;
let audioStarted = false;
let isMuted = false;  // Track mute state before entrance

// Function to mute/unmute all audio before entering
function toggleMute() {
  if (isMuted) {
    // Unmute
    entranceSound.muted = false;
    bgMusic.muted = false;
    entranceMuteButton.classList.remove('muted');
    const iconSpan = entranceMuteButton.querySelector('.warning-icon');
    if (iconSpan) iconSpan.textContent = '🔊';
    isMuted = false;
    console.log('Audio unmuted before entrance');
  } else {
    // Mute
    entranceSound.muted = true;
    bgMusic.muted = true;
    entranceMuteButton.classList.add('muted');
    const iconSpan = entranceMuteButton.querySelector('.warning-icon');
    if (iconSpan) iconSpan.textContent = '🔇';
    isMuted = true;
    console.log('Audio muted before entrance');
  }
}

// Function to handle the entrance and show main content
function startExperience() {
    if (audioStarted) return; // Prevent double firing
    audioStarted = true;

    // Play entrance sound only if not muted
    if (!isMuted) {
        entranceSound.play().then(() => {
            console.log('✨ Entrance sound playing');
        }).catch(error => {
            console.error('Entrance sound error:', error);
        });
    } else {
        console.log('Entrance sound skipped (muted)');
    }

    // Schedule background music to start after 2 seconds
    setTimeout(() => {
        if (!isMuted) {
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
        } else {
            console.log('Background music skipped (muted)');
            musicControl.style.display = 'block';
            musicControl.innerHTML = '🔇 Music Off (Muted)';
        }
    }, 2000);

    // Fade out and remove the entrance overlay
    entryOverlay.style.opacity = '0';
    
    // Show the main content with fade-in effect
    mainContent.style.display = 'block';
    
    // Force a reflow to ensure the transition works
    void mainContent.offsetWidth;
    mainContent.classList.add('visible');
    
    // Remove the overlay from the DOM after transition
    setTimeout(() => {
        entryOverlay.style.visibility = 'hidden';
        if (entryOverlay.parentNode) {
            entryOverlay.remove();
        }
    }, 1000);
}

// Function to toggle music on/off after entering
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
if (enterButton) {
    enterButton.addEventListener('click', startExperience);
}

if (musicControl) {
    musicControl.onclick = toggleMusic;
}

// Add mute button listener
if (entranceMuteButton) {
    entranceMuteButton.addEventListener('click', toggleMute);
}

// Optional: Add keyboard support (press Enter key to start)
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter' && !audioStarted && entryOverlay && entryOverlay.style.opacity !== '0') {
        startExperience();
    }
});

// Optional: Add 'M' key to mute/unmute before entering
document.addEventListener('keydown', function(event) {
    if ((event.key === 'm' || event.key === 'M') && !audioStarted && entranceMuteButton) {
        toggleMute();
    }
});

// Preload audio to ensure faster playback when clicked
window.addEventListener('load', function() {
    if (entranceSound) entranceSound.load();
    if (bgMusic) bgMusic.load();
    console.log('🎧 Audio preloaded and ready');
});