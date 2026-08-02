/* ═══════════════════════════════════════════════════════════════
   BIRTHDAY WEBSITE — script.js
   Shooting Stars, Petals, Butterflies, Envelope Animation, Click Sparkles
   ═══════════════════════════════════════════════════════════════ */

'use strict';

// ── Canvas Setup
const starCanvas     = document.getElementById('starCanvas');
const confettiCanvas = document.getElementById('confettiCanvas');
const fireworkCanvas = document.getElementById('fireworkCanvas');

const starCtx = starCanvas.getContext('2d');
const confCtx = confettiCanvas.getContext('2d');
const fwCtx   = fireworkCanvas.getContext('2d');

function resizeCanvases() {
  [starCanvas, confettiCanvas, fireworkCanvas].forEach(c => {
    c.width  = window.innerWidth;
    c.height = window.innerHeight;
  });
}
resizeCanvases();
window.addEventListener('resize', resizeCanvases);

// ── DOM References
const screenWelcome     = document.getElementById('screen-welcome');
const screenCelebration = document.getElementById('screen-celebration');
const openWishBtn       = document.getElementById('openWishBtn');

const envelopeOverlay   = document.getElementById('envelopeOverlay');
const envelope          = document.getElementById('envelope');

const blossomContainer  = document.getElementById('blossomContainer');
const butterflyContainer= document.getElementById('butterflyContainer');

const cakeContainer     = document.getElementById('cakeContainer');
const cakeWrapper       = document.getElementById('cakeWrapper');
const cakeHint          = document.getElementById('cakeHint');
const sparklesContainer = document.getElementById('sparklesContainer');
const sectionBlocks     = document.querySelectorAll('.section-block');

/* ────────────────────────────────────────────────────────────────
   1. SHOOTING STARS & SOFT BACKGROUND STARS
   ──────────────────────────────────────────────────────────────── */
const stars = [];
const shootingStars = [];

function initStars() {
  stars.length = 0;
  for (let i = 0; i < 90; i++) {
    stars.push({
      x: Math.random() * starCanvas.width,
      y: Math.random() * starCanvas.height,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random(),
      speed: Math.random() * 0.015 + 0.005
    });
  }
}
initStars();
window.addEventListener('resize', initStars);

function spawnShootingStar() {
  shootingStars.push({
    x: Math.random() * starCanvas.width * 0.7,
    y: Math.random() * starCanvas.height * 0.4,
    length: Math.random() * 80 + 60,
    speed: Math.random() * 8 + 6,
    angle: Math.PI / 4, // 45deg diagonal
    alpha: 1,
    life: 0
  });
}

// Spawn shooting stars periodically
setInterval(() => {
  if (Math.random() < 0.6) spawnShootingStar();
}, 3000);

function drawStars() {
  starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);

  // Background twinkles
  stars.forEach(s => {
    s.alpha += s.speed;
    const a = Math.abs(Math.sin(s.alpha));
    starCtx.beginPath();
    starCtx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    starCtx.fillStyle = `rgba(180, 140, 210, ${a * 0.7})`;
    starCtx.fill();
  });

  // Shooting stars
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const st = shootingStars[i];
    st.x += Math.cos(st.angle) * st.speed;
    st.y += Math.sin(st.angle) * st.speed;
    st.life += 1;
    st.alpha -= 0.018;

    if (st.alpha <= 0) {
      shootingStars.splice(i, 1);
      continue;
    }

    const tailX = st.x - Math.cos(st.angle) * st.length;
    const tailY = st.y - Math.sin(st.angle) * st.length;

    const grad = starCtx.createLinearGradient(st.x, st.y, tailX, tailY);
    grad.addColorStop(0, `rgba(255, 255, 255, ${st.alpha})`);
    grad.addColorStop(0.3, `rgba(255, 214, 232, ${st.alpha * 0.8})`);
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    starCtx.beginPath();
    starCtx.moveTo(st.x, st.y);
    starCtx.lineTo(tailX, tailY);
    starCtx.strokeStyle = grad;
    starCtx.lineWidth = 2.5;
    starCtx.stroke();
  }
}

/* ────────────────────────────────────────────────────────────────
   2. CHERRY BLOSSOM PETALS & BUTTERFLIES
   ──────────────────────────────────────────────────────────────── */
function spawnPetal() {
  const petal = document.createElement('div');
  petal.className = 'petal';
  const size = Math.random() * 8 + 8;
  petal.style.width = `${size}px`;
  petal.style.height = `${size * 1.2}px`;
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.top = `-20px`;
  
  const dur = Math.random() * 6 + 6;
  petal.style.animationDuration = `${dur}s`;

  blossomContainer.appendChild(petal);
  setTimeout(() => petal.remove(), dur * 1000);
}
setInterval(spawnPetal, 600);

function spawnButterfly() {
  if (butterflyContainer.children.length >= 3) return;
  const bf = document.createElement('div');
  bf.className = 'butterfly';
  bf.textContent = '🦋';
  bf.style.left = `${Math.random() * 85 + 5}%`;
  bf.style.top = `${Math.random() * 70 + 15}%`;

  const dur = Math.random() * 8 + 8;
  bf.style.animationDuration = `${dur}s`;

  butterflyContainer.appendChild(bf);
  setTimeout(() => bf.remove(), dur * 1000);
}
setInterval(spawnButterfly, 4000);

/* ────────────────────────────────────────────────────────────────
   3. CLICK SPARKLE EFFECT ANYWHERE
   ──────────────────────────────────────────────────────────────── */
window.addEventListener('click', (e) => {
  const colors = ['#FFD6E8', '#DCC6FF', '#CDEBFF', '#F7E7B6', '#E5C365'];
  for (let i = 0; i < 10; i++) {
    const sp = document.createElement('div');
    sp.className = 'click-sparkle';
    const size = Math.random() * 6 + 4;
    sp.style.width = `${size}px`;
    sp.style.height = `${size}px`;
    sp.style.left = `${e.clientX}px`;
    sp.style.top = `${e.clientY}px`;
    sp.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    const angle = (Math.PI * 2 / 10) * i;
    const dist = Math.random() * 40 + 20;
    sp.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    sp.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);

    document.body.appendChild(sp);
    setTimeout(() => sp.remove(), 700);
  }
});

/* ────────────────────────────────────────────────────────────────
   4. CONFETTI & FIREWORKS (PASTEL THEME)
   ──────────────────────────────────────────────────────────────── */
const confettiPieces = [];
const CONFETTI_COLORS = ['#FFD6E8', '#DCC6FF', '#CDEBFF', '#F7E7B6', '#DDF7E3', '#FFFFFF'];

function spawnConfetti(count = 150) {
  for (let i = 0; i < count; i++) {
    confettiPieces.push({
      x: Math.random() * confettiCanvas.width,
      y: -20,
      vx: (Math.random() - 0.5) * 4,
      vy: Math.random() * 3 + 2,
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 6,
      size: Math.random() * 8 + 6,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      alpha: 1,
      life: Math.random() * 100 + 80
    });
  }
}

function updateConfetti() {
  confCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (let i = confettiPieces.length - 1; i >= 0; i--) {
    const c = confettiPieces[i];
    c.x += c.vx;
    c.y += c.vy;
    c.rot += c.rotV;
    c.life--;
    c.alpha = Math.min(1, c.life / 30);
    if (c.life <= 0 || c.y > confettiCanvas.height + 20) {
      confettiPieces.splice(i, 1);
      continue;
    }
    confCtx.save();
    confCtx.globalAlpha = c.alpha;
    confCtx.translate(c.x, c.y);
    confCtx.rotate((c.rot * Math.PI) / 180);
    confCtx.fillStyle = c.color;
    confCtx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
    confCtx.restore();
  }
}

const particles2 = [];
const FW_COLORS = ['#FFD6E8', '#DCC6FF', '#CDEBFF', '#F7E7B6', '#FFFFFF'];

function launchFirework() {
  const x = Math.random() * fireworkCanvas.width * 0.8 + fireworkCanvas.width * 0.1;
  const y = Math.random() * fireworkCanvas.height * 0.4 + 50;
  const color = FW_COLORS[Math.floor(Math.random() * FW_COLORS.length)];

  for (let i = 0; i < 60; i++) {
    const angle = (Math.PI * 2 / 60) * i;
    const speed = Math.random() * 4 + 2;
    particles2.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color,
      r: Math.random() * 2 + 1,
      life: Math.random() * 50 + 30
    });
  }
}

function updateFireworks() {
  fwCtx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);
  for (let i = particles2.length - 1; i >= 0; i--) {
    const p = particles2[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05;
    p.life--;
    p.alpha = Math.max(0, p.life / 50);
    if (p.life <= 0) { particles2.splice(i, 1); continue; }
    fwCtx.save();
    fwCtx.globalAlpha = p.alpha;
    fwCtx.shadowBlur = 6;
    fwCtx.shadowColor = p.color;
    fwCtx.beginPath();
    fwCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    fwCtx.fillStyle = p.color;
    fwCtx.fill();
    fwCtx.restore();
  }
}

/* ────────────────────────────────────────────────────────────────
   5. ENVELOPE OPEN SEQUENCE & SCREEN TRANSITION
   ──────────────────────────────────────────────────────────────── */
function openEnvelopeSequence() {
  openWishBtn.disabled = true;

  // Show Envelope Overlay
  envelopeOverlay.classList.add('active');

  // Trigger flap open after brief pause
  setTimeout(() => {
    envelope.classList.add('open');
    spawnConfetti(80);
  }, 400);

  // Transition to Celebration Screen after letter unfolds
  setTimeout(() => {
    envelopeOverlay.classList.remove('active');
    
    screenWelcome.classList.remove('active');
    screenWelcome.classList.add('exit');

    setTimeout(() => {
      screenWelcome.style.display = 'none';
      document.body.style.overflowY = 'auto';
      screenCelebration.classList.add('active');
      screenCelebration.scrollIntoView({ behavior: 'smooth' });

      spawnConfetti(150);
      launchFirework();
      setTimeout(launchFirework, 400);

      initScrollObserver();
      triggerCelebrationReveals();
    }, 600);
  }, 2600);
}

openWishBtn.addEventListener('click', openEnvelopeSequence);

/* ────────────────────────────────────────────────────────────────
   6. CELEBRATION REVEALS & CAKE INTERACTION
   ──────────────────────────────────────────────────────────────── */
function triggerCelebrationReveals() {
  const blocks = [
    document.getElementById('messageSection'),
    document.getElementById('wishSection'),
    document.getElementById('cakeSection'),
    document.getElementById('finalSection')
  ];

  blocks.forEach((block, index) => {
    setTimeout(() => {
      block.classList.add('visible');
    }, index * 400 + 200);
  });
}

function initScrollObserver() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sectionBlocks.forEach(b => observer.observe(b));
}

let cakeLit = false;
cakeContainer.addEventListener('click', () => {
  spawnConfetti(120);
  launchFirework();
  setTimeout(launchFirework, 300);

  // Sparkle burst from cake
  const emojis = ['✨', '🌸', '💖', '🌟', '💫'];
  for (let i = 0; i < 15; i++) {
    const sp = document.createElement('div');
    sp.className = 'sparkle-item';
    sp.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    sp.style.left = `${Math.random() * 80 + 10}%`;
    sp.style.top = `${Math.random() * 60 + 20}%`;
    sparklesContainer.appendChild(sp);
    setTimeout(() => sp.remove(), 1200);
  }

  cakeHint.textContent = '🎉 Wishing you the happiest birthday, Niccaa! ✨';
});

/* ────────────────────────────────────────────────────────────────
   ANIMATION LOOP
   ──────────────────────────────────────────────────────────────── */
function animLoop() {
  drawStars();
  updateConfetti();
  updateFireworks();
  requestAnimationFrame(animLoop);
}

document.body.style.overflow = 'hidden';
requestAnimationFrame(animLoop);
