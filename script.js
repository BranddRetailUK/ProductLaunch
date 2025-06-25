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

    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
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

    // ✅ Add manual test trigger button if enabled
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
