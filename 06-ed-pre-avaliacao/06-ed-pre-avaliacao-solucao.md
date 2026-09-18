# 📖 Gabarito e Soluções: Pré-avaliação (Simulado P1)

**Disciplina:** Estrutura de Dados  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS) — Fatec Ribeirão Preto  
**Professor:** Eduardo Cruz Araujo  
**Material de Referência:** Resolução Oficial da Aula 06 (Simulado P1)

---

## 📝 Parte I: Resoluções das Questões de Análise Assintótica

---

### Solução da Questão 01: Médias Acumuladas em Vetor

```python
def processar_medias_acumuladas(valores: list[int]) -> list[float]:
    n = len(valores)
    if n == 0:
        return []
    
    # Etapa 1: Construção do array de prefixo
    prefixo = [0] * (n + 1)
    for i in range(n):
        prefixo[i + 1] = prefixo[i] + valores[i]
        
    # Etapa 2: Cálculo das médias acumuladas
    medias = []
    for i in range(1, n + 1):
        medias.append(prefixo[i] / i)
        
    return medias
```

#### 1. Complexidade de Tempo: O(N)
- **Etapa 1:** A alocação inicial `[0] * (n + 1)` consome O(N) tempo. O laço `for i in range(n)` executa exatamente N iterações. Em cada passagem, realizam-se operações elementares de soma e escrita em array, ambas O(1). Total da Etapa 1: O(N).
- **Etapa 2:** O laço `for i in range(1, n + 1)` executa N iterações. Cada iteração realiza uma leitura em array em O(1), uma divisão em ponto flutuante em O(1) e uma inserção no final da lista via `append()` com custo amortizado O(1). Total da Etapa 2: O(N).
- **Regra da Adição (Ações Sequenciais):**
  - Tempo Total = O(N) + O(N) = O(2N) → **O(N)**.
  - Pela regra do descarte de constantes multiplicativas, a complexidade temporal resultante é estritamente **linear O(N)**.

#### 2. Complexidade de Espaço Auxiliar: O(N)
- A lista `prefixo` armazena N + 1 inteiros → O(N).
- A lista `medias` armazena N números reais (*floats*) → O(N).
- As variáveis escalares `n` e `i` consomem O(1).
- Memória auxiliar total: O(N) + O(N) = **O(N)**.

---

### Solução da Questão 02: A Armadilha da Fila Ingênua

```python
def processar_fila_tarefas(tarefas: list[str]) -> list[str]:
    fila = list(tarefas)  # Duplicação: O(N)
    processadas = []
    
    while fila:
        tarefa_atual = fila.pop(0)  # Custo crítico na RAM!
        if len(tarefa_atual) > 3:
            processadas.append(tarefa_atual.upper())
            
    return processadas
```

#### 1. Complexidade de Tempo: O(N²)
- **Impacto Físico de `fila.pop(0)` na RAM:**
  Em Python, uma `list` é estruturada como um **array dinâmico contíguo na memória**. Ao remover o elemento da posição 0, a primeira célula de memória fica livre. Para preservar a indexação contígua (onde o item de índice `i` está no endereço `base + i * tamanho_em_bytes`), a máquina virtual precisa transladar (*shift*) **todos os K - 1 elementos restantes** uma posição para a esquerda.
- **Somatório das Operações:**
  - Na 1ª iteração, a lista tem N elementos → desloca N - 1 itens.
  - Na 2ª iteração, a lista tem N - 1 elementos → desloca N - 2 itens.
  - ...
  - Na penúltima iteração, desloca 1 item.
  - Na última iteração, desloca 0 itens.
  
  Somando o custo de todas as remoções:
  - Total de operações = (N - 1) + (N - 2) + ... + 1 = N * (N - 1) / 2 = (N² - N) / 2 → **O(N²)**.

#### 2. Complexidade de Espaço Auxiliar: O(N)
- A lista `fila` aloca N referências na memória → O(N).
- A lista `processadas` acumula até N strings processadas no pior caso → O(N).
- Espaço auxiliar total: **O(N)**.

> 💡 **Observação Técnica (Otimização para O(N)):**
> Para reduzir o tempo de execução de O(N²) para O(N), deve-se substituir a lista nativa por um **Deque** (`collections.deque`), cuja implementação interna é baseada em blocos duplamente encadeados. O método `popleft()` opera em tempo estrito **O(1)**:
>
> ```python
> from collections import deque
>
> def processar_fila_tarefas_otimizada(tarefas: list[str]) -> list[str]:
>     fila = deque(tarefas)  # O(N)
>     processadas = []
>     while fila:
>         tarefa_atual = fila.popleft()  # O(1) estrito!
>         if len(tarefa_atual) > 3:
>             processadas.append(tarefa_atual.upper())
>     return processadas
> ```

---

### Solução da Questão 03: Auditoria de Conformidade de Lote (A Pegadinha do O(1))

```python
def auditar_conformidade_lote(registros: list[int]) -> bool:
    n = len(registros)
    for i in range(n):
        if registros[i] >= 0:
            return True
        else:
            return False
    return False
```

#### 1. Complexidade de Tempo: O(1)
- **Análise Minuciosa do Fluxo de Execução:**
  Muitos alunos são induzidos ao erro de classificar a função como O(N) simplesmente por visualizarem o cabeçalho `for i in range(n)`. Contudo, ao analisar o bloco interno do laço, nota-se que existe uma estrutura condicional `if/else` em que **ambos os ramos contêm uma instrução incondicional de retorno (`return`)**:
  - Se a lista estiver vazia (N = 0), o laço `for` nem sequer é iniciado, saltando diretamente para `return False` na última linha → **1 operação (O(1))**.
  - Se a lista possuir qualquer número de elementos (N >= 1):
    - Na **primeira iteração** (i = 0):
      - Se `registros[0] >= 0`, a função executa `return True` e encerra imediatamente.
      - Se `registros[0] < 0`, a função executa `return False` e encerra imediatamente.
  - Em nenhuma hipótese o laço avança para o índice i = 1. O laço executa **no máximo 1 única vez**, independentemente de N ser 10, 1.000 ou 10^9.
- **Conclusão:** O tempo de execução é independente do tamanho da entrada, configurando classe de complexidade **estritamente constante O(1)**.

#### 2. Complexidade de Espaço Auxiliar: O(1)
- A função apenas aloca variáveis escalares primitivas (`n`, `i`). Nenhuma nova lista, pilha ou estrutura de dados auxiliar é alocada.
- Espaço auxiliar: **O(1)**.

---

## 💻 Parte II: Soluções dos Problemas de Implementação

---

### Solução do Problema 01: Triagem de Materiais na Esteira

#### Estratégia Algorítmica:
Este problema implementa o clássico algoritmo da **Bandeira Nacional Holandesa (*Dutch National Flag Partition*)** de Edsger Dijkstra, utilizando três ponteiros:
- `baixo`: delimita o final da região contendo os elementos `0` (plástico).
- `meio`: aponta para o elemento sob inspeção no momento.
- `alto`: delimita o início da região contendo os elementos `2` (metal).

A cada passo, inspecionamos `itens[meio]`:
1. Se `itens[meio] == 0`: trocamos com `itens[baixo]`. Como sabemos que a posição anterior a `baixo` já era válida, incrementamos ambos `baixo += 1` e `meio += 1`.
2. Se `itens[meio] == 1`: o elemento já está na região correta (meio), então apenas avançamos `meio += 1`.
3. Se `itens[meio] == 2`: trocamos com `itens[alto]`. Decrementamos `alto -= 1`, mas **não** avançamos `meio`, pois o elemento que veio da posição `alto` ainda não foi avaliado!

#### Código Completo:
```python
def organizar_triagem(itens: list[int]) -> list[int]:
    baixo = 0
    meio = 0
    alto = len(itens) - 1
    
    while meio <= alto:
        if itens[meio] == 0:
            itens[baixo], itens[meio] = itens[meio], itens[baixo]
            baixo += 1
            meio += 1
        elif itens[meio] == 1:
            meio += 1
        else:  # itens[meio] == 2
            itens[meio], itens[alto] = itens[alto], itens[meio]
            alto -= 1
            
    return itens
```

#### Análise de Complexidade:
- **Tempo:** O(N) — Cada iteração avança `meio` ou recua `alto`. O vetor é percorrido em uma única passada.
- **Espaço Auxiliar:** O(1) — A reorganização é realizada estritamente *in-place*.

---

### Solução do Problema 02: Detecção de Alerta Térmico em Datacenter

#### Estratégia Algorítmica:
Aplicamos a técnica de **Janela Deslizante de Tamanho Fixo K**:
1. Calculamos a soma inicial da primeira janela de tamanho k: `soma_janela = sum(leituras[:k])` em O(K).
2. Inicializamos `max_soma = soma_janela`.
3. Deslizamos a janela da posição k até o final da lista:
   - O elemento que entra pela direita (`leituras[i]`) é somado.
   - O elemento que sai pela esquerda (`leituras[i - k]`) é subtraído.
   - Ambas as operações ocorrem em tempo estrito **O(1)** por deslocamento!
   - Atualizamos `max_soma = max(max_soma, soma_janela)`.
4. A maior média é calculada ao final como `max_soma / k`.

#### Código Completo:
```python
def maior_media_janela(leituras: list[int], k: int) -> float:
    soma_janela = sum(leituras[:k])
    max_soma = soma_janela
    
    for i in range(k, len(leituras)):
        soma_janela += leituras[i] - leituras[i - k]
        if soma_janela > max_soma:
            max_soma = soma_janela
            
    return max_soma / k
```

#### Análise de Complexidade:
- **Tempo:** O(N) — A soma inicial consome O(K) e o laço percorre os N - K elementos restantes com trabalho O(1) por iteração. Total: O(N).
- **Espaço Auxiliar:** O(1) — Apenas variáveis escalares numéricas para a soma e o máximo.

---

### Solução do Problema 03: Normalizador de Rotas de API

#### Estratégia Algorítmica:
A resolução de diretórios e navegação hierárquica é uma das aplicações mais práticas do TAD **Pilha (LIFO)**:
1. Quebramos o caminho original nas barras delimitadoras utilizando `caminho.split('/')`.
2. Para cada componente (*token*) obtido:
   - Se for vazio `""` (oriundo de barras consecutivas `//` ou extremidades) ou `"."` (diretório atual), **ignoramos**.
   - Se for `".."` (subir um nível): desempilhamos o diretório mais recente com `pilha.pop()`, caso a pilha não esteja vazia.
   - Qualquer outro nome representa um recurso válido: realizamos `pilha.append(token)`.
3. Ao final, unimos os elementos restantes da pilha com `'/' + '/'.join(pilha)`.

#### Código Completo:
```python
def normalizar_rota(caminho: str) -> str:
    pilha = []
    partes = caminho.split('/')
    
    for parte in partes:
        if parte == '' or parte == '.':
            continue
        elif parte == '..':
            if pilha:
                pilha.pop()
        else:
            pilha.append(parte)
            
    return '/' + '/'.join(pilha)
```

#### Análise de Complexidade:
- **Tempo:** O(N) — A divisão da string percorre os caracteres uma vez e cada componente é empilhado ou desempilhado em O(1).
- **Espaço Auxiliar:** O(N) — A lista de partes e a pilha armazenam no máximo O(N) caracteres.

---

### Solução do Problema 04: Reversão Prioritária de Pacotes em Fila

#### Estratégia Algorítmica:
Integração perfeita das propriedades complementares de **Fila FIFO** e **Pilha LIFO**:
1. Carregamos a fila `collections.deque(pacotes)`.
2. **Passo 1 (Coleta dos K primeiros):** Removemos os k primeiros elementos da frente da fila (`fila.popleft()`) e empilhamos em uma pilha auxiliar.
3. **Passo 2 (Inversão LIFO):** Desempilhamos todos os itens da pilha (`pilha.pop()`) e os inserimos no **final da fila** (`fila.append()`). Como a pilha descarrega em ordem inversa, os primeiros k itens agora estão invertidos, porém localizados temporariamente no fim da fila.
4. **Passo 3 (Rotação dos restantes):** Os N - k elementos que não foram invertidos estão agora na frente da fila. Retiramos cada um deles da frente (`popleft()`) e recolocamos atrás (`append()`), fazendo com que o bloco invertido retorne à dianteira da fila mantendo a ordem original dos demais intacta.

#### Código Completo:
```python
from collections import deque

def inverter_primeiros_k(pacotes: list[int], k: int) -> list[int]:
    if k <= 0 or k > len(pacotes):
        return pacotes
        
    fila = deque(pacotes)
    pilha = []
    
    # 1. Retira os primeiros k e empilha
    for _ in range(k):
        pilha.append(fila.popleft())
        
    # 2. Desempilha no fim da fila (ordem invertida)
    while pilha:
        fila.append(pilha.pop())
        
    # 3. Rotaciona os len - k elementos não-modificados
    for _ in range(len(fila) - k):
        fila.append(fila.popleft())
        
    return list(fila)
```

#### Análise de Complexidade:
- **Tempo:** O(N) — O algoritmo executa k remoções e inserções no passo 1, k no passo 2 e N - k rotações no passo 3. O somatório de operações elementares é 2k + (N - k) = N + k <= 2N → O(N).
- **Espaço Auxiliar:** O(K) — A pilha temporária guarda exatamente k elementos durante a inversão.

---

## 🧪 Bateria de Testes Automatizados

O bloco a seguir valida os 4 problemas práticos e a questão pegadinha:

```python
def executar_bateria_testes():
    # Prob 01: Triagem de Materiais na Esteira (Dutch National Flag)
    assert organizar_triagem([2, 0, 2, 1, 1, 0]) == [0, 0, 1, 1, 2, 2]
    assert organizar_triagem([2, 0, 1]) == [0, 1, 2]
    assert organizar_triagem([0]) == [0]

    # Prob 02: Alerta Térmico em Datacenter (Janela Deslizante Fixa)
    assert maior_media_janela([1, 12, -5, -6, 50, 3], 4) == 12.75
    assert maior_media_janela([5], 1) == 5.0
    assert maior_media_janela([4, 0, 4, 3, 3], 2) == 3.5

    # Prob 03: Normalizador de Rotas de API (Pilha LIFO)
    assert normalizar_rota("/servicos/v1/../v2/./dados/") == "/servicos/v2/dados"
    assert normalizar_rota("/home//usuario/") == "/home/usuario"
    assert normalizar_rota("/../") == "/"
    assert normalizar_rota("/a/./b/../../c/") == "/c"

    # Prob 04: Reversão Prioritária de Pacotes em Fila (Fila + Pilha)
    assert inverter_primeiros_k([10, 20, 30, 40, 50], 3) == [30, 20, 10, 40, 50]
    assert inverter_primeiros_k([1, 2, 3, 4], 2) == [2, 1, 3, 4]
    assert inverter_primeiros_k([5, 6, 7], 3) == [7, 6, 5]

    # Questão 03: Pegadinha O(1)
    assert auditar_conformidade_lote([10, -5, 20]) is True
    assert auditar_conformidade_lote([-3, 50, 100]) is False
    assert auditar_conformidade_lote([]) is False

    print("🎉 Todos os 15 testes automatizados passaram com 100% de sucesso!")

if __name__ == "__main__":
    executar_bateria_testes()
```
