// script.js - Audio controls for background music and entrance sound

// Get audio elements
const entranceSound = document.getElementById('entranceSound');
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');

let musicPlaying = false;
let musicStarted = false;

// Function to play entrance sound and schedule music
function playEntranceAndScheduleMusic() {
  // Play entrance sound
  entranceSound.play().catch(error => {
    console.log('Entrance sound blocked. User interaction needed.');
  });
  
  // Schedule background music to start after 1.5 seconds
  setTimeout(function() {
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicStarted = true;
      musicControl.style.display = 'block';
      musicControl.innerHTML = '🔊 Music On';
    }).catch(error => {
      console.log('Music autoplay blocked. User can click button to start.');
      musicControl.style.display = 'block';
      musicControl.innerHTML = '🎵 Play Music';
    });
  }, 1500); // 1.5 second delay
}

// Function to toggle music on/off
function toggleMusic() {
  if (musicPlaying) {
    bgMusic.pause();
    musicControl.innerHTML = '🔇 Music Off';
    musicPlaying = false;
  } else {
    bgMusic.play().then(() => {
      musicControl.innerHTML = '🔊 Music On';
      musicPlaying = true;
      musicStarted = true;
    }).catch(error => {
      console.log('Could not play music:', error);
    });
  }
}

// Attach toggle function to button
musicControl.onclick = toggleMusic;

// Try to start the sequence automatically when page loads
document.addEventListener('DOMContentLoaded', function() {
  playEntranceAndScheduleMusic();
});

// Fallback: Start when user clicks anywhere on page (helps with autoplay restrictions)
function handleUserInteraction() {
  if (!musicStarted) {
    playEntranceAndScheduleMusic();
  }
  // Remove listeners after first interaction
  document.removeEventListener('click', handleUserInteraction);
  document.removeEventListener('keydown', handleUserInteraction);
  document.removeEventListener('touchstart', handleUserInteraction);
}

// If autoplay is blocked, start when user interacts with page
document.addEventListener('click', handleUserInteraction);
document.addEventListener('keydown', handleUserInteraction);
document.addEventListener('touchstart', handleUserInteraction);