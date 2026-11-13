# 🚀 Trabalho (P2): Simulador Visual Interativo, Implementação e Explicação Técnica

**Disciplina:** Estrutura de Dados  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS) — Fatec Ribeirão Preto  
**Professor:** Eduardo Cruz Araujo  
**Semestre:** 2026.2  
**Data Limite de Entrega:** **18/11/2026 até às 23:59**  
**Modalidade:** Entrega Assíncrona (Repositório + Vídeo Explicativo — *não haverá apresentação presencial*)

> 💡 **Objetivo Pedagógico:** Explorar de forma prática e visual tópicos avançados da ementa (**Ordenação Eficiente, Árvores, Heaps e Grafos**), consolidando o domínio conceitual por meio da implementação em Python (ou outras linguagens), construção de um simulador visual passo a passo e gravação de uma defesa técnica em vídeo.

---

## 📋 Visão Geral do Trabalho

Ao longo do semestre, utilizamos **simuladores visuais interativos** (`src/demo/`) em todas as aulas para enxergar o funcionamento interno das estruturas de dados e medir seu custo operacional na prática.

Neste trabalho avaliativo de **P2**, você assumirá o papel de autor: deverá escolher (ou seguir a atribuição abaixo) **um tema inédito da ementa**, estudar seu funcionamento com um pacote completo composto por:

1. **Implementação de Referência em Python (`src/algoritmo.py`)**: Código limpo, documentado e instrumentado com contadores de operações.
2. **Simulador Visual Interativo (`src/demo/`)**: Aplicação web (`index.html`, `styles.css`, `app.js`) que demonstra visualmente a execução passo a passo do algoritmo.
3. **Documentação Técnica e Registro de IA (`README.md`)**: Guia teórico resumido, análise de complexidade assintótica (Big-O) e diário de prompts utilizados.
4. **Vídeo Explicativo (3 a 5 minutos)**: Gravação de tela (*screencast*) demonstrando o algoritmo em funcionamento no seu próprio simulador e explicando sua implementação em Python.

---

## 🎯 Catálogo de Temas

Selecione **um (1)** dos 5 temas abaixo (caso o professor defina sorteio por RA, utilize o **último dígito do seu RA** conforme indicado na coluna de referência):

| Tema | Tópico / Algoritmo | Requisitos Específicos (Código Python + Simulador Visual) |
| :---: | :--- | :--- |
| **Tema A** | **Ordenação Dividir-para-Conquistar:**<br>*Quick Sort* vs. *Merge Sort* | • Implementar ambos em Python do zero (sem `sort()`/`sorted()`).<br>• Na Demo Visual: permitir alternar entre *Merge Sort* e *Quick Sort*, destacando visualmente o pivô/sub-arrays, trocas (*swaps*) e número de comparações.<br>• Incluir botão de **"Cenário Pior Caso"** (array já ordenado com pivô fixo no Quick Sort $O(n^2)$ vs. estabilidade do Merge Sort $O(n \log n)$). |
| **Tema B** | **Árvores Binárias de Busca (BST)** | • Implementar a classe `BST` (`insert`, `search`, `delete` e travessias `in_order`, `pre_order`, `post_order`, além do cálculo de `height`).<br>• Na Demo Visual: desenhar os nós e conexões da árvore, animar o caminho percorrido na busca/inserção e animar a ordem de visitação das 3 travessias.<br>• Incluir botão comparando **Inserção Aleatória ($O(\log n)$)** vs. **Inserção Ordenada / Árvore Degenerada ($O(n)$)**. |
| **Tema C** | **Heaps e Filas de Prioridade:**<br>*Min-Heap / Max-Heap* | • Implementar uma estrutura de Heap Binário sobre array (`insert` com *sift-up*, `extract` com *sift-down* e `peek`).<br>• Na Demo Visual: exibir **simultaneamente** a visão em **Árvore Binária Completa** e a visão no **Array Subjacente** (mostrando a relação de índices `pai = (i-1)//2`, `esq = 2*i+1`, `dir = 2*i+2`).<br>• Animar as trocas de promoção (*sift-up*) e rebaixamento (*sift-down*). |
| **Tema D** | **Grafos — Travessias:**<br>*Busca em Largura (BFS)* vs. *Busca em Profundidade (DFS)* | • Implementar representação por Lista de Adjacência, `bfs(origem, destino)` e `dfs(origem, destino)`.<br>• Na Demo Visual: grafo de nós ou grid/labirinto com obstáculos.<br>• Exibir visualmente na tela o estado da **Fila (FIFO)** durante a BFS e da **Pilha (LIFO)** durante a DFS a cada passo, demonstrando por que a BFS garante o menor caminho em grafos sem peso e a DFS não. |
| **Tema E** | **Grafos — Menor Caminho Ponderado:**<br>*Algoritmo de Dijkstra* | • Implementar o Algoritmo de Dijkstra utilizando Lista de Adjacência e Fila de Prioridade.<br>• Na Demo Visual: grafo com pesos positivos nas arestas.<br>• Exibir a **Tabela de Distâncias (`dist[]`) e Predecessores (`prev[]`)** sendo atualizada passo a passo a cada relaxamento de aresta ($d[u] + w(u, v) < d[v]$) e destacar a rota ótima final reconstruída. |

---

## 📦 Estrutura Obrigatória da Entrega

O projeto deve seguir exatamente a organização de pastas abaixo (inspirada nos módulos oficiais da disciplina):

```text
trabalho-p2-ed/
├── README.md               # Documentação teórica, Big-O, Diário de IA e LINK DO VÍDEO
└── src/
    ├── algoritmo.py        # Implementação em Python puro + casos de teste
    └── demo/
        ├── index.html      # Interface do simulador visual
        ├── styles.css      # Estilização da página e animações
        └── app.js          # Lógica da simulação passo a passo
```

---

## 🛠️ Detalhamento dos 4 Entregáveis

### 1. Implementação em Python (`src/algoritmo.py`) — `2,0 pontos`
- A estrutura de dados e o algoritmo principal devem ser implementados **explicitamente** em Python ou outras linguagens (não é permitido apenas encapsular bibliotecas prontas para a estrutura principal avaliada).
- Deve conter *type hints*, *docstrings* explicativas e um contador de operações/comparações para comprovar o comportamento assintótico.
- O bloco `if __name__ == "__main__":` deve executar pelo menos **3 cenários de teste comentados** (ex.: caso comum, caso de borda e pior caso), imprimindo o resultado e o total de operações realizadas.

### 2. Simulador Visual Interativo (`src/demo/`) — `3,0 pontos`
Você pode (e deve!) utilizar ferramentas de IA como assistentes para construir uma interface rica em HTML/CSS/JS, desde que ela atenda aos seguintes requisitos:
- **Execução Passo a Passo:** Botões de `Executar / Play`, `Próximo Passo (Step)`, `Pausar` e `Reiniciar (Reset)`.
- **Cenários Pré-configurados:** Botões para carregar rapidamente exemplos didáticos (ex.: *Caso Médio*, *Pior Caso*, *Exemplo Customizado*).
- **Painel de Estado e Métricas:** Exibição em tempo real do que está acontecendo no passo atual (log explicativo do passo, número de comparações/operações acumuladas e estado das variáveis auxiliares).
- **Autocontido:** Deve funcionar abrindo o arquivo `index.html` diretamente no navegador (sem exigir instalação complexa de servidores backend).

### 3. Documentação e Registro de IA (`README.md`) — `1,0 ponto`
O arquivo `README.md` na raiz do projeto deve conter obrigatoriamente:
1. **Identificação:** Nome completo, RA e Tema escolhido.
2. **Link do Vídeo Explicativo:** Em destaque no topo do documento (certifique-se de que o link está público ou "Não Listado" sem bloqueio de acesso!).
3. **Resumo Teórico e Complexidade Assintótica:**
   - Explicação de como o algoritmo funciona e onde é utilizado no mundo real.
   - Tabela de Complexidade (Tempo e Espaço Auxiliar) para **Melhor Caso**, **Caso Médio** e **Pior Caso**, explicando **por que** o pior caso ocorre.
4. **Diário de Engenharia com IA:**
   - Qual modelo/ferramenta você utilizou?
   - Liste os **3 principais prompts** que você usou para aprender o conteúdo e gerar/refinar o simulador.
   - Relate pelo menos **1 erro, limitação ou ajuste manual** que você precisou corrigir na resposta da IA.

### 4. Vídeo Explicativo de Defesa Técnica (3 a 7 minutos) — `4,0 pontos`
Como **não haverá apresentação presencial**, o vídeo é a parte mais importante da nota e comprova o seu entendimento real sobre o algoritmo construído.

- **Formato:** Gravação de tela com áudio (via OBS Studio, Loom, Zoom, Google Meet ou gravador nativo do sistema), hospedado no **YouTube (como "Não Listado")**, **Loom** ou **Google Drive** (com permissão de visualização liberada para qualquer pessoa com o link).
- **Duração:** Entre **3 e 7 minutos** (seja objetivo e direto ao ponto).
- **Roteiro Obrigatório do Vídeo:**
  - **Parte 1 — Conceito e Complexidade (`~1 min`):** Apresente-se brevemente, diga qual é o algoritmo escolhido, qual problema ele resolve e qual é sua complexidade Big-O de tempo e espaço.
  - **Parte 2 — Simulação Passo a Passo na Demo (`~2 min`):** Com o seu simulador (`src/demo/index.html`) aberto na tela, utilize o modo **Passo a Passo** para narrar com suas próprias palavras o que o algoritmo está fazendo a cada etapa. Mostre também o comportamento no cenário de **Pior Caso** (ou caso comparativo do seu tema).
  - **Parte 3 — Walkthrough no Código Python (`~1 a 2 min`):** Abra o arquivo `src/algoritmo.py`, aponte rapidamente a função/método central onde acontece a lógica que você acabou de mostrar visualmente e execute o script no terminal mostrando a saída dos testes.

> ⚠️ **Atenção:** Vídeos em que o aluno apenas lê um texto pronto sem interagir e explicar o passo a passo da simulação e do código terão desconto severo na nota. O objetivo não é edição profissional de vídeo, mas sim **clareza técnica e domínio do algoritmo**.

---

## 📊 Rubrica de Avaliação (Total: 10,0 Pontos)

| Critério | Peso | O que será avaliado |
| :--- | :---: | :--- |
| **1. Vídeo Explicativo (Defesa Técnica)** | **4,0 pts** | Clareza na explicação com as próprias palavras; demonstração correta do passo a passo no simulador; explicação coerente do Big-O e da lógica no código Python; cumprimento do tempo (3–7 min). |
| **2. Simulador Visual Interativo (`src/demo/`)** | **3,0 pts** | Fidelidade visual ao algoritmo real; funcionamento dos controles (*Step-by-step*, *Play*, *Reset*); presença dos cenários comparativos (ex.: Pior Caso); painel de métricas e logs didáticos. |
| **3. Implementação em Python (`src/algoritmo.py`)** | **2,0 pts** | Implementação fiel sem atalhos nativos proibidos; organização e legibilidade do código; instrumentação de métricas; execução correta dos 3 cenários de teste no `main`. |
| **4. Documentação e Registro de IA (`README.md`)** | **1,0 pt** | Tabela de complexidade Big-O correta e justificada; seção de Engenharia com IA detalhada (prompts + análise crítica); organização do repositório e link funcional do vídeo. |
| **Total** | **10,0 pts** | — |

---

## 🚫 Regras Importantes e Penalidades

1. **Prazo Improrrogável:** A entrega deve ser realizada até o dia **18/11/2026 às 23:59**.
2. **Acesso ao Vídeo:** Antes de enviar, abra o link do seu vídeo em uma **aba anônima** do navegador para garantir que ele não está privado ou bloqueado. Links inacessíveis no momento da correção inviabilizam a avaliação do critério de vídeo (`4,0 pts`).
3. **Uso Consciente de IA:** O uso de IA (ChatGPT, Claude, Gemini, Copilot etc.) é **permitido e incentivado** como ferramenta de produtividade e estudo, mas **você é 100% responsável pelo código entregue**. Você precisa saber explicar cada linha da estrutura principal em `src/algoritmo.py` e cada transição visual do seu simulador durante o vídeo.
