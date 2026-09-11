const typingEl = document.querySelector("#typing");
const phrases = [
  "Full Stack Developer em formação.",
  "Estudando Flutter e Dart.",
  "Construindo projetos acadêmicos.",
  "Apaixonada por desafios de código."
];
let phrase = 0, char = 0, deleting = false;
function typeLoop() {
  const text = phrases[phrase];
  typingEl.textContent = text.slice(0, char);
  if (!deleting && char < text.length) { char++; setTimeout(typeLoop, 65); }
  else if (!deleting) { deleting = true; setTimeout(typeLoop, 1400); }
  else if (char > 0) { char--; setTimeout(typeLoop, 32); }
  else { deleting = false; phrase = (phrase + 1) % phrases.length; setTimeout(typeLoop, 400); }
}
typeLoop();

const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
  const cat = document.querySelector("#cat");
  if (cat && window.innerWidth > 700) {
    const x = (e.clientX / innerWidth - .5) * 18;
    const y = (e.clientY / innerHeight - .5) * 10;
    cat.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;
  }
});


const themeBtn = document.querySelector("#themeBtn");
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀" : "☾";
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});
if (localStorage.getItem("theme") === "dark") { document.body.classList.add("dark"); themeBtn.textContent = "☀"; }

document.querySelectorAll(".extra-links button").forEach(btn => {
  btn.addEventListener("click", () => alert(`Área reservada para seu ${btn.dataset.placeholder}. Edite o link no index.html quando quiser adicionar sua conta.`));
});
document.querySelector("#year").textContent = new Date().getFullYear();

// ==========================================
// EASTER CAT - INTERAÇÃO & MOVIMENTO
// ==========================================
(function initEasterCat() {
  const catContainer = document.querySelector("#easter-cat");
  const catSprite = document.querySelector("#easter-cat-sprite");
  const speechBubble = document.querySelector("#cat-speech");
  const counterBadge = document.querySelector("#cat-counter");
  const counterVal = document.querySelector("#cat-counter-val");

  if (!catContainer || !catSprite) return;

  // Sprites organizados por estado
  const SPRITES = {
    idle: ["assets/cat/idle/idle-1.png", "assets/cat/idle/idle-2.png"],
    walk: ["assets/cat/walk/walk-1.png", "assets/cat/walk/walk-2.png", "assets/cat/walk/walk-3.png"],
    run: ["assets/cat/run/run-1.png", "assets/cat/run/run-2.png", "assets/cat/run/run-3.png"]
  };

  // Frases conforme o número de capturas (Fase 6)
  const SPEECH_MESSAGES = [
    "miau! 🐾",
    "Ei! 🐾",
    "Você está ficando bom nisso...",
    "EI! 😾",
    "Você conseguiu me pegar! 🎉",
    "Persistente, né? 😻",
    "Ronrom... 💖",
    "Amigos para sempre! 🐾"
  ];

  // Estado e posição
  let state = "idle"; // 'idle' | 'walk' | 'run' | 'jump' | 'paused'
  let posX = Math.max(30, Math.min(window.innerWidth - 90, 80));
  let posY = Math.max(120, Math.min(window.innerHeight - 150, 260));
  let targetX = posX;
  let targetY = posY;
  let facingRight = true;
  let currentFrameIdx = 0;
  let speechTimeout = null;
  let idlePauseUntil = 0;
  let captures = parseInt(sessionStorage.getItem("cat_captures") || "0", 10);

  // Inicializar contador se já existirem capturas nesta sessão
  if (captures > 0 && counterBadge && counterVal) {
    counterVal.textContent = captures;
    counterBadge.style.display = "flex";
  }

  // Posição inicial
  catContainer.style.left = `${posX}px`;
  catContainer.style.top = `${posY}px`;

  // Obter limites seguros da tela
  function getSafeBounds() {
    const margin = 20;
    const catSize = 65;
    const navHeight = 70;
    return {
      minX: margin,
      maxX: Math.max(margin + 50, window.innerWidth - catSize - margin),
      minY: navHeight + margin,
      maxY: Math.max(navHeight + margin + 50, window.innerHeight - catSize - margin)
    };
  }

  // Escolher novo destino aleatório na tela
  function pickNewDestination() {
    const bounds = getSafeBounds();
    const sideBias = Math.random() < 0.65;
    if (sideBias) {
      targetX = Math.random() < 0.5 
        ? bounds.minX + Math.random() * 80 
        : bounds.maxX - Math.random() * 80;
    } else {
      targetX = bounds.minX + Math.random() * (bounds.maxX - bounds.minX);
    }
    targetY = bounds.minY + Math.random() * (bounds.maxY - bounds.minY);
    state = "walk";
  }

  // Rastreamento do mouse para percepção e fuga
  let mouseX = -9999;
  let mouseY = -9999;
  let isMouseNear = false;

  window.addEventListener("pointermove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Balão de fala
  function showSpeech(text, duration = 2600) {
    if (!speechBubble) return;
    if (speechTimeout) clearTimeout(speechTimeout);
    speechBubble.textContent = text;
    speechBubble.style.display = "block";
    speechTimeout = setTimeout(() => {
      speechBubble.style.display = "none";
    }, duration);
  }

  // Partículas ao clicar (patinhas, corações, estrelas)
  function spawnParticles(x, y) {
    const symbols = ["🐾", "💖", "✨", "🌸", "⭐"];
    for (let i = 0; i < 5; i++) {
      const p = document.createElement("span");
      p.className = "cat-particle";
      p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      p.style.left = `${x + (Math.random() * 40 - 20)}px`;
      p.style.top = `${y + (Math.random() * 20 - 10)}px`;
      p.style.setProperty("--dx", `${(Math.random() - 0.5) * 60}px`);
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 950);
    }
  }

  // Interação de Clique na gatinha
  catContainer.addEventListener("click", (e) => {
    e.stopPropagation();
    captures++;
    sessionStorage.setItem("cat_captures", captures.toString());

    // Atualizar badge do contador
    if (counterBadge && counterVal) {
      counterVal.textContent = captures;
      counterBadge.style.display = "flex";
    }

    // Pulo e partículas
    catContainer.classList.remove("cat-jump");
    void catContainer.offsetWidth; // reset reflow
    catContainer.classList.add("cat-jump");
    spawnParticles(posX + 29, posY + 20);

    // Mensagem de fala
    const msgIdx = Math.min(captures - 1, SPEECH_MESSAGES.length - 1);
    showSpeech(SPEECH_MESSAGES[msgIdx], captures === 5 ? 4200 : 2500);

    // Pausar movimento por 1.2s e depois fugir para outro local
    state = "paused";
    idlePauseUntil = performance.now() + 1200;
    setTimeout(() => {
      pickNewDestination();
      state = "run";
    }, 1200);
  });

  // Loop de animação de frames dos sprites
  let lastFrameTime = 0;
  function updateSpriteAnimation(now) {
    let frameRate = 750;
    let frames = SPRITES.idle;

    if (state === "walk") {
      frames = SPRITES.walk;
      frameRate = 170;
    } else if (state === "run") {
      frames = SPRITES.run;
      frameRate = 100;
    }

    if (now - lastFrameTime > frameRate) {
      currentFrameIdx = (currentFrameIdx + 1) % frames.length;
      catSprite.src = frames[currentFrameIdx];
      lastFrameTime = now;
    }

    // Inverter sprite horizontalmente conforme direção
    catSprite.style.transform = facingRight ? "scaleX(1)" : "scaleX(-1)";
  }

  // Loop principal de física e movimentação
  let lastTime = performance.now();
  function loop(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.1);
    lastTime = now;

    const bounds = getSafeBounds();

    if (state !== "paused") {
      // 1. Percepção do cursor (fuga suave quando o mouse se aproxima em desktops)
      const catCenterX = posX + 29;
      const catCenterY = posY + 29;
      const distToMouse = Math.hypot(mouseX - catCenterX, mouseY - catCenterY);
      const isDesktop = window.innerWidth > 700;

      if (isDesktop && distToMouse < 110 && distToMouse > 0) {
        isMouseNear = true;
        state = "run";
        const fleeAngle = Math.atan2(catCenterY - mouseY, catCenterX - mouseX);
        const fleeSpeed = 220; // velocidade de corrida ao fugir

        posX += Math.cos(fleeAngle) * fleeSpeed * dt;
        posY += Math.sin(fleeAngle) * fleeSpeed * dt;

        facingRight = Math.cos(fleeAngle) > 0;

        // Deslizar se bater nas bordas
        posX = Math.max(bounds.minX, Math.min(bounds.maxX, posX));
        posY = Math.max(bounds.minY, Math.min(bounds.maxY, posY));

        targetX = posX;
        targetY = posY;
      } else {
        if (isMouseNear) {
          isMouseNear = false;
          pickNewDestination();
        }

        // 2. Movimento autônomo suave
        const dx = targetX - posX;
        const dy = targetY - posY;
        const dist = Math.hypot(dx, dy);

        if (dist > 6) {
          const speed = state === "run" ? 170 : 50;
          const moveStep = Math.min(dist, speed * dt);
          posX += (dx / dist) * moveStep;
          posY += (dy / dist) * moveStep;

          if (Math.abs(dx) > 2) {
            facingRight = dx > 0;
          }
        } else {
          // Chegou ao destino -> pausar em idle
          if (state !== "idle") {
            state = "idle";
            idlePauseUntil = now + 1600 + Math.random() * 2600;
          } else if (now > idlePauseUntil) {
            pickNewDestination();
          }
        }
      }

      // Manter dentro dos limites da tela
      posX = Math.max(bounds.minX, Math.min(bounds.maxX, posX));
      posY = Math.max(bounds.minY, Math.min(bounds.maxY, posY));

      catContainer.style.left = `${posX}px`;
      catContainer.style.top = `${posY}px`;
    }

    updateSpriteAnimation(now);
    requestAnimationFrame(loop);
  }

  // Iniciar após pequeno delay
  setTimeout(() => {
    pickNewDestination();
    requestAnimationFrame(loop);
  }, 400);
})();