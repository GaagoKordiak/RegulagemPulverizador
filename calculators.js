// calculators.js

// Utilidades
const $ = (sel) => document.querySelector(sel);
const round = (num, dec = 2) => Number(num.toFixed(dec));

// Constante 600 (métrica) — deriva da fórmula oficial de calibração
// (L/ha) = 600 * Q / (V * S)
const K = 600;

// Eventos de clique
document.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const action = e.target.dataset.action;

  if (action === "speed") calculateSpeed(); // Funções renomeadas para clareza
  if (action === "flow") calcFlow();
  if (action === "pressure") calcPressure();
  if (action === "rate") calcularTaxa();
  if (action === "mix-vol") calcMixVolume();
  if (action === "total-area") calcTotalArea();
  if (action === "calculate-volume-time-flow") calculateVolumeTimeFlow(); // Nova ação para a calculadora de volume/tempo
});

// ---------------- Velocidade m/s → km/h ----------------
// Renomeada de forma mais clara
function calculateSpeed() {
  const dist = parseFloat(document.getElementById("dist-m").value);
  const time = parseFloat(document.getElementById("time-s").value);

  if (dist > 0 && time > 0) {
    const speedKmh = (dist / time) * 3.6; // m/s × 3,6
    document.getElementById("speed-res").textContent = speedKmh.toFixed(2);
  } else {
    document.getElementById("speed-res").textContent =
      "Preencha os campos 😉";
  }
}


// 1) Vazão requerida (L/min)
function calcFlow() {
  const rate = +$("#rate-ha").value;
  const speed = +$("#speed").value;
  const width = +$("#bar-width").value;
  const nozzles = +$("#nozzles").value;

  if (!rate || !speed || !width || !nozzles) return;

  const totalFlow = (rate * speed * width) / 600;
  const flowPerNozzle = totalFlow / nozzles;

  $("#flow-res").textContent = round(flowPerNozzle);
}

// 2) Pressão necessária (psi → também converto pra bar)
// Relação Q ∝ √P →  P2 = P1 * (Q2 / Q1)^2
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
function calcularTaxa() {
  const bicos = parseInt(document.getElementById("bicos").value);
  const q = parseFloat(document.getElementById("qBico").value); // L/min por bico
  const v = parseFloat(document.getElementById("vel").value); // km/h
  const w = parseFloat(document.getElementById("larg").value); // largura barra

  if (bicos > 0 && q > 0 && v > 0 && w > 0) {
    const vazaoTotal = bicos * q; // L/min total
    const taxa = (vazaoTotal * 600) / (v * w);
    document.getElementById("taxa-res").textContent = taxa.toFixed(2);
  } else {
    document.getElementById("taxa-res").textContent =
      "Preencha todos os campos.";
  }
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

// Nova função: Conversão de Volume (ml) e Tempo (s) para Vazão (L/min)
function calculateVolumeTimeFlow() {
  const volumeMl = parseFloat(document.getElementById("volume-ml").value);
  const timeS = parseFloat(document.getElementById("time-s-flow").value);

  if (volumeMl > 0 && timeS > 0) {
    // (ml / s) * (60 s / 1 min) / (1000 ml / 1 L)
    // (volumeMl / timeS) * (60 / 1000)
    const flowLpm = (volumeMl / timeS) * 0.06;
    document.getElementById("flow-lpm-volume-time-res").textContent = flowLpm.toFixed(2);
  } else {
    document.getElementById("flow-lpm-volume-time-res").textContent = "Preencha os campos 😉";
  }
}