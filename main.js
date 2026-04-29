/* ════════════════════════════════════════
   NEUROATLAS — main.js
   ════════════════════════════════════════ */

/* ── PROGRESS BAR ── */
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.getElementById('progress').style.width = pct + '%';
});

/* ── SCROLL REVEAL ── */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ── LÓBULOS CEREBRALES — INTERACCIÓN ── */
const lobeItems = document.querySelectorAll('.lobe-item');

lobeItems.forEach(item => {
  item.addEventListener('click', () => {
    // Quitar clase active de todos
    lobeItems.forEach(l => l.classList.remove('active'));
    item.classList.add('active');

    const info = item.dataset.info;

    // Actualizar el contenedor de texto
    const infoText = document.getElementById('lobeInfoText');
    if (infoText) {
      infoText.innerHTML = `<p>${info}</p>`;
    }
  });
});

/* ── QUIZ CLÍNICO ── */
const questions = [
  {
    q: '¿Qué área cortical se lesiona en la afasia de Broca?',
    opts: [
      'Giro frontal inferior izquierdo',
      'Giro temporal superior',
      'Corteza parietal post.',
      'Área visual primaria'
    ],
    ans: 0,
    exp: 'El área de Broca (áreas 44 y 45 de Brodmann) en el giro frontal inferior izquierdo es el sustrato del lenguaje expresivo.'
  },
  {
    q: "Un paciente con parálisis del III par craneal presenta ptosis, midriasis y el ojo desviado 'abajo y afuera'. ¿Cuál músculo queda intacto?",
    opts: [
      'Recto superior',
      'Recto medial',
      'Recto lateral (VI par)',
      'Elevador del párpado'
    ],
    ans: 2,
    exp: 'El recto lateral está inervado por el VI par (abducens), que no se afecta en la parálisis del III par. De ahí la desviación inferolateral del ojo.'
  },
  {
    q: '¿Cuál estructura del diencéfalo regula la temperatura corporal y la secreción hipofisiaria?',
    opts: [
      'Tálamo ventral postero-lateral',
      'Hipotálamo',
      'Núcleo caudado',
      'Putamen'
    ],
    ans: 1,
    exp: 'El hipotálamo es el centro de control autonómico, endocrino y termorregulador del diencéfalo.'
  },
  {
    q: 'La lesión del lóbulo temporal no dominante suele producir:',
    opts: [
      'Afasia de Wernicke',
      'Prosopagnosia y hemineglect',
      'Alexia sin agrafia',
      'Apraxia ideomotora'
    ],
    ans: 1,
    exp: 'El hemisferio no dominante (generalmente derecho) del lóbulo temporal participa en el reconocimiento facial y la atención espacial; su lesión puede causar prosopagnosia y hemineglect.'
  },
  {
    q: '¿Por qué vía asciende la sensibilidad propioceptiva y táctil fina hacia la corteza?',
    opts: [
      'Tracto espinotalámico lateral',
      'Tracto espinotalámico anterior',
      'Columnas dorsales / Lemnisco medial',
      'Tracto espinocerebeloso'
    ],
    ans: 2,
    exp: 'La propiocepción y el tacto discriminativo ascienden ipsilaterales por las columnas posteriores hasta el bulbo, donde decusan y continúan como lemnisco medial hasta el tálamo VPL.'
  },
  {
    q: '¿Qué núcleo del tronco encefálico contiene los cuerpos neuronales de las fibras parasimpáticas del nervio vago?',
    opts: [
      'Núcleo ambiguo',
      'Núcleo del tracto solitario',
      'Núcleo dorsal del vago',
      'Área postrema'
    ],
    ans: 2,
    exp: 'El núcleo dorsal motor del vago (X par) contiene los somas preganglionares parasimpáticos que inervan el corazón, pulmones y vísceras abdominales.'
  }
];

let currentQuestion = 0;
let answered = false;

/**
 * Renderiza la pregunta actual en el DOM.
 */
function renderQuestion() {
  answered = false;

  const q = questions[currentQuestion];

  document.getElementById('quizQ').textContent = q.q;
  document.getElementById('quizFeedback').textContent = '';

  const optsContainer = document.getElementById('quizOpts');
  optsContainer.innerHTML = '';

  q.opts.forEach((optionText, i) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-opt';
    btn.textContent = optionText;
    btn.addEventListener('click', () => selectAnswer(i));
    optsContainer.appendChild(btn);
  });
}

/**
 * Maneja la selección de una respuesta.
 * @param {number} index - Índice de la opción seleccionada
 */
function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const buttons = document.querySelectorAll('.quiz-opt');

  buttons[index].classList.add(index === q.ans ? 'correct' : 'wrong');

  if (index !== q.ans) {
    buttons[q.ans].classList.add('correct');
  }

  document.getElementById('quizFeedback').textContent = q.exp;
}

/**
 * Avanza a la siguiente pregunta (en ciclo).
 */
function nextQuestion() {
  currentQuestion = (currentQuestion + 1) % questions.length;
  renderQuestion();
}

// Inicializar el quiz al cargar la página
renderQuestion();
