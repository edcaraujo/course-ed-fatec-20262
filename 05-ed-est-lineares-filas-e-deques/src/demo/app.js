/**
 * ESTRUTURA DE DADOS — FATEC RIBEIRÃO PRETO 2026.2
 * Apresentação Interativa: Est. Lineares: Filas e Deques
 * Lógica da Aplicação, Navegação e Simuladores Interativos
 * Autor: Eduardo Cruz Araujo
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. SLIDE DECK NAVIGATION CONTROLLER
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
  const notesClose = document.getElementById('notes-close');
  const notesContent = document.getElementById('notes-content');
  const toastMsg = document.getElementById('toast-msg');

  let currentSlideIndex = 0;
  let presenterNotesVisible = false;

  // Presenter Notes Database per Slide (22 slides)
  const presenterNotes = [
    "Slide 1: Capa da aula. Apresente os objetivos: dominar o princípio FIFO (First-In, First-Out), entender os perigos do pop(0) em listas Python, construir filas circulares e encadeadas em O(1), dominar os Deques e modelar problemas reais de simulação e escalonamento de processos.",
    "Slide 2: O Conceito de Fila e FIFO. Destaque a justiça da regra de chegada: o primeiro a entrar é o primeiro a ser atendido. Conecte com o cotidiano (bancos, pedágios) e com a computação (spooler de impressão, filas de mensagens, BFS em grafos).",
    "Slide 3: Operações primitivas do TAD Fila. Enfatize que enqueue, dequeue e front devem operar estritamente em O(1). Apresente os dois erros capitais: Queue Underflow (dequeue em fila vazia) e Queue Overflow (em buffers de tamanho fixo).",
    "Slide 4: Simulador Interativo FIFO Core & Buffer Circular. Convide a turma para interagir: faça enqueue de 4 elementos, mostre o front e o rear se movendo. Demonstre o Dequeue na frente e como os índices do array circular aproveitam o espaço vazio!",
    "Slide 5: A grande armadilha do list.pop(0) em Python! Explique detalhadamente por que remover do índice 0 de uma lista contígua exige deslocar todos os N-1 itens para a esquerda (O(N) catastrófico). Mostre os números chocantes de latência em sistemas reais.",
    "Slide 6: Buffer Circular e Aritmética Modular. Explique a fórmula mágica: (indice + 1) % capacidade. Mostre como os ponteiros 'dão a volta' no array contíguo sem que nenhum dado precise ser copiado na memória.",
    "Slide 7: Código-fonte da classe Fila circular. Destaque que a implementação tem cerca de 25 linhas, não depende de nenhum import e garante O(1) estrito para juízes online como LeetCode e Beecrowd.",
    "Slide 8: Fila Encadeada (Node-Based). Mostre a versão com nós e ponteiros head e tail. Compare: alocação dinâmica infinita versus gasto extra de memória com ponteiros.",
    "Slide 9: Introdução aos Deques (Double-Ended Queues). Mostre que o Deque é a superestrutura que engloba tanto Pilhas quanto Filas, fornecendo 8 operações bilaterais em O(1). Apresente o collections.deque nativo do Python.",
    "Slide 10: Simulador Interativo Deque. Demonstre operações em ambas as extremidades (inserir/remover no Início e Fim). Mostre como ele pode ser usado como Pilha ou Fila dependendo dos métodos chamados.",
    "Slide 11: Nossa classe Deque e padrões de uso. Explique como estruturar o TAD e a implementação em C do CPython baseada em blocos duplamente encadeados de 64 elementos.",
    "Slide 12: Aplicação 1: Modelagem de Simulação de Atendimento Bancário (Teoria das Filas). Explique a regra de transição de tempo e como calcular o tempo médio de espera.",
    "Slide 13: Simulador Interativo de Atendimento Bancário. Execute o atendimento passo a passo, mostrando o tempo de espera de cada cliente e a comparação entre 1 ou 2 caixas.",
    "Slide 14: Aplicação 2: Escalonamento de Processos Round-Robin. Explique como o kernel do SO garante preempção justa dividindo o tempo da CPU em fatias (Quantum).",
    "Slide 15: Simulador Interativo Round-Robin CPU. Mostre o processo sendo consumido pelo Quantum e retornando ao final da fila caso reste tempo, gerando o Diagrama de Gantt ao vivo.",
    "Slide 16: Aplicação 3: Verificação de Palíndromos com Deque. Mostre a beleza de consumir as duas extremidades com popleft() e pop() simultaneamente em O(1).",
    "Slide 17: Aplicação 4: O Jogo da Batata Quente (Josephus). Demonstre a técnica de rotação contínua (popleft + append) para simular círculos dinâmicos.",
    "Slide 18: Desafio Técnico LeetCode 232: Fila com Duas Pilhas. Deduza o custo O(1) amortizado através da análise do método do potencial e da dupla inversão.",
    "Slide 19: Tabela Comparativa de Abordagens. Recapitule os prós e contras: Buffer Circular vs Fila Encadeada vs collections.deque vs list.",
    "Slide 20: Referência Avançada: Concorrência com queue.Queue (Thread-Safety) e tipagem com Generic[T].",
    "Slide 21: Resumo dos Pontos-Chave. Fixação dos conceitos de ouro da aula.",
    "Slide 22: Encerramento. Agradeça a turma, abra para dúvidas e anuncie a próxima aula: Estruturas Encadeadas (Listas Simples e Duplamente Encadeadas)."
  ];

  // Initialize Navigation Modal Grid
  slides.forEach((slide, idx) => {
    const titleEl = slide.querySelector('.slide-title');
    const titleText = titleEl ? titleEl.textContent : (idx === 0 ? "Capa: Filas e Deques" : `Slide ${idx + 1}`);
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

    if (presenterNotesVisible) {
      notesContent.textContent = presenterNotes[currentSlideIndex] || "Sem notas para este slide.";
    }
  }

  function goToSlide(index) {
    if (index >= 0 && index < slides.length) {
      currentSlideIndex = index;
      updateSlides();
    }
  }

  function nextSlide() {
    if (currentSlideIndex < slides.length - 1) {
      goToSlide(currentSlideIndex + 1);
    }
  }

  function prevSlide() {
    if (currentSlideIndex > 0) {
      goToSlide(currentSlideIndex - 1);
    }
  }

  function toggleOverviewModal() {
    overviewModal.classList.toggle('active');
  }

  function closeOverviewModal() {
    overviewModal.classList.remove('active');
  }

  function toggleNotesDrawer() {
    presenterNotesVisible = !presenterNotesVisible;
    notesDrawer.classList.toggle('active', presenterNotesVisible);
    btnNotes.classList.toggle('active', presenterNotesVisible);
    if (presenterNotesVisible) {
      notesContent.textContent = presenterNotes[currentSlideIndex] || "Sem notas para este slide.";
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        showToast(`Erro ao ativar tela cheia: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  function showToast(msg, isError = false) {
    toastMsg.textContent = msg;
    toastMsg.style.borderColor = isError ? 'var(--accent-rose)' : 'var(--accent-cyan)';
    toastMsg.style.color = isError ? 'var(--accent-rose)' : '#fff';
    toastMsg.classList.add('show');
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 2800);
  }

  // Event Listeners for Top Navigation
  btnPrev.addEventListener('click', prevSlide);
  btnNext.addEventListener('click', nextSlide);
  btnOverview.addEventListener('click', toggleOverviewModal);
  btnNotes.addEventListener('click', toggleNotesDrawer);
  btnFullscreen.addEventListener('click', toggleFullscreen);
  modalClose.addEventListener('click', closeOverviewModal);
  if (notesClose) notesClose.addEventListener('click', toggleNotesDrawer);

  overviewModal.addEventListener('click', (e) => {
    if (e.target === overviewModal) {
      closeOverviewModal();
    }
  });

  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
      e.preventDefault();
      nextSlide();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      prevSlide();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToSlide(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goToSlide(slides.length - 1);
    } else if (e.key.toLowerCase() === 'm') {
      e.preventDefault();
      toggleOverviewModal();
    } else if (e.key.toLowerCase() === 'p') {
      e.preventDefault();
      toggleNotesDrawer();
    } else if (e.key.toLowerCase() === 'f') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 'Escape') {
      if (overviewModal.classList.contains('active')) closeOverviewModal();
      if (presenterNotesVisible) toggleNotesDrawer();
    }
  });

  updateSlides();


  // =========================================================================
  // 2. SIMULATOR 1: FIFO CORE & CIRCULAR BUFFER VISUALIZER
  // =========================================================================
  const sim1Track = document.getElementById('sim1-track');
  const sim1CircularSlots = document.getElementById('sim1-circular-slots');
  const sim1Input = document.getElementById('sim1-input');
  const sim1BtnEnqueue = document.getElementById('sim1-btn-enqueue');
  const sim1BtnDequeue = document.getElementById('sim1-btn-dequeue');
  const sim1BtnFront = document.getElementById('sim1-btn-front');
  const sim1BtnClear = document.getElementById('sim1-btn-clear');
  const sim1StatSize = document.getElementById('sim1-stat-size');
  const sim1StatCap = document.getElementById('sim1-stat-cap');
  const sim1StatFront = document.getElementById('sim1-stat-front');
  const sim1StatRear = document.getElementById('sim1-stat-rear');
  const sim1StatEmpty = document.getElementById('sim1-stat-empty');
  const sim1StatFull = document.getElementById('sim1-stat-full');

  const SIM1_CAPACITY = 6;
  let sim1Array = new Array(SIM1_CAPACITY).fill(null);
  let sim1Head = 0;
  let sim1Tail = 0;
  let sim1Size = 0;

  function updateSim1UI() {
    // 1. Render Horizontal Pipeline
    sim1Track.innerHTML = '';
    let currentIdx = sim1Head;
    for (let i = 0; i < sim1Size; i++) {
      const val = sim1Array[currentIdx];
      const itemEl = document.createElement('div');
      itemEl.className = 'queue-item';
      if (i === 0) itemEl.classList.add('front-item');
      if (i === sim1Size - 1) itemEl.classList.add('rear-item');

      itemEl.innerHTML = `
        <span style="font-size: 0.65rem; color: var(--text-dim);">[slot ${currentIdx}]</span>
        <span>${val}</span>
        <span style="font-size: 0.65rem; color: ${i === 0 ? 'var(--accent-emerald)' : (i === sim1Size - 1 ? 'var(--accent-amber)' : 'transparent')}">
          ${i === 0 ? 'FRONT' : (i === sim1Size - 1 ? 'REAR' : '')}
        </span>
      `;
      sim1Track.appendChild(itemEl);
      currentIdx = (currentIdx + 1) % SIM1_CAPACITY;
    }

    if (sim1Size === 0) {
      sim1Track.innerHTML = '<span style="color: var(--text-dim); font-size: 0.85rem; font-family: var(--font-mono); margin: auto;">(Fila vazia)</span>';
    }

    // 2. Render Circular Slots
    sim1CircularSlots.innerHTML = '';
    for (let i = 0; i < SIM1_CAPACITY; i++) {
      const slotEl = document.createElement('div');
      slotEl.className = 'circular-slot';
      const val = sim1Array[i];

      const isOccupied = val !== null;
      if (isOccupied) slotEl.classList.add('occupied');

      const isFront = isOccupied && (i === sim1Head);
      const isRear = isOccupied && (i === (sim1Tail - 1 + SIM1_CAPACITY) % SIM1_CAPACITY);

      if (isFront) slotEl.classList.add('is-front');
      if (isRear) slotEl.classList.add('is-rear');

      let pointerText = '';
      if (isFront && isRear) pointerText = 'F/R';
      else if (isFront) pointerText = 'FRONT';
      else if (isRear) pointerText = 'REAR';

      slotEl.innerHTML = `
        <span class="slot-index">[${i}]</span>
        <span style="font-weight: 700; color: ${val ? '#fff' : 'var(--text-dim)'}; font-size: 0.95rem;">${val !== null ? val : 'ø'}</span>
        <span class="slot-pointer" style="color: ${isFront ? 'var(--accent-emerald)' : 'var(--accent-amber)'}">${pointerText}</span>
      `;
      sim1CircularSlots.appendChild(slotEl);
    }

    // 3. Update Dashboard Stats
    sim1StatSize.textContent = sim1Size;
    sim1StatCap.textContent = `${SIM1_CAPACITY} slots`;
    sim1StatEmpty.textContent = sim1Size === 0 ? 'True' : 'False';
    sim1StatEmpty.style.color = sim1Size === 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)';
    sim1StatFull.textContent = sim1Size === SIM1_CAPACITY ? 'True' : 'False';
    sim1StatFull.style.color = sim1Size === SIM1_CAPACITY ? 'var(--accent-rose)' : 'var(--text-muted)';

    sim1StatFront.textContent = sim1Size > 0 ? sim1Array[sim1Head] : '-';
    sim1StatRear.textContent = sim1Size > 0 ? sim1Array[(sim1Tail - 1 + SIM1_CAPACITY) % SIM1_CAPACITY] : '-';
  }

  sim1BtnEnqueue.addEventListener('click', () => {
    let val = sim1Input.value.trim();
    if (!val) {
      val = `C${Math.floor(Math.random() * 90 + 10)}`;
    }

    if (sim1Size >= SIM1_CAPACITY) {
      sim1Track.classList.add('shake');
      setTimeout(() => sim1Track.classList.remove('shake'), 400);
      showToast(`Queue Overflow: Capacidade máxima de ${SIM1_CAPACITY} slots esgotada!`, true);
      return;
    }

    sim1Array[sim1Tail] = val;
    sim1Tail = (sim1Tail + 1) % SIM1_CAPACITY;
    sim1Size++;
    sim1Input.value = '';
    showToast(`enqueue('${val}') inserido no fim com sucesso!`);
    updateSim1UI();
  });

  sim1BtnDequeue.addEventListener('click', () => {
    if (sim1Size === 0) {
      sim1Track.classList.add('shake');
      setTimeout(() => sim1Track.classList.remove('shake'), 400);
      showToast("Queue Underflow: A fila está completamente vazia!", true);
      return;
    }

    const removed = sim1Array[sim1Head];
    sim1Array[sim1Head] = null;
    sim1Head = (sim1Head + 1) % SIM1_CAPACITY;
    sim1Size--;
    showToast(`dequeue() atendeu e removeu: '${removed}' do início!`);
    updateSim1UI();
  });

  sim1BtnFront.addEventListener('click', () => {
    if (sim1Size === 0) {
      showToast("Fila vazia: nenhum elemento na frente.", true);
      return;
    }
    const frontVal = sim1Array[sim1Head];
    const firstItem = sim1Track.firstElementChild;
    if (firstItem) {
      firstItem.style.boxShadow = '0 0 25px var(--accent-emerald)';
      setTimeout(() => firstItem.style.boxShadow = '', 800);
    }
    showToast(`front() inspecionou: '${frontVal}'`);
  });

  sim1BtnClear.addEventListener('click', () => {
    sim1Array = new Array(SIM1_CAPACITY).fill(null);
    sim1Head = 0;
    sim1Tail = 0;
    sim1Size = 0;
    showToast("Fila esvaziada!");
    updateSim1UI();
  });

  sim1Input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sim1BtnEnqueue.click();
  });

  // Seed with 3 sample items
  sim1Array[0] = "C10";
  sim1Array[1] = "C25";
  sim1Array[2] = "C38";
  sim1Head = 0;
  sim1Tail = 3;
  sim1Size = 3;
  updateSim1UI();


  // =========================================================================
  // 3. SIMULATOR 2: DEQUE LAB (DOUBLE-ENDED QUEUE)
  // =========================================================================
  const sim2Track = document.getElementById('sim2-track');
  const sim2Input = document.getElementById('sim2-input');
  const sim2BtnPushFront = document.getElementById('sim2-btn-push-front');
  const sim2BtnPopFront = document.getElementById('sim2-btn-pop-front');
  const sim2BtnPushRear = document.getElementById('sim2-btn-push-rear');
  const sim2BtnPopRear = document.getElementById('sim2-btn-pop-rear');
  const sim2BtnClear = document.getElementById('sim2-btn-clear');
  const sim2StatSize = document.getElementById('sim2-stat-size');
  const sim2StatFront = document.getElementById('sim2-stat-front');
  const sim2StatRear = document.getElementById('sim2-stat-rear');
  const sim2Log = document.getElementById('sim2-log');

  let sim2Deque = ["D1", "D2", "D3"];

  function sim2LogMsg(msg) {
    const time = new Date().toLocaleTimeString();
    sim2Log.innerHTML = `<div>[${time}] ${msg}</div>` + sim2Log.innerHTML;
  }

  function updateSim2UI() {
    sim2Track.innerHTML = '';
    sim2Deque.forEach((item, idx) => {
      const el = document.createElement('div');
      el.className = 'queue-item';
      if (idx === 0) el.classList.add('front-item');
      if (idx === sim2Deque.length - 1) el.classList.add('rear-item');

      el.innerHTML = `
        <span style="font-size: 0.65rem; color: var(--text-dim);">[${idx}]</span>
        <span>${item}</span>
        <span style="font-size: 0.65rem; color: ${idx === 0 ? 'var(--accent-emerald)' : (idx === sim2Deque.length - 1 ? 'var(--accent-amber)' : 'transparent')}">
          ${idx === 0 ? 'FRONT' : (idx === sim2Deque.length - 1 ? 'REAR' : '')}
        </span>
      `;
      sim2Track.appendChild(el);
    });

    if (sim2Deque.length === 0) {
      sim2Track.innerHTML = '<span style="color: var(--text-dim); font-size: 0.85rem; font-family: var(--font-mono);">(Deque vazio)</span>';
    }

    sim2StatSize.textContent = sim2Deque.length;
    sim2StatFront.textContent = sim2Deque.length > 0 ? sim2Deque[0] : '-';
    sim2StatRear.textContent = sim2Deque.length > 0 ? sim2Deque[sim2Deque.length - 1] : '-';
  }

  sim2BtnPushFront.addEventListener('click', () => {
    let val = sim2Input.value.trim() || `F${Math.floor(Math.random() * 90 + 10)}`;
    sim2Deque.unshift(val);
    sim2Input.value = '';
    sim2LogMsg(`<span style="color: var(--accent-emerald);">append_front('${val}')</span> adicionado no início.`);
    updateSim2UI();
  });

  sim2BtnPushRear.addEventListener('click', () => {
    let val = sim2Input.value.trim() || `R${Math.floor(Math.random() * 90 + 10)}`;
    sim2Deque.push(val);
    sim2Input.value = '';
    sim2LogMsg(`<span style="color: var(--accent-amber);">append_rear('${val}')</span> adicionado no fim.`);
    updateSim2UI();
  });

  sim2BtnPopFront.addEventListener('click', () => {
    if (sim2Deque.length === 0) {
      showToast("Deque Underflow: vazio!", true);
      return;
    }
    const val = sim2Deque.shift();
    sim2LogMsg(`<span style="color: var(--accent-rose);">pop_front()</span> removeu: <strong>'${val}'</strong> do início.`);
    updateSim2UI();
  });

  sim2BtnPopRear.addEventListener('click', () => {
    if (sim2Deque.length === 0) {
      showToast("Deque Underflow: vazio!", true);
      return;
    }
    const val = sim2Deque.pop();
    sim2LogMsg(`<span style="color: var(--accent-rose);">pop_rear()</span> removeu: <strong>'${val}'</strong> do fim.`);
    updateSim2UI();
  });

  sim2BtnClear.addEventListener('click', () => {
    sim2Deque = [];
    sim2LogMsg(`clear() executado.`);
    updateSim2UI();
  });

  updateSim2UI();


  // =========================================================================
  // 4. SIMULATOR 3: BANK CUSTOMER QUEUE SIMULATION
  // =========================================================================
  const sim3QueueTrack = document.getElementById('sim3-queue-track');
  const sim3CashiersContainer = document.getElementById('sim3-cashiers-container');
  const sim3BtnStep = document.getElementById('sim3-btn-step');
  const sim3BtnToggleCashiers = document.getElementById('sim3-btn-toggle-cashiers');
  const sim3BtnReset = document.getElementById('sim3-btn-reset');
  const sim3StatCount = document.getElementById('sim3-stat-count');
  const sim3StatAvg = document.getElementById('sim3-stat-avg');
  const sim3StatClock = document.getElementById('sim3-stat-clock');

  const INITIAL_CUSTOMERS = [
    { name: 'Alice', arrival: 0, duration: 4 },
    { name: 'Bob', arrival: 1, duration: 3 },
    { name: 'Carlos', arrival: 2, duration: 5 },
    { name: 'Daniela', arrival: 3, duration: 2 },
    { name: 'Eduardo', arrival: 8, duration: 4 },
    { name: 'Fernanda', arrival: 10, duration: 1 }
  ];

  let sim3Queue = [];
  let sim3Cashiers = [{ id: 1, busyUntil: 0, current: null }];
  let sim3Attended = [];
  let sim3GlobalClock = 0;

  function resetSim3(numCashiers = 1) {
    sim3Queue = JSON.parse(JSON.stringify(INITIAL_CUSTOMERS));
    sim3Cashiers = Array.from({ length: numCashiers }, (_, i) => ({
      id: i + 1,
      busyUntil: 0,
      current: null
    }));
    sim3Attended = [];
    sim3GlobalClock = 0;
    sim3BtnToggleCashiers.textContent = `Caixas: ${numCashiers}`;
    updateSim3UI();
  }

  function updateSim3UI() {
    // 1. Render Waiting Queue
    sim3QueueTrack.innerHTML = '';
    sim3Queue.forEach((c, idx) => {
      const el = document.createElement('div');
      el.className = 'queue-item';
      if (idx === 0) el.classList.add('front-item');
      el.innerHTML = `
        <span style="font-size: 0.7rem; color: var(--accent-cyan);">${c.name}</span>
        <span style="font-size: 0.65rem; color: var(--text-muted);">chega:${c.arrival}m | dur:${c.duration}m</span>
      `;
      sim3QueueTrack.appendChild(el);
    });

    if (sim3Queue.length === 0) {
      sim3QueueTrack.innerHTML = '<span style="color: var(--accent-emerald); font-size: 0.85rem; font-family: var(--font-mono); margin: auto;">🎉 Fila de espera vazia!</span>';
    }

    // 2. Render Cashiers Stations
    sim3CashiersContainer.innerHTML = '';
    sim3Cashiers.forEach(k => {
      const box = document.createElement('div');
      box.className = 'card';
      box.style.margin = '0';
      box.style.padding = '12px';
      box.style.borderLeft = '4px solid var(--accent-emerald)';

      box.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <strong style="color: #fff; font-size: 0.95rem;">🏧 Caixa ${k.id}</strong>
          <span style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--accent-cyan);">Livre a partir de: ${k.busyUntil}m</span>
        </div>
        <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--text-muted);">
          ${k.current ? `<span style="color: var(--accent-emerald);">Atendendo: <strong>${k.current.name}</strong></span> (conclusão aos ${k.busyUntil}m)` : '<span style="color: var(--text-dim);">Disponível / Aguardando</span>'}
        </div>
      `;
      sim3CashiersContainer.appendChild(box);
    });

    // 3. Stats
    sim3StatCount.textContent = sim3Attended.length;
    const sumWait = sim3Attended.reduce((acc, c) => acc + c.wait, 0);
    const avgWait = sim3Attended.length > 0 ? (sumWait / sim3Attended.length).toFixed(2) : "0.00";
    sim3StatAvg.textContent = `${avgWait} min`;
    sim3StatClock.textContent = `${sim3GlobalClock} min`;
  }

  sim3BtnStep.addEventListener('click', () => {
    if (sim3Queue.length === 0) {
      showToast("Todos os clientes já foram atendidos!");
      return;
    }

    const client = sim3Queue.shift();

    // Find earliest available cashier
    let cashier = sim3Cashiers[0];
    for (let i = 1; i < sim3Cashiers.length; i++) {
      if (sim3Cashiers[i].busyUntil < cashier.busyUntil) {
        cashier = sim3Cashiers[i];
      }
    }

    const start = Math.max(client.arrival, cashier.busyUntil);
    const wait = start - client.arrival;
    const finish = start + client.duration;

    cashier.busyUntil = finish;
    cashier.current = client;

    sim3GlobalClock = finish;
    sim3Attended.push({ ...client, wait, start, finish });

    showToast(`${client.name} atendido no Caixa ${cashier.id} (espera: ${wait} min)`);
    updateSim3UI();
  });

  sim3BtnToggleCashiers.addEventListener('click', () => {
    const nextCount = sim3Cashiers.length === 1 ? 2 : 1;
    resetSim3(nextCount);
    showToast(`Simulador configurado para ${nextCount} caixa(s)!`);
  });

  sim3BtnReset.addEventListener('click', () => resetSim3(sim3Cashiers.length));
  resetSim3(1);


  // =========================================================================
  // 5. SIMULATOR 4: ROUND-ROBIN CPU SCHEDULER
  // =========================================================================
  const sim4CpuProc = document.getElementById('sim4-cpu-proc');
  const sim4CpuDetail = document.getElementById('sim4-cpu-detail');
  const sim4ReadyTrack = document.getElementById('sim4-ready-track');
  const sim4Gantt = document.getElementById('sim4-gantt');
  const sim4BtnStep = document.getElementById('sim4-btn-step');
  const sim4BtnReset = document.getElementById('sim4-btn-reset');

  const QUANTUM = 3;
  const INITIAL_PROCESSES = [
    { pid: 'P1', burst: 5, remaining: 5, color: '#38bdf8' },
    { pid: 'P2', burst: 3, remaining: 3, color: '#34d399' },
    { pid: 'P3', burst: 8, remaining: 8, color: '#c084fc' },
    { pid: 'P4', burst: 2, remaining: 2, color: '#fbbf24' }
  ];

  let sim4Queue = [];
  let sim4CurrentTime = 0;
  let sim4Finished = false;

  function resetSim4() {
    sim4Queue = JSON.parse(JSON.stringify(INITIAL_PROCESSES));
    sim4CurrentTime = 0;
    sim4Finished = false;
    sim4Gantt.innerHTML = '';
    sim4CpuProc.textContent = "Aguardando...";
    sim4CpuProc.style.color = "#fff";
    sim4CpuDetail.textContent = `Quantum = ${QUANTUM} ms`;
    updateSim4UI();
  }

  function updateSim4UI() {
    sim4ReadyTrack.innerHTML = '';
    sim4Queue.forEach((p, idx) => {
      const el = document.createElement('div');
      el.className = 'queue-item';
      if (idx === 0) el.classList.add('front-item');
      el.style.borderColor = p.color;

      el.innerHTML = `
        <span style="font-weight: 800; color: ${p.color};">${p.pid}</span>
        <span style="font-size: 0.7rem; color: var(--text-muted);">Resta: ${p.remaining} ms</span>
      `;
      sim4ReadyTrack.appendChild(el);
    });

    if (sim4Queue.length === 0 && sim4Finished) {
      sim4ReadyTrack.innerHTML = '<span style="color: var(--accent-emerald); font-family: var(--font-mono); font-size: 0.9rem; margin: auto;">🏁 Todos os processos concluídos!</span>';
    }
  }

  sim4BtnStep.addEventListener('click', () => {
    if (sim4Finished || sim4Queue.length === 0) {
      showToast("Escalonamento concluído. Clique em Resetar.");
      return;
    }

    const proc = sim4Queue.shift();
    const slice = Math.min(QUANTUM, proc.remaining);
    const start = sim4CurrentTime;
    sim4CurrentTime += slice;
    proc.remaining -= slice;

    // Update CPU Box
    sim4CpuProc.textContent = `⚙️ ${proc.pid}`;
    sim4CpuProc.style.color = proc.color;
    sim4CpuDetail.textContent = `Tempo: ${start} → ${sim4CurrentTime} ms (Resta: ${proc.remaining} ms)`;

    // Add Gantt slice
    const sliceEl = document.createElement('div');
    sliceEl.className = 'gantt-slice';
    sliceEl.style.flex = slice;
    sliceEl.style.backgroundColor = proc.color;
    sliceEl.style.color = '#000';
    sliceEl.textContent = `${proc.pid} (${start}-${sim4CurrentTime})`;
    sim4Gantt.appendChild(sliceEl);

    if (proc.remaining > 0) {
      sim4Queue.push(proc);
      showToast(`Preempção de ${proc.pid}: retornou ao fim da fila.`);
    } else {
      showToast(`Processo ${proc.pid} FINALIZADO com sucesso!`);
    }

    if (sim4Queue.length === 0) {
      sim4Finished = true;
      setTimeout(() => {
        sim4CpuProc.textContent = "🏆 CONCLUÍDO";
        sim4CpuProc.style.color = "var(--accent-emerald)";
        sim4CpuDetail.textContent = `Tempo total: ${sim4CurrentTime} ms`;
      }, 400);
    }

    updateSim4UI();
  });

  sim4BtnReset.addEventListener('click', resetSim4);
  resetSim4();
});
