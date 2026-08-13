/**
 * ESTRUTURA DE DADOS — FATEC RIBEIRÃO PRETO 2026.2
 * Apresentação Interativa: Fundamentos: Introdução e Big-O
 * Lógica da Aplicação, Navegação e Simuladores Interativos
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // SLIDE DECK NAVIGATION CONTROLLER
  // =========================================================================
  const slides = Array.from(document.querySelectorAll('.slide'));
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnOverview = document.getElementById('btn-overview');
  const btnNotes = document.getElementById('btn-notes');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const slideCounter = document.getElementById('slide-counter');
  const progressBar = document.getElementById('progress-bar');
  const overviewModal = document.getElementById('overview-modal');
  const modalClose = document.getElementById('modal-close');
  const slideGridNav = document.getElementById('slide-grid-nav');
  const notesDrawer = document.getElementById('notes-drawer');
  const notesContent = document.getElementById('notes-content');
  const toastMsg = document.getElementById('toast-msg');

  let currentSlideIndex = 0;
  let presenterNotesVisible = false;

  // Presenter Notes Database per Slide (27 slides)
  const presenterNotes = [
    "Slide 1: Capa da aula. Boas-vindas aos alunos da Fatec. Alinhe os objetivos da aula de fundamentos e complexidade assintótica.",
    "Slide 2: Enfatize o dilema de Maria vs João. O tempo em segundos mede hardware/ambiente e não a qualidade do algoritmo. Faça o teste no simulador!",
    "Slide 3: Mostre como montar f(N) = N + 2. Use a calculadora para mostrar como 4N² domina 99.9% de f(N) quando N cresce.",
    "Slide 4: Explique a tríade O (Teto), Ω (Piso) e Θ (Justo). Mostre o exemplo da busca linear nos 3 cenários com o simulador.",
    "Slide 5: As 4 regras de ouro. Repita para a turma: 'descarte constantes' e 'descarte termos menores'. Destaque o cuidado com O(N + M).",
    "Slide 6: Zoológico Big-O. Mostre o ranking de eficiência. No gráfico, mostre a inclinação absurda de O(2^N) e O(N²).",
    "Slide 7: O(1) vs O(log N). Demonstre a Busca Binária interativa no vetor ordenado de 16 elementos.",
    "Slide 8: O(N) vs O(N log N). Explique o paradigma Dividir para Conquistar e por que N log N é o limite ótimo para ordenação por comparação.",
    "Slide 9: O(N²) e O(N³). Execute o Bubble Sort passo a passo ou automático para mostrar a contagem de comparações crescendo quadrática.",
    "Slide 10: O(2^N) e O(N!). Mostre a árvore de chamadas do Fibonacci duplicando a cada nível e a impossibilidade prática de rodar N=50.",
    "Slide 11: A Regra dos 10^8 ops/s. Essa regra é o maior macete para passar em entrevistas e juízes online (Beecrowd, LeetCode).",
    "Slide 12: Tempo vs Espaço. Compare as 3 abordagens de contar elementos únicos. Dois Ponteiros é a solução de ouro (O(N) tempo, O(1) espaço).",
    "Slide 13: Análise Amortizada. Explique a duplicação do buffer da lista do Python. Cada append caro paga antecipadamente as próximas N inserções baratas.",
    "Slide 14: Cheat Sheet Python. Enfatize as armadilhas comuns: 'x in list' é O(N), mas 'x in set' é O(1). 'arr.insert(0)' é O(N).",
    "Slide 15: Desafio 1 (Pulo de 2 em 2). Peça para a turma analisar o 'range(0, n, 2)'. Relembre a Regra 1 de descarte de constantes.",
    "Slide 16: Desafio 2 (Dobrando o Índice). Mostre o crescimento exponencial do índice i e a relação inversa com log₂(n).",
    "Slide 17: Desafio 3 (Sequencial + Aninhado). Destaque a aplicação da Regra de Adição somada à Regra do Termo Dominante.",
    "Slide 18: Desafio 4 (Loop Triangular). Explique a progressão de Gauss e por que somar de N-1 até 0 ainda resulta em N².",
    "Slide 19: Desafio 5 (Busca Oculta com 'in list'). Alerte que 'in list' esconde um loop O(M). Mostre a otimização com set().",
    "Slide 20: Desafio 6 (Concatenação de Strings). Explique a imutabilidade de strings em Python e por que deve-se usar ''.join().",
    "Slide 21: Desafio 7 (Recursão e Call Stack). Mostre que cada chamada consome memória na pilha até que o caso base seja atingido.",
    "Slide 22: Desafio 8 (Two Sum Ordenado). Demonstre a técnica dos Dois Ponteiros convergindo em no máximo N passos.",
    "Slide 23: Desafio 9 (Linear + Interno Logarítmico). Explique o produto O(N * log N) pela Regra 4 de Multiplicação.",
    "Slide 24: Desafio 10 (Três Abordagens para Duplicados). Discuta os trade-offs práticos entre velocidade e memória no mundo real.",
    "Slide 25: Resumo final. Revise os 6 pontos-chave como checklist de sobrevivência para a disciplina.",
    "Slide 26: Referências Bibliográficas. Recomende a leitura do livro 'Entendendo Algoritmos' e o site BigOCheatSheet.",
    "Slide 27: Encerramento da aula. Abra para dúvidas e informe o tema da próxima aula (Arrays e Strings)."
  ];

  // Initialize Navigation Modal Grid
  slides.forEach((slide, idx) => {
    const titleEl = slide.querySelector('.slide-title');
    const titleText = titleEl ? titleEl.textContent : (idx === 0 ? "Capa: Fundamentos e Big-O" : `Slide ${idx + 1}`);
    const tagEl = slide.querySelector('.slide-tag');
    const tagText = tagEl ? tagEl.textContent : 'Módulo';

    const gridItem = document.createElement('div');
    gridItem.className = `grid-nav-item ${idx === 0 ? 'active' : ''}`;
    gridItem.innerHTML = `
      <div class="nav-item-num">SLIDE ${idx + 1} • ${tagText}</div>
      <div class="nav-item-title">${titleText}</div>
    `;
    gridItem.addEventListener('click', () => {
      goToSlide(idx);
      closeOverviewModal();
    });
    slideGridNav.appendChild(gridItem);
  });

  function updateSlides() {
    slides.forEach((slide, idx) => {
      if (idx === currentSlideIndex) {
        slide.classList.add('active');
        slide.scrollTop = 0;
      } else {
        slide.classList.remove('active');
      }
    });

    slideCounter.textContent = `${currentSlideIndex + 1} / ${slides.length}`;
    const progressPercent = ((currentSlideIndex + 1) / slides.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    const navItems = slideGridNav.querySelectorAll('.grid-nav-item');
    navItems.forEach((item, idx) => {
      if (idx === currentSlideIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    btnPrev.disabled = currentSlideIndex === 0;
    btnNext.disabled = currentSlideIndex === slides.length - 1;

    // Update Presenter Notes
    notesContent.textContent = presenterNotes[currentSlideIndex] || "Sem notas para este slide.";

    // Trigger canvas redraw if on slide 6 (Zoo)
    if (currentSlideIndex === 5) {
      setTimeout(drawBigOCanvas, 50);
    }
  }

  window.goToSlide = function(index) {
    if (index >= 0 && index < slides.length) {
      currentSlideIndex = index;
      updateSlides();
    }
  };

  function nextSlide() {
    if (currentSlideIndex < slides.length - 1) {
      currentSlideIndex++;
      updateSlides();
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      updateSlides();
    }
  }

  function openOverviewModal() {
    overviewModal.classList.add('open');
  }

  function closeOverviewModal() {
    overviewModal.classList.remove('open');
  }

  function togglePresenterNotes() {
    presenterNotesVisible = !presenterNotesVisible;
    if (presenterNotesVisible) {
      notesDrawer.classList.add('open');
      btnNotes.classList.add('active');
      showToast("Notas do apresentador visíveis (P)");
    } else {
      notesDrawer.classList.remove('open');
      btnNotes.classList.remove('active');
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      btnFullscreen.textContent = "⛶ Sair Tela Cheia";
      showToast("Modo Tela Cheia ativado (F)");
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        btnFullscreen.textContent = "⛶ Tela Cheia";
      }
    }
  }

  function showToast(text) {
    toastMsg.textContent = text;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 2200);
  }

  // Event Listeners for Top Controls
  btnPrev.addEventListener('click', prevSlide);
  btnNext.addEventListener('click', nextSlide);
  btnOverview.addEventListener('click', openOverviewModal);
  modalClose.addEventListener('click', closeOverviewModal);
  btnNotes.addEventListener('click', togglePresenterNotes);
  btnFullscreen.addEventListener('click', toggleFullscreen);

  // Global Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // Ignore keydown if user is typing in an input
    if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
      e.preventDefault();
      prevSlide();
    } else if (e.key.toLowerCase() === 'm') {
      e.preventDefault();
      if (overviewModal.classList.contains('open')) {
        closeOverviewModal();
      } else {
        openOverviewModal();
      }
    } else if (e.key.toLowerCase() === 'p') {
      e.preventDefault();
      togglePresenterNotes();
    } else if (e.key.toLowerCase() === 'f') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 'Escape') {
      closeOverviewModal();
      if (presenterNotesVisible) togglePresenterNotes();
    }
  });

  // Solution Toggle helper
  window.toggleSolution = function(id) {
    const el = document.getElementById(id);
    if (el) {
      el.classList.toggle('visible');
    }
  };

  // =========================================================================
  // SIMULATOR 1: WALL-CLOCK VS ASYMPTOTIC (SLIDE 2)
  // =========================================================================
  const btnSimClock = document.getElementById('btn-sim-clock');
  const sliderSimN = document.getElementById('slider-sim-n');
  const valSimN = document.getElementById('val-sim-n');
  const simMariaTime = document.getElementById('sim-maria-time');
  const simJoaoTime = document.getElementById('sim-joao-time');
  const mariaOpsCount = document.getElementById('maria-ops-count');
  const joaoOpsCount = document.getElementById('joao-ops-count');
  const mariaProgress = document.getElementById('maria-progress');
  const joaoProgress = document.getElementById('joao-progress');
  const cardMaria = document.getElementById('card-maria');
  const cardJoao = document.getElementById('card-joao');
  const mariaBadge = document.getElementById('maria-badge-container');
  const joaoBadge = document.getElementById('joao-badge-container');
  const simClockVerdict = document.getElementById('sim-clock-verdict');

  const btnPresetSmall = document.getElementById('btn-preset-small');
  const btnPresetMed = document.getElementById('btn-preset-med');
  const btnPresetLarge = document.getElementById('btn-preset-large');
  const btnPresetHuge = document.getElementById('btn-preset-huge');

  // Exponential scale values for slider index 0 to 12
  const simNValues = [10, 20, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000];

  function getNValue() {
    const sliderIdx = parseInt(sliderSimN.value, 10);
    return simNValues[sliderIdx] || 500;
  }

  function setSliderToN(targetN) {
    const closestIdx = simNValues.reduce((prev, curr, idx) => {
      return Math.abs(curr - targetN) < Math.abs(simNValues[prev] - targetN) ? idx : prev;
    }, 0);
    sliderSimN.value = closestIdx;
    runBenchmark(true);
  }

  function formatTime(sec) {
    if (sec < 1e-6) return `${(sec * 1e9).toFixed(1)} ns (nanossegs)`;
    if (sec < 1e-3) return `${(sec * 1e6).toFixed(2)} µs (microssegs)`;
    if (sec < 1) return `${(sec * 1e3).toFixed(2)} ms (milissegs)`;
    if (sec < 60) return `${sec.toFixed(3)} segundos`;
    if (sec < 3600) return `${(sec / 60).toFixed(2)} minutos`;
    return `${(sec / 3600).toFixed(2)} horas`;
  }

  function runBenchmark(immediate = false) {
    const N = getNValue();
    valSimN.textContent = `N = ${N.toLocaleString()}`;

    // Maria: Core i9 (5GHz = 5*10^9 ops/s), O(N^2)
    const mariaOps = N * N;
    const mariaSec = mariaOps / 5e9;

    // Joao: Core i3 (1.8GHz = 1.8*10^9 ops/s), O(10*N)
    const joaoOps = 10 * N;
    const joaoSec = joaoOps / 1.8e9;

    // Update Operations Counter
    mariaOpsCount.textContent = `${mariaOps.toLocaleString()} ops`;
    joaoOpsCount.textContent = `${joaoOps.toLocaleString()} ops`;

    // Reset Classes & Progress
    cardMaria.classList.remove('card-winner', 'card-loser');
    cardJoao.classList.remove('card-winner', 'card-loser');
    mariaBadge.innerHTML = '';
    joaoBadge.innerHTML = '';

    if (!immediate && btnSimClock) {
      btnSimClock.textContent = '⏳ Executando...';
      btnSimClock.disabled = true;
      mariaProgress.style.width = '10%';
      joaoProgress.style.width = '10%';
    }

    setTimeout(() => {
      simMariaTime.textContent = formatTime(mariaSec);
      simJoaoTime.textContent = formatTime(joaoSec);

      if (btnSimClock) {
        btnSimClock.textContent = '▶️ Executar Benchmark';
        btnSimClock.disabled = false;
      }

      if (joaoSec < mariaSec) {
        // Joao is faster
        const ratio = (mariaSec / joaoSec).toFixed(1);
        cardJoao.classList.add('card-winner');
        cardMaria.classList.add('card-loser');
        joaoBadge.innerHTML = `<span class="badge-winner">🏆 VENCEDOR (${ratio}x mais rápido)</span>`;
        mariaBadge.innerHTML = `<span class="badge-loser">❌ MAIS LENTO</span>`;

        joaoProgress.style.width = '100%';
        const mariaBar = Math.max(5, Math.min(100, (joaoSec / mariaSec) * 100));
        mariaProgress.style.width = `${mariaBar}%`;

        simClockVerdict.innerHTML = `
          🏆 <strong style="color: var(--accent-emerald);">Vitória Absoluta do Algoritmo Linear <i>O</i>(<i>N</i>)!</strong><br>
          Mesmo rodando em um processador <strong>quase 3x mais lento</strong> (Core i3 1.8 GHz), João executou <strong>${ratio}x mais rápido</strong> que Maria. 
          A complexidade assintótica do algoritmo (<i>O</i>(<i>N</i>) vs <i>O</i>(<i>N</i><sup>2</sup>)) superou totalmente o hardware de ponta!
        `;
      } else {
        // Maria is faster (only for tiny N)
        const ratio = (joaoSec / mariaSec).toFixed(1);
        cardMaria.classList.add('card-winner');
        cardJoao.classList.add('card-loser');
        mariaBadge.innerHTML = `<span class="badge-winner">🏆 VENCEDORA (Clock 5.0 GHz)</span>`;
        joaoBadge.innerHTML = `<span class="badge-loser">MAIS LENTO</span>`;

        mariaProgress.style.width = '100%';
        const joaoBar = Math.max(5, Math.min(100, (mariaSec / joaoSec) * 100));
        joaoProgress.style.width = `${joaoBar}%`;

        simClockVerdict.innerHTML = `
          ⚠️ <strong style="color: var(--accent-amber);">Maria venceu temporariamente apenas pelo Clock da CPU!</strong><br>
          Para <i>N</i> = ${N}, o volume de dados é minúsculo (apenas ${mariaOps} ops) e o clock de 5.0 GHz disfarçou a ineficiência. 
          <strong>Experimente aumentar <i>N</i> para 1.000 ou 10.000</strong> e veja o que acontece!
        `;
      }
    }, immediate ? 0 : 300);
  }

  if (sliderSimN) {
    sliderSimN.addEventListener('input', () => runBenchmark(true));
  }
  if (btnSimClock) {
    btnSimClock.addEventListener('click', () => runBenchmark(false));
  }

  if (btnPresetSmall) btnPresetSmall.addEventListener('click', () => setSliderToN(10));
  if (btnPresetMed) btnPresetMed.addEventListener('click', () => setSliderToN(500));
  if (btnPresetLarge) btnPresetLarge.addEventListener('click', () => setSliderToN(10000));
  if (btnPresetHuge) btnPresetHuge.addEventListener('click', () => setSliderToN(100000));

  runBenchmark(true);

  // =========================================================================
  // SIMULATOR 2: POLYNOMIAL DOMINANCE CALCULATOR (SLIDE 3)
  // =========================================================================
  const sliderPolyN = document.getElementById('slider-poly-n');
  const valPolyN = document.getElementById('val-poly-n');
  const calcTermQuad = document.getElementById('calc-term-quad');
  const calcPctQuad = document.getElementById('calc-pct-quad');
  const calcTermLin = document.getElementById('calc-term-lin');
  const calcPctLin = document.getElementById('calc-pct-lin');
  const calcTermTotal = document.getElementById('calc-term-total');

  function updatePolyCalc() {
    if (!sliderPolyN) return;
    const N = parseInt(sliderPolyN.value, 10);
    valPolyN.textContent = `N = ${N.toLocaleString()}`;

    const quad = 4 * N * N;
    const lin = 2 * N;
    const c = 7;
    const total = quad + lin + c;

    const pctQuad = ((quad / total) * 100).toFixed(2);
    const pctLin = ((lin / total) * 100).toFixed(2);

    calcTermQuad.textContent = quad.toLocaleString();
    calcPctQuad.textContent = `${pctQuad}% do total`;

    calcTermLin.textContent = lin.toLocaleString();
    calcPctLin.textContent = `${pctLin}% do total`;

    calcTermTotal.textContent = total.toLocaleString();
  }

  if (sliderPolyN) sliderPolyN.addEventListener('input', updatePolyCalc);
  updatePolyCalc();

  // =========================================================================
  // SIMULATOR 3: LINEAR SEARCH CASES (SLIDE 4)
  // =========================================================================
  const linearArrayEl = document.getElementById('linear-search-array');
  const btnCaseBest = document.getElementById('btn-case-best');
  const btnCaseAvg = document.getElementById('btn-case-avg');
  const btnCaseWorst = document.getElementById('btn-case-worst');
  const caseTitle = document.getElementById('case-title');
  const caseDesc = document.getElementById('case-desc');
  const caseComplexity = document.getElementById('case-complexity');

  const linearSampleData = [10, 25, 33, 47, 52, 68, 74, 89, 91];

  function renderLinearSearch(targetIdx, title, desc, steps, compTag, compName) {
    if (!linearArrayEl) return;
    linearArrayEl.innerHTML = '';
    linearSampleData.forEach((val, idx) => {
      const cell = document.createElement('div');
      cell.className = 'array-cell';
      cell.innerHTML = `<span class="cell-idx">[${idx}]</span>${val}`;

      if (idx <= targetIdx && targetIdx !== -1) {
        if (idx === targetIdx) {
          cell.classList.add('active-target');
        } else {
          cell.classList.add('active-inspect');
        }
      } else if (targetIdx === -1) {
        cell.classList.add('active-inspect');
      }

      linearArrayEl.appendChild(cell);
    });

    if (caseTitle) caseTitle.textContent = `Cenário: ${title}`;
    if (caseDesc) caseDesc.textContent = desc;
    if (caseComplexity) caseComplexity.innerHTML = `Passos: <span style="color: var(--accent-emerald); font-weight:700;">${steps}</span> • Complexidade: <span class="complexity-tag ${compTag}">${compName}</span>`;
  }

  if (btnCaseBest) {
    btnCaseBest.addEventListener('click', () => {
      btnCaseBest.classList.add('active');
      btnCaseAvg.classList.remove('active');
      btnCaseWorst.classList.remove('active');
      renderLinearSearch(0, "Melhor Caso (Best Case)", "O elemento buscado (10) está logo no índice 0!", "1 passo", "tag-excellent", "Ω(1)");
    });
  }

  if (btnCaseAvg) {
    btnCaseAvg.addEventListener('click', () => {
      btnCaseAvg.classList.add('active');
      btnCaseBest.classList.remove('active');
      btnCaseWorst.classList.remove('active');
      renderLinearSearch(4, "Caso Médio (Average Case)", "O elemento buscado (52) está próximo ao centro da lista.", "5 passos (~N/2)", "tag-good", "Θ(N)");
    });
  }

  if (btnCaseWorst) {
    btnCaseWorst.addEventListener('click', () => {
      btnCaseWorst.classList.add('active');
      btnCaseBest.classList.remove('active');
      btnCaseAvg.classList.remove('active');
      renderLinearSearch(-1, "Pior Caso (Worst Case)", "O elemento buscado não existe na lista ou é o último (91). Percorre todos os N itens.", `${linearSampleData.length} passos (N)`, "tag-good", "O(N)");
    });
  }

  renderLinearSearch(0, "Melhor Caso (Best Case)", "O elemento buscado (10) está logo no índice 0!", "1 passo", "tag-excellent", "Ω(1)");

  // =========================================================================
  // SIMULATOR 4: BIG-O GROWTH CURVES CANVAS (SLIDE 6)
  // =========================================================================
  const bigOCanvas = document.getElementById('big-o-canvas');
  const curveToggleGroup = document.getElementById('curve-toggle-group');

  const activeCurves = {
    o1: true,
    ologn: true,
    on: true,
    onlogn: true,
    on2: true,
    o2n: true
  };

  if (curveToggleGroup) {
    curveToggleGroup.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const curveKey = btn.getAttribute('data-curve');
        activeCurves[curveKey] = !activeCurves[curveKey];
        btn.classList.toggle('active');
        drawBigOCanvas();
      });
    });
  }

  function drawBigOCanvas() {
    if (!bigOCanvas) return;
    const ctx = bigOCanvas.getContext('2d');
    const width = bigOCanvas.parentElement.clientWidth;
    const height = bigOCanvas.parentElement.clientHeight;

    bigOCanvas.width = width;
    bigOCanvas.height = height;

    ctx.clearRect(0, 0, width, height);

    const padLeft = 55;
    const padRight = 85;
    const padTop = 32;
    const padBottom = 40;

    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    const maxN = 25;
    const maxOps = 100;

    function toScreenX(n) {
      return padLeft + (n / maxN) * plotW;
    }

    function toScreenY(ops) {
      return (height - padBottom) - (ops / maxOps) * plotH;
    }

    // Quality zones (Subtle background tints)
    const yExcellent = toScreenY(25);
    const gradEx = ctx.createLinearGradient(0, yExcellent, 0, height - padBottom);
    gradEx.addColorStop(0, 'rgba(52, 211, 153, 0.08)');
    gradEx.addColorStop(1, 'rgba(52, 211, 153, 0.01)');
    ctx.fillStyle = gradEx;
    ctx.fillRect(padLeft, yExcellent, plotW, (height - padBottom) - yExcellent);

    // Grid lines & Axis markings
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    ctx.font = '10px JetBrains Mono';
    ctx.fillStyle = '#64748b';

    // Vertical grid & X labels
    for (let n = 5; n <= maxN; n += 5) {
      const x = toScreenX(n);
      ctx.beginPath();
      ctx.moveTo(x, padTop);
      ctx.lineTo(x, height - padBottom);
      ctx.stroke();
      ctx.textAlign = 'center';
      ctx.fillText(n.toString(), x, height - padBottom + 16);
    }

    // Horizontal grid & Y labels
    for (let ops = 25; ops <= maxOps; ops += 25) {
      const y = toScreenY(ops);
      ctx.beginPath();
      ctx.moveTo(padLeft, y);
      ctx.lineTo(padLeft + plotW, y);
      ctx.stroke();
      ctx.textAlign = 'right';
      ctx.fillText(ops.toString(), padLeft - 8, y + 3);
    }

    // Axes lines
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padLeft, padTop - 8);
    ctx.lineTo(padLeft, height - padBottom);
    ctx.lineTo(padLeft + plotW + 20, height - padBottom);
    ctx.stroke();

    // Axis titles
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 11px JetBrains Mono';
    ctx.textAlign = 'left';
    ctx.fillText('Operações (Tempo) ↑', padLeft + 4, padTop - 14);
    ctx.textAlign = 'right';
    ctx.fillText('Tamanho (N) →', padLeft + plotW + 20, height - padBottom + 30);

    const curvesList = [
      { id: 'o1', name: 'O(1)', color: '#34d399', fn: n => 6 },
      { id: 'ologn', name: 'O(log N)', color: '#38bdf8', fn: n => Math.log2(n + 1) * 5.2 + 6 },
      { id: 'on', name: 'O(N)', color: '#60a5fa', fn: n => n * 2.3 },
      { id: 'onlogn', name: 'O(N log N)', color: '#fbbf24', fn: n => n * Math.log2(n + 1) * 0.85 },
      { id: 'on2', name: 'O(N²)', color: '#fb923c', fn: n => (n * n) * 0.22 },
      { id: 'o2n', name: 'O(2ᴺ)', color: '#f43f5e', fn: n => Math.pow(2, n * 0.44) }
    ];

    curvesList.forEach(curve => {
      if (!activeCurves[curve.id]) return;

      // 1. Draw continuous curve with Cartesian viewport clipping
      ctx.save();
      ctx.beginPath();
      ctx.rect(padLeft, padTop, plotW, plotH);
      ctx.clip();

      ctx.strokeStyle = curve.color;
      ctx.lineWidth = 2.8;
      ctx.beginPath();

      let started = false;
      for (let n = 0; n <= maxN; n += 0.1) {
        const ops = curve.fn(n);
        const sx = toScreenX(n);
        const sy = toScreenY(ops);

        if (!started) {
          ctx.moveTo(sx, sy);
          started = true;
        } else {
          ctx.lineTo(sx, sy);
        }

        if (ops > maxOps * 1.5) break;
      }
      ctx.stroke();
      ctx.restore();

      // 2. Draw End Label Pill (outside clipping)
      let labelX, labelY;
      let exitAtTop = false;

      for (let n = 0.5; n <= maxN; n += 0.1) {
        const ops = curve.fn(n);
        if (ops >= maxOps) {
          labelX = toScreenX(n);
          labelY = padTop - 6;
          exitAtTop = true;
          break;
        }
      }

      if (!exitAtTop) {
        labelX = padLeft + plotW + 6;
        labelY = toScreenY(curve.fn(maxN));
      }

      // Draw Badge
      ctx.font = 'bold 11px JetBrains Mono';
      const textWidth = ctx.measureText(curve.name).width;

      if (exitAtTop) {
        ctx.fillStyle = 'rgba(9, 13, 22, 0.9)';
        ctx.strokeStyle = curve.color;
        ctx.lineWidth = 1.2;
        const bx = Math.max(padLeft, Math.min(width - padRight - textWidth, labelX - textWidth / 2));
        const by = padTop - 20;

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(bx - 4, by, textWidth + 8, 16, 4);
        } else {
          ctx.rect(bx - 4, by, textWidth + 8, 16);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = curve.color;
        ctx.textAlign = 'left';
        ctx.fillText(curve.name, bx, by + 12);
      } else {
        ctx.fillStyle = 'rgba(9, 13, 22, 0.9)';
        ctx.strokeStyle = curve.color;
        ctx.lineWidth = 1.2;
        const bx = labelX;
        const by = labelY - 8;

        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(bx, by, textWidth + 8, 16, 4);
        } else {
          ctx.rect(bx, by, textWidth + 8, 16);
        }
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = curve.color;
        ctx.textAlign = 'left';
        ctx.fillText(curve.name, bx + 4, by + 12);
      }
    });
  }

  window.addEventListener('resize', drawBigOCanvas);

  // =========================================================================
  // SIMULATOR 5: BINARY SEARCH (SLIDE 7)
  // =========================================================================
  const bsArrayContainer = document.getElementById('bs-array-container');
  const bsTargetInput = document.getElementById('bs-target-input');
  const btnBsStep = document.getElementById('btn-bs-step');
  const btnBsReset = document.getElementById('btn-bs-reset');
  const bsStatusText = document.getElementById('bs-status-text');

  const bsData = [2, 5, 8, 12, 16, 23, 38, 42, 56, 64, 72, 81, 89, 94, 98, 105];
  let bsLeft = 0;
  let bsRight = bsData.length - 1;
  let bsSteps = 0;
  let bsFinished = false;

  function renderBsArray() {
    if (!bsArrayContainer) return;
    bsArrayContainer.innerHTML = '';
    const target = parseInt(bsTargetInput.value, 10);

    bsData.forEach((val, idx) => {
      const cell = document.createElement('div');
      cell.className = 'array-cell';
      cell.innerHTML = `<span class="cell-idx">[${idx}]</span>${val}`;

      if (idx < bsLeft || idx > bsRight) {
        cell.classList.add('discarded');
      }

      if (idx === bsLeft) cell.classList.add('pointer-left');
      if (idx === bsRight) cell.classList.add('pointer-right');

      if (!bsFinished && idx >= bsLeft && idx <= bsRight) {
        const mid = Math.floor((bsLeft + bsRight) / 2);
        if (idx === mid) {
          cell.classList.add('active-inspect');
        }
      }

      if (bsFinished && val === target && idx >= bsLeft && idx <= bsRight) {
        cell.classList.add('active-target');
      }

      bsArrayContainer.appendChild(cell);
    });
  }

  function resetBs() {
    bsLeft = 0;
    bsRight = bsData.length - 1;
    bsSteps = 0;
    bsFinished = false;
    if (btnBsStep) btnBsStep.disabled = false;
    if (bsStatusText) bsStatusText.textContent = `Buscando alvo: ${bsTargetInput.value}. Espaço inicial: ${bsData.length} elementos (L=0, R=${bsData.length-1}).`;
    renderBsArray();
  }

  function stepBs() {
    if (bsFinished || bsLeft > bsRight) return;

    bsSteps++;
    const target = parseInt(bsTargetInput.value, 10);
    const mid = Math.floor((bsLeft + bsRight) / 2);
    const midVal = bsData[mid];

    if (midVal === target) {
      bsFinished = true;
      btnBsStep.disabled = true;
      bsStatusText.innerHTML = `🎯 <span style="color: var(--accent-emerald); font-weight:700;">Encontrado!</span> O valor ${target} está no índice [${mid}] em apenas <strong>${bsSteps} comparações</strong> (log₂(16) = 4 passos)!`;
    } else if (midVal < target) {
      bsStatusText.innerHTML = `Passo ${bsSteps}: Como arr[${mid}] = ${midVal} &lt; ${target}, descartamos toda a metade esquerda! Novo Left = ${mid + 1}.`;
      bsLeft = mid + 1;
    } else {
      bsStatusText.innerHTML = `Passo ${bsSteps}: Como arr[${mid}] = ${midVal} &gt; ${target}, descartamos toda a metade direita! Novo Right = ${mid - 1}.`;
      bsRight = mid - 1;
    }

    if (bsLeft > bsRight && !bsFinished) {
      bsFinished = true;
      btnBsStep.disabled = true;
      bsStatusText.innerHTML = `❌ O valor ${target} <strong>não existe</strong> na lista. Finalizado em ${bsSteps} passos.`;
    }

    renderBsArray();
  }

  if (btnBsStep) btnBsStep.addEventListener('click', stepBs);
  if (btnBsReset) btnBsReset.addEventListener('click', resetBs);
  if (bsTargetInput) bsTargetInput.addEventListener('change', resetBs);
  resetBs();

  // =========================================================================
  // SIMULATOR 6: BUBBLE SORT VISUALIZER (SLIDE 9)
  // =========================================================================
  const bubbleContainer = document.getElementById('bubble-array-container');
  const btnBubbleStep = document.getElementById('btn-bubble-step');
  const btnBubbleAuto = document.getElementById('btn-bubble-auto');
  const btnBubbleReset = document.getElementById('btn-bubble-reset');
  const bubbleComparisons = document.getElementById('bubble-comparisons');
  const bubbleSwaps = document.getElementById('bubble-swaps');
  const bubbleStatus = document.getElementById('bubble-status');

  let bubbleArray = [64, 34, 25, 12, 22, 11, 90];
  let b_i = 0;
  let b_j = 0;
  let b_comps = 0;
  let b_swapsCount = 0;
  let b_done = false;
  let b_autoInterval = null;

  function renderBubbleArray(inspectIdx1 = -1, inspectIdx2 = -1) {
    if (!bubbleContainer) return;
    bubbleContainer.innerHTML = '';
    bubbleArray.forEach((val, idx) => {
      const cell = document.createElement('div');
      cell.className = 'array-cell';
      cell.style.width = '48px';
      cell.style.height = '52px';
      cell.innerHTML = `<span class="cell-idx">[${idx}]</span>${val}`;

      if (idx === inspectIdx1 || idx === inspectIdx2) {
        cell.classList.add('active-inspect');
      }

      if (idx >= bubbleArray.length - b_i && b_i > 0) {
        cell.style.borderColor = 'var(--accent-emerald)';
        cell.style.color = 'var(--accent-emerald)';
      }

      bubbleContainer.appendChild(cell);
    });

    if (bubbleComparisons) bubbleComparisons.textContent = b_comps;
    if (bubbleSwaps) bubbleSwaps.textContent = b_swapsCount;
  }

  function resetBubble() {
    if (b_autoInterval) clearInterval(b_autoInterval);
    bubbleArray = [64, 34, 25, 12, 22, 11, 90];
    b_i = 0;
    b_j = 0;
    b_comps = 0;
    b_swapsCount = 0;
    b_done = false;
    if (btnBubbleStep) btnBubbleStep.disabled = false;
    if (btnBubbleAuto) btnBubbleAuto.disabled = false;
    if (bubbleStatus) bubbleStatus.textContent = 'Status: Array embaralhado';
    renderBubbleArray();
  }

  function stepBubble() {
    if (b_done) return;

    const n = bubbleArray.length;
    if (b_i < n - 1) {
      if (b_j < n - b_i - 1) {
        b_comps++;
        const current = bubbleArray[b_j];
        const next = bubbleArray[b_j + 1];

        if (current > next) {
          // Swap
          bubbleArray[b_j] = next;
          bubbleArray[b_j + 1] = current;
          b_swapsCount++;
          bubbleStatus.textContent = `Trocou arr[${b_j}]=${current} com arr[${b_j+1}]=${next}`;
        } else {
          bubbleStatus.textContent = `arr[${b_j}]=${current} <= arr[${b_j+1}]=${next} (Mantido)`;
        }

        renderBubbleArray(b_j, b_j + 1);
        b_j++;
      } else {
        b_j = 0;
        b_i++;
        renderBubbleArray();
      }
    } else {
      b_done = true;
      if (b_autoInterval) clearInterval(b_autoInterval);
      if (btnBubbleStep) btnBubbleStep.disabled = true;
      if (btnBubbleAuto) btnBubbleAuto.disabled = true;
      if (bubbleStatus) bubbleStatus.innerHTML = `🏆 <span style="color: var(--accent-emerald); font-weight:700;">Ordenado com Sucesso!</span> Total: ${b_comps} comparações e ${b_swapsCount} trocas.`;
      renderBubbleArray();
    }
  }

  if (btnBubbleStep) btnBubbleStep.addEventListener('click', stepBubble);
  if (btnBubbleReset) btnBubbleReset.addEventListener('click', resetBubble);
  if (btnBubbleAuto) {
    btnBubbleAuto.addEventListener('click', () => {
      if (b_autoInterval) clearInterval(b_autoInterval);
      b_autoInterval = setInterval(() => {
        if (b_done) {
          clearInterval(b_autoInterval);
        } else {
          stepBubble();
        }
      }, 200);
    });
  }

  resetBubble();

  // =========================================================================
  // SIMULATOR 7: FIBONACCI RECURSION TREE (SLIDE 10)
  // =========================================================================
  const sliderFibN = document.getElementById('slider-fib-n');
  const valFibN = document.getElementById('val-fib-n');
  const fibTreeContainer = document.getElementById('fib-tree-container');

  function generateFibTreeHTML(n) {
    let callCount = 0;

    function buildNode(val) {
      callCount++;
      if (val <= 1) {
        return `<div style="display: inline-block; padding: 4px 8px; margin: 4px; background: #131d33; border: 1px solid var(--accent-cyan); border-radius: 4px; font-size: 0.75rem;">fib(${val}) ➔ ${val}</div>`;
      }

      return `
        <div style="display: inline-flex; flex-direction: column; align-items: center; margin: 4px 8px; border: 1px dashed rgba(255,255,255,0.15); padding: 6px; border-radius: 6px;">
          <div style="font-weight: 700; color: var(--accent-amber); margin-bottom: 4px;">fib(${val})</div>
          <div style="display: flex; gap: 8px;">
            ${buildNode(val - 1)}
            ${buildNode(val - 2)}
          </div>
        </div>
      `;
    }

    const tree = buildNode(n);
    return `
      <div style="margin-bottom: 10px; color: var(--text-muted);">
        Total de Chamadas Recursivas: <strong style="color: var(--accent-rose); font-size: 1.1rem;">${callCount}</strong> (Crescimento Exponencial <i>O</i>(2<sup><i>N</i></sup>))
      </div>
      <div style="display: flex; justify-content: center; overflow-x: auto; padding-bottom: 8px;">
        ${tree}
      </div>
    `;
  }

  function updateFibTree() {
    if (!sliderFibN || !fibTreeContainer) return;
    const n = parseInt(sliderFibN.value, 10);
    valFibN.textContent = `N = ${n}`;
    fibTreeContainer.innerHTML = generateFibTreeHTML(n);
  }

  if (sliderFibN) sliderFibN.addEventListener('input', updateFibTree);
  updateFibTree();

  // =========================================================================
  // SIMULATOR 8: TWO POINTERS DISTINCT COUNTER (SLIDE 12)
  // =========================================================================
  const distinctContainer = document.getElementById('distinct-array-container');
  const btnDistinctStep = document.getElementById('btn-distinct-step');
  const btnDistinctReset = document.getElementById('btn-distinct-reset');
  const distinctStatus = document.getElementById('distinct-status');

  const distinctData = [1, 1, 2, 2, 2, 6, 6, 9, 10];
  let dist_i = 1;
  let dist_count = 1;
  let dist_done = false;

  function renderDistinctArray() {
    if (!distinctContainer) return;
    distinctContainer.innerHTML = '';
    distinctData.forEach((val, idx) => {
      const cell = document.createElement('div');
      cell.className = 'array-cell';
      cell.innerHTML = `<span class="cell-idx">[${idx}]</span>${val}`;

      if (idx === dist_i && !dist_done) {
        cell.classList.add('active-inspect');
      }

      if (idx < dist_i || dist_done) {
        cell.style.borderColor = 'var(--accent-emerald)';
      }

      distinctContainer.appendChild(cell);
    });
  }

  function resetDistinct() {
    dist_i = 1;
    dist_count = 1;
    dist_done = false;
    if (btnDistinctStep) btnDistinctStep.disabled = false;
    if (distinctStatus) distinctStatus.innerHTML = `Array inicializado. Contador inicial <code>count = 1</code> (contando arr[0] = 1). Espaço de Memória Auxiliar: <span class="complexity-tag tag-excellent">O(1)</span>.`;
    renderDistinctArray();
  }

  function stepDistinct() {
    if (dist_done) return;

    if (dist_i < distinctData.length) {
      const current = distinctData[dist_i];
      const prev = distinctData[dist_i - 1];

      if (current !== prev) {
        dist_count++;
        distinctStatus.innerHTML = `Passo ${dist_i}: arr[${dist_i}]=${current} ≠ arr[${dist_i-1}]=${prev} ➔ <strong style="color:var(--accent-emerald);">Novo elemento único detectado!</strong> <code>count = ${dist_count}</code>`;
      } else {
        distinctStatus.innerHTML = `Passo ${dist_i}: arr[${dist_i}]=${current} == arr[${dist_i-1}]=${prev} ➔ Elemento repetido consecutivo. Pula sem incrementar.`;
      }

      dist_i++;
      renderDistinctArray();
    } else {
      dist_done = true;
      if (btnDistinctStep) btnDistinctStep.disabled = true;
      distinctStatus.innerHTML = `🏆 <strong style="color:var(--accent-emerald);">Fim da Varredura Linear!</strong> Total de Elementos Distintos: <strong>${dist_count}</strong>. Tempo: <i>O</i>(<i>N</i>) • Espaço: <i>O</i>(1).`;
      renderDistinctArray();
    }
  }

  if (btnDistinctStep) btnDistinctStep.addEventListener('click', stepDistinct);
  if (btnDistinctReset) btnDistinctReset.addEventListener('click', resetDistinct);
  resetDistinct();

  // =========================================================================
  // SIMULATOR 9: DYNAMIC ARRAY APPEND (SLIDE 13)
  // =========================================================================
  const dynamicBufferView = document.getElementById('dynamic-buffer-view');
  const btnAppendItem = document.getElementById('btn-append-item');
  const btnAppendReset = document.getElementById('btn-append-reset');
  const appendStatusLog = document.getElementById('append-status-log');

  let dynamicCapacity = 4;
  let dynamicItems = [10, 20];

  function renderDynamicBuffer() {
    if (!dynamicBufferView) return;
    dynamicBufferView.innerHTML = '';
    for (let i = 0; i < dynamicCapacity; i++) {
      const cell = document.createElement('div');
      cell.className = 'array-cell';
      cell.style.width = '54px';
      cell.style.height = '58px';

      if (i < dynamicItems.length) {
        cell.innerHTML = `<span class="cell-idx">[${i}]</span>${dynamicItems[i]}`;
        cell.classList.add('active-target');
      } else {
        cell.innerHTML = `<span class="cell-idx">[${i}]</span><span style="color:var(--text-dim); font-size:0.75rem;">Vazio</span>`;
        cell.style.borderStyle = 'dashed';
        cell.style.opacity = '0.5';
      }

      dynamicBufferView.appendChild(cell);
    }
  }

  if (btnAppendItem) {
    btnAppendItem.addEventListener('click', () => {
      const nextVal = (dynamicItems.length + 1) * 10;

      if (dynamicItems.length >= dynamicCapacity) {
        // Reallocation needed
        const oldCap = dynamicCapacity;
        dynamicCapacity *= 2;
        dynamicItems.push(nextVal);
        appendStatusLog.innerHTML = `⚠️ <strong>Buffer Cheio!</strong> Realoca novo bloco de capacidade 2<i>C</i> (${oldCap} → ${dynamicCapacity}). Copia os <i>N</i> itens (<i>O</i>(<i>N</i>)) e insere ${nextVal}. Próximos appends serão <i>O</i>(1)!`;
      } else {
        dynamicItems.push(nextVal);
        appendStatusLog.innerHTML = `✅ Inseriu ${nextVal} no slot livre [${dynamicItems.length - 1}]. Operação imediata <strong style="color:var(--accent-emerald);"><i>O</i>(1)</strong> (Capacidade: ${dynamicItems.length}/${dynamicCapacity}).`;
      }

      renderDynamicBuffer();
    });
  }

  if (btnAppendReset) {
    btnAppendReset.addEventListener('click', () => {
      dynamicCapacity = 4;
      dynamicItems = [10, 20];
      appendStatusLog.textContent = `Capacidade Inicial: 4 slots. Clique em "Inserir Elemento" para preencher!`;
      renderDynamicBuffer();
    });
  }

  renderDynamicBuffer();

  // =========================================================================
  // SIMULATOR 10: PYTHON CHEAT SHEET FILTER (SLIDE 14)
  // =========================================================================
  const filterGroup = document.getElementById('filter-type-group');
  const cheatSheetRows = document.querySelectorAll('#table-cheatsheet tbody tr');

  if (filterGroup) {
    filterGroup.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        filterGroup.querySelectorAll('button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');
        cheatSheetRows.forEach(row => {
          const type = row.getAttribute('data-type');
          if (filter === 'all' || type === filter) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        });
      });
    });
  }

  // Initial load state
  updateSlides();
});
