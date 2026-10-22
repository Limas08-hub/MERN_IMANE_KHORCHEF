// ----- Dessine la ville (immeubles + lampadaires) -----
const API_URL = "https://mern-imane-khorchef-3ghz.vercel.app";
const city = document.getElementById('city');

// [hauteur de l'immeuble en px, nombre de lignes de fenêtres]
const buildings = [
  { h: 150, rows: 4, w: 78 },
  { type: 'lamp' },
  { h: 200, rows: 6, w: 88 },
  { h: 120, rows: 3, w: 70 },
  { type: 'lamp' },
  { h: 230, rows: 7, w: 92 },
  { h: 160, rows: 4, w: 76 },
  { type: 'lamp' },
  { h: 130, rows: 3, w: 72 }
];

buildings.forEach((item) => {
  if (item.type === 'lamp') {
    const lamp = document.createElement('div');
    lamp.className = 'lamp';
    city.appendChild(lamp);
    return;
  }

  const b = document.createElement('div');
  b.className = 'building';
  b.style.height = item.h + 'px';
  b.style.width = item.w + 'px';

  for (let i = 0; i < item.rows * 3; i++) {
    b.appendChild(document.createElement('i'));
  }
  b.appendChild(document.createElement('b')); // la porte
  city.appendChild(b);
});
const statusEl = document.getElementById('api-status');
fetch(API_URL + "/api/health")
  .then((res) => res.json())
  .then((data) => { statusEl.textContent = "serveur : " + (data.status === "ok" ? "connecté ✓" : "erreur"); })
  .catch(() => { statusEl.textContent = "serveur : injoignable"; });
// ----- Apparition douce des cartes -----
const items = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 150);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

items.forEach((item) => observer.observe(item));