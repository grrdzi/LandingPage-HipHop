// Mobile Navigation Toggle
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const header = document.getElementById('header');

menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
});

// Close mobile nav when clicking a link
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll Animation
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Current Year for Footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Artists Slider
const artistsTrack = document.getElementById('artistsTrack');
const prevArtist = document.getElementById('prevArtist');
const nextArtist = document.getElementById('nextArtist');

let artistsCurrentIndex = 0;
let artistsSlideWidth = 0;
let artistsSlidesToShow = 1;

// Determine how many slides to show based on screen width
const updateArtistsSlidesToShow = () => {
    if (window.innerWidth >= 1200) {
        artistsSlidesToShow = 4;
    } else if (window.innerWidth >= 992) {
        artistsSlidesToShow = 3;
    } else if (window.innerWidth >= 768) {
        artistsSlidesToShow = 2;
    } else {
        artistsSlidesToShow = 1;
    }
    
    const artistsSlides = artistsTrack.querySelectorAll('.artist-slide');
    artistsSlideWidth = artistsSlides[0].getBoundingClientRect().width;
    updateArtistsSliderPosition();
};

const updateArtistsSliderPosition = () => {
    artistsTrack.style.transform = `translateX(-${artistsCurrentIndex * artistsSlideWidth}px)`;
};

const moveToArtistsSlide = (index) => {
    const artistsSlides = artistsTrack.querySelectorAll('.artist-slide');
    artistsCurrentIndex = index;
    
    // Ensure we don't go out of bounds
    if (artistsCurrentIndex < 0) {
        artistsCurrentIndex = 0;
    } else if (artistsCurrentIndex > artistsSlides.length - artistsSlidesToShow) {
        artistsCurrentIndex = artistsSlides.length - artistsSlidesToShow;
    }
    
    updateArtistsSliderPosition();
};

prevArtist.addEventListener('click', () => {
    moveToArtistsSlide(artistsCurrentIndex - 1);
});

nextArtist.addEventListener('click', () => {
    moveToArtistsSlide(artistsCurrentIndex + 1);
});

// Update slider on window resize
window.addEventListener('resize', updateArtistsSlidesToShow);

// Initialize slider
window.addEventListener('load', updateArtistsSlidesToShow);

// Audio Player
const audioPlayer = document.getElementById('audioPlayer');
const playlistTracks = document.querySelectorAll('.playlist-track');

playlistTracks.forEach(track => {
    track.addEventListener('click', () => {
        // Remove active class from all tracks
        playlistTracks.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked track
        track.classList.add('active');
        
        // Show audio player
        audioPlayer.classList.add('active');
        
        // Update player info (in a real app, this would load the actual track)
        const trackTitle = track.querySelector('.track-title').textContent;
        const trackArtist = track.querySelector('.track-artist').textContent;
        
        document.querySelector('.player-title').textContent = trackTitle;
        document.querySelector('.player-artist').textContent = trackArtist;
    });
});

// Play/Pause button
const playPauseBtn = document.querySelector('.play-pause');
let isPlaying = true;

playPauseBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    
    if (isPlaying) {
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
});

// Progress bar (simulated for demo)
const progressBar = document.querySelector('.progress-bar');
let progress = 0;

const updateProgress = () => {
    if (isPlaying && progress < 100) {
        progress += 0.1;
        progressBar.style.width = `${progress}%`;
        
        // Update time display
        const currentTime = document.querySelectorAll('.player-time')[0];
        const totalTime = document.querySelectorAll('.player-time')[1].textContent;
        
        const totalSeconds = convertTimeToSeconds(totalTime);
        const currentSeconds = Math.floor((progress / 100) * totalSeconds);
        
        currentTime.textContent = convertSecondsToTime(currentSeconds);
    }
    
    requestAnimationFrame(updateProgress);
};

const convertTimeToSeconds = (timeString) => {
    const [minutes, seconds] = timeString.split(':').map(Number);
    return minutes * 60 + seconds;
};

const convertSecondsToTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

requestAnimationFrame(updateProgress);

// Click on progress bar to seek
const playerProgress = document.querySelector('.player-progress');

playerProgress.addEventListener('click', (e) => {
    const rect = playerProgress.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const progressWidth = rect.width;
    
    progress = (clickPosition / progressWidth) * 100;
    progressBar.style.width = `${progress}%`;
});

// Volume control
const volumeSlider = document.querySelector('.volume-slider');
const volumeBar = document.querySelector('.volume-bar');

volumeSlider.addEventListener('click', (e) => {
    const rect = volumeSlider.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const sliderWidth = rect.width;
    
    const volume = (clickPosition / sliderWidth) * 100;
    volumeBar.style.width = `${volume}%`;
});