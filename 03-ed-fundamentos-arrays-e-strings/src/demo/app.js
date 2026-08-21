/**
 * ESTRUTURA DE DADOS — FATEC RIBEIRÃO PRETO 2026.2
 * Apresentação Interativa: Fundamentos: Arrays e Strings
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

  // Presenter Notes Database per Slide (22 slides)
  const presenterNotes = [
    "Slide 1: Capa da aula. Boas-vindas aos alunos. Apresente a dinâmica da aula: antes de cada técnica ou algoritmo otimizado, analisaremos um problema real do LeetCode para provocar a discussão sobre complexidade e limitações da força bruta.",
    "Slide 2: Explique o conceito de contiguidade de memória física. Mostre a fórmula de endereçamento O(1). Execute o simulador de acesso e de deslocamento (shift) para fixar por que insert(0) é O(N).",
    "Slide 3: Diferencie array estático de dinâmico. Demonstre no simulador a duplicação de capacidade (4 -> 8 -> 16) e explique o conceito de custo O(1) amortizado.",
    "Slide 4: Destaque a imutabilidade de strings em Python. Execute o benchmark para mostrar a explosão quadrática O(N²) de 's = s + ch' comparada à eficiência O(N) do 'str.join()'.",
    "Slide 5: Desafio LeetCode 167 (Two Sum II). Apresente o enunciado para a turma. Provoque: 'Como encontrar o par sem usar loops aninhados O(N²) e sem gastar memória extra O(N) do dicionário?'",
    "Slide 6: Técnica Dois Ponteiros Convergentes. Demonstre a solução e execute o simulador passo a passo, mostrando que avançar left ou right descarta metade das combinações sem esforço.",
    "Slide 7: Desafio LeetCode 26 (Remover Duplicados). Apresente o problema in-place. Alerte: 'Usar pop(i) a cada repetido causaria deslocamentos repetidos de memória, levando a O(N²)!'",
    "Slide 8: Técnica Dois Ponteiros Rápido e Lento. Mostre como slow marca a última posição confirmada e fast explora o array. Apresente também o LeetCode 283 (Mover Zeros).",
    "Slide 9: Desafio LeetCode 643 (Subarray de Maior Média). Apresente o problema de janela de tamanho K. Pergunte: 'Por que recalcular a soma de cada fatia do zero custa O(N * K)?'",
    "Slide 10: Técnica Janela Deslizante Fixa. Mostre a transição em O(1) (+ novo, - antigo) e execute o simulador para a turma visualizar as atualizações em tempo real.",
    "Slide 11: Desafio LeetCode 209 (Menor Subarray com Soma >= S). Destaque a diferença: o tamanho da janela é dinâmico. Pergunte como controlar as duas bordas.",
    "Slide 12: Técnica Janela Deslizante Dinâmica (Expand & Shrink). Explique a mecânica de expandir até bater a meta e contrair para minimizar. Explique a análise amortizada do while.",
    "Slide 13: Desafio LeetCode 303 (Range Sum Query). Apresente o cenário de 100.000 consultas. Enfatize que qualquer laço linear tomará Time Limit Exceeded (TLE).",
    "Slide 14: Técnica Prefix Sum. Deduza a fórmula P[R] - P[L-1] e use o simulador com sliders de L e R para mostrar a consulta instantânea em O(1).",
    "Slide 15: Desafio LeetCode 125 (Valid Palindrome). Apresente o problema com espaços e pontuação. Pergunte como validar sem gastar memória criando uma nova string filtrada.",
    "Slide 16: Técnica Palíndromos com Dois Ponteiros In-Place. Mostre o código com isalnum() pulando caracteres especiais em tempo O(N) e espaço estrito O(1).",
    "Slide 17: Desafio LeetCode 242 (Valid Anagram). Pergunte à turma: 'sorted(s) == sorted(t) resolve, mas qual é o custo? Como bater o O(N log N) e fazer em tempo linear O(N)?'",
    "Slide 18: Técnica Anagramas com Histograma de Frequência. Mostre a contagem de letras (+1 e -1) e execute o testador interativo de palíndromos e anagramas.",
    "Slide 19: Cheat Sheet Python. Revise a tabela com as complexidades dos métodos nativos (list, str, deque, Counter) como checklist de consulta rápida.",
    "Slide 20: Trilha de Exercícios LeetCode. Oriente os alunos sobre os problemas recomendados para o laboratório e estudo individual, reforçando a técnica trabalhada em cada um.",
    "Slide 21: Resumo dos Pontos-Chave. Recapitule os 6 pontos de ouro da aula como regras de sobrevivência para a disciplina e entrevistas técnicas.",
    "Slide 22: Encerramento. Agradeça a turma, abra para dúvidas e faça o gancho com a próxima aula: Listas Encadeadas, Pilhas e Filas."
  ];

  // Initialize Navigation Modal Grid
  slides.forEach((slide, idx) => {
    const titleEl = slide.querySelector('.slide-title');
    const titleText = titleEl ? titleEl.textContent : (idx === 0 ? "Capa: Arrays e Strings" : `Slide ${idx + 1}`);
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
      showToast("Notas do apresentador ocultas (P)");
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        showToast(`Erro ao ativar tela cheia: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  function showToast(msg) {
    toastMsg.textContent = msg;
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 2400);
  }

  // Keyboard Event Listeners
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'm' || e.key === 'M') {
      if (overviewModal.classList.contains('open')) {
        closeOverviewModal();
      } else {
        openOverviewModal();
      }
    } else if (e.key === 'p' || e.key === 'P') {
      togglePresenterNotes();
    } else if (e.key === 'f' || e.key === 'F') {
      toggleFullscreen();
    } else if (e.key === 'Escape') {
      closeOverviewModal();
      if (presenterNotesVisible) togglePresenterNotes();
    }
  });

  btnPrev.addEventListener('click', prevSlide);
  btnNext.addEventListener('click', nextSlide);
  btnOverview.addEventListener('click', openOverviewModal);
  modalClose.addEventListener('click', closeOverviewModal);
  btnNotes.addEventListener('click', togglePresenterNotes);
  btnFullscreen.addEventListener('click', toggleFullscreen);

  overviewModal.addEventListener('click', (e) => {
    if (e.target === overviewModal) closeOverviewModal();
  });

  // =========================================================================
  // SIMULATOR 1: MEMORY ADDRESSING & SHIFTING (SLIDE 2)
  // =========================================================================
  const memArrayView = document.getElementById('mem-array-view');
  const memStatusBox = document.getElementById('mem-status-box');
  const btnMemAccess = document.getElementById('btn-mem-access');
  const btnMemInsert = document.getElementById('btn-mem-insert');
  const btnMemReset = document.getElementById('btn-mem-reset');

  let memData = [42, 17, 89, 5, 63];
  const BASE_ADDR = 0x1000;
  const TYPE_SIZE = 4;

  function renderMemArray(activeIdx = -1, isTarget = false) {
    if (!memArrayView) return;
    memArrayView.innerHTML = '';
    memData.forEach((val, idx) => {
      const addrHex = '0x' + (BASE_ADDR + idx * TYPE_SIZE).toString(16).toUpperCase();
      const cell = document.createElement('div');
      cell.className = `array-cell ${idx === activeIdx ? (isTarget ? 'active-target' : 'active-inspect') : ''}`;
      cell.innerHTML = `
        <span class="cell-idx">[${idx}]</span>
        ${val}
        <span class="cell-mem">${addrHex}</span>
      `;
      memArrayView.appendChild(cell);
    });
  }

  if (btnMemAccess) {
    btnMemAccess.addEventListener('click', () => {
      const targetIdx = 3;
      renderMemArray(targetIdx, true);
      const targetAddr = '0x' + (BASE_ADDR + targetIdx * TYPE_SIZE).toString(16).toUpperCase();
      memStatusBox.innerHTML = `
        <span>⚡ <strong>Acesso O(1):</strong> Cálculo direto: <code>0x1000 + (3 &times; 4 bytes) = ${targetAddr}</code> &rarr; Valor: <strong style="color: var(--accent-emerald);">${memData[targetIdx]}</strong>.</span>
      `;
    });
  }

  if (btnMemInsert) {
    btnMemInsert.addEventListener('click', () => {
      memStatusBox.innerHTML = `<span>⏳ <strong>Deslocamento O(N):</strong> Movendo ${memData.length} elementos para a direita para liberar o índice 0...</span>`;
      let step = memData.length - 1;
      
      const shiftInterval = setInterval(() => {
        if (step >= 0) {
          renderMemArray(step, false);
          memStatusBox.innerHTML = `<span>Deslocando elemento <code>${memData[step]}</code> do índice <strong>[${step}]</strong> para <strong>[${step + 1}]</strong>...</span>`;
          step--;
        } else {
          clearInterval(shiftInterval);
          memData.unshift(99);
          renderMemArray(0, true);
          memStatusBox.innerHTML = `<span style="color: var(--accent-emerald);">✅ Inserção concluída! Novo elemento <code>99</code> gravado no endereço <code>0x1000</code>. Custo: <strong>${memData.length - 1} operações de cópia</strong> (O(N)).</span>`;
        }
      }, 350);
    });
  }

  if (btnMemReset) {
    btnMemReset.addEventListener('click', () => {
      memData = [42, 17, 89, 5, 63];
      renderMemArray();
      memStatusBox.innerHTML = `<span>Vetor resetado ao estado inicial.</span>`;
    });
  }

  renderMemArray();

  // =========================================================================
  // SIMULATOR 2: DYNAMIC ARRAY GROWTH (SLIDE 3)
  // =========================================================================
  const dynArrayView = document.getElementById('dyn-array-view');
  const dynSizeEl = document.getElementById('dyn-size');
  const dynCapEl = document.getElementById('dyn-cap');
  const dynCostEl = document.getElementById('dyn-cost');
  const dynStatusBox = document.getElementById('dyn-status-box');
  const btnDynAppend = document.getElementById('btn-dyn-append');
  const btnDynFill = document.getElementById('btn-dyn-fill');
  const btnDynReset = document.getElementById('btn-dyn-reset');

  let dynItems = [];
  let dynCapacity = 4;

  function renderDynArray(isResized = false) {
    if (!dynArrayView) return;
    dynArrayView.innerHTML = '';
    for (let i = 0; i < dynCapacity; i++) {
      const cell = document.createElement('div');
      const hasItem = i < dynItems.length;
      cell.className = `array-cell ${hasItem ? 'active-target' : 'discarded'}`;
      if (isResized && hasItem) {
        cell.style.borderColor = 'var(--accent-purple)';
      }
      cell.innerHTML = `
        <span class="cell-idx">[${i}]</span>
        ${hasItem ? dynItems[i] : '∅'}
        <span class="cell-mem">${hasItem ? 'Ocupado' : 'Livre'}</span>
      `;
      dynArrayView.appendChild(cell);
    }
    if (dynSizeEl) dynSizeEl.textContent = dynItems.length;
    if (dynCapEl) dynCapEl.textContent = dynCapacity;
  }

  function appendDynItem() {
    const val = Math.floor(Math.random() * 90) + 10;
    if (dynItems.length === dynCapacity) {
      const oldCap = dynCapacity;
      dynCapacity *= 2;
      dynItems.push(val);
      renderDynArray(true);
      if (dynCostEl) {
        dynCostEl.textContent = `O(N) - Redimensionou buffer (${oldCap} -> ${dynCapacity})`;
        dynCostEl.style.color = 'var(--accent-purple)';
      }
      dynStatusBox.innerHTML = `
        <span style="color: var(--accent-purple);">⚠️ <strong>Buffer Cheio!</strong> Alocado novo bloco de capacidade <strong>${dynCapacity}</strong>. Copiados ${dynItems.length - 1} itens + 1 inserção. Custo O(N).</span>
      `;
    } else {
      dynItems.push(val);
      renderDynArray(false);
      if (dynCostEl) {
        dynCostEl.textContent = 'O(1) - Inserção direta no slot livre';
        dynCostEl.style.color = 'var(--accent-emerald)';
      }
      dynStatusBox.innerHTML = `
        <span>Inserido <code>${val}</code> no slot livre <strong>[${dynItems.length - 1}]</strong>. Custo: <strong>O(1)</strong>.</span>
      `;
    }
  }

  if (btnDynAppend) btnDynAppend.addEventListener('click', appendDynItem);
  if (btnDynFill) {
    btnDynFill.addEventListener('click', () => {
      for (let i = 0; i < 10; i++) appendDynItem();
    });
  }
  if (btnDynReset) {
    btnDynReset.addEventListener('click', () => {
      dynItems = [];
      dynCapacity = 4;
      renderDynArray();
      if (dynCostEl) {
        dynCostEl.textContent = 'O(1)';
        dynCostEl.style.color = 'var(--accent-emerald)';
      }
      dynStatusBox.innerHTML = `<span>Buffer resetado para capacidade inicial 4.</span>`;
    });
  }

  renderDynArray();

  // =========================================================================
  // SIMULATOR 3: STRING CONCATENATION BENCHMARK (SLIDE 4)
  // =========================================================================
  let strN = 5000;
  const strBadCopies = document.getElementById('str-bad-copies');
  const strBadTime = document.getElementById('str-bad-time');
  const strGoodCopies = document.getElementById('str-good-copies');
  const strGoodTime = document.getElementById('str-good-time');
  const btnStr100 = document.getElementById('btn-str-100');
  const btnStr5k = document.getElementById('btn-str-5k');
  const btnStr50k = document.getElementById('btn-str-50k');
  const btnStrRun = document.getElementById('btn-str-run');

  function updateStrBenchmark() {
    const badCopies = (strN * (strN + 1)) / 2;
    const goodCopies = strN;
    
    const badTimeSeconds = (badCopies / 1e8);
    const goodTimeSeconds = (goodCopies / 1e8);

    if (strBadCopies) strBadCopies.textContent = badCopies.toLocaleString() + ' cópias';
    if (strBadTime) strBadTime.textContent = badTimeSeconds < 0.001 ? '< 0.1 ms' : (badTimeSeconds.toFixed(3) + ' s');
    if (strGoodCopies) strGoodCopies.textContent = goodCopies.toLocaleString() + ' cópias';
    if (strGoodTime) strGoodTime.textContent = goodTimeSeconds < 0.001 ? '< 0.01 ms' : (goodTimeSeconds.toFixed(5) + ' s');
  }

  if (btnStr100) {
    btnStr100.addEventListener('click', () => {
      strN = 500;
      [btnStr100, btnStr5k, btnStr50k].forEach(b => b.classList.remove('active'));
      btnStr100.classList.add('active');
      updateStrBenchmark();
    });
  }
  if (btnStr5k) {
    btnStr5k.addEventListener('click', () => {
      strN = 5000;
      [btnStr100, btnStr5k, btnStr50k].forEach(b => b.classList.remove('active'));
      btnStr5k.classList.add('active');
      updateStrBenchmark();
    });
  }
  if (btnStr50k) {
    btnStr50k.addEventListener('click', () => {
      strN = 50000;
      [btnStr100, btnStr5k, btnStr50k].forEach(b => b.classList.remove('active'));
      btnStr50k.classList.add('active');
      updateStrBenchmark();
    });
  }
  if (btnStrRun) btnStrRun.addEventListener('click', updateStrBenchmark);

  updateStrBenchmark();

  // =========================================================================
  // SIMULATOR 4: TWO POINTERS INTERACTIVE (SLIDE 6)
  // =========================================================================
  const tpArrayView = document.getElementById('tp-array-view');
  const tpValLeft = document.getElementById('tp-val-left');
  const tpValRight = document.getElementById('tp-val-right');
  const tpValSum = document.getElementById('tp-val-sum');
  const tpStatusBox = document.getElementById('tp-status-box');
  const btnTpStep = document.getElementById('btn-tp-step');
  const btnTpAuto = document.getElementById('btn-tp-auto');
  const btnTpReset = document.getElementById('btn-tp-reset');

  const tpNums = [1, 2, 4, 6, 7, 9, 11, 20];
  const tpTarget = 13;
  let tpLeft = 0;
  let tpRight = tpNums.length - 1;
  let tpFound = false;
  let tpFinished = false;
  let tpInterval = null;

  function renderTpArray() {
    if (!tpArrayView) return;
    tpArrayView.innerHTML = '';
    tpNums.forEach((val, idx) => {
      const cell = document.createElement('div');
      const isL = idx === tpLeft;
      const isR = idx === tpRight;
      const isOut = idx < tpLeft || idx > tpRight;
      
      let stateClass = '';
      if (tpFound && (isL || isR)) stateClass = 'active-target';
      else if (isL || isR) stateClass = 'active-inspect';
      else if (isOut) stateClass = 'discarded';

      cell.className = `array-cell ${stateClass}`;
      cell.innerHTML = `
        <span class="cell-idx">[${idx}]</span>
        ${val}
        ${isL ? '<span class="pointer-badge badge-left">LEFT</span>' : ''}
        ${isR ? '<span class="pointer-badge badge-right">RIGHT</span>' : ''}
      `;
      tpArrayView.appendChild(cell);
    });

    if (tpValLeft) tpValLeft.textContent = `Índice ${tpLeft} (Valor: ${tpNums[tpLeft]})`;
    if (tpValRight) tpValRight.textContent = `Índice ${tpRight} (Valor: ${tpNums[tpRight]})`;
    const curSum = tpNums[tpLeft] + tpNums[tpRight];
    if (tpValSum) {
      tpValSum.textContent = `${tpNums[tpLeft]} + ${tpNums[tpRight]} = ${curSum} (${curSum === tpTarget ? '== Target!' : (curSum < tpTarget ? '< Target' : '> Target')})`;
      tpValSum.style.color = curSum === tpTarget ? 'var(--accent-emerald)' : (curSum < tpTarget ? 'var(--accent-cyan)' : 'var(--accent-purple)');
    }
  }

  function stepTwoPointers() {
    if (tpFound || tpFinished) return;

    const sum = tpNums[tpLeft] + tpNums[tpRight];
    if (sum === tpTarget) {
      tpFound = true;
      renderTpArray();
      tpStatusBox.innerHTML = `
        <span style="color: var(--accent-emerald); font-weight: 700;">🎉 SOMA ENCONTRADA! Índices [${tpLeft}, ${tpRight}] &rarr; ${tpNums[tpLeft]} + ${tpNums[tpRight]} = ${tpTarget}. Busca finalizada em tempo O(N)!</span>
      `;
      if (tpInterval) clearInterval(tpInterval);
      return;
    }

    if (sum < tpTarget) {
      tpStatusBox.innerHTML = `<span>Soma <strong>${sum} &lt; ${tpTarget}</strong> &rarr; Avançando <code>left (${tpLeft} &rarr; ${tpLeft + 1})</code> para obter número maior.</span>`;
      tpLeft++;
    } else {
      tpStatusBox.innerHTML = `<span>Soma <strong>${sum} &gt; ${tpTarget}</strong> &rarr; Recuando <code>right (${tpRight} &rarr; ${tpRight - 1})</code> para obter número menor.</span>`;
      tpRight--;
    }

    if (tpLeft >= tpRight) {
      tpFinished = true;
      tpStatusBox.innerHTML = `<span style="color: var(--accent-rose);">❌ Os ponteiros se cruzaram. Nenhum par soma ${tpTarget}.</span>`;
      if (tpInterval) clearInterval(tpInterval);
    }

    renderTpArray();
  }

  if (btnTpStep) btnTpStep.addEventListener('click', stepTwoPointers);
  if (btnTpAuto) {
    btnTpAuto.addEventListener('click', () => {
      if (tpInterval) clearInterval(tpInterval);
      tpInterval = setInterval(stepTwoPointers, 800);
    });
  }
  if (btnTpReset) {
    btnTpReset.addEventListener('click', () => {
      if (tpInterval) clearInterval(tpInterval);
      tpLeft = 0;
      tpRight = tpNums.length - 1;
      tpFound = false;
      tpFinished = false;
      renderTpArray();
      tpStatusBox.innerHTML = `<span>Clique em "Próximo Passo" para iniciar a busca.</span>`;
    });
  }

  renderTpArray();

  // =========================================================================
  // SIMULATOR 5: SLIDING WINDOW (SLIDE 10)
  // =========================================================================
  const swArrayView = document.getElementById('sw-array-view');
  const swValWindow = document.getElementById('sw-val-window');
  const swValCalc = document.getElementById('sw-val-calc');
  const swValMax = document.getElementById('sw-val-max');
  const swStatusBox = document.getElementById('sw-status-box');
  const btnSwStep = document.getElementById('btn-sw-step');
  const btnSwAuto = document.getElementById('btn-sw-auto');
  const btnSwReset = document.getElementById('btn-sw-reset');

  const swNums = [2, 1, 5, 1, 3, 2];
  const K = 3;
  let swRight = K - 1;
  let swCurrentSum = 2 + 1 + 5;
  let swMaxSum = swCurrentSum;
  let swInterval = null;

  function renderSwArray(enteringIdx = -1, leavingIdx = -1) {
    if (!swArrayView) return;
    swArrayView.innerHTML = '';
    const swLeft = swRight - K + 1;

    swNums.forEach((val, idx) => {
      const cell = document.createElement('div');
      let state = '';
      if (idx === enteringIdx) state = 'window-in';
      else if (idx === leavingIdx) state = 'window-out';
      else if (idx >= swLeft && idx <= swRight) state = 'window-active';
      else state = 'discarded';

      cell.className = `array-cell ${state}`;
      cell.innerHTML = `
        <span class="cell-idx">[${idx}]</span>
        ${val}
      `;
      swArrayView.appendChild(cell);
    });

    const windowSlice = swNums.slice(swLeft, swRight + 1);
    if (swValWindow) swValWindow.textContent = `[ ${windowSlice.join(', ')} ]`;
    if (swValMax) swValMax.textContent = `Max = ${swMaxSum}`;
  }

  function stepSlidingWindow() {
    if (swRight >= swNums.length - 1) {
      swStatusBox.innerHTML = `<span style="color: var(--accent-emerald);">🏁 Fim do array atingido! Maior soma encontrada entre todas as janelas de tamanho ${K}: <strong>${swMaxSum}</strong>.</span>`;
      if (swInterval) clearInterval(swInterval);
      return;
    }

    const leavingIdx = swRight - K + 1;
    const enteringIdx = swRight + 1;
    const leavingVal = swNums[leavingIdx];
    const enteringVal = swNums[enteringIdx];

    const prevSum = swCurrentSum;
    swCurrentSum = swCurrentSum - leavingVal + enteringVal;
    swRight = enteringIdx;

    if (swCurrentSum > swMaxSum) {
      swMaxSum = swCurrentSum;
    }

    renderSwArray(enteringIdx, leavingIdx);

    if (swValCalc) {
      swValCalc.textContent = `${prevSum} &minus; ${leavingVal} + ${enteringVal} = ${swCurrentSum}`;
    }

    swStatusBox.innerHTML = `
      <span>Deslizamento O(1): Saiu elemento <code>${leavingVal}</code> (índice ${leavingIdx}), Entrou <code>${enteringVal}</code> (índice ${enteringIdx}). Nova soma: <strong>${swCurrentSum}</strong>.</span>
    `;
  }

  if (btnSwStep) btnSwStep.addEventListener('click', stepSlidingWindow);
  if (btnSwAuto) {
    btnSwAuto.addEventListener('click', () => {
      if (swInterval) clearInterval(swInterval);
      swInterval = setInterval(stepSlidingWindow, 1000);
    });
  }
  if (btnSwReset) {
    btnSwReset.addEventListener('click', () => {
      if (swInterval) clearInterval(swInterval);
      swRight = K - 1;
      swCurrentSum = 2 + 1 + 5;
      swMaxSum = swCurrentSum;
      renderSwArray();
      if (swValCalc) swValCalc.textContent = `Soma Inicial: 8`;
      swStatusBox.innerHTML = `<span>Simulador resetado na primeira janela [2, 1, 5].</span>`;
    });
  }

  renderSwArray();

  // =========================================================================
  // SIMULATOR 6: PREFIX SUM RANGE QUERY (SLIDE 14)
  // =========================================================================
  const psArrView = document.getElementById('ps-arr-view');
  const psPrefixView = document.getElementById('ps-prefix-view');
  const psLSlider = document.getElementById('ps-l-slider');
  const psRSlider = document.getElementById('ps-r-slider');
  const psLVal = document.getElementById('ps-l-val');
  const psRVal = document.getElementById('ps-r-val');
  const psCalcDisplay = document.getElementById('ps-calc-display');
  const psManualDisplay = document.getElementById('ps-manual-display');

  const psNums = [3, 2, 4, 5, 1, 6];
  const psPrefix = [3, 5, 9, 14, 15, 21];

  function updatePrefixSumView() {
    let L = parseInt(psLSlider ? psLSlider.value : 1, 10);
    let R = parseInt(psRSlider ? psRSlider.value : 4, 10);

    if (L > R) {
      L = R;
      if (psLSlider) psLSlider.value = L;
    }

    if (psLVal) psLVal.textContent = L;
    if (psRVal) psRVal.textContent = R;

    if (psArrView) {
      psArrView.innerHTML = '';
      psNums.forEach((val, idx) => {
        const cell = document.createElement('div');
        const inRange = idx >= L && idx <= R;
        cell.className = `array-cell ${inRange ? 'active-target' : 'discarded'}`;
        cell.innerHTML = `
          <span class="cell-idx">[${idx}]</span>
          ${val}
        `;
        psArrView.appendChild(cell);
      });
    }

    if (psPrefixView) {
      psPrefixView.innerHTML = '';
      psPrefix.forEach((val, idx) => {
        const cell = document.createElement('div');
        let state = 'discarded';
        if (idx === R) state = 'active-target';
        else if (L > 0 && idx === L - 1) state = 'active-inspect';

        cell.className = `array-cell ${state}`;
        cell.innerHTML = `
          <span class="cell-idx">[${idx}]</span>
          ${val}
          ${idx === R ? '<span class="pointer-badge badge-right">P[R]</span>' : ''}
          ${L > 0 && idx === L - 1 ? '<span class="pointer-badge badge-left">P[L-1]</span>' : ''}
        `;
        psPrefixView.appendChild(cell);
      });
    }

    const sumResult = L === 0 ? psPrefix[R] : (psPrefix[R] - psPrefix[L - 1]);
    const manualElements = psNums.slice(L, R + 1);

    if (psCalcDisplay) {
      if (L === 0) {
        psCalcDisplay.textContent = `P[${R}] = ${psPrefix[R]}`;
      } else {
        psCalcDisplay.textContent = `P[${R}] - P[${L - 1}] = ${psPrefix[R]} - ${psPrefix[L - 1]} = ${sumResult}`;
      }
    }

    if (psManualDisplay) {
      psManualDisplay.textContent = `${manualElements.map((v, i) => `A[${L + i}]`).join(' + ')} = ${manualElements.join(' + ')} = ${sumResult}`;
    }
  }

  if (psLSlider) psLSlider.addEventListener('input', updatePrefixSumView);
  if (psRSlider) psRSlider.addEventListener('input', updatePrefixSumView);

  updatePrefixSumView();

  // =========================================================================
  // SIMULATOR 7: PALINDROME & ANAGRAM TESTERS (SLIDE 18)
  // =========================================================================
  const palInput = document.getElementById('pal-input');
  const btnPalCheck = document.getElementById('btn-pal-check');
  const palResultBox = document.getElementById('pal-result-box');

  if (btnPalCheck && palInput) {
    btnPalCheck.addEventListener('click', () => {
      const raw = palInput.value;
      const clean = raw.toLowerCase().replace(/[^a-z0-9]/g, '');
      
      let l = 0, r = clean.length - 1;
      let isPal = true;
      while (l < r) {
        if (clean[l] !== clean[r]) {
          isPal = false;
          break;
        }
        l++;
        r--;
      }

      if (isPal) {
        palResultBox.innerHTML = `
          <span style="color: var(--accent-emerald);">✅ <strong>É PALÍNDROMO!</strong> Texto limpo: <code>"${clean}"</code> lê exatamente igual em ambos os sentidos.</span>
        `;
      } else {
        palResultBox.innerHTML = `
          <span style="color: var(--accent-rose);">❌ <strong>NÃO É PALÍNDROMO.</strong> Divergência encontrada entre <code>'${clean[l]}'</code> (índice ${l}) e <code>'${clean[r]}'</code> (índice ${r}).</span>
        `;
      }
    });
  }

  const anaInput1 = document.getElementById('ana-input-1');
  const anaInput2 = document.getElementById('ana-input-2');
  const btnAnaCheck = document.getElementById('btn-ana-check');
  const anaResultBox = document.getElementById('ana-result-box');

  if (btnAnaCheck && anaInput1 && anaInput2) {
    btnAnaCheck.addEventListener('click', () => {
      const s1 = anaInput1.value.toLowerCase().replace(/\s/g, '');
      const s2 = anaInput2.value.toLowerCase().replace(/\s/g, '');

      if (s1.length !== s2.length) {
        anaResultBox.innerHTML = `
          <span style="color: var(--accent-rose);">❌ <strong>NÃO SÃO ANAGRAMAS.</strong> Comprimentos diferentes (${s1.length} vs ${s2.length}).</span>
        `;
        return;
      }

      const freq1 = {}, freq2 = {};
      for (const ch of s1) freq1[ch] = (freq1[ch] || 0) + 1;
      for (const ch of s2) freq2[ch] = (freq2[ch] || 0) + 1;

      let isAna = true;
      for (const k in freq1) {
        if (freq1[k] !== freq2[k]) {
          isAna = false;
          break;
        }
      }

      if (isAna) {
        const freqSummary = Object.entries(freq1).map(([k, v]) => `${k}:${v}`).join(', ');
        anaResultBox.innerHTML = `
          <span style="color: var(--accent-emerald);">✅ <strong>SÃO ANAGRAMAS!</strong> Mesmas letras e frequências: <code>{ ${freqSummary} }</code>.</span>
        `;
      } else {
        anaResultBox.innerHTML = `
          <span style="color: var(--accent-rose);">❌ <strong>NÃO SÃO ANAGRAMAS.</strong> As contagens de caracteres divergiram.</span>
        `;
      }
    });
  }

  // Initial Slide activation
  updateSlides();
});
