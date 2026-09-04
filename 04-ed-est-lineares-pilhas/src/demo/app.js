/**
 * ESTRUTURA DE DADOS — FATEC RIBEIRÃO PRETO 2026.2
 * Apresentação Interativa: Est. Lineares: Pilhas
 * Lógica da Aplicação, Navegação e Simuladores Interativos
 * Autor: Eduardo Cruz Araujo
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
  const notesClose = document.getElementById('notes-close');
  const notesContent = document.getElementById('notes-content');
  const toastMsg = document.getElementById('toast-msg');

  let currentSlideIndex = 0;
  let presenterNotesVisible = false;

  // Presenter Notes Database per Slide (23 slides)
  const presenterNotes = [
    "Slide 1: Capa da aula. Dê as boas-vindas à turma. Apresente os objetivos: dominar o princípio LIFO, construir nossa própria classe de Pilha do zero com tratamento de erros, resolver problemas reais de escopo e expressões aritméticas, e entender como a CPU e o SO usam a Call Stack.",
    "Slide 2: Conceito fundamental de Pilha. Destaque o princípio LIFO (Last-In, First-Out). Use a analogia da pilha de pratos: tentar puxar o prato de baixo quebra os pratos! Mostre as aplicações cotidianas (Ctrl+Z, histórico do browser, Call Stack da CPU).",
    "Slide 3: Operações primitivas do TAD Pilha. Enfatize que push, pop, peek, is_empty e size são estritamente O(1). Apresente os dois erros capitais: Stack Underflow (pop em pilha vazia) e Stack Overflow (push em pilha cheia).",
    "Slide 4: Simulador Interativo LIFO Core. Convide a turma para interagir: execute push de 3 elementos, mostre o ponteiro de topo subindo. Tente fazer pop com a pilha vazia para demonstrar o Underflow e insira até o limite para simular Overflow.",
    "Slide 5: Por que criar nossa própria classe? Explique o conceito de TAD (Tipo Abstrato de Dados) e encapsulamento. Mostre que usar list diretamente permite coisas perigosas como insert(0, x) (que custa O(N)) ou acesso indexado arbitrário no meio da pilha.",
    "Slide 6: Código-fonte da classe Pilha simplificada. Destaque que a classe possui apenas 20 linhas, não usa imports complexos de tipagem e pode ser copiada e colada no topo de qualquer arquivo de exercício ou juiz online sem depender de módulos externos.",
    "Slide 7: Pilha Encadeada (Node-Based). Mostre que uma pilha não precisa de memória contígua em RAM. Cada nó aponta para o nó anterior. Compare: nós encadeados dão O(1) estrito sem amortização, mas gastam mais memória com ponteiros.",
    "Slide 8: Desafio LeetCode 20 / Beecrowd 1068 (Validação de Escopos). Apresente o problema. Pergunte: 'Por que apenas contar o número de aberturas e fechamentos falha?' Use o contraexemplo '([)]' para provocar a turma.",
    "Slide 9: A Lógica de Resolução com Pilha. Mostre que cada abertura é uma promessa e o último a abrir é o primeiro que deve fechar. Deduza a complexidade O(N) tempo e O(N) espaço.",
    "Slide 10: Simulador Interativo de Escopos. Execute passo a passo o caso válido '{[()]}' e em seguida o caso inválido '([)]'. Mostre o momento exato em que o topo não bate e o algoritmo rejeita a cadeia.",
    "Slide 11: Código em Python com classe Pilha embutida. Mostre como a classe Pilha e a função de validação residem no mesmo arquivo, facilitando a submissão direta no LeetCode e Beecrowd sem imports.",
    "Slide 12: Notação Infixa vs Polonesa Reversa (RPN). Explique a genialidade de Jan Łukasiewicz: eliminar parênteses e ambiguidades de precedência. Cite as calculadoras HP e as máquinas virtuais (JVM, Python Bytecode).",
    "Slide 13: Desafio LeetCode 150 (Avaliação RPN). Apresente o enunciado. Alerte sobre o detalhe crítico: b = pop() (direita) e a = pop() (esquerda), a conta é a - b e a / b. Explique int(a / b) para truncar para zero.",
    "Slide 14: Simulador Interativo RPN. Execute a expressão '2 1 + 3 *' e '4 13 5 / +' passo a passo, mostrando os operandos sendo consumidos e o resultado intermediário voltando para o topo.",
    "Slide 15: Código em Python do Avaliador RPN. Destaque a complexidade O(N) e como a pilha armazena apenas os valores necessários para a operação corrente.",
    "Slide 16: Como a CPU executa funções: Call Stack. Desenhe o conceito de Stack Frame na memória RAM. Mostre sys.getrecursionlimit() (1000 chamadas) e alerte sobre o RecursionError.",
    "Slide 17: Conversão de Recursão para Iteração. Apresente o teorema: toda recursão pode ser transformada em laço iterativo com pilha explícita alocada na Heap, superando o limite da CPU.",
    "Slide 18: Simulador DFS com Pilha Explícita. Demonstre a travessia de árvore em profundidade: para visitar a esquerda antes da direita, empilhamos a direita primeiro e a esquerda depois.",
    "Slide 19: Pilhas Idiomáticas em Python. Explique como usar list com append() e pop() no dia a dia e quando recorrer a collections.deque para operações de alta performance.",
    "Slide 20: Tabela Comparativa de Abordagens. Compare Classe Customizada vs list vs deque nos critérios de encapsulamento, velocidade, segurança e adequação a entrevistas técnicas.",
    "Slide 21: Referência Avançada (Genéricos). Explique que para projetos de software em escala corporativa com mypy, a classe pode ser enriquecida com Generic[T], mas que para competições e juízes online a versão simples é sempre a mais rápida e segura.",
    "Slide 22: Resumo dos Pontos-Chave. Recapitule os 6 conceitos de ouro da aula para fixação mental.",
    "Slide 23: Encerramento. Agradeça a participação dos alunos, abra para dúvidas e faça a ponte com a próxima aula: Filas (FIFO) e Deques."
  ];

  // Initialize Navigation Modal Grid
  slides.forEach((slide, idx) => {
    const titleEl = slide.querySelector('.slide-title');
    const titleText = titleEl ? titleEl.textContent : (idx === 0 ? "Capa: Pilhas" : `Slide ${idx + 1}`);
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
    // Ignore keystrokes when typing inside inputs
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
  // SIMULATOR 1: LIFO CORE STACK VISUALIZER
  // =========================================================================
  const sim1Bucket = document.getElementById('sim1-bucket');
  const sim1Input = document.getElementById('sim1-input');
  const sim1BtnPush = document.getElementById('sim1-btn-push');
  const sim1BtnPop = document.getElementById('sim1-btn-pop');
  const sim1BtnPeek = document.getElementById('sim1-btn-peek');
  const sim1BtnClear = document.getElementById('sim1-btn-clear');
  const sim1BtnToggleCap = document.getElementById('sim1-btn-toggle-cap');
  const sim1Pointer = document.getElementById('sim1-pointer');
  const sim1TopVal = document.getElementById('sim1-top-val');
  const sim1StatSize = document.getElementById('sim1-stat-size');
  const sim1StatEmpty = document.getElementById('sim1-stat-empty');
  const sim1StatTop = document.getElementById('sim1-stat-top');
  const sim1StatCap = document.getElementById('sim1-stat-cap');
  const sim1Log = document.getElementById('sim1-log');

  let sim1Stack = [];
  let sim1Capacity = 6;

  function sim1LogMessage(msg) {
    const time = new Date().toLocaleTimeString();
    sim1Log.innerHTML = `<div>[${time}] ${msg}</div>` + sim1Log.innerHTML;
  }

  function updateSim1UI() {
    sim1Bucket.innerHTML = '';
    sim1Stack.forEach((val, idx) => {
      const itemEl = document.createElement('div');
      itemEl.className = 'stack-item';
      const isTop = idx === sim1Stack.length - 1;
      if (isTop) itemEl.classList.add('top-item');

      itemEl.innerHTML = `
        <span style="font-size: 0.75rem; color: var(--text-dim);">[${idx}]</span>
        <span>${val}</span>
        ${isTop ? '<span style="font-size: 0.7rem; color: var(--accent-emerald);">TOPO</span>' : '<span></span>'}
      `;
      sim1Bucket.appendChild(itemEl);
    });

    const sz = sim1Stack.length;
    sim1StatSize.textContent = sz;
    sim1StatEmpty.textContent = sz === 0 ? 'True' : 'False';
    sim1StatEmpty.style.color = sz === 0 ? 'var(--accent-emerald)' : 'var(--accent-rose)';
    const topItem = sz > 0 ? sim1Stack[sz - 1] : 'Nenhum';
    sim1StatTop.textContent = topItem;

    if (sz > 0) {
      sim1Pointer.style.display = 'flex';
      sim1TopVal.textContent = topItem;
      // Position pointer vertically aligned with top item in bucket
      const offsetBottom = (sz * 48) - 18;
      sim1Pointer.style.bottom = `${offsetBottom}px`;
    } else {
      sim1Pointer.style.display = 'none';
    }
  }

  sim1BtnPush.addEventListener('click', () => {
    let val = sim1Input.value.trim();
    if (!val) {
      val = Math.floor(Math.random() * 90 + 10).toString();
    }

    if (sim1Capacity !== null && sim1Stack.length >= sim1Capacity) {
      sim1Bucket.classList.add('shake');
      setTimeout(() => sim1Bucket.classList.remove('shake'), 400);
      showToast(`Stack Overflow: Capacidade máxima de ${sim1Capacity} itens atingida!`, true);
      sim1LogMessage(`<span style="color: var(--accent-rose);">❌ Stack Overflow: Falha ao inserir '${val}'!</span>`);
      return;
    }

    sim1Stack.push(val);
    sim1Input.value = '';
    sim1LogMessage(`<span style="color: var(--accent-cyan);">➕ push('${val}') executado com sucesso.</span>`);
    updateSim1UI();
  });

  sim1BtnPop.addEventListener('click', () => {
    if (sim1Stack.length === 0) {
      sim1Bucket.classList.add('shake');
      setTimeout(() => sim1Bucket.classList.remove('shake'), 400);
      showToast("Stack Underflow: A pilha já está vazia!", true);
      sim1LogMessage(`<span style="color: var(--accent-rose);">❌ Stack Underflow: Tentativa de pop() em pilha vazia!</span>`);
      return;
    }

    const removed = sim1Stack.pop();
    sim1LogMessage(`<span style="color: var(--accent-amber);">➖ pop() removeu e retornou: <strong>'${removed}'</strong></span>`);
    updateSim1UI();
  });

  sim1BtnPeek.addEventListener('click', () => {
    if (sim1Stack.length === 0) {
      sim1Bucket.classList.add('shake');
      setTimeout(() => sim1Bucket.classList.remove('shake'), 400);
      showToast("Stack Underflow: Nada no topo para inspecionar!", true);
      sim1LogMessage(`<span style="color: var(--accent-rose);">❌ peek(): Pilha vazia!</span>`);
      return;
    }

    const topVal = sim1Stack[sim1Stack.length - 1];
    const topElement = sim1Bucket.lastElementChild;
    if (topElement) {
      topElement.classList.add('peeked');
      setTimeout(() => topElement.classList.remove('peeked'), 800);
    }
    sim1LogMessage(`<span style="color: var(--accent-emerald);">👁️ peek() inspecionou o topo: <strong>'${topVal}'</strong> (sem remover)</span>`);
  });

  sim1BtnClear.addEventListener('click', () => {
    sim1Stack = [];
    sim1LogMessage(`🧹 clear() executado: todos os elementos foram removidos.`);
    updateSim1UI();
  });

  sim1BtnToggleCap.addEventListener('click', () => {
    if (sim1Capacity === 6) {
      sim1Capacity = 8;
      sim1BtnToggleCap.textContent = "Capacidade: 8";
      sim1StatCap.textContent = "8 itens";
    } else if (sim1Capacity === 8) {
      sim1Capacity = null;
      sim1BtnToggleCap.textContent = "Capacidade: Ilimitada";
      sim1StatCap.textContent = "Ilimitada";
    } else {
      sim1Capacity = 6;
      sim1BtnToggleCap.textContent = "Capacidade: 6";
      sim1StatCap.textContent = "6 itens";
    }
    showToast(`Capacidade ajustada para: ${sim1StatCap.textContent}`);
  });

  // Auto-fill input on Enter key
  sim1Input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      sim1BtnPush.click();
    }
  });


  // =========================================================================
  // SIMULATOR 2: BRACKET MATCHER (LEETCODE 20)
  // =========================================================================
  const sim2Input = document.getElementById('sim2-input');
  const sim2BtnStep = document.getElementById('sim2-btn-step');
  const sim2BtnReset = document.getElementById('sim2-btn-reset');
  const sim2BtnP1 = document.getElementById('sim2-btn-preset1');
  const sim2BtnP2 = document.getElementById('sim2-btn-preset2');
  const sim2BtnP3 = document.getElementById('sim2-btn-preset3');
  const sim2Tape = document.getElementById('sim2-tape');
  const sim2Bucket = document.getElementById('sim2-bucket');
  const sim2Status = document.getElementById('sim2-status');
  const sim2Explanation = document.getElementById('sim2-explanation');

  let sim2String = "{[()]}";
  let sim2Index = 0;
  let sim2Stack = [];
  let sim2Finished = false;
  const matchMap = { ')': '(', ']': '[', '}': '{' };
  const openSet = new Set(['(', '[', '{']);

  function renderSim2Tape() {
    sim2Tape.innerHTML = '';
    for (let i = 0; i < sim2String.length; i++) {
      const cell = document.createElement('div');
      cell.className = 'tape-cell';
      cell.textContent = sim2String[i];
      if (i < sim2Index) cell.classList.add('processed');
      if (i === sim2Index && !sim2Finished) cell.classList.add('active');
      sim2Tape.appendChild(cell);
    }
  }

  function renderSim2Bucket() {
    sim2Bucket.innerHTML = '';
    sim2Stack.forEach((ch, idx) => {
      const item = document.createElement('div');
      item.className = 'stack-item';
      if (idx === sim2Stack.length - 1) item.classList.add('top-item');
      item.innerHTML = `<span></span><span>${ch}</span><span></span>`;
      sim2Bucket.appendChild(item);
    });
  }

  function resetSim2(newStr) {
    if (newStr !== undefined) sim2String = newStr;
    sim2Input.value = sim2String;
    sim2Index = 0;
    sim2Stack = [];
    sim2Finished = false;
    sim2Status.textContent = "Pronto para iniciar";
    sim2Status.style.color = "var(--accent-cyan)";
    sim2Explanation.textContent = `String carregada: "${sim2String}". Clique em 'Passo a Passo'.`;
    renderSim2Tape();
    renderSim2Bucket();
  }

  sim2BtnReset.addEventListener('click', () => resetSim2(sim2Input.value.trim() || "{[()]}"));
  sim2BtnP1.addEventListener('click', () => resetSim2("{[()]}"));
  sim2BtnP2.addEventListener('click', () => resetSim2("([)]"));
  sim2BtnP3.addEventListener('click', () => resetSim2("((("));

  sim2BtnStep.addEventListener('click', () => {
    if (sim2Finished) {
      showToast("Validação já concluída. Clique em Reset para reiniciar.");
      return;
    }

    if (sim2Index >= sim2String.length) {
      // Finished scanning string
      sim2Finished = true;
      if (sim2Stack.length === 0) {
        sim2Status.textContent = "✅ VÁLIDO!";
        sim2Status.style.color = "var(--accent-emerald)";
        sim2Explanation.textContent = "Todos os delimitadores abertos foram devidamente fechados na ordem correta. Pilha vazia!";
      } else {
        sim2Status.textContent = "❌ INVÁLIDO!";
        sim2Status.style.color = "var(--accent-rose)";
        sim2Explanation.textContent = `Fim da string atingido, porém ainda restam ${sim2Stack.length} abertura(s) pendente(s) na pilha!`;
      }
      renderSim2Tape();
      return;
    }

    const ch = sim2String[sim2Index];

    if (openSet.has(ch)) {
      // Opening bracket -> Push
      sim2Stack.push(ch);
      sim2Status.textContent = `Lendo '${ch}' → Empilhando abertura`;
      sim2Status.style.color = "var(--accent-cyan)";
      sim2Explanation.textContent = `Caractere de abertura '${ch}' registrado no topo da pilha como pendência futura.`;
      sim2Index++;
    } else if (matchMap[ch]) {
      // Closing bracket -> Validate Pop
      const expectedOpen = matchMap[ch];
      if (sim2Stack.length === 0) {
        sim2Finished = true;
        sim2Status.textContent = "❌ INVÁLIDO!";
        sim2Status.style.color = "var(--accent-rose)";
        sim2Explanation.textContent = `Encontrado fechamento '${ch}', porém a pilha está VAZIA (Stack Underflow - fechamento sem abertura prévia)!`;
        const cell = sim2Tape.children[sim2Index];
        if (cell) cell.classList.add('error');
        return;
      }

      const top = sim2Stack.pop();
      if (top !== expectedOpen) {
        sim2Finished = true;
        sim2Status.textContent = "❌ INVÁLIDO!";
        sim2Status.style.color = "var(--accent-rose)";
        sim2Explanation.textContent = `Conflito de escopo! Fechamento '${ch}' esperava abertura '${expectedOpen}', mas o topo da pilha era '${top}'.`;
        const cell = sim2Tape.children[sim2Index];
        if (cell) cell.classList.add('error');
        renderSim2Bucket();
        return;
      }

      sim2Status.textContent = `Lendo '${ch}' → Casa com '${top}'!`;
      sim2Status.style.color = "var(--accent-emerald)";
      sim2Explanation.textContent = `Fechamento '${ch}' corresponde exatamente ao '${top}' do topo. Desempilhado com sucesso!`;
      sim2Index++;
    } else {
      // Non-bracket character -> ignore
      sim2Index++;
    }

    renderSim2Tape();
    renderSim2Bucket();
  });

  resetSim2("{[()]}");


  // =========================================================================
  // SIMULATOR 3: RPN EVALUATOR (LEETCODE 150)
  // =========================================================================
  const sim3Tape = document.getElementById('sim3-tape');
  const sim3Bucket = document.getElementById('sim3-bucket');
  const sim3OpDisplay = document.getElementById('sim3-op-display');
  const sim3Explanation = document.getElementById('sim3-explanation');
  const sim3BtnStep = document.getElementById('sim3-btn-step');
  const sim3BtnReset = document.getElementById('sim3-btn-reset');
  const sim3BtnEx1 = document.getElementById('sim3-btn-ex1');
  const sim3BtnEx2 = document.getElementById('sim3-btn-ex2');

  let sim3Tokens = ["2", "1", "+", "3", "*"];
  let sim3Index = 0;
  let sim3Stack = [];
  let sim3Finished = false;

  function renderSim3Tape() {
    sim3Tape.innerHTML = '';
    sim3Tokens.forEach((tk, idx) => {
      const cell = document.createElement('div');
      cell.className = 'tape-cell';
      cell.textContent = tk;
      if (idx < sim3Index) cell.classList.add('processed');
      if (idx === sim3Index && !sim3Finished) cell.classList.add('active');
      sim3Tape.appendChild(cell);
    });
  }

  function renderSim3Bucket() {
    sim3Bucket.innerHTML = '';
    sim3Stack.forEach((num, idx) => {
      const item = document.createElement('div');
      item.className = 'stack-item';
      if (idx === sim3Stack.length - 1) item.classList.add('top-item');
      item.innerHTML = `<span></span><span>${num}</span><span></span>`;
      sim3Bucket.appendChild(item);
    });
  }

  function resetSim3(tokens) {
    sim3Tokens = tokens;
    sim3Index = 0;
    sim3Stack = [];
    sim3Finished = false;
    sim3OpDisplay.textContent = "Aguardando início...";
    sim3Explanation.textContent = `Expressão: [${sim3Tokens.join(' ')}]. Clique em 'Próximo Token'.`;
    renderSim3Tape();
    renderSim3Bucket();
  }

  sim3BtnEx1.addEventListener('click', () => resetSim3(["2", "1", "+", "3", "*"]));
  sim3BtnEx2.addEventListener('click', () => resetSim3(["4", "13", "5", "/", "+"]));
  sim3BtnReset.addEventListener('click', () => resetSim3([...sim3Tokens]));

  sim3BtnStep.addEventListener('click', () => {
    if (sim3Finished) {
      showToast("Avaliação concluída. Clique em Reset para reiniciar.");
      return;
    }

    if (sim3Index >= sim3Tokens.length) {
      sim3Finished = true;
      const finalResult = sim3Stack[0];
      sim3OpDisplay.textContent = `🏆 Resultado Final = ${finalResult}`;
      sim3OpDisplay.style.color = "var(--accent-emerald)";
      sim3Explanation.textContent = `Expressão RPN avaliada integralmente com sucesso!`;
      renderSim3Tape();
      return;
    }

    const token = sim3Tokens[sim3Index];
    const ops = new Set(['+', '-', '*', '/']);

    if (!ops.has(token)) {
      // Number token -> Push
      const num = parseInt(token, 10);
      sim3Stack.push(num);
      sim3OpDisplay.textContent = `push(${num})`;
      sim3OpDisplay.style.color = "var(--accent-cyan)";
      sim3Explanation.textContent = `Token "${token}" é operando numérico. Inserido no topo da pilha.`;
    } else {
      // Operator token -> Pop b, pop a, compute, push result
      const b = sim3Stack.pop();
      const a = sim3Stack.pop();
      let res = 0;

      if (token === '+') res = a + b;
      else if (token === '-') res = a - b;
      else if (token === '*') res = a * b;
      else if (token === '/') res = Math.trunc(a / b);

      sim3Stack.push(res);
      sim3OpDisplay.textContent = `${a} ${token} ${b} = ${res}`;
      sim3OpDisplay.style.color = "var(--accent-amber)";
      sim3Explanation.textContent = `Operador "${token}": desempilhou b=${b} (direita) e a=${a} (esquerda). Calculou ${a} ${token} ${b} = ${res} e empilhou o resultado!`;
    }

    sim3Index++;
    renderSim3Tape();
    renderSim3Bucket();

    if (sim3Index >= sim3Tokens.length) {
      sim3Finished = true;
      const finalResult = sim3Stack[0];
      setTimeout(() => {
        sim3OpDisplay.textContent = `🏆 Resultado Final: ${finalResult}`;
        sim3OpDisplay.style.color = "var(--accent-emerald)";
      }, 400);
    }
  });

  resetSim3(["2", "1", "+", "3", "*"]);


  // =========================================================================
  // SIMULATOR 4: DFS VIA EXPLICIT STACK
  // =========================================================================
  const sim4BtnStep = document.getElementById('sim4-btn-step');
  const sim4BtnReset = document.getElementById('sim4-btn-reset');
  const sim4Bucket = document.getElementById('sim4-bucket');
  const sim4Visited = document.getElementById('sim4-visited');

  // Binary tree representation:
  //      A
  //    /   \
  //   B     C
  //  / \     \
  // D   E     F
  const treeNodes = {
    'A': { left: 'B', right: 'C' },
    'B': { left: 'D', right: 'E' },
    'C': { left: null, right: 'F' },
    'D': { left: null, right: null },
    'E': { left: null, right: null },
    'F': { left: null, right: null }
  };

  let sim4Stack = ['A'];
  let sim4VisitedList = [];
  let sim4Finished = false;

  function renderSim4UI() {
    sim4Bucket.innerHTML = '';
    sim4Stack.forEach((nodeKey, idx) => {
      const item = document.createElement('div');
      item.className = 'stack-item';
      if (idx === sim4Stack.length - 1) item.classList.add('top-item');
      item.innerHTML = `<span></span><span>Nó [${nodeKey}]</span><span></span>`;
      sim4Bucket.appendChild(item);
    });

    sim4Visited.textContent = `[ ${sim4VisitedList.join(', ')} ]`;
  }

  function resetSim4() {
    sim4Stack = ['A'];
    sim4VisitedList = [];
    sim4Finished = false;
    renderSim4UI();
  }

  sim4BtnReset.addEventListener('click', resetSim4);

  sim4BtnStep.addEventListener('click', () => {
    if (sim4Finished || sim4Stack.length === 0) {
      showToast("Percurso DFS concluído em toda a árvore!");
      return;
    }

    const current = sim4Stack.pop();
    sim4VisitedList.push(current);

    const nodeData = treeNodes[current];
    if (nodeData) {
      // To visit Left before Right, push Right first, then Left!
      if (nodeData.right) sim4Stack.push(nodeData.right);
      if (nodeData.left) sim4Stack.push(nodeData.left);
    }

    if (sim4Stack.length === 0) {
      sim4Finished = true;
      showToast("DFS finalizado com sucesso via Pilha Explícita!");
    }

    renderSim4UI();
  });

  resetSim4();
});
