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
    "“Swampies get first shot at the signature contrast hoodie — only 30 pieces. Full collection unlocks after they’re gone.”",
    "“Early birds grab the limited hoodie; the rest of the lineup follows right after.”",
    "“Bubbles preview the collection — more looks unlock at launch.”"
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
    pJS.particles.color.value = "#FF5F7A";
    pJS.particles.line_linked.color = "#5CF3C5";
    pJS.particles.move.speed = 1.6;
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
  banner.textContent = "Signature hoodie is live";
  document.querySelector(".container")?.appendChild(banner);

  // 🛒 Buy button (already styled & pulsing)
  setTimeout(() => {
    buyNowWrapper?.classList.remove("hidden");
    buyNowWrapper?.classList.add("visible");

    buyNowWrapper.innerHTML = `
      <a href="https://colaplays.com"
         id="buy-now-button"
         target="_blank"
         style="
           display: inline-flex;
           align-items: center;
           gap: 10px;
           padding: 16px 36px;
           font-size: 1.15rem;
           font-weight: 800;
           letter-spacing: 0.04em;
           background: linear-gradient(120deg, #ff5f7a, #ffd166, #5cf3c5);
           color: #060812;
           text-decoration: none;
           border-radius: 14px;
           opacity: 0;
           transform: scale(0.86);
           box-shadow: 0 18px 45px rgba(255, 95, 122, 0.45), 0 12px 38px rgba(92, 243, 197, 0.32);
           transition: all 0.35s ease;
           animation: pulseCTA 2s infinite ease-in-out;
         "
         onmouseover="this.style.transform='scale(1.04) translateY(-2px)'; this.style.boxShadow='0 14px 40px rgba(255,95,122,0.35), 0 10px 28px rgba(92,243,197,0.25)'"
         onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 18px 45px rgba(255,95,122,0.45), 0 12px 38px rgba(92,243,197,0.32)'"
      >
        CLAIM THE HOODIE
      </a>

      <style>
        @keyframes pulseCTA {
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

  // 🎉 Enhanced particle burst
  const particleContainer = document.getElementById("buy-now-particles");
  for (let i = 0; i < 40; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const colors = ["#ffffff", "#ffd700", "rgba(255, 232, 25, 0.6)"];
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const size = 6 + Math.random() * 10;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;

    p.style.left = "0px";
    p.style.top = "0px";

    const angle = Math.random() * 2 * Math.PI;
    const radius = 100 + Math.random() * 100; // up to 200px
    p.style.setProperty("--x", `${Math.cos(angle) * radius}px`);
    p.style.setProperty("--y", `${Math.sin(angle) * radius}px`);

    particleContainer.appendChild(p);
    setTimeout(() => p.remove(), 2500); // stay longer
  }

  // ✨ Sparkle drift (starts 0.5s after burst)
  setTimeout(() => {
    const sparkleContainer = document.getElementById("buy-now-sparkles");
    for (let i = 0; i < 30; i++) {
      const s = document.createElement("div");
      s.className = "sparkle";
      s.style.backgroundColor = Math.random() > 0.5 ? "#ffffff" : "#ffd700";

      const size = 3 + Math.random() * 4;
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;

      const x = (Math.random() - 0.5) * 300;
      const y = 100 + Math.random() * 100;
      s.style.setProperty("--x", `${x}px`);
      s.style.setProperty("--y", `${y}px`);

      sparkleContainer.appendChild(s);
      setTimeout(() => s.remove(), 3000);
    }
  }, 500); // end sparkle drift

}, 100); // end Buy Now animation trigger (inside setTimeout(..., 2000))


setTimeout(() => {
  const sparkleContainer = document.getElementById("buy-now-sparkles");
  for (let i = 0; i < 30; i++) {
    const s = document.createElement("div");
    s.className = "sparkle";
    s.style.backgroundColor = Math.random() > 0.5 ? "#ffffff" : "#ffd700";

    const size = 3 + Math.random() * 4;
    s.style.width = `${size}px`;
    s.style.height = `${size}px`;

    const x = (Math.random() - 0.5) * 300;
    const y = 100 + Math.random() * 100;
    s.style.setProperty("--x", `${x}px`);
    s.style.setProperty("--y", `${y}px`);

    sparkleContainer.appendChild(s);
    setTimeout(() => s.remove(), 3000);
  }
}, 500);

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
  "https://cdn.shopify.com/s/files/1/0841/7545/4535/files/1_a3d0a226-a53e-4ee7-92e4-77ed48a1e3ce.jpg?v=1764498131",
  "https://cdn.shopify.com/s/files/1/0841/7545/4535/files/2_a6f2ffeb-4998-4714-9e39-0e83d218c9ac.jpg?v=1764498131",
  "https://cdn.shopify.com/s/files/1/0841/7545/4535/files/3_4893573c-d04b-48af-bfa9-3392b0122307.jpg?v=1764498131",
  "https://cdn.shopify.com/s/files/1/0841/7545/4535/files/4_618423a0-9e27-4891-98f3-51ee4ae15ddf.jpg?v=1764498131",
  "https://cdn.shopify.com/s/files/1/0841/7545/4535/files/5_c96dd24a-9eaa-418d-8e07-3b1e6bac4811.jpg?v=1764498131",
  "https://cdn.shopify.com/s/files/1/0841/7545/4535/files/6_344a3dd6-d210-4055-b178-dd6942f3de1a.jpg?v=1764498131",
  "https://cdn.shopify.com/s/files/1/0841/7545/4535/files/7_a22edf07-be31-4aa4-a53b-b5678efe0a82.jpg?v=1764498131",
  "https://cdn.shopify.com/s/files/1/0841/7545/4535/files/8_f0d6fb07-ec13-43eb-982b-c3501f429d07.jpg?v=1764498131",
  "https://cdn.shopify.com/s/files/1/0841/7545/4535/files/9_9ac02cf6-235f-410a-ae42-464fc478f802.jpg?v=1764498131",
  "https://cdn.shopify.com/s/files/1/0841/7545/4535/files/10_8b7d8431-a5e5-4491-a88f-ebca7c346688.jpg?v=1764498131",
  "https://cdn.shopify.com/s/files/1/0841/7545/4535/files/11_dbfe5ddb-20d6-4a79-aca5-6a30ffb4f943.jpg?v=1764498131",
  "https://cdn.shopify.com/s/files/1/0841/7545/4535/files/12_44a45bbd-78f2-44fa-bfc7-9106081d4350.jpg?v=1764498132",
  "https://cdn.shopify.com/s/files/1/0841/7545/4535/files/13_ea1f12f8-8ac9-4aad-9e39-cde21c140296.jpg?v=1764498132"
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

const allImagePaths = imageSources;

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
