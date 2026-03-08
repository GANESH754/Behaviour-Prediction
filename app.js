/* ════════════════════════════════════════════════
   PSYCHE ATLAS — APP LOGIC
   Behavioral Personality Assessment
════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', function () {
(function () {
  'use strict';

  /* ── Trait Keys & Labels ──────────────────── */
  var TRAITS = ['social', 'decision', 'learning', 'risk', 'consist'];

  var TRAIT_LABELS = {
    social:   'Social Orientation',
    decision: 'Decision Style Strength',
    learning: 'Learning Adaptability',
    risk:     'Risk Handling Balance',
    consist:  'Consistency Score'
  };

  /* ── Archetypes ───────────────────────────── */
  var ARCHETYPES = {
    social: {
      name:    'The Relational Leader',
      icon:    '◎',
      tagline: 'You are powered by connection. Your decisions, energy, and sense of meaning are deeply rooted in the people around you.',
      summary: 'Your dominant indicator is Social Orientation. You naturally draw strength from relationships and community, thrive when collaborating, and find motivation in shared experiences. You are empathetic, warm, and skilled at reading people, making you a natural connector, team builder, or mentor. Your growth edge is ensuring your own needs are not consistently deprioritized in service of others.'
    },
    decision: {
      name:    'The Deliberate Thinker',
      icon:    '♟',
      tagline: 'You move with intention. Before acting, you gather information, weigh options, and commit with conviction — rarely impulsive, always purposeful.',
      summary: 'Decision Style Strength is your leading indicator. You approach choices systematically, prefer full context before committing, and take ownership of outcomes. Others turn to you when clear-headed perspective is needed under pressure. You excel in planning and strategy. Your growth edge is recognizing when good-enough information is sufficient — perfectionism can slow momentum.'
    },
    learning: {
      name:    'The Adaptive Explorer',
      icon:    '✦',
      tagline: 'You are energized by growth. New knowledge, unfamiliar challenges, and evolving perspectives are where you feel most alive.',
      summary: 'Learning Adaptability is your strongest behavioral signal. You are curious by nature, comfortable with change, and quick to absorb lessons from both success and failure. You view setbacks as data rather than defeat and thrive in dynamic environments. Your challenge is maintaining depth — broad curiosity sometimes pulls against focused mastery.'
    },
    risk: {
      name:    'The Composed Navigator',
      icon:    '⚡',
      tagline: 'You do not freeze under pressure — you recalibrate. Uncertainty is a landscape you have learned to move through with steadiness.',
      summary: 'Risk Handling Balance defines your behavioral profile. You have a measured relationship with the unknown — neither reckless nor paralyzed. You assess situations, manage your emotional response, and find a practical path forward, making you effective in high-stakes environments. Your opportunity is trusting your instincts more quickly — over-analysis can delay action when speed matters.'
    },
    consist: {
      name:    'The Reliable Architect',
      icon:    '▣',
      tagline: 'You are the person who shows up — every time. Your reliability, structure, and follow-through are the quiet forces that turn ideas into outcomes.',
      summary: 'Consistency Score is your defining indicator. You prioritize structure, routine, and sustained effort over bursts of activity. You keep commitments, manage time deliberately, and build trust through dependability. You perform best in environments that reward execution. Your growth area is embracing flexibility when rigid systems no longer serve the goal.'
    }
  };

  /* ── Questions & Weighted Options ────────────
     Weights: { social, decision, learning, risk, consist }
     Scale 0–5 per trait per option.
  ─────────────────────────────────────────── */
  var QUESTIONS = [
    {
      text: "When you have to make an important choice, what do you do?",
      opts: [
        { text: "I look up information and do research.",
          w: { social: 1, decision: 5, learning: 3, risk: 2, consist: 3 } },
        { text: "I ask my friends or family what they think.",
          w: { social: 5, decision: 2, learning: 2, risk: 2, consist: 2 } },
        { text: "I go with my gut feeling.",
          w: { social: 1, decision: 2, learning: 2, risk: 5, consist: 1 } },
        { text: "I write down the good and bad points.",
          w: { social: 0, decision: 5, learning: 3, risk: 1, consist: 4 } }
      ]
    },
    {
      text: "How do you like to spend your weekend?",
      opts: [
        { text: "Hanging out with friends or family.",
          w: { social: 5, decision: 1, learning: 1, risk: 2, consist: 2 } },
        { text: "Doing things I enjoy by myself.",
          w: { social: 0, decision: 2, learning: 3, risk: 1, consist: 3 } },
        { text: "Learning or trying new things.",
          w: { social: 1, decision: 2, learning: 5, risk: 3, consist: 2 } },
        { text: "Just chilling and relaxing.",
          w: { social: 2, decision: 1, learning: 1, risk: 1, consist: 1 } }
      ]
    },
    {
      text: "When you start something new, what's your style?",
      opts: [
        { text: "I plan everything step by step first.",
          w: { social: 0, decision: 5, learning: 2, risk: 1, consist: 5 } },
        { text: "I just start and see what happens.",
          w: { social: 1, decision: 1, learning: 3, risk: 5, consist: 0 } },
        { text: "I do some basic planning then begin.",
          w: { social: 1, decision: 3, learning: 3, risk: 3, consist: 3 } },
        { text: "I wait until I feel ready or inspired.",
          w: { social: 1, decision: 2, learning: 2, risk: 2, consist: 1 } }
      ]
    },
    {
      text: "What drives you the most?",
      opts: [
        { text: "Reaching my goals and being successful.",
          w: { social: 1, decision: 4, learning: 3, risk: 3, consist: 4 } },
        { text: "Making others happy and helping people.",
          w: { social: 5, decision: 2, learning: 2, risk: 1, consist: 3 } },
        { text: "Growing as a person and learning new things.",
          w: { social: 1, decision: 2, learning: 5, risk: 3, consist: 2 } },
        { text: "Enjoying life and having good experiences.",
          w: { social: 3, decision: 1, learning: 3, risk: 4, consist: 1 } }
      ]
    },
    {
      text: "When things don't go as planned, you usually:",
      opts: [
        { text: "Stay cool and find a way to fix it.",
          w: { social: 1, decision: 4, learning: 3, risk: 5, consist: 3 } },
        { text: "Feel worried but keep going anyway.",
          w: { social: 1, decision: 2, learning: 3, risk: 3, consist: 3 } },
        { text: "Need some time alone to feel better.",
          w: { social: 0, decision: 2, learning: 2, risk: 2, consist: 2 } },
        { text: "Talk to someone about it.",
          w: { social: 5, decision: 1, learning: 3, risk: 2, consist: 1 } }
      ]
    },
    {
      text: "In a group of people, you're usually the one who:",
      opts: [
        { text: "Takes charge and leads.",
          w: { social: 3, decision: 5, learning: 2, risk: 4, consist: 4 } },
        { text: "Shares ideas when people ask.",
          w: { social: 2, decision: 3, learning: 4, risk: 2, consist: 2 } },
        { text: "Listens more than talks.",
          w: { social: 2, decision: 2, learning: 4, risk: 1, consist: 3 } },
        { text: "Makes everyone laugh and have fun.",
          w: { social: 5, decision: 1, learning: 2, risk: 3, consist: 1 } }
      ]
    },
    {
      text: "When faced with something you've never done before:",
      opts: [
        { text: "I get excited and want to try it.",
          w: { social: 2, decision: 2, learning: 5, risk: 5, consist: 1 } },
        { text: "I'm a bit nervous but willing to try.",
          w: { social: 1, decision: 2, learning: 4, risk: 3, consist: 2 } },
        { text: "I'm careful and take my time.",
          w: { social: 0, decision: 4, learning: 3, risk: 1, consist: 4 } },
        { text: "Depends on what it is.",
          w: { social: 1, decision: 3, learning: 3, risk: 3, consist: 2 } }
      ]
    },
    {
      text: "How do you handle tasks with deadlines?",
      opts: [
        { text: "I finish way before it's due.",
          w: { social: 0, decision: 4, learning: 2, risk: 1, consist: 5 } },
        { text: "I work on it a little bit each day.",
          w: { social: 1, decision: 3, learning: 2, risk: 1, consist: 5 } },
        { text: "I work better when the deadline is close.",
          w: { social: 1, decision: 2, learning: 2, risk: 4, consist: 1 } },
        { text: "I usually need more time.",
          w: { social: 1, decision: 1, learning: 2, risk: 2, consist: 1 } }
      ]
    },
    {
      text: "In your relationships, what's most important?",
      opts: [
        { text: "Being honest and trusting each other.",
          w: { social: 4, decision: 3, learning: 2, risk: 2, consist: 4 } },
        { text: "Having fun together.",
          w: { social: 4, decision: 1, learning: 2, risk: 3, consist: 1 } },
        { text: "Understanding each other deeply.",
          w: { social: 5, decision: 2, learning: 4, risk: 1, consist: 3 } },
        { text: "Supporting each other's dreams.",
          w: { social: 4, decision: 2, learning: 4, risk: 3, consist: 3 } }
      ]
    },
    {
      text: "If you disagree with someone, you:",
      opts: [
        { text: "Tell them directly and talk about it.",
          w: { social: 3, decision: 5, learning: 3, risk: 4, consist: 3 } },
        { text: "Let it go to avoid fighting.",
          w: { social: 3, decision: 1, learning: 1, risk: 1, consist: 2 } },
        { text: "Think about it before saying anything.",
          w: { social: 1, decision: 4, learning: 3, risk: 2, consist: 3 } },
        { text: "Try to meet in the middle.",
          w: { social: 5, decision: 3, learning: 3, risk: 3, consist: 3 } }
      ]
    },
    {
      text: "Your perfect day off would involve:",
      opts: [
        { text: "An adventure or something exciting.",
          w: { social: 2, decision: 2, learning: 4, risk: 5, consist: 1 } },
        { text: "Sleeping in and doing nothing.",
          w: { social: 1, decision: 1, learning: 1, risk: 1, consist: 1 } },
        { text: "Quality time with people I care about.",
          w: { social: 5, decision: 1, learning: 2, risk: 1, consist: 2 } },
        { text: "Working on my hobbies or interests.",
          w: { social: 1, decision: 2, learning: 5, risk: 2, consist: 4 } }
      ]
    },
    {
      text: "When someone points out something you did wrong:",
      opts: [
        { text: "I use it to get better next time.",
          w: { social: 1, decision: 3, learning: 5, risk: 2, consist: 4 } },
        { text: "It hurts but I try to learn from it.",
          w: { social: 2, decision: 2, learning: 4, risk: 2, consist: 3 } },
        { text: "I explain why I did it that way.",
          w: { social: 2, decision: 4, learning: 2, risk: 3, consist: 2 } },
        { text: "I don't let it bother me much.",
          w: { social: 1, decision: 2, learning: 2, risk: 4, consist: 2 } }
      ]
    }
  ];

  /* ── Pre-compute max possible score per trait ── */
  var MAX_SCORES = {};
  TRAITS.forEach(function (t) { MAX_SCORES[t] = 0; });
  QUESTIONS.forEach(function (q) {
    TRAITS.forEach(function (t) {
      var maxW = Math.max.apply(null, q.opts.map(function (o) { return o.w[t]; }));
      MAX_SCORES[t] += maxW;
    });
  });

  /* ── Application State ────────────────────── */
  var state = {
    currentQ:   0,
    answers:    new Array(QUESTIONS.length).fill(null),
    scores:     { social: 0, decision: 0, learning: 0, risk: 0, consist: 0 },
    radarChart: null
  };

  /* ── DOM References ───────────────────────── */
  var screenIntro   = document.getElementById('screen-intro');
  var screenQuiz    = document.getElementById('screen-quiz');
  var screenResults = document.getElementById('screen-results');

  var btnStart      = document.getElementById('btn-start');
  var btnBack       = document.getElementById('btn-back');
  var btnNext       = document.getElementById('btn-next');
  var btnRetake     = document.getElementById('btn-retake');

  var progressFill  = document.getElementById('progress-fill');
  var progressCount = document.getElementById('progress-count');

  var questionNumber = document.getElementById('question-number');
  var questionText   = document.getElementById('question-text');
  var optionsList    = document.getElementById('options-list');
  var questionBody   = document.getElementById('question-body');
  var navHint        = document.getElementById('nav-hint');

  /* ── Screen Management ────────────────────── */
  function showScreen(screen) {
    [screenIntro, screenQuiz, screenResults].forEach(function (s) {
      s.classList.remove('active');
      s.style.display = 'none';
    });
    screen.classList.add('active');
    screen.style.display = 'flex';
  }

  /* ── Event Listeners ──────────────────────── */
  btnStart.addEventListener('click', function () {
    showScreen(screenQuiz);
    renderQuestion();
  });

  btnBack.addEventListener('click', function () {
    if (state.currentQ > 0) {
      state.currentQ--;
      animateTransition();
    }
  });

  btnNext.addEventListener('click', function () {
    if (state.answers[state.currentQ] === null) return;
    if (state.currentQ < QUESTIONS.length - 1) {
      state.currentQ++;
      animateTransition();
    } else {
      showResults();
    }
  });

  btnRetake.addEventListener('click', function () {
    if (state.radarChart) {
      state.radarChart.destroy();
      state.radarChart = null;
    }
    state.currentQ = 0;
    state.answers  = new Array(QUESTIONS.length).fill(null);
    state.scores   = { social: 0, decision: 0, learning: 0, risk: 0, consist: 0 };
    showScreen(screenQuiz);
    renderQuestion();
  });

  /* ── Question Transition Animation ──────────── */
  function animateTransition() {
    questionBody.classList.add('slide-out');
    setTimeout(function () {
      questionBody.classList.remove('slide-out');
      renderQuestion();
      questionBody.classList.add('slide-in');
      setTimeout(function () {
        questionBody.classList.remove('slide-in');
      }, 300);
    }, 200);
  }

  /* ── Render Current Question ──────────────── */
  function renderQuestion() {
    var q   = QUESTIONS[state.currentQ];
    var idx = state.currentQ;
    var tot = QUESTIONS.length;
    var has = state.answers[idx] !== null;

    /* Progress */
    var pct = Math.max(8.33, ((idx) / tot) * 100);
    progressFill.style.width  = pct + '%';
    progressFill.setAttribute('aria-valuenow', Math.round(pct));
    progressCount.textContent = (idx + 1) + ' / ' + tot;

    /* Question meta */
    questionNumber.textContent = 'Question ' + (idx < 9 ? '0' : '') + (idx + 1);
    questionText.textContent   = q.text;

    /* Buttons */
    btnBack.disabled    = idx === 0;
    btnNext.disabled    = !has;
    btnNext.textContent = idx === tot - 1 ? 'View Results' : 'Next →';
    navHint.textContent = has ? 'You can change your answer' : 'Select an option to continue';

    /* Options */
    optionsList.innerHTML = '';
    var letters = ['A', 'B', 'C', 'D'];
    q.opts.forEach(function (opt, i) {
      var btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.setAttribute('role', 'radio');
      btn.setAttribute('aria-checked', has && state.answers[idx] === i ? 'true' : 'false');

      if (has) {
        btn.disabled = true;
        btn.classList.add(state.answers[idx] === i ? 'selected' : 'dimmed');
      }

      var letterSpan = document.createElement('span');
      letterSpan.className   = 'option-letter';
      letterSpan.textContent = letters[i];

      var textSpan = document.createElement('span');
      textSpan.textContent = opt.text;

      btn.appendChild(letterSpan);
      btn.appendChild(textSpan);

      /* Closure to capture index */
      (function (optIndex) {
        btn.addEventListener('click', function () {
          selectOption(idx, optIndex);
        });
      })(i);

      optionsList.appendChild(btn);
    });
  }

  /* ── Handle Option Selection ──────────────── */
  function selectOption(qIdx, optIdx) {
    /* Remove previous answer's weights */
    var prev = state.answers[qIdx];
    if (prev !== null) {
      var prevWeights = QUESTIONS[qIdx].opts[prev].w;
      TRAITS.forEach(function (t) {
        state.scores[t] -= prevWeights[t];
      });
    }

    /* Apply new answer's weights */
    state.answers[qIdx] = optIdx;
    var weights = QUESTIONS[qIdx].opts[optIdx].w;
    TRAITS.forEach(function (t) {
      state.scores[t] += weights[t];
    });

    /* Update option button states */
    var allBtns = optionsList.querySelectorAll('.option-btn');
    allBtns.forEach(function (btn, i) {
      btn.disabled = true;
      btn.classList.remove('selected', 'dimmed');
      btn.classList.add(i === optIdx ? 'selected' : 'dimmed');
      btn.setAttribute('aria-checked', i === optIdx ? 'true' : 'false');
    });

    btnNext.disabled    = false;
    navHint.textContent = 'You can change your answer';
  }

  /* ── Compute Final Percentages ────────────── */
  function computeResults() {
    var pct      = {};
    var dominant = TRAITS[0];

    TRAITS.forEach(function (t) {
      pct[t] = Math.round((state.scores[t] / MAX_SCORES[t]) * 100);
      if (pct[t] > pct[dominant]) dominant = t;
    });

    return { pct: pct, dominant: dominant };
  }

  /* ── Build & Show Results Screen ─────────── */
  function showResults() {
    var result   = computeResults();
    var pct      = result.pct;
    var dominant = result.dominant;
    var arc      = ARCHETYPES[dominant];

    /* Hero */
    document.getElementById('result-icon').textContent    = arc.icon;
    document.getElementById('result-name').textContent    = arc.name;
    document.getElementById('result-tagline').textContent = arc.tagline;
    document.getElementById('result-summary').textContent = arc.summary;

    /* Trait bars */
    buildTraitBars(pct);

    /* Radar chart */
    buildRadarChart(pct);

    showScreen(screenResults);
  }

  /* ── Build Trait Bars ─────────────────────── */
  function buildTraitBars(pct) {
    var container = document.getElementById('trait-bars');
    container.innerHTML = '';

    TRAITS.forEach(function (t) {
      var row = document.createElement('div');
      row.className = 'trait-row';

      var meta = document.createElement('div');
      meta.className = 'trait-meta';

      var nameSpan = document.createElement('span');
      nameSpan.className   = 'trait-name';
      nameSpan.textContent = TRAIT_LABELS[t];

      var pctSpan = document.createElement('span');
      pctSpan.className   = 'trait-pct';
      pctSpan.textContent = pct[t] + '%';

      meta.appendChild(nameSpan);
      meta.appendChild(pctSpan);

      var track = document.createElement('div');
      track.className = 'trait-track';

      var fill = document.createElement('div');
      fill.className = 'trait-fill fill-' + t;
      fill.id = 'bar-' + t;

      track.appendChild(fill);
      row.appendChild(meta);
      row.appendChild(track);
      container.appendChild(row);
    });

    /* Animate bars after paint */
    requestAnimationFrame(function () {
      setTimeout(function () {
        TRAITS.forEach(function (t) {
          var el = document.getElementById('bar-' + t);
          if (el) el.style.width = pct[t] + '%';
        });
      }, 120);
    });
  }

  /* ── Build Radar Chart ────────────────────── */
  function buildRadarChart(pct) {
    if (state.radarChart) {
      state.radarChart.destroy();
      state.radarChart = null;
    }

    var ctx = document.getElementById('radar-chart').getContext('2d');
    state.radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: TRAITS.map(function (t) { return TRAIT_LABELS[t]; }),
        datasets: [{
          label:            'Your Profile',
          data:             TRAITS.map(function (t) { return pct[t]; }),
          borderColor:      'rgba(201,169,110,0.9)',
          backgroundColor:  'rgba(201,169,110,0.1)',
          borderWidth:      2,
          pointBackgroundColor: 'rgba(201,169,110,1)',
          pointRadius:      4,
          pointHoverRadius: 6
        }]
      },
      options: {
        responsive:         true,
        maintainAspectRatio: true,
        scales: {
          r: {
            min:  0,
            max:  100,
            ticks: { display: false, stepSize: 25 },
            grid: { color: 'rgba(240,235,224,0.07)' },
            angleLines: { color: 'rgba(240,235,224,0.1)' },
            pointLabels: {
              color: 'rgba(240,235,224,0.58)',
              font:  { size: 10, family: "'Outfit', sans-serif", weight: '300' }
            }
          }
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15,15,26,0.95)',
            borderColor:     'rgba(201,169,110,0.3)',
            borderWidth:     1,
            titleColor:      '#c9a96e',
            bodyColor:       'rgba(240,235,224,0.7)',
            padding:         10,
            callbacks: {
              label: function (ctx) { return '  ' + ctx.raw + '%'; }
            }
          }
        }
      }
    });
  }

})();
}); // DOMContentLoaded
