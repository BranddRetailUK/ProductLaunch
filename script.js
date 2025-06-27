const urlParams = new URLSearchParams(window.location.search);
const isTestMode = urlParams.has("test");

function startCountdown(launchTime) {
  const countdownEl = document.getElementById("countdown");
  const productEl = document.getElementById("product-section");
  const buyNowWrapper = document.getElementById("buy-now-wrapper");
  const headlineEl = document.querySelector(".headline");
  const logoEl = document.querySelector(".logo");
  const quoteWrapper = document.getElementById("quote-wrapper");
  const quoteEl = document.getElementById("quote-placeholder");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  const quotes = [
    "“Built to stand out from the crowd, engineered with launch day in mind — your moment begins now.”",
    "“Designed for legends — crafted to elevate every moment you wear it.”",
    "“You don’t follow trends — you set the tone, define the moment, and launch what’s next.”"
  ];

  let currentQuoteIndex = 0;
  quoteEl.textContent = quotes[currentQuoteIndex];
  quoteEl.classList.add("show-instantly");
  setTimeout(() => quoteEl.classList.remove("show-instantly"), 100);

  setInterval(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    quoteEl.classList.remove("quote-transition");
    setTimeout(() => {
      quoteEl.textContent = quotes[currentQuoteIndex];
      quoteEl.classList.add("quote-transition");
    }, 1000);
  }, 10000);

  function subtlyEnhanceParticles() {
    const pJS = pJSDom[0].pJS;
    pJS.particles.color.value = "#FFD700";
    pJS.particles.move.speed = 1.5;
    pJS.particles.opacity.value = 0.9;
    pJS.fn.particlesRefresh();
  }

  function updateCountdown() {
  const now = Date.now();
  const distance = launchTime - now;




  if (distance <= 0) {
  clearInterval(timerInterval);
  clearInterval(bubbleRespawnInterval);
  document.querySelectorAll(".bubble").forEach((b) => b.remove());
  subtlyEnhanceParticles();

  // 🚨 White flash
  const flash = document.getElementById("screen-flash");
  flash.style.opacity = "1";
  setTimeout(() => flash.style.opacity = "0", 200);

  // 🌀 Zoom burst
  document.body.classList.add("zoom-burst");
  setTimeout(() => document.body.classList.remove("zoom-burst"), 600);

  // 🔊 Play sound
  document.getElementById("launch-sfx")?.play().catch(() => {});

  // 💥 Pop countdown digits
  document.querySelectorAll("#countdown span").forEach(span => {
    span.style.display = "inline-block";
    span.style.animation = "popDigit 0.4s ease forwards";
  });

  countdownEl?.classList.remove("countdown-flash");
  document.body.classList.remove("shake-screen");

  countdownEl?.classList.add("countdown-pop");
  setTimeout(() => countdownEl?.remove(), 600);

  headlineEl?.classList.add("fade-slide-up", "headline");
  logoEl?.classList.add("fade-slide-up", "logo");

  quoteWrapper?.classList.add("fade-out");
  setTimeout(() => quoteWrapper?.classList.add("hidden"), 1000);

  // 🔥 Add launch headline
  const banner = document.createElement("div");
  banner.className = "launch-banner";
  document.querySelector(".container")?.appendChild(banner);

  // 🛒 Buy button (already styled & pulsing)
  setTimeout(() => {
    buyNowWrapper?.classList.remove("hidden");
    buyNowWrapper?.classList.add("visible");

    buyNowWrapper.innerHTML = `
      <a href="https://ggapparel.co.uk/products/og"
         id="buy-now-button"
         target="_blank"
         style="
           display: inline-block;
           padding: 16px 36px;
           font-size: 1.2rem;
           font-weight: bold;
           background-color: #000;
           color: #fff;
           text-decoration: none;
           border-radius: 10px;
           opacity: 0;
           transform: scale(0.8);
           transition: all 0.3s ease;
           animation: pulse 2s infinite ease-in-out;
         "
         onmouseover="this.style.backgroundColor='#fff'; this.style.color='#000'; this.style.transform='scale(1.05)'"
         onmouseout="this.style.backgroundColor='#000'; this.style.color='#fff'; this.style.transform='scale(1)'"
      >
        BUY NOW
      </a>

      <style>
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      </style>
    `;

    const btn = document.getElementById("buy-now-button");
    setTimeout(() => {
      btn.style.opacity = "1";
      btn.style.transform = "scale(1)";
    }, 100);

  }, 2000);

  return;
}








    const secondsLeft = Math.floor(distance / 1000);

    if (secondsLeft <= 10 && !countdownEl.classList.contains("countdown-flash")) {
      countdownEl.classList.add("countdown-flash");
    }

    if (secondsLeft <= 5 && !document.body.classList.contains("shake-screen")) {
      document.body.classList.add("shake-screen");
    }

    if (secondsLeft <= 20 && secondsLeft > 0 && !window._bubblesStartedPopping) {
      window._bubblesStartedPopping = true;
      popBubblesOverTime();
    }

    const hours = Math.floor(distance / (1000 * 60 * 60));
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  const timerInterval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

const bgMusic = document.getElementById("bg-music");
bgMusic.volume = 0.2;
["click", "touchstart"].forEach((event) => {
  window.addEventListener(
    event,
    () => {
      if (bgMusic.paused) {
        bgMusic.volume = 0;
        bgMusic.play().then(() => {
          setTimeout(() => {
            bgMusic.volume = 0.2;
          }, 100);
        }).catch(() => {});
      }
    },
    { once: true }
  );
});

particlesJS.load("particles-js", "particles.json");



// === Randomized Bubble Spawning ===
const imageSources = [
  "assets/image1.jpg", "assets/image2.jpg", "assets/image3.jpg", "assets/image4.jpg",
  "assets/image5.jpg", "assets/image6.jpg", "assets/image7.jpg", "assets/image8.jpg"
];

let bubbleImages = imageSources.flatMap(src => [src, src]);

for (let i = bubbleImages.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [bubbleImages[i], bubbleImages[j]] = [bubbleImages[j], bubbleImages[i]];
}

const bubbleContainer = document.getElementById("bubble-container");
bubbleImages.forEach((src) => {
  const img = document.createElement("img");
  img.src = src;
  img.classList.add("bubble");
  bubbleContainer.appendChild(img);
});

const speed = 0.8;
const bubbleStates = [];

requestAnimationFrame(() => {
  const bubbleElements = Array.from(document.querySelectorAll('.bubble'));
  bubbleElements.forEach((bubble) => {
    bubbleStates.push({
      el: bubble,
      x: Math.random() * (window.innerWidth - bubble.offsetWidth),
      y: Math.random() * (window.innerHeight - bubble.offsetHeight),
      dx: (Math.random() - 0.5) * speed * 2,
      dy: (Math.random() - 0.5) * speed * 2,
      cooldown: 0
    });
  });

  animateBubbles();

  fetch("/config.json")
    .then((res) => res.json())
    .then((data) => {
      const launchTime = isTestMode ? Date.now() + 15000 : data.launchTimestamp;
      startCountdown(launchTime);
    });
});

function getSize(el) {
  return el.offsetWidth;
}

function squish(el) {
  el.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease';
  el.style.transform = 'scale(1.1, 0.9)';
  el.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.9)';
  setTimeout(() => {
    el.style.transform = 'scale(1, 1)';
    el.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.35)';
  }, 150);
}

function animateBubbles() {
  bubbleStates.forEach((b1, i) => {
    const sizeA = getSize(b1.el);
    b1.x += b1.dx;
    b1.y += b1.dy;

    if (b1.x <= 0 || b1.x >= window.innerWidth - sizeA) b1.dx *= -1;
    if (b1.y <= 0 || b1.y >= window.innerHeight - sizeA) b1.dy *= -1;
    if (b1.cooldown > 0) b1.cooldown--;

    bubbleStates.forEach((b2, j) => {
      if (i >= j) return;

      const sizeB = getSize(b2.el);
      const dx = b1.x - b2.x;
      const dy = b1.y - b2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = (sizeA + sizeB) / 2;

      if (distance < minDistance) {
        [b1.dx, b2.dx] = [b2.dx, b1.dx];
        [b1.dy, b2.dy] = [b2.dy, b1.dy];

        const overlap = (minDistance - distance) / 2;
        const angle = Math.atan2(dy, dx);
        const offsetX = Math.cos(angle) * overlap;
        const offsetY = Math.sin(angle) * overlap;

        b1.x += offsetX;
        b1.y += offsetY;
        b2.x -= offsetX;
        b2.y -= offsetY;

        if (b1.cooldown === 0) {
          squish(b1.el);
          b1.cooldown = 10;
        }
        if (b2.cooldown === 0) {
          squish(b2.el);
          b2.cooldown = 10;
        }
      }
    });

    b1.el.style.left = `${b1.x}px`;
    b1.el.style.top = `${b1.y}px`;
  });

  requestAnimationFrame(animateBubbles);
}

function popBubblesOverTime() {
  const bubbles = Array.from(document.querySelectorAll(".bubble"));
  let index = 0;

  function popNext() {
    if (index >= bubbles.length) return;

    const bubble = bubbles[index];
    bubble.style.transition = "transform 0.4s cubic-bezier(0.6, -0.28, 0.735, 0.045), opacity 0.4s ease";
    bubble.style.transform = "scale(1.3)";
    bubble.style.opacity = "0.7";

    setTimeout(() => {
      bubble.style.transform = "scale(0)";
      bubble.style.opacity = "0";
    }, 200);

    setTimeout(() => {
      bubble.remove();
    }, 500);

    index++;
    setTimeout(popNext, 800);
  }

  popNext();
}

const allImagePaths = [
  "assets/image1.jpg", "assets/image2.jpg", "assets/image3.jpg", "assets/image4.jpg", "assets/image5.jpg",
  "assets/image6.jpg", "assets/image7.jpg", "assets/image8.jpg", "assets/image9.jpg", "assets/image10.jpg"
];

let imageQueueIndex = 0;
let bubbleRespawnInterval = null;
bubbleRespawnInterval = setInterval(() => {
  const activeBubbles = document.querySelectorAll(".bubble");
  if (activeBubbles.length === 0) return;

  const bubbleToReplace = activeBubbles[Math.floor(Math.random() * activeBubbles.length)];
  bubbleToReplace.style.transition = "transform 0.4s ease, opacity 0.4s ease";
  bubbleToReplace.style.transform = "scale(1.3)";
  bubbleToReplace.style.opacity = "0.7";

  // Step 1: Remove old bubble after fade-out
  setTimeout(() => {
    bubbleToReplace.remove();
  }, 400);

  // Step 2: Add new bubble after delay
  setTimeout(() => {
    const nextImg = document.createElement("img");
    nextImg.src = allImagePaths[imageQueueIndex % allImagePaths.length];
    nextImg.classList.add("bubble");

    nextImg.style.opacity = "0";
    nextImg.style.transform = "scale(0.5)";
    nextImg.style.transition = "transform 0.4s ease, opacity 0.4s ease";

    bubbleContainer.appendChild(nextImg);

    setTimeout(() => {
      nextImg.style.opacity = "1";
      nextImg.style.transform = "scale(1)";
    }, 20);

    bubbleStates.push({
      el: nextImg,
      x: Math.random() * (window.innerWidth - 100),
      y: Math.random() * (window.innerHeight - 100),
      dx: (Math.random() - 0.5) * speed * 2,
      dy: (Math.random() - 0.5) * speed * 2,
      cooldown: 0
    });

    imageQueueIndex++;
  }, 2400);

}, 6000);

