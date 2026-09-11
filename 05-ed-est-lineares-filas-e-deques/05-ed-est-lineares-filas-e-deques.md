---
marp: true

author: "Eduardo Cruz Araujo"
title: "Estruturas de Dados"
description: "Disciplina de Estruturas de Dados - Est. Lineares: Filas e Deques."

theme: "default"
class: "invert"

footer: "Eduardo Cruz Araujo | Fatec | 2026.2 | Estruturas de Dados | Est. Lineares: Filas e Deques"

paginate: "true"

---

# Estrutura de Dados :mortar_board:
## Est. Lineares: Filas e Deques

Implementação da estrutura FIFO (First-In, First-Out) e Deques (Double-Ended Queues). Modelagem de problemas de simulação e escalonamento.

---

Est. Lineares: Filas e Deques
## O Conceito de Fila e o Princípio FIFO

---

## O que é uma Fila (*Queue*)?

Uma **Fila** é uma estrutura de dados linear e dinâmica caracterizada por uma regra de acesso justa e cronológica:

- **Princípio FIFO (*First-In, First-Out*):** O primeiro elemento inserido é obrigatoriamente o primeiro elemento a ser atendido e removido.
- **Duas Extremidades de Acesso:**
  - **Início / Frente (*Front / Head*):** Ponto exclusivo de onde os elementos são inspecionados e removidos (*Dequeue*).
  - **Fim / Cauda (*Rear / Tail / Back*):** Ponto exclusivo onde novos elementos entram na fila (*Enqueue*).

```
Entrada (Enqueue) ────────────────────────────────────────────────────────┐
                                                                          │
                                                                          ▼
┌─────────────────┬─────────────────┬─────────────────┬─────────────────┐
│   Elemento 1    │   Elemento 2    │   Elemento 3    │   Elemento 4    │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┘
        │
        ▼
Saída (Dequeue) <--- INÍCIO (Front)                  FIM (Rear) <--- Último a entrar
```

---

## Analogias do Mundo Real e Aplicações em Engenharia de Software

### No Mundo Real:
- **Fila de Caixa de Banco / Lotérica:** Quem chega primeiro é chamado ao guichê primeiro; furar a fila é terminantemente proibido!
- **Túnel de Pedágio / Drive-thru:** Veículos entram por trás e saem pela frente na mesma ordem.

### Nos Sistemas Computacionais Modernos:
1. **Fila de Impressão (*Print Spooler*):** Os documentos enviados para a impressora são processados rigorosamente em ordem de chegada.
2. **Escalonamento de Processos na CPU (*Round-Robin*):** O sistema operacional mantém uma fila de prontos (*Ready Queue*) para alternar o tempo de processador entre as tarefas.
3. **Mensageria e Arquitetura Assíncrona:** Ferramentas como **RabbitMQ**, **Apache Kafka** e **AWS SQS** são filas corporativas de processamento de eventos desacoplados.
4. **Tráfego de Rede (Roteadores & Switches):** Buffers de pacotes IP operam como filas FIFO para evitar descarte prematuro (*packet drop*).
5. **Busca em Largura (BFS) em Grafos e Árvores:** Explora nós nível por nível.

---

Est. Lineares: Filas e Deques
## Operações Fundamentais e Complexidade Assintótica

---

## As Operações Primitivas do TAD Fila

No Tipo Abstrato de Dados (TAD) de Fila, definimos a seguinte interface pública padrão:

| Operação | Assinatura | Descrição | Complexidade Ideal |
|---|---|---|:---:|
| **Enqueue** | `enqueue(item)` | Adiciona um elemento ao **fim** da fila | **$O(1)$** |
| **Dequeue** | `dequeue() -> item` | Remove e retorna o elemento do **início** | **$O(1)$** |
| **Front / Peek** | `front() -> item` | Retorna o elemento da frente **sem removê-lo** | **$O(1)$** |
| **Is Empty** | `is_empty() -> bool` | Retorna `True` se a fila não contiver itens | **$O(1)$** |
| **Size** | `size() -> int` | Informa o total de elementos aguardando | **$O(1)$** |
| **Clear** | `clear()` | Esvazia todos os elementos da fila | **$O(1)$** |

> :bulb: Em uma implementação ótima, tanto a inserção no fim quanto a remoção no início devem ocorrer estritamente em **tempo constante $O(1)$**, sem qualquer laço de varredura.

---

## Estados de Erro: Queue Underflow e Queue Overflow

Assim como nas Pilhas, o desenvolvedor deve proteger sua estrutura contra condições de contorno críticas:

### 1. *Queue Underflow* (Subfluxo de Fila)
- Ocorre quando tentamos executar `dequeue()` ou `front()` em uma **fila vazia**.
- **Comportamento correto:** Lançar uma exceção explícita (`IndexError("Queue Underflow: a fila está vazia!")`) ou retornar `None` conforme a convenção do projeto.

### 2. *Queue Overflow* (Transbordamento de Fila)
- Ocorre em **filas de capacidade finita** (ex: buffers circulares de rede ou filas limitadas em memória) quando tentamos executar `enqueue()` com a capacidade esgotada.
- **Comportamento correto:** Lançar `OverflowError("Queue Overflow: capacidade máxima excedida!")` ou aplicar políticas de descarte (*Drop-tail / Backpressure*).

---

Est. Lineares: Filas e Deques
## A Grande Armadilha de Usar `list` como Fila em Python

---

## ⚠️ O Perigo Oculto do Método `list.pop(0)`

Em Python, muitos programadores iniciantes tentam implementar filas usando uma `list` convencional:

```python
# ❌ ABORDAGEM INEFICIENTE E PERIGOSA:
fila = []
fila.append("Cliente A")  # Enqueue: O(1) no final -> OK!
fila.append("Cliente B")
primeiro = fila.pop(0)     # Dequeue: O(N) catastrófico! 🚨
```

### Por que `pop(0)` é $O(N)$?
A lista em Python é alocada como um **array contíguo de ponteiros**:
- Quando removemos o índice `0`, todos os demais $N-1$ elementos precisam ser **deslocados fisicamente uma posição à esquerda** na memória RAM!

```
Antes do pop(0):   [ C1 ][ C2 ][ C3 ][ C4 ][ C5 ]
Removendo C1...       ▲     ▲     ▲     ▲
Deslocamento RAM:     └───◀─┴───◀─┴───◀─┴───◀─ O(N) operações de cópia!
```

> :fire: **Impacto em Produção:** Se sua fila tiver $100.000$ requisições, cada `dequeue` executará $99.999$ movimentações de ponteiros. Seu sistema ficará centenas de vezes mais lento!

---

Est. Lineares: Filas e Deques
## Soluções Eficientes: Array Circular vs Fila Encadeada

---

## Abordagem 1: Fila em Buffer Circular (*Circular Buffer*)

Para alcançar **$O(1)$ estrito** em arrays sem deslocar memória, usamos um **Buffer Circular**:

- Mantemos um array fixo de tamanho $C$ e dois ponteiros/índices inteiros: `inicio` e `fim`.
- Ao remover um elemento do `inicio`, simplesmente avançamos o índice: `inicio = (inicio + 1) % C`.
- Ao inserir um elemento no `fim`, avançamos o índice: `fim = (fim + 1) % C`.
- **Nenhum elemento é deslocado na memória!** O operador módulo `%` faz os índices darem a volta ao atingirem o limite físico do array.

```
Array de Capacidade 6:
                inicio          fim
                  ▼              ▼
Indices:   [ 0 ][ 1 ][ 2 ][ 3 ][ 4 ][ 5 ]
Valores:   [   ][ 20][ 35][ 42][   ][   ]
                 └──── elementos ───┘
```

---

## Aritmética Modular na Fila Circular

A mágica do buffer circular está na função resto da divisão inteira (`%`):

$$\text{novo\_indice} = (\text{indice} + 1) \pmod{\text{capacidade}}$$

### Cenário de Exemplo (Capacidade = 5):
1. Fila inicial vazia: `inicio = 0`, `fim = 0`, `tamanho = 0`.
2. Inserções sucessivas:
   - `enqueue(A)` $\rightarrow$ salva em `data[0]`, `fim = (0+1)%5 = 1`
   - `enqueue(B)` $\rightarrow$ salva em `data[1]`, `fim = (1+1)%5 = 2`
   - `enqueue(C)` $\rightarrow$ salva em `data[2]`, `fim = (2+1)%5 = 3`
3. Remoções:
   - `dequeue()` $\rightarrow$ retorna `data[0]`, `inicio = (0+1)%5 = 1`
   - `dequeue()` $\rightarrow$ retorna `data[1]`, `inicio = (1+1)%5 = 2`
4. Novas inserções quando `fim` atinge o final:
   - Os novos elementos preenchem os espaços vagos no início do array (`0` e `1`) sem alocar nova memória!

---

## Nossa Classe `Fila` Autossuficiente (Buffer Circular)

Código puro, elegante e sem dependência de imports:

```python
class Fila:
    def __init__(self, capacidade: int = 100):
        self._capacidade = capacidade
        self._elementos = [None] * capacidade
        self._inicio = 0
        self._fim = 0
        self._tamanho = 0

    def enqueue(self, item):
        if self._tamanho == self._capacidade:
            raise OverflowError("Queue Overflow: fila cheia!")
        self._elementos[self._fim] = item
        self._fim = (self._fim + 1) % self._capacidade
        self._tamanho += 1

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Queue Underflow: fila vazia!")
        item = self._elementos[self._inicio]
        self._elementos[self._inicio] = None  # Evita vazamento de memória
        self._inicio = (self._inicio + 1) % self._capacidade
        self._tamanho -= 1
        return item
```

---

## Métodos Auxiliares da Classe `Fila`

Completando nossa implementação para torná-la idiomática e amigável:

```python
    def front(self):
        if self.is_empty():
            raise IndexError("Queue Underflow: fila vazia!")
        return self._elementos[self._inicio]

    def is_empty(self):
        return self._tamanho == 0

    def size(self):
        return self._tamanho

    def __len__(self):
        return self._tamanho

    def __repr__(self):
        if self.is_empty():
            return "Fila: [] (vazia)"
        itens = []
        idx = self._inicio
        for _ in range(self._tamanho):
            itens.append(repr(self._elementos[idx]))
            idx = (idx + 1) % self._capacidade
        return f"Fila (Início) [{' -> '.join(itens)}] (Fim)"
```

---

## Abordagem 2: Fila Encadeada (*Node-Based Queue*)

Também podemos construir uma fila com nós dinâmicos mantendo dois ponteiros: `head` (início) e `tail` (fim):

```python
class Node:
    def __init__(self, dado, proximo=None):
        self.dado = dado
        self.proximo = proximo

class FilaEncadeada:
    def __init__(self):
        self._head = None  # Início (onde ocorre o dequeue)
        self._tail = None  # Fim    (onde ocorre o enqueue)
        self._tamanho = 0

    def enqueue(self, item):
        novo = Node(item)
        if self._tail is None:
            self._head = self._tail = novo
        else:
            self._tail.proximo = novo
            self._tail = novo
        self._tamanho += 1
```

---

## Remoção na Fila Encadeada: $O(1)$ Estrito

```python
    def dequeue(self):
        if self._head is None:
            raise IndexError("Queue Underflow: fila vazia!")
        item = self._head.dado
        self._head = self._head.proximo
        if self._head is None:
            self._tail = None  # A fila esvaziou por completo
        self._tamanho -= 1
        return item

    def front(self):
        if self._head is None:
            raise IndexError("Queue Underflow!")
        return self._head.dado

    def is_empty(self):
        return self._head is None
```

- **Vantagem:** Capacidade teoricamente infinita (limitada apenas pela memória RAM disponível).
- **Desvantagem:** Maior consumo de memória devido ao armazenamento do ponteiro `proximo` em cada nó.

---

Est. Lineares: Filas e Deques
## Deques: Double-Ended Queues (Filas de Duas Pontas)

---

## O que é um Deque (*Double-Ended Queue*)?

Um **Deque** (pronuncia-se *"deck"*) é uma generalização da Fila e da Pilha onde inserções e remoções são permitidas com eficiência **$O(1)$ em ambas as extremidades**:

```
           INÍCIO (Front)                                FIM (Rear)
append_front() ──┐      ┌── pop_front()   append_rear() ──┐      ┌── pop_rear()
                 │      │                                 │      │
                 ▼      ▲                                 ▼      ▲
              ┌──────┬──────┬──────┬──────┬──────┬──────┐
              │ D[0] │ D[1] │ D[2] │ D[3] │ D[4] │ D[5] │
              └──────┴──────┴──────┴──────┴──────┴──────┘
```

### O Deque é uma Superestrutura:
- Se usarmos apenas `append_rear()` e `pop_rear()`, ele se comporta como uma **Pilha (LIFO)**.
- Se usarmos `append_rear()` e `pop_front()`, ele se comporta como uma **Fila (FIFO)**.
- Permite ainda algoritmos simétricos e janelas deslizantes bidirecionais!

---

## Operações Primitivas do TAD Deque

| Operação | Descrição | Complexidade |
|---|---|:---:|
| `append_rear(x)` / `push_back` | Insere elemento $x$ no **fim** | **$O(1)$** |
| `append_front(x)` / `push_front` | Insere elemento $x$ no **início** | **$O(1)$** |
| `pop_front()` | Remove e retorna o elemento do **início** | **$O(1)$** |
| `pop_rear()` | Remove e retorna o elemento do **fim** | **$O(1)$** |
| `peek_front()` | Consulta o elemento do início sem remover | **$O(1)$** |
| `peek_rear()` | Consulta o elemento do fim sem remover | **$O(1)$** |
| `is_empty()` | Verifica se o deque está desprovido de nós | **$O(1)$** |
| `size()` | Retorna o total de elementos presentes | **$O(1)$** |

> :star: Todas as 8 operações básicas operam em **tempo constante estrito $O(1)$**!

---

## Nossa Classe `Deque` Autossuficiente: Lista Duplamente Encadeada

Por que **NUNCA** usar `list.insert(0)` e `list.pop(0)` para Deques?
Porque ambos custam **$O(N)$ catastrófico**! A implementação canônica utiliza **Nós Duplamente Encadeados**:

```python
class Node:
    def __init__(self, dado, ant=None, prox=None):
        self.dado, self.ant, self.prox = dado, ant, prox

class Deque:
    def __init__(self):
        self._head = self._tail = None
        self._tamanho = 0

    def append_front(self, item):  # O(1) estrito
        novo = Node(item, prox=self._head)
        if not self._head: self._head = self._tail = novo
        else: self._head.ant = novo; self._head = novo
        self._tamanho += 1

    def append_rear(self, item):   # O(1) estrito
        novo = Node(item, ant=self._tail)
        if not self._tail: self._head = self._tail = novo
        else: self._tail.prox = novo; self._tail = novo
        self._tamanho += 1

    def pop_front(self):           # O(1) estrito
        if not self._head: raise IndexError("Deque Underflow!")
        val = self._head.dado
        self._head = self._head.prox
        if not self._head: self._tail = None
        else: self._head.ant = None
        self._tamanho -= 1
        return val

    def pop_rear(self):            # O(1) estrito
        if not self._tail: raise IndexError("Deque Underflow!")
        val = self._tail.dado
        self._tail = self._tail.ant
        if not self._tail: self._head = None
        else: self._tail.prox = None
        self._tamanho -= 1
        return val
```

---

## A Estrutura Nativa Padrão: `collections.deque`

O módulo embutido `collections` da biblioteca padrão do Python traz uma implementação em C de altíssimo desempenho:

```python
from collections import deque

d = deque()

# Inserções O(1)
d.append(10)        # Insere no fim (rear)
d.appendleft(20)    # Insere no início (front)
d.append(30)        # d agora é: [20, 10, 30]

# Remoções O(1)
primeiro = d.popleft()  # Remove do início -> 20
ultimo = d.pop()        # Remove do fim    -> 30

# Consulta O(1)
print(d[0])         # Frente: 10
print(d[-1])        # Fundo:  10
```

### Como o CPython implementa o `deque` internamente?
- Não é um array único nem uma lista puramente nó a nó.
- É uma **lista duplamente encadeada de blocos de memória de tamanho fixo** (64 itens por bloco em sistemas 64-bit). Garante cache amigável e zero deslocamento de memória!

---

Est. Lineares: Filas e Deques
## Aplicação 1: Modelagem de Simulação de Atendimento (Fila de Banco)

---

## Simulação de Eventos Discretos: Guichê de Atendimento

Uma das maiores aplicações de Filas na computação e na pesquisa operacional é a **Teoria das Filas**:

- **Cenário:** Clientes chegam em instantes de tempo arbitrários e entram na fila.
- Um ou mais caixas/atendentes processam cada cliente com um tempo de atendimento determinado.
- **Objetivo da Modelagem:** Calcular métricas vitais de negócio:
  1. Tempo médio de espera na fila (*Average Waiting Time*).
  2. Taxa de ocupação dos atendentes.
  3. Tamanho máximo atingido pela fila.

```
Chegadas: [C1(chega:0, dura:3)] -> [C2(chega:1, dura:2)] -> [C3(chega:2, dura:1)]
                │
                ▼
        [ FILA DE ESPERA ]
                │
                ▼
         [ GUICHÊ 1 ] ──> Atendimento Concluído
```

---

## Código da Simulação de Fila de Banco em Python

```python
from collections import deque

class Cliente:
    def __init__(self, id_cliente: int, tempo_chegada: int, tempo_atendimento: int):
        self.id = id_cliente
        self.tempo_chegada = tempo_chegada
        self.tempo_atendimento = tempo_atendimento

def simular_atendimento(clientes_info: list[tuple[int, int]]) -> float:
    fila = deque()
    for idx, (chegada, duracao) in enumerate(clientes_info, 1):
        fila.append(Cliente(idx, chegada, duracao))

    tempo_atual = 0
    esperas = []

    while fila:
        cliente = fila.popleft()
        if tempo_atual < cliente.tempo_chegada:
            tempo_atual = cliente.tempo_chegada
        
        espera = tempo_atual - cliente.tempo_chegada
        esperas.append(espera)
        tempo_atual += cliente.tempo_atendimento

    return sum(esperas) / len(esperas) if esperas else 0.0
```

---

Est. Lineares: Filas e Deques
## Aplicação 2: Escalonamento de Processos na CPU (Round-Robin)

---

## Escalonamento Preemptivo: O Algoritmo Round-Robin

Em sistemas operacionais modernos (Linux, Windows, macOS), dezenas de programas competem por um único núcleo de CPU. O escalonador **Round-Robin (RR)** utiliza uma Fila FIFO:

1. Cada processo $P_i$ possui um tempo de execução necessário (*Burst Time*).
2. O sistema define uma fatia fixa de tempo ininterrupto chamada **Quantum** (ex: $q = 3$ ms).
3. O processo na frente da fila é retirado (`dequeue()`) e executa na CPU:
   - **Se concluir seu trabalho no intervalo $(\le q)$:** É finalizado e liberado.
   - **Se o tempo exceder o Quantum:** Sofre preempção (interrupção do SO), tem seu tempo restante atualizado e **é reinserido no fim da fila (`enqueue()`)**!
4. O ciclo se repete até que a fila esteja vazia.

---

## Rastreamento Passo a Passo: Quantum = 3 ms

| Instante | Processo em Execução | Tempo Restante | Fila de Prontos (*Ready Queue*) |
|:---:|:---:|:---:|:---|
| $t=0$ | Início | - | `[P1(5), P2(3), P3(8)]` |
| $t=0 \rightarrow 3$ | **P1** roda 3 ms | Resta 2 | Sai P1, sobram `[P2(3), P3(8)]` $\rightarrow$ P1 entra no fim $\rightarrow$ `[P2(3), P3(8), P1(2)]` |
| $t=3 \rightarrow 6$ | **P2** roda 3 ms | Resta 0 | P2 finalizou! $\rightarrow$ Sai da fila! Sobram `[P3(8), P1(2)]` |
| $t=6 \rightarrow 9$ | **P3** roda 3 ms | Resta 5 | Sai P3 $\rightarrow$ P3 volta no fim $\rightarrow$ `[P1(2), P3(5)]` |
| $t=9 \rightarrow 11$| **P1** roda 2 ms | Resta 0 | P1 finalizou! $\rightarrow$ Sobra apenas `[P3(5)]` |
| $t=11 \rightarrow 14$| **P3** roda 3 ms | Resta 2 | P3 volta no fim $\rightarrow$ `[P3(2)]` |
| $t=14 \rightarrow 16$| **P3** roda 2 ms | Resta 0 | P3 finalizou! Fila vazia $\rightarrow$ Concluído! :tada: |

---

## Código do Escalonador Round-Robin

```python
from collections import deque

def escalonar_round_robin(processos: dict[str, int], quantum: int) -> list[tuple[str, int]]:
    fila = deque()
    for nome, tempo in processos.items():
        fila.append({'nome': nome, 'restante': tempo})

    historico_execucao = []
    tempo_global = 0

    while fila:
        proc = fila.popleft()
        execucao = min(quantum, proc['restante'])
        tempo_global += execucao
        proc['restante'] -= execucao
        historico_execucao.append((proc['nome'], tempo_global))

        if proc['restante'] > 0:
            fila.append(proc)  # Volta para o fim da fila

    return historico_execucao
```

---

Est. Lineares: Filas e Deques
## Aplicação 3: Verificação de Palíndromos com Deque

---

## 🎯 Verificação Simétrica de Cadeias de Caracteres

> **Definição:** Uma palavra ou frase é dita um **palíndromo** se ela puder ser lida da esquerda para a direita ou da direita para a esquerda resultando na mesma sequência de letras (ignorando maiúsculas, minúsculas e espaços).

### Por que o Deque é a Estrutura Perfeita?
Em vez de inverter toda a string na memória ou criar ponteiros complexos:
1. Inserimos todos os caracteres válidos no Deque.
2. Em cada iteração, removemos simultaneamente o caractere da **frente (`pop_front()`)** e o do **fundo (`pop_rear()`)**.
3. Se em qualquer momento os caracteres forem distintos $\rightarrow$ **Não é palíndromo!**
4. Se o deque esvaziar (tamanho 0 ou 1) $\rightarrow$ **É palíndromo legítimo!**

---

## Implementação: Verificador de Palíndromos com Deque

```python
from collections import deque

def eh_palindromo(texto: str) -> bool:
    d = deque()
    
    # 1. Pré-processa: converte para minúsculas e filtra apenas alfanuméricos
    for char in texto.lower():
        if char.isalnum():
            d.append(char)

    # 2. Compara as extremidades simétricas em O(1)
    while len(d) > 1:
        primeiro = d.popleft()
        ultimo = d.pop()
        if primeiro != ultimo:
            return False

    return True

# Testes rápidos:
print(eh_palindromo("radar"))                    # True
print(eh_palindromo("A man a plan a canal Panama")) # True
print(eh_palindromo("Fatec Ribeirao"))          # False
```

- **Complexidade de Tempo:** **$O(N)$** — Cada caractere é enfileirado e desenfileirado uma só vez.
- **Complexidade de Espaço:** **$O(N)$** — Memória proporcional ao número de letras válidas.

---

Est. Lineares: Filas e Deques
## Aplicação 4: O Jogo da Batata Quente (Problema de Josephus)

---

## A Dança da Fila: Circulação Contínua de Elementos

Na brincadeira infantil da **Batata Quente**, crianças sentam em círculo e passam um objeto de mão em mão. Ao soar a palavra *"Queimou!"* após $K$ passos, a criança que segura o objeto é eliminada:

### Como modelar isso com uma Fila FIFO?
1. Enfileiramos todos os participantes: `[P1, P2, P3, P4, P5]`.
2. Para simular a passagem da batata por $K$ vezes:
   - Retiramos a pessoa da frente: `p = fila.dequeue()`.
   - Colocamos ela imediatamente de volta no fim: `fila.enqueue(p)`.
3. Ao término das $K$ rotações, a pessoa na frente da fila segura a batata:
   - Ela é **eliminada definitivamente** (`fila.dequeue()`).
4. O ciclo se repete até restar apenas um sobrevivente!

---

## Código da Batata Quente em Python

```python
from collections import deque

def batata_quente(nomes: list[str], num_rotacoes: int) -> str:
    fila = deque(nomes)

    while len(fila) > 1:
        # Gira a batata num_rotacoes vezes
        for _ in range(num_rotacoes):
            fila.append(fila.popleft())  # Passa para o final

        eliminado = fila.popleft()       # Queimou!
        # print(f"Eliminado da rodada: {eliminado}")

    return fila.popleft()  # Retorna o vencedor sobrevivente

participantes = ["Ana", "Bruno", "Carlos", "Diana", "Eduardo"]
vencedor = batata_quente(participantes, 3)
print(f"Vencedor da rodada: {vencedor}")
```

- **Complexidade:** $O(N \times K)$ tempo, operando com manipulações $O(1)$ de pontas.

---

Est. Lineares: Filas e Deques
## Implementando Fila com Duas Pilhas (LeetCode #232)

---

## 🎯 Desafio Clássico de Entrevista Técnica

> **Pergunta:** *"Como você implementaria uma Fila FIFO utilizando exclusivamente duas Pilhas LIFO como memória interna?"*

### A Intuição Matemática da Inversão Dupla:
- Se você empilhar elementos em uma pilha: a ordem fica **invertida**.
- Se você desempilhar esses elementos e jogá-los em uma segunda pilha: a ordem **se inverte novamente**!
- **Duas inversões consecutivas restauram a ordem original FIFO!**

```
Entrada: 1, 2, 3
Pilha Entrada (Push):   [1, 2, 3]  (3 está no topo)
Transferência para Saída:
                        pop(3) -> push(3)
                        pop(2) -> push(2)
                        pop(1) -> push(1)
Pilha Saída (Pop):      [3, 2, 1]  (1 está no topo! Pronto para sair em O(1)!)
```

---

## Código: Fila com Duas Pilhas (`MyQueue`)

```python
class FilaComDuasPilhas:
    def __init__(self):
        self._pilha_entrada = []
        self._pilha_saida = []

    def push(self, x: int) -> None:
        self._pilha_entrada.append(x)  # Enqueue em O(1)

    def pop(self) -> int:
        self._preparar_saida()
        return self._pilha_saida.pop() # Dequeue

    def peek(self) -> int:
        self._preparar_saida()
        return self._pilha_saida[-1]   # Front

    def _preparar_saida(self) -> None:
        # Só transfere se a pilha de saída estiver completamente esgotada!
        if not self._pilha_saida:
            while self._pilha_entrada:
                self._pilha_saida.append(self._pilha_entrada.pop())

    def empty(self) -> bool:
        return len(self._pilha_entrada) == 0 and len(self._pilha_saida) == 0
```

---

## Análise de Custo Amortizado: Por que é $O(1)$?

À primeira vista, o método `_preparar_saida()` executa um `while` que parece custar $O(N)$. Por que dizemos que o custo é **$O(1)$ amortizado**?

### Método do Potencial / Análise Contábil:
- Cada elemento inserido na fila passa por exatamente:
  1. **1 operação de push** na `pilha_entrada`.
  2. **1 operação de pop** da `pilha_entrada`.
  3. **1 operação de push** na `pilha_saida`.
  4. **1 operação de pop** da `pilha_saida`.
- Cada elemento é manipulado no máximo **4 vezes em toda a sua vida útil na estrutura**.
- Distribuindo o custo total de $4N$ operações ao longo de uma sequência de $N$ inserções e remoções, o custo médio por operação é rigorosamente:

$$\frac{4N}{N} = 4 = O(1) \text{ amortizado}$$

---

Est. Lineares: Filas e Deques
## Tabela Comparativa de Abordagens

---

## Comparativo Estrutural: Qual Escolher?

| Critério | Fila Circular (Array) | Fila Encadeada (Nodes) | `collections.deque` | `list` Nativa com `pop(0)` |
|---|:---:|:---:|:---:|:---:|
| **Tempo de Enqueue** | **$O(1)$** | **$O(1)$** | **$O(1)$ estrito** | $O(1)$ amortizado |
| **Tempo de Dequeue** | **$O(1)$** | **$O(1)$** | **$O(1)$ estrito** | :x: **$O(N)$ catastrófico** |
| **Localidade de Cache** | Excelente (contíguo) | Baixa (ponteiros dispersos) | Muito Alta (blocos de 64) | Alta (mas destruída no shift) |
| **Limite de Memória** | Fixo (ou redimensionável) | Dinâmico (sob demanda) | Dinâmico em blocos | Dinâmico em array |
| **Overhead por Item** | Zero bytes adicionais | Alto (guarda nó e ponteiro) | Baixíssimo | Mínimo |
| **Recomendação de Uso** | Sistemas embarcados / buffers | Didática / TADs conceituais | **Padrão de produção em Python** | **Nunca usar para filas!** |

---

Est. Lineares: Filas e Deques
## Referência Avançada: Tipagem e Concorrência

---

## 🔍 Para ir além: Fila Genérica com `Generic[T]`

Para projetos corporativos que exigem verificação estática com `mypy` e autocompletion rigoroso nas IDEs:

```python
from typing import Generic, TypeVar, Optional

T = TypeVar('T')

class FilaGenerica(Generic[T]):
    def __init__(self) -> None:
        self._elementos: list[T] = []

    def enqueue(self, item: T) -> None:
        self._elementos.append(item)

    def dequeue(self) -> T:
        if self.is_empty():
            raise IndexError("Queue Underflow!")
        return self._elementos.pop(0)  # Ou implementar com buffer circular

    def is_empty(self) -> bool:
        return len(self._elementos) == 0
```

---

## 🧵 Filas em Ambientes Concorrentes: `queue.Queue`

Em aplicações web multi-threaded e microsserviços onde múltiplas threads de execução consomem e produzem dados simultaneamente, `collections.deque` não é sincronizado para concorrência pesada.

O módulo `queue` do Python oferece estruturas **Thread-Safe** com travas de exclusão mútua (*Mutex Locks*):

```python
import queue

# Fila FIFO segura para múltiplas threads:
q = queue.Queue(maxsize=10)

q.put("Tarefa 1")     # Bloqueia se a fila estiver cheia
item = q.get()        # Bloqueia se a fila estiver vazia!
q.task_done()         # Notifica conclusão da tarefa
```

- **Quando usar:** Aplicações com `threading`, pools de conexões e sistemas distribuídos.

---

Est. Lineares: Filas e Deques
## Resumo dos Pontos-Chave

---

## Resumo dos Pontos-Chave :bulb:

1. **FIFO é a Lei:** O primeiro que entra é o primeiro que sai. Inserções ocorrem no **Fim** (*Rear*) e remoções no **Início** (*Front*).
2. **Fuja do `list.pop(0)`:** Remover o primeiro elemento de uma lista em Python custa **$O(N)$**, degradando o sistema com deslocamentos desnecessários de memória.
3. **Fila Circular:** Utiliza aritmética modular `(i + 1) % capacidade` para garantir $O(1)$ estrito em arrays sem mover memória.
4. **Deques são Versáteis:** Permitem inserção e remoção em $O(1)$ em ambas as pontas, unificando os conceitos de Pilha e Fila.
5. **Padrão em Python:** Use `collections.deque` para desempenho máximo em desafios e projetos profissionais.
6. **Aplicações Orgânicas:** Modelagem de simulação de filas reais (bancos e call centers) e escalonamento de sistemas operacionais (Round-Robin).

---

# Obrigado! :metal:

---

## Eduardo Cruz Araujo

- E-mail: [eduardo.araujo@cps.sp.gov.br](mailto:eduardo.araujo@cps.sp.gov.br)
- LinkedIn: [edcaraujo](https://www.linkedin.com/in/edcaraujo/)
- GitHub: [edcaraujo](https://github.com/edcaraujo)
