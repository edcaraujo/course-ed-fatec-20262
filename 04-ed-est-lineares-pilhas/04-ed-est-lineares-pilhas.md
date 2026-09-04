---
marp: true

author: "Eduardo Cruz Araujo"
title: "Estruturas de Dados"
description: "Disciplina de Estruturas de Dados - Est. Lineares: Pilhas."

theme: "default"
class: "invert"

footer: "Eduardo Cruz Araujo | Fatec | 2026.2 | Estruturas de Dados | Est. Lineares: Pilhas"

paginate: "true"

---

# Estrutura de Dados :mortar_board:
## Est. Lineares: Pilhas

Implementação e aplicações da estrutura LIFO (Last-In, First-Out). Modelagem de problemas de validação de escopos (parênteses e chaves), avaliação de expressões e conversão de lógicas recursivas para iterativas.

---

Est. Lineares: Pilhas
## O Conceito de Pilha e o Princípio LIFO

---

## O que é uma Pilha (*Stack*)?

Uma **Pilha** é uma estrutura de dados linear e restrita que obedece rigorosamente a uma única regra de acesso:

- **Princípio LIFO (*Last-In, First-Out*):** O último elemento inserido é obrigatoriamente o primeiro elemento a ser removido.
- **Ponto Único de Acesso:** Todas as inserções, remoções e inspeções ocorrem exclusivamente em uma única extremidade denominada **Topo** (*Top*).
- A outra extremidade, inacessível diretamente, é chamada de **Base** (*Bottom*).

```
Inserir (Push) ──┐             ┌── Remover (Pop)
                 │             │
                 ▼             ▲
              +---------------+
              |   Elemento C  |  <--- TOPO (Último inserido, Primeiro a sair)
              +---------------+
              |   Elemento B  |
              +---------------+
              |   Elemento A  |  <--- BASE (Primeiro inserido, Último a sair)
              +---------------+
```

---

## Analogias do Mundo Real e Aplicações em Software

### Mundo Real:
- **Pilha de Pratos / Bandejas:** Você sempre adiciona novos pratos limpos no topo e retira o prato de cima para se servir. Tentar tirar o prato da base derruba a pilha!
- **Pilha de Livros:** Novos livros são empilhados em cima dos anteriores.

### Na Computação (Você usa pilhas a cada segundo):
1. **Desfazer / Refazer (*Undo / Redo* - Ctrl+Z):** Cada ação do usuário é empilhada. Desfazer remove a ação mais recente do topo.
2. **Histórico de Navegação:** Clicar em links empilha páginas web. O botão "Voltar" (`<-`) desempilha a página atual e exibe a anterior.
3. **Pilha de Chamadas de Funções (*Call Stack*):** A CPU empilha o contexto de cada função invocada para saber para onde retornar quando a função terminar.
4. **Compiladores e Sintaxe:** Validação de blocos de código `{ ... }`, tags HTML/XML e avaliação de fórmulas matemáticas.

---

Est. Lineares: Pilhas
## Operações Fundamentais e Complexidade

---

## As Operações Primitivas de uma Pilha

Em um Tipo Abstrato de Dados (TAD) de Pilha, dispomos de um conjunto minimalista de operações:

| Operação | Assinatura | Descrição | Complexidade |
|---|---|---|:---:|
| **Push** | `push(item)` | Adiciona um novo elemento sobre o topo | **$O(1)$** |
| **Pop** | `pop() -> item` | Remove e retorna o elemento situado no topo | **$O(1)$** |
| **Peek / Top** | `peek() -> item` | Retorna o elemento do topo **sem removê-lo** | **$O(1)$** |
| **Is Empty** | `is_empty() -> bool` | Informa se a pilha não possui elementos | **$O(1)$** |
| **Size** | `size() -> int` | Retorna a quantidade total de itens empilhados | **$O(1)$** |
| **Clear** | `clear()` | Remove todos os elementos da pilha | **$O(1)$** |

> :bulb: Como todas as manipulações acontecem estritamente no ponteiro de **Topo**, nenhuma busca ou deslocamento de memória (*shift*) é necessário. Logo, as operações principais operam em **tempo constante estrito $O(1)$**.

---

## Estados Críticos de Erro: Underflow e Overflow

Ao manipular pilhas, dois estados de exceção devem ser rigorosamente tratados:

### 1. *Stack Underflow* (Subfluxo de Pilha)
- Ocorre quando tentamos executar `pop()` ou `peek()` em uma **pilha vazia**.
- **Solução:** Verificar `is_empty()` antes de desempilhar ou disparar uma exceção de índice (`IndexError("Stack Underflow")`).

### 2. *Stack Overflow* (Transbordamento de Pilha)
- Ocorre quando tentamos executar `push()` em uma pilha que atingiu seu limite físico ou sua capacidade máxima alocada.
- **No hardware / SO:** Ocorre quando chamadas recursivas infinitas esgotam a memória reservada da *Call Stack* (`RecursionError`).
- **Em pilhas de capacidade fixa:** Dispara exceção de capacidade (`OverflowError`).

---

Est. Lineares: Pilhas
## Construindo Nossa Própria Classe de Pilha

---

## Por que Criar Nossa Própria Classe?

Em Python, poderíamos simplesmente usar `minha_lista = []` com `append()` e `pop()`. Então por que construir uma classe do zero?

1. **O Conceito de TAD (Tipo Abstrato de Dados):**
   - Um TAD define **o que** a estrutura faz (contrato de operações), ocultando **como** ela faz (detalhes internos de implementação).
2. **Encapsulamento e Proteção de Invariantes:**
   - Em uma `list` comum, nada impede um desenvolvedor desatento de executar:
     - `minha_lista.insert(0, valor)` $\longrightarrow$ **$O(N)$ catastrófico** (desloca toda a lista)!
     - `minha_lista[2] = 99` $\longrightarrow$ **Violação direta da regra LIFO** (acesso arbitrário ao meio da pilha).
3. **Autossuficiência sem Dependências:**
   - Construir uma classe simples e direta permite **colocá-la no topo de qualquer arquivo de exercício ou juiz online sem nenhum `import`**!

---

## A Nossa Classe `Pilha`: Simples, Limpa e Sem Imports!

Implementação pura em Python com apenas ~20 linhas, pronta para copiar e colar em qualquer problema:

```python
class Pilha:
    def __init__(self):
        self._elementos = []

    def push(self, item):
        self._elementos.append(item)  # O(1) amortizado

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack Underflow: a pilha está vazia!")
        return self._elementos.pop()  # O(1) no final

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack Underflow: a pilha está vazia!")
        return self._elementos[-1]    # O(1) no final

    def is_empty(self):
        return len(self._elementos) == 0

    def size(self):
        return len(self._elementos)
```

---

## Métodos Especiais e Visualização Amigável

Para tornar a nossa classe idiomática em Python, podemos adicionar `__len__`, `__bool__` e `__repr__`:

```python
    def __len__(self):
        return len(self._elementos)

    def __bool__(self):
        return not self.is_empty()

    def __repr__(self):
        if self.is_empty():
            return "Pilha: [] (vazia)"
        itens = ", ".join(repr(x) for x in self._elementos)
        return f"Pilha: [{itens}] <- TOPO"
```

### Exemplo de Uso no Terminal:
```python
p = Pilha()
p.push(10); p.push(20); p.push(30)
print(p)         # Pilha: [10, 20, 30] <- TOPO
print(p.peek())  # 30
print(p.pop())   # 30
print(p)         # Pilha: [10, 20] <- TOPO
```

---

## Abordagem Alternativa: Pilha Encadeada (*Node-Based*)

E se quiséssemos implementar uma pilha sem usar arrays internos? Podemos usar **Nós Encadeados**:

```python
class Node:
    def __init__(self, dado, proximo=None):
        self.dado = dado
        self.proximo = proximo

class PilhaEncadeada:
    def __init__(self):
        self._topo = None
        self._tamanho = 0

    def push(self, item):
        self._topo = Node(item, proximo=self._topo)
        self._tamanho += 1

    def pop(self):
        if self._topo is None:
            raise IndexError("Stack Underflow")
        item = self._topo.dado
        self._topo = self._topo.proximo
        self._tamanho -= 1
        return item
```

- **Vantagem:** Alocação dinâmica sob demanda; **$O(1)$ estrito** sem custo de realocação contígua de buffers.

---

Est. Lineares: Pilhas
## Aplicação 1: Validação de Escopos (Parênteses e Chaves)

---

## 🎯 Desafio Prático: LeetCode #20 & Beecrowd #1068
### Valid Parentheses / Balanço de Parênteses

> **Enunciado:** Dada uma string `s` contendo apenas os caracteres `'('`, `')'`, `'{'`, `'}'`, `'['` e `']'`, determine se a cadeia de entrada é **válida**.
>
> Uma string é válida se:
> 1. Parênteses/chaves/colchetes abertos são fechados pelo mesmo tipo de símbolo.
> 2. Delimitadores abertos devem ser fechados na **ordem inversa correta**.
> 3. Cada símbolo de fechamento possui um símbolo de abertura correspondente.

**Exemplos:**
- `"()"` $\longrightarrow$ `True`
- `"()[]{}"` $\longrightarrow$ `True`
- `"(]"` $\longrightarrow$ `False` (tipo incompatível)
- `"([)]"` $\longrightarrow$ `False` (fechamento fora de ordem!)
- `"{[]}"` $\longrightarrow$ `True`

---

## Reflexão para a Turma :thinking:

### Por que uma simples contagem de caracteres NÃO resolve?

Suponha que contemos:
- Aberturas: `qtd_abre = 2`
- Fechamentos: `qtd_fecha = 2`

Exemplo 1: `"([)]"`
- Temos 1 `(`, 1 `)`, 1 `[`, 1 `]`. As quantidades batem perfeitamente!
- Porém, a string é **completamente inválida**, pois o `[` foi aberto por último, mas o `)` tentou fechar antes do `]`.

Exemplo 2: `")("`
- Temos 1 `)` e 1 `(`. Contagem perfeita, mas fecha antes de abrir!

> 💡 **Conclusão:** O problema depende fundamentalmente da **ORDEM TEMPORAL DE ANINHAMENTO**. O escopo que foi aberto por último é o primeiro que deve ser fechado. Essa é a própria definição de **LIFO (Pilha)**!

---

## Modelagem com Nossa Classe `Pilha`

1. Percorremos a string caractere por caractere da esquerda para a direita.
2. Se o caractere for de **abertura** (`(`, `[`, `{`):
   - Adicionamos na pilha: `pilha.push(char)`. Representa uma "promessa de fechamento futuro".
3. Se o caractere for de **fechamento** (`)`, `]`, `}`):
   - A pilha **não pode estar vazia** (se estiver vazia, significa fechamento sem abertura prévia $\rightarrow$ Inválido!).
   - Desempilhamos o topo: `topo = pilha.pop()`.
   - Verificamos se o `topo` corresponde ao par de abertura esperado. Se for diferente $\rightarrow$ Inválido!
4. Ao final da string:
   - Se a pilha estiver vazia (`pilha.is_empty()`), todos os escopos foram fechados $\rightarrow$ **Válido!**
   - Se sobrou algo na pilha, houve aberturas sem fechamento $\rightarrow$ **Inválido!**

---

## Rastreamento Passo a Passo: `s = "{ [ ] }"`

| Passo | Caractere | Ação | Estado da Pilha | Observação |
|:---:|:---:|:---|:---|:---|
| $0$ | Início | Criação da pilha | `[]` (vazia) | Aguardando tokens |
| $1$ | `{` | `push('{')` | `['{']` | Abertura registrada |
| $2$ | `[` | `push('[')` | `['{', '[']` | Nova abertura interna |
| $3$ | `]` | `pop() -> '['` | `['{']` | Casa com `[` :white_check_mark: |
| $4$ | `}` | `pop() -> '{'` | `[]` | Casa com `{` :white_check_mark: |
| $5$ | Fim | `is_empty()` | `[]` (vazia) | **Resultado: VÁLIDO!** :rocket: |

### E no caso de `"([)]"`?
- Passo 1: `push('(')` $\rightarrow$ `['(']`
- Passo 2: `push('[')` $\rightarrow$ `['(', '[']`
- Passo 3: Lê `)`. Desempilha topo $\rightarrow$ `pop()` retorna `'['`.
- `'['` não fecha com `')'`! $\longrightarrow$ **Falso imediato!**

---

## Código Completo: Classe e Solução Autossuficientes

```python
class Pilha:
    def __init__(self): self._elementos = []
    def push(self, item): self._elementos.append(item)
    def pop(self): return self._elementos.pop() if not self.is_empty() else None
    def is_empty(self): return len(self._elementos) == 0

def validar_escopos(s: str) -> bool:
    pilha = Pilha()
    pares = {')': '(', ']': '[', '}': '{'}

    for char in s:
        if char in pares.values():
            pilha.push(char)
        elif char in pares:
            if pilha.is_empty() or pilha.pop() != pares[char]:
                return False

    return pilha.is_empty()
```

- **Complexidade de Tempo:** **$O(N)$** — Percorre a string de tamanho $N$ apenas uma vez. Cada caractere faz operações $O(1)$ de `push` ou `pop`.
- **Complexidade de Espaço Auxiliar:** **$O(N)$** — No pior caso (ex: `"((((("`), todos os caracteres são empilhados.

---

Est. Lineares: Pilhas
## Aplicação 2: Avaliação de Expressões (Notação Polonesa Reversa - RPN)

---

## Notação Infixa vs Pós-fixa (RPN)

### Notação Infixa (Convenção Humana):
- O operador fica **entre** os operandos: `A + B` ou `(3 + 4) * 5`.
- **Problema para o computador:** Ambiguidade! Exige regras de precedência (`*` antes de `+`) e parênteses para forçar a ordem. O computador precisa de múltiplos passes para interpretar.

### Notação Pós-fixa / Polonesa Reversa (*Reverse Polish Notation - RPN*):
- O operador vem **após** os seus operandos: `3 4 + 5 *`.
- Inventada pelo lógico Jan Łukasiewicz e adotada nas calculadoras científicas **HP** e máquinas virtuais (**JVM**, Python Bytecode).
- **Vantagem extraordinária:** **Não necessita de parênteses!** A ordem de execução é estritamente linear e inequívoca da esquerda para a direita.

---

## 🎯 Desafio Prático: LeetCode #150
### Evaluate Reverse Polish Notation (Médio)

> **Enunciado:** Avalie o valor de uma expressão aritmética em Notação Polonesa Reversa dada como um array de strings `tokens`. Os operadores válidos são `+`, `-`, `*` e `/`. Cada operando pode ser um inteiro ou outra expressão. A divisão entre dois inteiros deve sempre **truncar em direção a zero**.

**Exemplo 1:**
- `tokens = ["2", "1", "+", "3", "*"]`
- Equivalente infixo: `((2 + 1) * 3)`
- $((2 + 1) * 3) = (3 * 3) = 9$ $\longrightarrow$ **Saída: `9`**

**Exemplo 2:**
- `tokens = ["4", "13", "5", "/", "+"]`
- Equivalente infixo: `(4 + (13 / 5))`
- Em divisão inteira truncando para zero: $13 / 5 = 2$. Então $(4 + 2) = 6$ $\longrightarrow$ **Saída: `6`**

---

## A Mecânica com Pilha: Por que Funciona?

### Algoritmo de Avaliação RPN:
1. Crie uma pilha vazia para armazenar operandos numéricos.
2. Itere sobre cada `token` na lista da esquerda para a direita:
   - Se for um **número**: converta para inteiro e faça `pilha.push(num)`.
   - Se for um **operador** (`+`, `-`, `*`, `/`):
     1. Desempilhe o segundo operando: `b = pilha.pop()`
     2. Desempilhe o primeiro operando: `a = pilha.pop()`
     3. Calcule: `resultado = a OPERADOR b`
     4. Empilhe o resultado de volta: `pilha.push(resultado)`
3. Ao término dos tokens, o resultado final da expressão estará no topo da pilha: retorne `pilha.pop()`.

> :warning: **CUIDADO COM A ORDEM NA SUBTRAÇÃO E DIVISÃO:**
> O primeiro elemento que sai do `pop()` é o operando da **DIREITA (`b`)**.
> A operação deve ser `a - b` e `a / b`, e **nunca** `b - a`!

---

## Rastreamento de `["4", "13", "5", "/", "+"]`

| Token | É número ou operador? | Ação Realizada | Pilha Resultante |
|:---:|:---:|:---|:---|
| `"4"` | Número | `push(4)` | `[4]` |
| `"13"` | Número | `push(13)` | `[4, 13]` |
| `"5"` | Número | `push(5)` | `[4, 13, 5]` |
| `"/"` | Operador | `b = 5`, `a = 13` $\rightarrow$ `int(13 / 5) = 2` $\rightarrow$ `push(2)` | `[4, 2]` |
| `"+"` | Operador | `b = 2`, `a = 4` $\rightarrow$ `4 + 2 = 6` $\rightarrow$ `push(6)` | `[6]` |

Fim dos tokens $\longrightarrow$ `pilha.pop()` retorna **`6`**!

### Detalhe de Linguagem em Python:
- `13 // 5` em Python resulta em `2`.
- Porém, para números negativos: `-3 // 2` arredonda para baixo (piso), resultando em `-2`.
- Para truncar em direção a zero no padrão internacional de computação (como em C, Java e LeetCode), usamos:
  ```python
  resultado = int(a / b)  # int(-1.5) vira -1, int(1.5) vira 1!
  ```

---

## Código Completo da Avaliação RPN

```python
def avaliar_rpn(tokens: list[str]) -> int:
    pilha = Pilha()
    operadores = {'+', '-', '*', '/'}

    for token in tokens:
        if token not in operadores:
            pilha.push(int(token))
        else:
            b = pilha.pop()  # Segundo operando (direita)
            a = pilha.pop()  # Primeiro operando (esquerda)

            if token == '+': pilha.push(a + b)
            elif token == '-': pilha.push(a - b)
            elif token == '*': pilha.push(a * b)
            elif token == '/': pilha.push(int(a / b))  # Trunca para zero

    return pilha.pop()
```
- **Complexidade de Tempo:** **$O(N)$** — Cada token é processado em $O(1)$.
- **Complexidade de Espaço:** **$O(N)$** — Armazena até $N/2$ números na pilha.

---

Est. Lineares: Pilhas
## Aplicação 3: Conversão de Lógicas Recursivas para Iterativas

---

## Como a CPU Executa Funções: A *Call Stack*

Quando seu programa chama qualquer função, o Sistema Operacional aloca um **Stack Frame** (Quadro de Pilha) na memória de execução da CPU:

```
Pilha de Execução (Call Stack na RAM):
+----------------------------------------------------+
| Frame: dfs(no_d)   [variaveis locais, retorno]     |  <--- TOPO ATUAL
+----------------------------------------------------+
| Frame: dfs(no_b)   [variaveis locais, retorno]     |
+----------------------------------------------------+
| Frame: dfs(no_a)   [variaveis locais, retorno]     |
+----------------------------------------------------+
| Frame: main()      [ponto de entrada]              |  <--- BASE
+----------------------------------------------------+
```

- Quando a função retorna, seu quadro é desempilhado (`pop`).
- **O Limite de Recursão:** A *Call Stack* do sistema possui tamanho fixo e reduzido (tipicamente poucos megabytes).
- Em Python: `sys.getrecursionlimit()` é por padrão de apenas **1000 chamadas**. Se a recursão for mais profunda:
  `RecursionError: maximum recursion depth exceeded`!

---

## O Princípio da Conversão Recursiva $\rightarrow$ Iterativa

> :bulb: **Teorema Fundamental:** Qualquer algoritmo recursivo pode ser reescrito de forma puramente iterativa utilizando uma **Pilha Explícita**!

### Por que fazer isso?
1. **Memória Heap vs Memória Stack:**
   - A *Call Stack* da CPU estoura com ~1000 chamadas.
   - Uma pilha criada pelo seu código reside na **Memória Heap**, que pode utilizar **toda a memória RAM disponível do computador** (milhões de elementos sem estourar).
2. **Desempenho e Sobrecarga de Função:**
   - Evita a sobrecarga (*overhead*) de criar ponteiros de pilha, registradores de CPU e quadros de ativação a cada passo recursivo.
3. **Controle Fino de Interrupção e Retomada:**
   - Podemos pausar, salvar o estado da pilha em disco e continuar a execução mais tarde.

---

## Exemplo Prático: Travessia em Profundidade (DFS)

Considere a estrutura hierárquica (ou árvore binária):

```
        [ A ]
       /     \
    [ B ]   [ C ]
    /   \       \
  [ D ] [ E ]   [ F ]
```

### Versão 1: Recursiva (Usa a Call Stack da CPU)
```python
def dfs_recursivo(no, visitados=None):
    if visitados is None: visitados = []
    if not no: return visitados
    
    visitados.append(no.valor)       # 1. Visita
    dfs_recursivo(no.esq, visitados) # 2. Mergulha à esquerda
    dfs_recursivo(no.dir, visitados) # 3. Mergulha à direita
    return visitados
```
- Ordem de visitação: `['A', 'B', 'D', 'E', 'C', 'F']`

---

## Versão 2: Iterativa com Nossa Classe `Pilha`

Para simular o comportamento recursivo:
1. Colocamos o nó raiz na nossa pilha.
2. Enquanto a pilha não estiver vazia:
   - Desempilhamos o nó atual e registramos sua visitação.
   - Empilhamos os filhos. **Mas atenção à ordem LIFO!**
   - Como queremos visitar a **Esquerda ANTES da Direita**, devemos **empilhar primeiro o filho da DIREITA e depois o da ESQUERDA** (para que o esquerdo fique no topo)!

```python
def dfs_iterativo(raiz) -> list:
    if not raiz: return []
    visitados = []
    pilha = Pilha()
    pilha.push(raiz)

    while not pilha.is_empty():
        no = pilha.pop()
        visitados.append(no.valor)

        if no.dir: pilha.push(no.dir)  # Direita entra primeiro
        if no.esq: pilha.push(no.esq)  # Esquerda entra depois -> Fica no TOPO!

    return visitados
```

---

Est. Lineares: Pilhas
## Transição: Pilhas Nativas e Idiomáticas em Python

---

## Simulando Pilhas com a `list` Nativa do Python

Agora que compreendemos profundamente a mecânica interna do TAD Pilha, podemos aproveitar que a `list` em Python já fornece operações nativas eficientes no final da sequência:

| Operação de Pilha (TAD) | Equivalente com `list` em Python | Complexidade |
|---|---|:---:|
| `pilha.push(item)` | `stack.append(item)` | **$O(1)$ amortizado** |
| `pilha.pop()` | `stack.pop()` *(sem argumentos!)* | **$O(1)$** |
| `pilha.peek()` | `stack[-1]` | **$O(1)$** |
| `pilha.is_empty()` | `len(stack) == 0` ou `not stack` | **$O(1)$** |
| `pilha.size()` | `len(stack)` | **$O(1)$** |

```python
# Uso idiomático direto:
stack = []
stack.append("A")     # push
stack.append("B")     # push
topo = stack[-1]      # peek -> "B"
removido = stack.pop()# pop  -> "B"
vazia = not stack     # is_empty -> False
```

---

## ⚠️ As Armadilhas de Usar `list` como Pilha

A `list` é conveniente, mas requer muita disciplina da equipe de desenvolvimento:

1. **NUNCA use `pop(0)` ou `insert(0, item)`:**
   ```python
   stack.insert(0, item)  # O(N) catastrófico! Desloca toda a lista para a direita.
   stack.pop(0)           # O(N) catastrófico! Desloca toda a lista para a esquerda.
   ```
   > Se precisar inserir e remover nas duas pontas, a estrutura correta é uma **Fila de Duas Pontas (`collections.deque`)**, que veremos em aulas futuras!

2. **Ausência de Encapsulamento:**
   - Uma `list` aceita ordenação `stack.sort()`, inserção no meio `stack.insert(3, x)` e acesso direto `stack[2]`. Nenhuma dessas operações pertence ao contrato de uma Pilha.

3. **Recomendação para a Carreira:**
   - Em **entrevistas técnicas e competições**, use `list` com `append()` e `pop()` pela rapidez de escrita.
   - Em **sistemas de missão crítica e bibliotecas compartilhadas**, encapsule na classe `Pilha` para blindar a arquitetura.

---

## Resolução Idiomática em Python: Valid Parentheses

Veja como o código fica conciso quando dominamos a estrutura:

```python
def is_valid(s: str) -> bool:
    stack = []
    mapa = {')': '(', ']': '[', '}': '{'}

    for ch in s:
        if ch in mapa.values():
            stack.append(ch)
        elif ch in mapa:
            if not stack or stack.pop() != mapa[ch]:
                return False

    return len(stack) == 0
```

- Limpo, expressivo e com performance ótima de **$O(N)$ tempo e $O(N)$ espaço**.
- Passa em $100\%$ dos casos de teste do LeetCode e Beecrowd!

---

## Tabela Comparativa: Qual Escolher?

| Critério | Nossa Classe `Pilha` | `list` Nativa | `collections.deque` |
|---|:---:|:---:|:---:|
| **Encapsulamento LIFO** | :star: Total (Blindado) | :warning: Frágil (Permite tudo) | :warning: Frágil (Permite ambas pontas) |
| **Velocidade de `push`/`pop`** | Excelente (overhead OOP mínimo) | Muito Rápido ($C$ nativo) | Extremamente Rápido ($C$ nativo) |
| **Garantia de $O(1)$** | Sim | Sim (amortizado no final) | Sim (estrito em blocos) |
| **Deslocamento Acidental** | Impossível (métodos restritos) | Possível (`pop(0)` causa $O(N)$) | Impossível na ponta |
| **Uso em Entrevistas de Código** | Excelente para explicar conceitos | Padrão mais aceito pela brevidade | Recomendado para Filas/Deques |

---

Est. Lineares: Pilhas
## Material de Referência Avançada

---

## 🔍 Para ir além: Tipagem Estática e Genéricos (`Generic[T]`)

Para bibliotecas de produção e sistemas corporativos que usam checagem estática com **`mypy`** ou ferramentas de IDE, podemos enriquecer a classe com Type Hints:

```python
from typing import Generic, TypeVar, Optional

T = TypeVar('T')

class PilhaGenerica(Generic[T]):
    def __init__(self, capacidade: Optional[int] = None) -> None:
        self._elementos: list[T] = []
        self._capacidade = capacidade

    def push(self, item: T) -> None:
        if self._capacidade and len(self._elementos) >= self._capacidade:
            raise OverflowError("Stack Overflow!")
        self._elementos.append(item)

    def pop(self) -> T:
        if self.is_empty():
            raise IndexError("Stack Underflow!")
        return self._elementos.pop()

    def peek(self) -> T:
        if self.is_empty():
            raise IndexError("Stack Underflow!")
        return self._elementos[-1]

    def is_empty(self) -> bool: return len(self._elementos) == 0
    def size(self) -> int: return len(self._elementos)
```

> :bulb: Em maratonas de programação e juízes online, a **versão simples sem genéricos** é sempre preferida pela facilidade de ser copiada sem dependência de imports!

---

Est. Lineares: Pilhas
## Resumo dos Pontos-Chave

---

## Resumo dos Pontos-Chave :bulb:

1. **LIFO é a Regra Suprema:** O último a entrar é o primeiro a sair. Todas as operações acontecem estritamente no **Topo**.
2. **Custo $O(1)$ Universal:** `push`, `pop` e `peek` devem operar sempre em tempo constante, sem loops ou buscas lineares.
3. **Tratamento de Underflow:** Sempre certifique-se de que a pilha não está vazia antes de invocar `pop()` ou `peek()`.
4. **Validação de Escopos:** O escopo mais recente que foi aberto deve ser o primeiro a ser fechado. Pilha é a modelagem natural.
5. **Avaliação RPN:** Em notação pós-fixa, o primeiro desempilhado é o operando da direita (`b`) e o segundo é o da esquerda (`a`). A conta é `a op b`.
6. **Eliminação de Recursão:** A *Call Stack* da CPU tem limite de ~1000 frames. Usar uma Pilha Explícita em memória Heap remove esse limite e protege seu sistema contra falhas.

---

# Obrigado! :metal:

---

## Eduardo Cruz Araujo

- E-mail: [eduardo.araujo@cps.sp.gov.br](mailto:eduardo.araujo@cps.sp.gov.br)
- LinkedIn: [edcaraujo](https://www.linkedin.com/in/edcaraujo/)
- GitHub: [edcaraujo](https://github.com/edcaraujo)
