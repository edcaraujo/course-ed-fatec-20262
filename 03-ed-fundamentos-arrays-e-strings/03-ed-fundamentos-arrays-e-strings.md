---
marp: true

author: "Eduardo Cruz Araujo"
title: "Estruturas de Dados"
description: "Disciplina de Estruturas de Dados - Fundamentos: Arrays e Strings."

theme: "default"
class: "invert"

footer: "Eduardo Cruz Araujo | Fatec | 2026.2 | Estruturas de Dados | Fundamentos: Arrays e Strings"

paginate: "true"

---

# Estrutura de Dados :mortar_board:
## Fundamentos: Arrays e Strings

---

Fundamentos: Arrays e Strings
## Arrays e a Memória do Computador

---

## O que é um Array (Vetor)?

Um **Array** (vetor) é a estrutura de dados mais elementar e fundamental da Ciência da Computação.

- **Definição:** Coleção sequencial de elementos do mesmo tipo de dado, armazenados em posições **contíguas** (vizinhas e ininterruptas) na memória física (RAM).
- **Acesso Direto (Indexação):** Permite acessar qualquer elemento instantaneamente através de um índice numérico em tempo constante **$O(1)$**.

```
Índice:      0       1       2       3       4
          +-------+-------+-------+-------+-------+
Array:    |  42   |  17   |  89   |  05   |  63   |
          +-------+-------+-------+-------+-------+
Memória:  0x1000  0x1004  0x1008  0x100C  0x1010  (supondo inteiros de 4 bytes)
```

---

## Como a RAM Calcula o Endereço em $O(1)$?

Por estarem em posições contíguas, o processador não precisa "procurar" onde está o item `arr[i]`. Ele calcula a posição com uma **fórmula matemática direta**:

$$\text{Endereço}(arr[i]) = \text{Endereço Base} + (i \times \text{Tamanho do Tipo em Bytes})$$

### Exemplo:
Se o array começa no endereço base `0x1000` e cada inteiro ocupa `4 bytes`:
- `arr[0]` $\rightarrow 0x1000 + (0 \times 4) = 0x1000$
- `arr[1]` $\rightarrow 0x1000 + (1 \times 4) = 0x1004$
- `arr[3]` $\rightarrow 0x1000 + (3 \times 4) = 0x100C$

> :bulb: Como a fórmula realiza apenas $1$ multiplicação e $1$ soma aritmética na CPU, a indexação `arr[i]` é estritamente **$O(1)$**.

---

## Arrays Estáticos vs Arrays Dinâmicos

| Característica | Array Estático (ex: C, Java primitivo) | Array Dinâmico (ex: `list` em Python, `vector` em C++) |
|---|---|---|
| **Tamanho** | Fixo na criação (não pode crescer) | Expansível automaticamente em tempo de execução |
| **Alocação** | Memória estática contígua | Bloco com capacidade extra (*over-allocation*) |
| **Inserção no Fim** | Não permite além do limite fixo | $O(1)$ amortizado (dobra de tamanho quando enche) |
| **Sobrecarga de Memória** | Mínima (exatamente $N$) | Moderada (capacidade $\ge N$) |

---

## O Custo das Operações em Arrays

| Operação | Complexidade | Por que esse custo? |
|---|---|---|
| **Acesso por Índice** (`arr[i]`) | $O(1)$ | Cálculo aritmético direto de endereço de memória. |
| **Atualização por Índice** (`arr[i] = x`) | $O(1)$ | Sobrescreve diretamente o byte calculado. |
| **Busca Linear por Valor** (`x in arr`) | $O(N)$ | Percorre elemento por elemento até encontrar ou terminar. |
| **Inserção no Final** (`arr.append(x)`) | $O(1)$ amort. | Grava no próximo slot livre do buffer pré-alocado. |
| **Remoção no Final** (`arr.pop()`) | $O(1)$ | Decrementa o ponteiro de tamanho lógico. |
| **Inserção no Início/Meio** (`arr.insert(0, x)`) | **$O(N)$** | **Obrigatório deslocar (*shift*)** todos os itens à direita! |
| **Remoção no Início/Meio** (`arr.pop(0)`) | **$O(N)$** | **Obrigatório deslocar (*shift*)** todos os itens à esquerda! |

---

## O Problema do Deslocamento (*Shifting*)

Ao inserir `99` no índice `1` de um array de $5$ elementos:

```
Antes:     [ 10,  20,  30,  40,  50 ]
Passo 1:   [ 10,  20,  30,  40,  >> ,  50 ]   (move 50 para índice 5)
Passo 2:   [ 10,  20,  30,  >> ,  40,  50 ]   (move 40 para índice 4)
Passo 3:   [ 10,  20,  >> ,  30,  40,  50 ]   (move 30 para índice 3)
Passo 4:   [ 10,  >> ,  20,  30,  40,  50 ]   (move 20 para índice 2)
Passo 5:   [ 10,  99,  20,  30,  40,  50 ]   (insere 99 no índice 1)
```

> ⚠️ Inserir ou remover no início de um array com $1.000.000$ de elementos exige **$1.000.000$ de cópias de memória** ($O(N)$). Para inserções eficientes no início, usamos **Listas Encadeadas** ou **Deques** (`collections.deque`).

---

Fundamentos: Arrays e Strings
## Strings e a Imutabilidade na Memória

---

## O que é uma String por baixo dos panos?

- Uma **String** é conceitualmente um **array contíguo de caracteres** (bytes codificados em ASCII, UTF-8 ou UTF-32).
- Em linguagens como **Python**, **Java** e **JavaScript**, **strings são IMUTÁVEIS** (*immutable*).
- Uma vez criada uma string na memória, seu conteúdo nunca pode ser alterado diretamente.

```python
s = "fatec"
# s[0] = "F"  # -> TypeError: 'str' object does not support item assignment!
```

Para modificar qualquer caractere, o interpretador cria **uma nova string inteira** na memória com a alteração desejada:

```python
s = "F" + s[1:]  # Aloca uma nova string "Fatec" em outro endereço de RAM
```

---

## A Grande Armadilha: Concatenação de Strings em Laços

```python
# CÓDIGO INEFICIENTE: O(N^2)
def build_string_bad(words):
    result = ""
    for w in words:
        result = result + w  # A cada volta, copia TODOS os caracteres anteriores!
    return result
```

Se temos $N$ caracteres no total:
- Cópia $1$: $1$ caractere
- Cópia $2$: $2$ caracteres
- ...
- Cópia $N$: $N$ caracteres
- **Total de operações:** $1 + 2 + 3 + \dots + N = \frac{N(N+1)}{2} \approx O(N^2)$!

---

## A Solução Correta: `str.join()` em $O(N)$

```python
# CÓDIGO EFICIENTE: O(N)
def build_string_good(words):
    return "".join(words)
```

### Por que `join()` é tão rápido?
1. O Python primeiro percorre a lista de strings para calcular a **soma exata do tamanho** de todas as palavras.
2. Aloca **um único bloco de memória** contíguo do tamanho exato necessário.
3. Copia cada palavra diretamente para sua posição definitiva dentro do bloco em uma única passagem linear $O(N)$.

---

## Fatiamento (*Slicing*) em Listas e Strings

Em Python, a operação `seq[start:end]` cria uma **cópia rasa (*shallow copy*)** da fatia:

```python
s = "EstruturaDeDados"
fatia = s[0:9]  # "Estrutura" (cópia de 9 caracteres)
```

- **Complexidade de Tempo:** $O(K)$, onde $K = \text{end} - \text{start}$ é o tamanho da fatia.
- **Complexidade de Espaço:** $O(K)$ de memória auxiliar para a nova sequência.
- :warning: Fazer fatiamentos dentro de laços (`for i in range(n): process(s[i:])`) pode transformar um algoritmo $O(N)$ em **$O(N^2)$**!

---

Fundamentos: Arrays e Strings
## Técnica: Dois Ponteiros (*Two Pointers*)

---

## 🎯 Desafio Prático: LeetCode #167
### Two Sum II - Input Array Is Sorted (Médio/Fácil)

> **Enunciado:** Dado um array de inteiros `numbers` indexado em 1 que **já está ordenado em ordem não-decrescente**, encontre dois números que somem um valor `target` específico. Retorne os índices dos dois números.

**Exemplo:**
- `numbers = [2, 7, 11, 15]`, `target = 9` $\longrightarrow$ Saída: `[1, 2]` ($2 + 7 = 9$)

**Reflexão para a Turma:**
- A força bruta com dois laços aninhados custaria $O(N^2)$.
- Uma tabela hash resolveria em $O(N)$ tempo, mas gastaria $O(N)$ de memória auxiliar.
- **Como podemos aproveitar que o array já vem ordenado para resolver em $O(N)$ tempo e $O(1)$ espaço?**

---

## A Técnica: Ponteiros Opostos (Convergentes)

Iniciamos um ponteiro no menor valor (`left = 0`) e outro no maior valor (`right = N - 1`):
- Se `nums[left] + nums[right] == target` $\rightarrow$ Encontramos a resposta!
- Se `nums[left] + nums[right] < target` $\rightarrow$ Precisamos de uma soma maior, logo incrementamos `left += 1`.
- Se `nums[left] + nums[right] > target` $\rightarrow$ Precisamos de uma soma menor, logo decrementamos `right -= 1`.

```python
def two_sum_sorted(nums, target):
    left = 0
    right = len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return (left, right)
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return None
```
- **Tempo:** $O(N)$ | **Espaço:** $O(1)$

---

## 🎯 Desafio Prático: LeetCode #26
### Remove Duplicates from Sorted Array (Fácil)

> **Enunciado:** Dado um array de inteiros ordenado `nums`, remova os duplicados **in-place** de modo que cada elemento único apareça apenas uma vez. Retorne o número de elementos únicos. O array modificado deve conter os elementos únicos no início.

**Exemplo:**
- `nums = [1, 1, 2, 2, 3]` $\longrightarrow$ Retorna `3`, com `nums = [1, 2, 3, _, _]`

**Reflexão para a Turma:**
- Usar `nums.pop(i)` a cada elemento duplicado causaria deslocamentos de memória repetidos, resultando em $O(N^2)$!
- Criar um `set` ou nova lista gastaria $O(N)$ de memória extra.
- **Como sobrescrever os valores no próprio array em uma única passagem?**

---

## A Técnica: Ponteiros Rápido e Lento (*Fast & Slow Pointer*)

Mantemos o ponteiro `slow` marcando a última posição do elemento único confirmado, enquanto `fast` varre a lista:

```python
def remove_duplicates(nums):
    if not nums:
        return 0
        
    slow = 0  # Índice do último elemento único confirmado
    
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]  # Grava o novo elemento único
            
    return slow + 1
```

```
nums = [ 1,  1,  2,  2,  3 ]
         s   f                (nums[f] == nums[s] -> fast avança)
         s       f            (nums[f] != nums[s] -> slow++, nums[1] = 2)
             s       f        (nums[f] == nums[s] -> fast avança)
             s           f    (nums[f] != nums[s] -> slow++, nums[2] = 3)
```
- **Tempo:** $O(N)$ | **Espaço:** $O(1)$

---

Fundamentos: Arrays e Strings
## Técnica: Janela Deslizante (*Sliding Window*)

---

## 🪟 Desafio Prático: LeetCode #643
### Maximum Average Subarray I (Fácil)

> **Enunciado:** Dado um array `nums` composto por `n` inteiros e um inteiro `k`, encontre um subarray contíguo cujo comprimento seja igual a `k` que tenha a maior média de valor e retorne esse valor.

**Exemplo:**
- `nums = [1, 12, -5, -6, 50, 3]`, `k = 4`
- Fatias de tamanho 4:
  - `[1, 12, -5, -6]` $\rightarrow$ Soma = $2$
  - `[12, -5, -6, 50]` $\rightarrow$ Soma = $51$ ⭐
  - `[-5, -6, 50, 3]` $\rightarrow$ Soma = $42$
- Maior média: $51 / 4 = 12.75$

**Reflexão para a Turma:**
- Calcular a soma de cada fatia de tamanho $K$ do zero custa $O(N \cdot K)$.
- **Como transitar entre fatias consecutivas em tempo $O(1)$?**

---

## A Técnica: Janela Deslizante de Tamanho Fixo

Ao mover a janela $1$ posição para a direita:
1. **Subtraímos** o elemento que acabou de sair pela esquerda (`nums[left]`).
2. **Somamos** o novo elemento que acabou de entrar pela direita (`nums[right]`).

```python
def find_max_average(nums, k):
    window_sum = sum(nums[:k])
    max_sum = window_sum
    
    for right in range(k, len(nums)):
        left = right - k
        window_sum += nums[right] - nums[left]  # + novo, - antigo em O(1)
        if window_sum > max_sum:
            max_sum = window_sum
            
    return max_sum / k
```

```
Janela 0: [ 1 , 12 , -5 , -6 ] , 50 , 3   -> Soma = 2
Janela 1:   1 , [ 12 , -5 , -6 , 50 ] , 3 -> Soma = 2 - 1 + 50 = 51 ⭐
Janela 2:   1 , 12 , [ -5 , -6 , 50 , 3 ] -> Soma = 51 - 12 + 3 = 42
```
- **Tempo:** $O(N)$ | **Espaço:** $O(1)$

---

## 🪟 Desafio Prático: LeetCode #209
### Minimum Size Subarray Sum (Médio)

> **Enunciado:** Dado um array de inteiros positivos `nums` e um inteiro positivo `target`, retorne o **comprimento mínimo** de um subarray contíguo cuja soma seja maior ou igual a `target`. Se não houver tal subarray, retorne `0`.

**Exemplo:**
- `target = 7`, `nums = [2, 3, 1, 2, 4, 3]`
- Subarrays com soma $\ge 7$: `[2, 3, 1, 2]` (tam 4), `[4, 3]` (tam 2) ⭐ $\longrightarrow$ Resposta: `2`.

**Reflexão para a Turma:**
- Aqui o tamanho da janela não é fixo!
- **Como expandir e contrair a janela de forma coordenada sem gerar $O(N^2)$?**

---

## A Técnica: Janela Deslizante Dinâmica (Expand & Shrink)

- **Expandir:** Avançamos o ponteiro `right` adicionando elementos até que `current_sum >= target`.
- **Contrair:** Enquanto a condição for verdadeira, tentamos encolher a janela avançando `left` para minimizar o comprimento.

```python
def min_subarray_len(target, nums):
    left = 0
    current_sum = 0
    min_len = float('inf')
    
    for right in range(len(nums)):
        current_sum += nums[right]  # Expande
        
        while current_sum >= target:  # Encolhe
            min_len = min(min_len, right - left + 1)
            current_sum -= nums[left]
            left += 1
            
    return min_len if min_len != float('inf') else 0
```
- **Tempo:** $O(N)$ (Análise Amortizada: `left` e `right` avançam no máximo $N$ vezes cada) | **Espaço:** $O(1)$

---

Fundamentos: Arrays e Strings
## Técnica: Vetor de Soma de Prefixos (*Prefix Sum*)

---

## ⚡ Desafio Prático: LeetCode #303
### Range Sum Query - Immutable (Fácil)

> **Enunciado:** Dado um array de inteiros `nums`, responda a **múltiplas consultas de soma** do intervalo $[L, R]$, ou seja, calcule a soma dos elementos de `nums[L]` até `nums[R]` inclusive.

**Cenário Real:**
- Suponha um array de $N = 100.000$ elementos e $Q = 100.000$ consultas.
- Se a cada consulta fizermos um laço de $L$ até $R$, o custo total será $O(Q \cdot N) = 10^{10}$ operações $\rightarrow$ **Time Limit Exceeded (TLE)**!

**Reflexão para a Turma:**
- Podemos gastar um tempo inicial pré-processando o array para que **cada consulta futura seja respondida instantaneamente em $O(1)$**?

---

## A Técnica: Vetor de Prefix Sum

Construímos um array auxiliar $P$ onde cada posição $i$ guarda a soma acumulada de todos os elementos desde o início até o índice $i$:

$$P[i] = P[i-1] + \text{nums}[i]$$

### A Dedução da Consulta em $O(1)$:
$$\text{Soma}(L, R) = \text{Tudo até } R - \text{Tudo antes de } L = P[R] - P[L - 1] \quad (\text{se } L > 0)$$
$$\text{Soma}(0, R) = P[R] \quad (\text{se } L = 0)$$

```
nums:     [  3,   2,   4,   5,   1,   6 ]
Prefix P: [  3,   5,   9,  14,  15,  21 ]

Consulta Soma(1, 4): P[4] - P[0] = 15 - 3 = 12
(Conferência: 2 + 4 + 5 + 1 = 12)
```

---

## Implementação Completa do Prefix Sum

```python
class NumArray:
    def __init__(self, nums: list[int]):
        self.prefix = [0] * len(nums)
        if nums:
            self.prefix[0] = nums[0]
            for i in range(1, len(nums)):
                self.prefix[i] = self.prefix[i - 1] + nums[i]
                
    def sumRange(self, left: int, right: int) -> int:
        if left == 0:
            return self.prefix[right]
        return self.prefix[right] - self.prefix[left - 1]
```

- **Tempo de Construção:** $O(N)$ (apenas uma vez na inicialização).
- **Tempo por Consulta:** **$O(1)$**.
- **Tempo Total ($Q$ consultas):** $O(N + Q)$ (Passa com folga em qualquer juiz online!).

---

Fundamentos: Arrays e Strings
## Verificação de Palíndromos e Anagramas

---

## 🔤 Desafio Prático: LeetCode #125
### Valid Palindrome (Fácil)

> **Enunciado:** Uma frase é um **palíndromo** se, após converter todas as letras maiúsculas em minúsculas e remover todos os caracteres não-alfanuméricos, ela for lida da mesma forma para frente e para trás.

**Exemplo:**
- `s = "A man, a plan, a canal: Panama"` $\longrightarrow$ `True` (após limpeza: `"amanaplanacanalpanama"`)
- `s = "race a car"` $\longrightarrow$ `False`

**Reflexão para a Turma:**
- Fazer `clean_s = ...` cria uma nova string na memória ($O(N)$ espaço).
- **Como verificar diretamente na string original usando Dois Ponteiros sem gastar memória extra ($O(1)$ espaço)?**

---

## A Técnica: Dois Ponteiros com Limpeza *In-Place*

Dois ponteiros convergentes que pulam caracteres inválidos (`not s[i].isalnum()`):

```python
def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    
    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
            
        if s[left].lower() != s[right].lower():
            return False
            
        left += 1
        right -= 1
        
    return True
```
- **Tempo:** $O(N)$ | **Espaço:** **$O(1)$**

---

## 🔤 Desafio Prático: LeetCode #242
### Valid Anagram (Fácil)

> **Enunciado:** Dadas duas strings `s` e `t`, retorne `true` se `t` for um **anagrama** de `s`, e `false` caso contrário. Um anagrama é formado reorganizando as letras de outra palavra usando todas as letras originais exatamente uma vez.

**Exemplo:**
- `s = "anagram"`, `t = "nagaram"` $\longrightarrow$ `True`
- `s = "rat"`, `t = "car"` $\longrightarrow$ `False`

**Reflexão para a Turma:**
- `sorted(s) == sorted(t)` funciona, mas tem custo $O(N \log N)$ em tempo e $O(N)$ em memória.
- **Como validar em tempo estritamente linear $O(N)$?**

---

## A Técnica: Vetor/Hash de Contagem de Frequência

Contamos as ocorrências de cada caractere na primeira string ($+1$) e decrementamos na segunda string ($-1$):

```python
def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
        
    counts = {}
    for ch in s:
        counts[ch] = counts.get(ch, 0) + 1
        
    for ch in t:
        if ch not in counts or counts[ch] == 0:
            return False
        counts[ch] -= 1
        
    return True
```
- **Tempo:** **$O(N)$** | **Espaço:** $O(1)$ (alfabeto limitado a 26 caracteres minúsculos).

---

Fundamentos: Arrays e Strings
## Operações Nativas e Idiomatismos em Python

---

## Guia de Complexidade de Métodos em Python

### Operações em Listas (`list`)
| Código | Nome | Complexidade |
|---|---|---|
| `arr[i]` | Acesso indexado | $O(1)$ |
| `arr.append(x)` | Inserção no fim | $O(1)$ amortizado |
| `arr.pop()` | Remoção do fim | $O(1)$ |
| `arr.insert(0, x)` | Inserção no início | **$O(N)$** :warning: |
| `arr.pop(0)` | Remoção no início | **$O(N)$** :warning: |
| `arr[a:b]` | Fatiamento (*slice*) | $O(b - a)$ |
| `arr.reverse()` / `arr.sort()` | Inversão / Ordenação | $O(N)$ / $O(N \log N)$ |

### Operações em Strings (`str`)
| Código | Nome | Complexidade |
|---|---|---|
| `s[i]` | Acesso a caractere | $O(1)$ |
| `s + t` | Concatenação | $O(\text{len}(s) + \text{len}(t))$ |
| `"".join(lista)` | Junção de lista de strings | **$O(N)$ total** :rocket: |
| `s.find(sub)` / `sub in s` | Busca de substring | $O(N + M)$ médio |
| `s.replace(a, b)` | Substituição de substring | $O(N)$ |

---

Fundamentos: Arrays e Strings
## Trilha de Exercícios Práticos (LeetCode)

---

## Problemas Recomendados por Técnica

| Técnica | Problema no LeetCode | Nível | Foco Principal |
|---|---|---|---|
| **Two Pointers** | [167. Two Sum II - Sorted Array](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/) | Médio | Ponteiros convergentes em $O(N)$ tempo e $O(1)$ espaço |
| **Two Pointers** | [344. Reverse String](https://leetcode.com/problems/reverse-string/) | Fácil | Inversão *in-place* |
| **Two Pointers** | [26. Remove Duplicates](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) | Fácil | Ponteiro Rápido & Lento (*in-place*) |
| **Two Pointers** | [283. Move Zeroes](https://leetcode.com/problems/move-zeroes/) | Fácil | Particionamento com dois ponteiros no mesmo sentido |
| **Sliding Window** | [643. Maximum Average Subarray I](https://leetcode.com/problems/maximum-average-subarray-i/) | Fácil | Janela Fixa $K$ com atualização $O(1)$ |
| **Sliding Window** | [1456. Max Vowels in Substring](https://leetcode.com/problems/maximum-number-of-vowels-in-a-substring-of-given-length/) | Médio | Janela Fixa com conjunto (`set`) |
| **Sliding Window** | [209. Min Size Subarray Sum](https://leetcode.com/problems/minimum-size-subarray-sum/) | Médio | Janela Dinâmica (Expand & Shrink) |
| **Sliding Window** | [3. Longest Substring Without Repeating](https://leetcode.com/problems/longest-substring-without-repeating-characters/) | Médio | Janela Dinâmica + Dicionário |
| **Prefix Sum** | [303. Range Sum Query](https://leetcode.com/problems/range-sum-query-immutable/) | Fácil | Consulta de intervalo em $O(1)$ via $P[R] - P[L-1]$ |
| **Prefix Sum** | [724. Find Pivot Index](https://leetcode.com/problems/find-pivot-index/) | Fácil | Ponto de equilíbrio de somas |
| **Palíndromo** | [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) | Fácil | Dois ponteiros com limpeza *in-place* |
| **Anagrama** | [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/) | Fácil | Histograma de frequências $O(N)$ |
| **Anagrama** | [49. Group Anagrams](https://leetcode.com/problems/group-anagrams/) | Médio | Agrupamento com chaves de frequência |

---

Fundamentos: Arrays e Strings
## Resumo dos Pontos-Chave

---

## Resumo dos Pontos-Chave :bulb:

1. **Cuidado com o fatiamento:** `s[a:b]` gera uma nova cópia em memória ($O(b - a)$).
2. **Evite `+` em strings dentro de laços:** Use listas e finalize com `"".join()` para garantir $O(N)$.
3. **Evite `insert(0)` e `pop(0)` em listas:** O deslocamento (*shift*) custa $O(N)$. Use `collections.deque` para $O(1)$.
4. **`item in list` é $O(N)$:** Para buscas instantâneas $O(1)$, converta para `set` ou `dict`.
5. **Two Pointers e Sliding Window** transformam loops aninhados $O(N^2)$ em passagens lineares $O(N)$.
6. **Prefix Sum** reduz o custo de consultas acumuladas repetidas para tempo constante $O(1)$.

---

# Obrigado! :metal:

---

## Eduardo Cruz Araujo

- E-mail: [eduardo.araujo@cps.sp.gov.br](mailto:eduardo.araujo@cps.sp.gov.br)
- LinkedIn: [edcaraujo](https://www.linkedin.com/in/edcaraujo/)
- GitHub: [edcaraujo](https://github.com/edcaraujo)
