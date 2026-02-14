/* ===== Valentine's for Jaan — "Unlock My Heart" ===== */

// ----- Star generation (intro + main) -----
function createStars(containerId, count = 100) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const sizes = ['small', 'medium', 'large'];
  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.className = 'star ' + sizes[Math.floor(Math.random() * sizes.length)];
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.animationDuration = (2 + Math.random() * 2) + 's';
    container.appendChild(star);
  }
}
createStars('introStars', 80);
createStars('starsContainer', 140);

// ----- Intro: Unlock heart -----
const introScreen = document.getElementById('introScreen');
const mainScreen = document.getElementById('mainScreen');
const heartLock = document.getElementById('heartLock');

heartLock.addEventListener('click', () => {
  heartLock.style.transform = 'scale(0.9)';
  heartLock.style.opacity = '0.8';
  setTimeout(() => {
    introScreen.classList.add('hidden');
    mainScreen.classList.add('visible');
    document.body.style.overflow = 'auto';
  }, 400);
});

// ----- Typing animation -----
const messages = [
  "Jaan, you make every moment magical.",
  "With you, every day feels like Valentine's.",
  "You're not just my love — you're my forever.",
  "My heart belongs to you, Jaan. Always."
];
let msgIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 80;

function typeEffect() {
  const current = messages[msgIndex];
  const typedEl = document.getElementById('typed');
  if (!typedEl) return;

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 35;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 75;
  }

  if (!isDeleting && charIndex === current.length) {
    typingSpeed = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    msgIndex = (msgIndex + 1) % messages.length;
    typingSpeed = 400;
  }
  setTimeout(typeEffect, typingSpeed);
}
setTimeout(typeEffect, 1200);

// ----- Love letter: Envelope -----
const letterOverlay = document.getElementById('letterOverlay');
const btnLetter = document.getElementById('btnLetter');
const closeLetter = document.getElementById('closeLetter');
const envelopeWrap = document.getElementById('envelopeWrap');
const surpriseMsg = document.getElementById('surpriseMsg');

btnLetter.addEventListener('click', () => {
  letterOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  setTimeout(() => letterOverlay.classList.add('open'), 100);
});

function closeLetterModal() {
  letterOverlay.classList.remove('open');
  setTimeout(() => {
    letterOverlay.classList.remove('active');
    document.body.style.overflow = '';
    surpriseMsg.textContent = 'I love you, Jaan.';
    surpriseMsg.classList.add('visible');
    setTimeout(() => surpriseMsg.classList.remove('visible'), 3200);
  }, 400);
}

closeLetter.addEventListener('click', (e) => {
  e.stopPropagation();
  closeLetterModal();
});

letterOverlay.addEventListener('click', (e) => {
  if (e.target === letterOverlay) closeLetterModal();
});

// ----- Moon -----
const moonBtn = document.getElementById('moonBtn');
moonBtn.addEventListener('click', () => {
  moonBtn.classList.add('revealed');
  createConfetti();
});

// ----- 404 -----
const modal404 = document.getElementById('modal404');
const btn404 = document.getElementById('btn404');
const close404 = document.getElementById('close404');

btn404.addEventListener('click', () => {
  modal404.classList.add('active');
  document.body.style.overflow = 'hidden';
});

close404.addEventListener('click', () => {
  modal404.classList.remove('active');
  document.body.style.overflow = '';
});

modal404.addEventListener('click', (e) => {
  if (e.target === modal404) {
    modal404.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ----- Accept: fill constellation, confetti, success -----
const btnAccept = document.getElementById('btnAccept');
const confettiContainer = document.getElementById('confettiContainer');
const successOverlay = document.getElementById('successOverlay');
const constellation = document.querySelector('.constellation-heart');

const hearts = ['❤️', '💕', '💗', '💖', '💝'];
const colors = ['#ec4899', '#f472b6', '#fbcfe8', '#fde047', '#a78bfa'];

function createConfetti() {
  if (!confettiContainer) return;
  confettiContainer.innerHTML = '';
  for (let i = 0; i < 55; i++) {
    const c = document.createElement('div');
    c.className = Math.random() > 0.5 ? 'confetti heart' : 'confetti';
    c.textContent = Math.random() > 0.5 ? hearts[Math.floor(Math.random() * hearts.length)] : '';
    if (!c.textContent) {
      c.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      c.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    }
    c.style.left = Math.random() * 100 + '%';
    c.style.animationDelay = Math.random() * 0.5 + 's';
    c.style.animationDuration = (2 + Math.random() * 2) + 's';
    confettiContainer.appendChild(c);
  }
  setTimeout(() => { confettiContainer.innerHTML = ''; }, 4000);
}

btnAccept.addEventListener('click', () => {
  btnAccept.classList.add('clicked');
  btnAccept.textContent = 'Accepted! 💕';
  if (constellation) constellation.classList.add('filled');
  createConfetti();
  successOverlay.classList.add('show');
  setTimeout(() => {
    surpriseMsg.textContent = "You're the best thing that ever happened to me, Jaan.";
    surpriseMsg.classList.add('visible');
  }, 1500);
  setTimeout(() => successOverlay.classList.remove('show'), 5200);
});

// ----- Scroll surprise -----
window.addEventListener('scroll', () => {
  if (window.scrollY > 180 && !btnAccept.classList.contains('clicked')) {
    surpriseMsg.textContent = "There's more love for you up here, Jaan.";
    surpriseMsg.classList.add('visible');
  }
});

// ----- Title click = confetti -----
const mainTitle = document.getElementById('mainTitle');
if (mainTitle) {
  mainTitle.addEventListener('click', () => {
    mainTitle.style.animation = 'none';
    mainTitle.offsetHeight;
    mainTitle.style.animation = 'titleIn 0.5s ease-out';
    createConfetti();
  });
}
