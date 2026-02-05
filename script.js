/* --- MENU INDICATOR & SCROLL --- */
const links = document.querySelectorAll(".nav-links a");
const indicator = document.querySelector(".indicator");

function moveIndicator(el) {
  indicator.style.width = el.parentElement.offsetWidth + "px";
  indicator.style.left = el.parentElement.offsetLeft + "px";
}

links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const targetTop = targetSection.offsetTop - 100;
    const direction = targetTop > window.scrollY ? "down" : "up";
    smoothScroll(targetTop, direction);

    document.querySelector(".active").classList.remove("active");
    link.parentElement.classList.add("active");
    moveIndicator(link);
  });
});

/* CUSTOM SCROLL ANIMATION */
function smoothScroll(target, direction) {
  const start = window.scrollY;
  const distance = target - start;
  const duration = 800;
  let startTime = null;

  function animation(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);

    const ease = direction === "down"
      ? progress * progress
      : 1 - Math.pow(1 - progress, 2);

    window.scrollTo(0, start + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}

/* SCROLL SPY */
window.addEventListener("scroll", () => {
  document.querySelectorAll("section").forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      document.querySelectorAll(".nav-links li").forEach(li => li.classList.remove("active"));
      const li = document.querySelector(`.nav-links a[href="#${id}"]`).parentElement;
      li.classList.add("active");
      moveIndicator(li.querySelector("a"));
    }
  });
});

/* REVEAL SECTIONS */
const sections = document.querySelectorAll(".section");

function revealSections() {
  const trigger = window.innerHeight * 0.85;
  sections.forEach(sec => {
    if (sec.getBoundingClientRect().top < trigger) {
      sec.classList.add("show");
    }
  });
}

window.addEventListener("scroll", revealSections);
revealSections();

/* CUSTOM CURSOR */
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

window.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});



// Select all video-cards
const videoCards = document.querySelectorAll('.video-card');

videoCards.forEach(card => {
  const iframe = card.querySelector('iframe');
  const button = card.querySelector('.mute-btn');

  // Create a Vimeo Player instance
  const player = new Vimeo.Player(iframe);

  button.addEventListener('click', () => {
    player.getVolume().then(volume => {
      if (volume === 0) {
        // Currently muted, unmute
        player.setVolume(1); // max volume
        button.innerText = 'Mute';
        button.style.background = '#38bdf8';
        button.style.color = '#0b0f1a';
      } else {
        // Currently unmuted, mute
        player.setVolume(0);
        button.innerText = 'Unmute';
        button.style.background = 'rgba(11, 15, 26, 0.7)';
        button.style.color = '#38bdf8';
      }
    });
  });
});


const words = ["STORY", "BRAND"];
const typingElement = document.querySelector(".typing-word");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 80;
const deletingSpeed = 80;
const holdAfterType = 800;
const holdAfterDelete = 400;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typingElement.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      setTimeout(() => (isDeleting = true), holdAfterType);
    }
  } else {
    typingElement.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(() => {}, holdAfterDelete);
    }
  }

  const speed = isDeleting ? deletingSpeed : typingSpeed;
  setTimeout(typeEffect, speed);
}

// Start typing when page loads
typeEffect();


const shineWord = document.querySelector('.shine-word');

let glowOn = false;

function shinePulse() {
  glowOn = true;

  // POWER-UP GLOW
  shineWord.style.color = '#FFD76A'; // sun / anime yellow
  shineWord.style.textShadow = `
    0 0 6px rgba(255, 215, 106, 0.6),
    0 0 12px rgba(255, 215, 106, 0.5),
    0 0 40px rgba(255, 170, 40, 0.9)
  `;

  // FADE BACK
  setTimeout(() => {
    shineWord.style.color = '#e5e7eb';
    shineWord.style.textShadow = 'none';
    glowOn = false;
  }, 1000);
}

// Run every few seconds
setInterval(() => {
  if (!glowOn) shinePulse();
}, 2500);


const backToTop = document.getElementById('backToTop');
const heroSection = document.getElementById('home');

// Show button only after hero section
window.addEventListener('scroll', () => {
  const heroBottom = heroSection.offsetHeight - 100;

  if (window.scrollY > heroBottom) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
});

// Smooth scroll to top (JS animation)
backToTop.addEventListener('click', () => {
  const start = window.scrollY;
  const duration = 800;
  let startTime = null;

  function scrollAnimation(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);

    const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) {
      requestAnimationFrame(scrollAnimation);
    }
  }

  requestAnimationFrame(scrollAnimation);
});
/* --- FINAL 1-STONE-2-BIRDS LOGIC --- */

// 1. SETUP AUDIO
const bgSound = new Audio('./src/judas.mp3'); 
bgSound.volume = 0.2; 
bgSound.loop = true;
bgSound.preload = 'auto'; // Forces browser to download it early

// 2. YOUTUBE API SETUP
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var logoTrigger = document.getElementById('heroLogo');
var youtubeContainer = document.getElementById('youtube-bg-container');
var myVideoId = 'kXuVDMvPtKY'; 

function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtube-player', {
    height: '100%', width: '100%', videoId: myVideoId,
    playerVars: {
      'autoplay': 0, 'controls': 0, 'rel': 0, 'showinfo': 0,
      'modestbranding': 1, 'loop': 1, 'playlist': myVideoId, 'mute': 1
    },
    events: { 'onReady': onPlayerReady }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
  setTimeout(() => { player.pauseVideo(); }, 150);
  addHoverLogic();
}

// 2. MODIFIED UNLOCKER (Only runs if NOT on mobile)
const unlockAudio = () => {
    // Only attempt to "prime" audio if screen is wider than 768px
    if (window.innerWidth > 768) {
        bgSound.play().then(() => {
            bgSound.pause();
            console.log("Desktop Audio Ready");
        }).catch(e => console.log("Waiting for desktop interaction..."));
    }
    
    window.removeEventListener('click', unlockAudio);
    window.removeEventListener('scroll', unlockAudio);
};

window.addEventListener('click', unlockAudio);
window.addEventListener('scroll', unlockAudio);


// 3. THE HOVER LOGIC (With Mobile Check)
function addHoverLogic() {
  // We check the screen width before adding the listeners
  if (window.innerWidth > 768) {
    
    logoTrigger.addEventListener('mouseenter', () => {
      // Play Video
      if (player && typeof player.playVideo === 'function') {
        youtubeContainer.classList.add('active');
        player.playVideo();
      }

      // Play Audio
      bgSound.play().catch(err => {
          bgSound.muted = true;
          bgSound.play();
          bgSound.muted = false;
      });
    });

    logoTrigger.addEventListener('mouseleave', () => {
      // Stop Video
      if (player && typeof player.pauseVideo === 'function') {
        youtubeContainer.classList.remove('active');
        setTimeout(() => {
          if (!youtubeContainer.classList.contains('active')) {
            player.pauseVideo();
          }
        }, 500);
      }

      // Stop Audio
      bgSound.pause();
    });

  } else {
    console.log("Mobile device detected: Hover animation & Audio disabled.");
    // Optional: Ensure the container is hidden on mobile just in case
    youtubeContainer.style.display = 'none';
  }
}