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


document.querySelectorAll('.mute-btn').forEach(button => {
  button.addEventListener('click', function() {
    // Find the video sibling of this button
    const video = this.parentElement.querySelector('video');
    
    if (video.muted) {
      video.muted = false;
      this.innerText = "Mute";
      this.style.background = "#38bdf8";
      this.style.color = "#0b0f1a";
    } else {
      video.muted = true;
      this.innerText = "Unmute";
      this.style.background = "rgba(11, 15, 26, 0.7)";
      this.style.color = "#38bdf8";
    }
  });
});