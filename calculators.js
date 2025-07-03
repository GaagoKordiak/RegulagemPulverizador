// Utilidades
const $ = (sel) => document.querySelector(sel);
const round = (num, dec = 2) => Number(num.toFixed(dec));

// Constante 600 (métrica) — deriva da fórmula oficial de calibração
// (L/ha) = 600 * Q / (V * S)  :contentReference[oaicite:0]{index=0}
const K = 600;

// Eventos de clique
document.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const action = e.target.dataset.action;

  if (action === "flow") calcFlow();
  if (action === "pressure") calcPressure();
  if (action === "rate") calcRate();
  if (action === "mix-vol") calcMixVolume();
  if (action === "total-area") calcTotalArea();
});

// 1) Vazão requerida (L/min)
function calcFlow() {
  const rate = +$("#rate-ha").value;
  const speed = +$("#speed").value;
  const spacing = +$("#spacing").value;

  if (!rate || !speed || !spacing) return;

  const q = (rate * speed * spacing) / K;
  $("#flow-res").textContent = round(q);
}

// 2) Pressão necessária (psi → também converto pra bar)
// Relação Q ∝ √P →  P2 = P1 * (Q2 / Q1)^2  :contentReference[oaicite:1]{index=1}
function calcPressure() {
  const qDes = +$("#q-des").value;
  const qNom = +$("#q-nom").value;
  const pNom = +$("#p-nom").value;

  if (!qDes || !qNom || !pNom) return;

  const pPsi = pNom * Math.pow(qDes / qNom, 2);
  $("#p-psi").textContent = round(pPsi);
  $("#p-bar").textContent = round(pPsi * 0.06895); // 1 psi = 0.06895 bar
}

// 3) Taxa de aplicação (L/ha)
function calcRate() {
  const q = +$("#q").value;
  const v = +$("#v-app").value;
  const s = +$("#s-app").value;

  if (!q || !v || !s) return;

  const rate = (K * q) / (v * s);
  $("#rate-res").textContent = round(rate);
}

// 4) Volume de Calda (L)
function calcMixVolume() {
  const area = +$("#area-vol").value;
  const rate = +$("#rate-vol").value;

  if (!area || !rate) return;

  const volume = area * rate;
  $("#mix-vol-res").textContent = round(volume);
}

// 5) Área total (ha)
function calcTotalArea() {
  const width = +$("#width").value;
  const length = +$("#length").value;

  if (!width || !length) return;

  const area = (width * length) / 10000; // converte m² pra ha
  $("#total-area-res").textContent = round(area);
}
