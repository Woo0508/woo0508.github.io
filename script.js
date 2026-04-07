// script.js - Complete audio controls with SVG icons

// Get elements
const entryOverlay = document.getElementById('entryOverlay');
const mainContent = document.getElementById('mainContent');
const enterButton = document.getElementById('enterButton');
const entranceSound = document.getElementById('entranceSound');
const bgMusic = document.getElementById('bgMusic');
const musicControl = document.getElementById('musicControl');
const entranceMuteButton = document.getElementById('entranceMuteButton');

// Music box elements
const playPauseBtn = document.getElementById('playPauseBtn');
const muteVolumeBtn = document.getElementById('muteVolumeBtn');
const volumeSlider = document.getElementById('volumeSlider');
const prevTrackBtn = document.getElementById('prevTrackBtn');
const nextTrackBtn = document.getElementById('nextTrackBtn');
const trackNameSpan = document.querySelector('.track-name');

// Get SVG icons within buttons
const playIcon = playPauseBtn?.querySelector('.play-icon');
const pauseIcon = playPauseBtn?.querySelector('.pause-icon');
const volumeOnIcon = muteVolumeBtn?.querySelector('.volume-on');
const volumeOffIcon = muteVolumeBtn?.querySelector('.volume-off');

let musicPlaying = false;
let audioStarted = false;
let isMuted = false;
let currentTrackIndex = 0;

// Define your playlist
const playlist = [
  { name: "Track 1 - LEASE", src: "music/takeshi abo - LEASE (extended).mp3" }
];

// Function to load a track
function loadTrack(index) {
  if (index < 0) index = playlist.length - 1;
  if (index >= playlist.length) index = 0;
  currentTrackIndex = index;
  bgMusic.src = playlist[currentTrackIndex].src;
  trackNameSpan.textContent = playlist[currentTrackIndex].name;
  
  if (musicPlaying && audioStarted) {
    bgMusic.play().catch(e => console.log('Play prevented:', e));
  }
}

// Function to toggle mute on entrance screen
function toggleMute() {
  if (isMuted) {
    entranceSound.muted = false;
    bgMusic.muted = false;
    if (volumeOnIcon && volumeOffIcon) {
      volumeOnIcon.style.display = 'block';
      volumeOffIcon.style.display = 'none';
    }
    entranceMuteButton?.classList.remove('muted');
    const iconSpan = entranceMuteButton?.querySelector('.warning-icon');
    if (iconSpan) iconSpan.textContent = '🔊';
    isMuted = false;
    console.log('Audio unmuted');
  } else {
    entranceSound.muted = true;
    bgMusic.muted = true;
    if (volumeOnIcon && volumeOffIcon) {
      volumeOnIcon.style.display = 'none';
      volumeOffIcon.style.display = 'block';
    }
    entranceMuteButton?.classList.add('muted');
    const iconSpan = entranceMuteButton?.querySelector('.warning-icon');
    if (iconSpan) iconSpan.textContent = '🔇';
    isMuted = true;
    console.log('Audio muted');
  }
}

// Function to handle the entrance and show main content
function startExperience() {
  console.log('Start experience called');
  if (audioStarted) return;
  audioStarted = true;

  if (!isMuted) {
    entranceSound.play().then(() => {
      console.log('✨ Entrance sound playing');
    }).catch(error => {
      console.error('Entrance sound error:', error);
    });
  } else {
    console.log('Entrance sound skipped (muted)');
  }

  setTimeout(() => {
    if (!isMuted) {
      bgMusic.play().then(() => {
        musicPlaying = true;
        if (playIcon && pauseIcon) {
          playIcon.style.display = 'none';
          pauseIcon.style.display = 'block';
        }
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

  entryOverlay.style.opacity = '0';
  mainContent.style.display = 'block';
  void mainContent.offsetWidth;
  mainContent.classList.add('visible');
  
  setTimeout(() => {
    entryOverlay.style.visibility = 'hidden';
    if (entryOverlay.parentNode) {
      entryOverlay.remove();
    }
  }, 1000);
}

// Play/Pause function
function togglePlayPause() {
  if (!audioStarted) return;
  
  if (musicPlaying) {
    bgMusic.pause();
    if (playIcon && pauseIcon) {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
    musicPlaying = false;
    console.log('Music paused');
  } else {
    bgMusic.play().then(() => {
      if (playIcon && pauseIcon) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      }
      musicPlaying = true;
      console.log('Music resumed');
    }).catch(error => {
      console.error('Could not play:', error);
    });
  }
}

// Mute/Unmute function for music box
function toggleMuteBox() {
  if (isMuted) {
    bgMusic.muted = false;
    entranceSound.muted = false;
    if (volumeOnIcon && volumeOffIcon) {
      volumeOnIcon.style.display = 'block';
      volumeOffIcon.style.display = 'none';
    }
    volumeSlider.value = bgMusic.volume * 100;
    isMuted = false;
  } else {
    bgMusic.muted = true;
    entranceSound.muted = true;
    if (volumeOnIcon && volumeOffIcon) {
      volumeOnIcon.style.display = 'none';
      volumeOffIcon.style.display = 'block';
    }
    isMuted = true;
  }
}

// Volume control
function setVolume(value) {
  const volume = value / 100;
  bgMusic.volume = volume;
  entranceSound.volume = volume;
  
  if (volume === 0) {
    if (volumeOnIcon && volumeOffIcon) {
      volumeOnIcon.style.display = 'none';
      volumeOffIcon.style.display = 'block';
    }
    isMuted = true;
  } else if (isMuted) {
    if (volumeOnIcon && volumeOffIcon) {
      volumeOnIcon.style.display = 'block';
      volumeOffIcon.style.display = 'none';
    }
    isMuted = false;
  }
}

// Next track
function nextTrack() {
  loadTrack(currentTrackIndex + 1);
  if (musicPlaying && audioStarted) {
    bgMusic.play().catch(e => console.log('Play error:', e));
  }
}

// Previous track
function prevTrack() {
  loadTrack(currentTrackIndex - 1);
  if (musicPlaying && audioStarted) {
    bgMusic.play().catch(e => console.log('Play error:', e));
  }
}

// Legacy toggle music function
function toggleMusic() {
  if (!audioStarted) return;
  
  if (musicPlaying) {
    bgMusic.pause();
    musicControl.innerHTML = '🔇 Music Off';
    if (playIcon && pauseIcon) {
      playIcon.style.display = 'block';
      pauseIcon.style.display = 'none';
    }
    musicPlaying = false;
  } else {
    bgMusic.play().then(() => {
      musicControl.innerHTML = '🔊 Music On';
      if (playIcon && pauseIcon) {
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
      }
      musicPlaying = true;
    }).catch(error => {
      console.error('Could not play music:', error);
    });
  }
}

// Event Listeners
if (enterButton) {
  enterButton.addEventListener('click', startExperience);
  console.log('Enter button listener attached');
}
if (musicControl) musicControl.onclick = toggleMusic;
if (entranceMuteButton) entranceMuteButton.addEventListener('click', toggleMute);
if (playPauseBtn) playPauseBtn.addEventListener('click', togglePlayPause);
if (muteVolumeBtn) muteVolumeBtn.addEventListener('click', toggleMuteBox);
if (volumeSlider) volumeSlider.addEventListener('input', (e) => setVolume(e.target.value));
if (nextTrackBtn) nextTrackBtn.addEventListener('click', nextTrack);
if (prevTrackBtn) prevTrackBtn.addEventListener('click', prevTrack);

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter' && !audioStarted && entryOverlay && entryOverlay.style.opacity !== '0') {
    startExperience();
  }
  if ((event.key === 'm' || event.key === 'M') && !audioStarted && entranceMuteButton) {
    toggleMute();
  }
  if (audioStarted) {
    if (event.code === 'Space') {
      event.preventDefault();
      togglePlayPause();
    }
    if (event.key === 'ArrowLeft') prevTrack();
    if (event.key === 'ArrowRight') nextTrack();
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      let newVol = Math.min(100, (bgMusic.volume * 100) + 10);
      setVolume(newVol);
      volumeSlider.value = newVol;
    }
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      let newVol = Math.max(0, (bgMusic.volume * 100) - 10);
      setVolume(newVol);
      volumeSlider.value = newVol;
    }
  }
});

// Preload audio
window.addEventListener('load', function() {
  if (entranceSound) entranceSound.load();
  loadTrack(0);
  bgMusic.volume = 0.7;
  if (volumeSlider) volumeSlider.value = 70;
  console.log('🎧 Audio preloaded and ready');
});