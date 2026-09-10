/* Shubham Sharma — portfolio */
const slides = [
  {
    name: "Shubham<br />Sharma",
    published: "Web Developer & Designer",
    label: "Role",
    body: "Front-End Developer crafting clean, responsive and accessible interfaces for the modern web.",
    tagA: "Web Developer",
    tagB: "Based in<br />India",
  },
  {
    name: "Shubham<br />Sharma",
    published: "Web Developer & Designer",
    label: "Focus",
    body: "I build fast, friendly websites and web apps — from polished landing pages to full interactive experiences.",
    tagA: "UI / UX",
    tagB: "Responsive<br />Design",
  },
  {
    name: "Shubham<br />Sharma",
    published: "Web Developer & Designer",
    label: "Approach",
    body: "Clean code, thoughtful design, mobile-first thinking. Every project starts with the person who will use it.",
    tagA: "Clean Code",
    tagB: "Mobile<br />First",
  },
  {
    name: "Shubham<br />Sharma",
    published: "Web Developer & Designer",
    label: "Tools",
    body: "HTML, CSS and JavaScript are my daily drivers — and I'm always learning something new next.",
    tagA: "JavaScript",
    tagB: "React",
  },
  {
    name: "Shubham<br />Sharma",
    published: "Web Developer & Designer",
    label: "Now",
    body: "Turning ideas into working products. Open to internships, freelance projects and collaborations.",
    tagA: "Open to Work",
    tagB: "Let's Talk",
  },
];

const scaler = document.getElementById("scaler");
const stage = document.getElementById("stage");
const pagerDots = document.getElementById("pagerDots");
const charName = document.getElementById("charName");
const charPublished = document.getElementById("charPublished");
const statLabel = document.getElementById("statLabel");
const statBody = document.getElementById("statBody");
const tagAText = document.getElementById("tagAText");
const tagBText = document.getElementById("tagBText");
const homeCopy = document.querySelector(".home-copy");
const navLinks = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");

let index = 0;
let page = "home";
let locked = false;

const validPages = ["home", "about", "skills", "projects", "contact"];

function fit() {
  /* Fullscreen: the stage fills the viewport. No letterbox scale. */
}

function renderDots() {
  pagerDots.innerHTML = slides
    .map(
      (_, i) =>
        `<button class="pager-dot${i === index ? " is-current" : ""}" data-i="${i}" aria-label="Slide ${i + 1}"></button>`
    )
    .join("");
}

function applySlide(i) {
  const s = slides[i];
  homeCopy.classList.remove("is-swap");
  void homeCopy.offsetWidth;
  homeCopy.classList.add("is-swap");
  charName.innerHTML = s.name;
  charPublished.textContent = s.published;
  statLabel.textContent = s.label;
  statBody.textContent = s.body;
  tagAText.innerHTML = s.tagA;
  tagBText.innerHTML = s.tagB;
  index = i;
  renderDots();
}

function go(i) {
  if (locked || page !== "home") return;
  const next = (i + slides.length) % slides.length;
  if (next === index) return;
  locked = true;
  applySlide(next);
  setTimeout(() => {
    locked = false;
  }, 400);
}

function showPage(name) {
  page = name;
  pages.forEach((p) => p.classList.toggle("is-active", p.dataset.view === name));
  navLinks.forEach((a) => {
    a.classList.toggle("is-active", a.dataset.page === name);
  });
  if (name !== "home") {
    history.replaceState(null, "", `#${name}`);
  } else {
    history.replaceState(null, "", "#home");
  }
  // replay skill-bar animation when the skills page opens
  if (name === "skills") {
    const fills = document.querySelectorAll(".skill-fill");
    fills.forEach((f) => {
      f.style.animation = "none";
      void f.offsetWidth;
      f.style.animation = "";
    });
  }
}

function routeFromHash() {
  const h = (location.hash || "#home").slice(1);
  if (validPages.includes(h)) showPage(h);
}

window.addEventListener("resize", fit);
window.addEventListener("hashchange", routeFromHash);

document.addEventListener("click", (e) => {
  const pageLink = e.target.closest("[data-page]");
  if (pageLink) {
    e.preventDefault();
    showPage(pageLink.dataset.page);
    return;
  }
  const dot = e.target.closest(".pager-dot");
  if (dot) go(Number(dot.dataset.i));
});

document.getElementById("scrollHint").addEventListener("click", () => go(index + 1));

// Contact form → opens the visitor's mail app (no backend needed).
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("cfName").value.trim();
  const email = document.getElementById("cfEmail").value.trim();
  const msg = document.getElementById("cfMsg").value.trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`${msg}\n\n— ${name} (${email})`);
  window.location.href = `mailto:hello@shubhamsharma.dev?subject=${subject}&body=${body}`;
});

window.addEventListener(
  "wheel",
  (e) => {
    if (page !== "home") return;
    if (Math.abs(e.deltaY) < 12) return;
    go(index + (e.deltaY > 0 ? 1 : -1));
  },
  { passive: true }
);

window.addEventListener("keydown", (e) => {
  if (page !== "home") return;
  if (e.key === "ArrowDown" || e.key === "ArrowRight") go(index + 1);
  if (e.key === "ArrowUp" || e.key === "ArrowLeft") go(index - 1);
});

fit();
renderDots();
routeFromHash();
requestAnimationFrame(() => stage.classList.add("is-ready"));
