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
      subtlyEnhanceParticles();

      countdownEl?.classList.add("fade-out");
      headlineEl?.classList.add("fade-slide-up", "headline");
      logoEl?.classList.add("fade-slide-up", "logo");

      quoteWrapper?.classList.add("fade-out");
      setTimeout(() => {
        quoteWrapper?.classList.add("hidden");
      }, 1000);

      setTimeout(() => {
        buyNowWrapper?.classList.remove("hidden");
        buyNowWrapper?.classList.add("visible");
        loadShopifyBuyButton();
      }, 1200);
      return;
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

function ShopifyBuyInit() {
  const client = ShopifyBuy.buildClient({
    domain: "ggappareluk.myshopify.com",
    storefrontAccessToken: "51b8ad7c0b38bfa0b9ddab950170f7ca"
  });

  ShopifyBuy.UI.onReady(client).then((ui) => {
    ui.createComponent("product", {
      id: "10220096815431",
      node: document.getElementById("buy-now-wrapper"),
      moneyFormat: "%C2%A3{{amount}}",
      options: {
        product: {
          buttonDestination: "checkout",
          contents: { img: true, title: true, price: true },
          text: { button: "BUY NOW" },
          styles: {
            button: {
              backgroundColor: "#ffffff",
              color: "#1c1c1c",
              fontSize: "1.2rem",
              padding: "14px 30px",
              borderRadius: "8px",
              fontWeight: "bold",
              transition: "transform 0.2s ease-in-out"
            },
            buttonHover: { transform: "scale(1.05)" }
          }
        },
        cart: { startOpen: false }
      }
    });
  });
}

function loadShopifyBuyButton() {
  const script = document.createElement("script");
  script.src = "https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js";
  script.async = true;
  script.onload = ShopifyBuyInit;
  document.head.appendChild(script);
}

fetch("/config.json")
  .then((res) => res.json())
  .then((data) => {
    const launchTime = isTestMode ? Date.now() + 3000 : data.launchTimestamp;
    startCountdown(launchTime);

    if (data.musicEnabled && data.musicSrc) {
      const bgMusic = document.getElementById("bg-music");
      if (bgMusic) {
        bgMusic.src = data.musicSrc;
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
      }
    }

    if (data.showManualTestButton) {
      const testBtn = document.createElement("button");
      testBtn.textContent = "Trigger 5s Countdown";
      testBtn.style.position = "fixed";
      testBtn.style.bottom = "20px";
      testBtn.style.right = "20px";
      testBtn.style.padding = "12px 20px";
      testBtn.style.fontSize = "1rem";
      testBtn.style.zIndex = 9999;
      testBtn.style.borderRadius = "8px";
      testBtn.style.background = "#fff";
      testBtn.style.border = "none";
      testBtn.style.cursor = "pointer";
      testBtn.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";

      testBtn.onclick = () => {
        fetch("/update-launch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            launchTimestamp: Date.now() + 5000,
            musicEnabled: data.musicEnabled,
            musicSrc: data.musicSrc,
            showManualTestButton: data.showManualTestButton
          })
        }).then(() => location.reload());
      };

      document.body.appendChild(testBtn);
    }
  });


// ✅ Bubble motion + collision + squish
const bubbles = Array.from(document.querySelectorAll('.bubble'));
const size = 120;
const speed = 0.8;

const bubbleStates = bubbles.map(bubble => ({
  el: bubble,
  x: Math.random() * (window.innerWidth - size),
  y: Math.random() * (window.innerHeight - size),
  dx: (Math.random() - 0.5) * speed * 2,
  dy: (Math.random() - 0.5) * speed * 2,
  cooldown: 0
}));

function squish(el) {
  el.style.transition = 'transform 0.15s ease, box-shadow 0.15s ease';
  el.style.transform = 'scale(1.1, 0.9)';
  el.style.boxShadow = '0 0 40px rgba(255, 255, 255, 0.9)'; // strong pulse glow

  setTimeout(() => {
    el.style.transform = 'scale(1, 1)';
    el.style.boxShadow = '0 0 15px rgba(255, 255, 255, 0.35)'; // restore glow
  }, 150);
}



function animateBubbles() {
  bubbleStates.forEach((b1, i) => {
    b1.x += b1.dx;
    b1.y += b1.dy;

    if (b1.x <= 0 || b1.x >= window.innerWidth - size) b1.dx *= -1;
    if (b1.y <= 0 || b1.y >= window.innerHeight - size) b1.dy *= -1;

    if (b1.cooldown > 0) b1.cooldown--;

    bubbleStates.forEach((b2, j) => {
      if (i >= j) return;
      const dx = b1.x - b2.x;
      const dy = b1.y - b2.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < size) {
  // Swap directions
  [b1.dx, b2.dx] = [b2.dx, b1.dx];
  [b1.dy, b2.dy] = [b2.dy, b1.dy];

  // Push them apart to avoid sticking
  const overlap = (size - distance) / 2;
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

animateBubbles();
