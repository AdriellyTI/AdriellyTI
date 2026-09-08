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
// EASTER CAT!!!!
// ==========================================
const easterCat = document.querySelector("#easter-cat-sprite");

const idleFrames = [
  "assets/cat/idle/idle-1.png",
  "assets/cat/idle/idle-2.png"
];

let idleFrame = 0;

setInterval(() => {
  idleFrame = (idleFrame + 1) % idleFrames.length;

  easterCat.src = idleFrames[idleFrame];
}, 900);

// ==========================================
// MOVIMENTO DA GATINHA
// ==========================================

const catContainer = document.querySelector("#easter-cat");

let catY = window.innerHeight - 150;
let catDirection = -1;
let catSpeed = 0.5;

function moveCat() {
  catY += catDirection * catSpeed;

  // Limite superior
  if (catY <= 20) {
    catY = 20;
    catDirection = 1;
  }

  // Limite inferior
  const maxY = window.innerHeight - catContainer.offsetHeight - 20;

  if (catY >= maxY) {
    catY = maxY;
    catDirection = -1;
  }

  catContainer.style.top = `${catY}px`;

  requestAnimationFrame(moveCat);
}

moveCat();