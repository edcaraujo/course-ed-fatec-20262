# 📖 Gabarito e Resoluções: Big-O e Análise de Complexidade (Parte 1)

**Disciplina:** Estrutura de Dados  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS) — Fatec Ribeirão Preto  
**Professor:** Eduardo Cruz Araujo  
**Tópico:** Gabarito Comentado — Fundamentos de Análise Assintótica

> 👈 **Enunciados:** Para consultar a lista original sem as respostas, acesse: [**`exercicios-part-1.md`**](exercicios-part-1.md).

---

## 📝 Resoluções dos Exercícios de Fixação

---

### Exercício 01: Média entre Extremos

#### Código:
```python
def average_ends(nums: list[int]) -> float:
    if not nums:
        return 0.0
    
    first = nums[0]
    last = nums[-1]
    total = first + last
    result = total / 2
    return result
```

#### Respostas:
1. **Complexidade de Tempo:** $O(1)$ (Tempo Constante).
   - **Explicação:** O acesso por índice (`nums[0]` e `nums[-1]`) e as operações aritméticas são executados em tempo constante na CPU via endereço contíguo de memória, independentemente do tamanho da lista $N$.
2. **Complexidade de Espaço Auxiliar:** $O(1)$ (Espaço Constante).
   - **Explicação:** A função utiliza apenas variáveis escalares simples (`first`, `last`, `total`, `result`), sem alocar estruturas proporcionais a $N$.

---

### Exercício 02: Contagem de Números Pares

#### Código:
```python
def count_evens(nums: list[int]) -> int:
    total_evens = 0
    for num in nums:
        if num % 2 == 0:
            total_evens += 1
    return total_evens
```

#### Respostas:
1. **Complexidade de Tempo:** $O(N)$ (Tempo Linear).
   - **Explicação:** O laço `for` itera sobre todos os $N$ elementos da lista. Em cada iteração, realiza operações de tempo constante ($O(1)$). Portanto: $N \times O(1) = O(N)$.
2. **Complexidade de Espaço Auxiliar:** $O(1)$ (Espaço Constante).
   - **Explicação:** Apenas a variável contadora `total_evens` e a variável de iteração `num` são alocadas.

---

### Exercício 03: Varredura com Passo Fixo

#### Código:
```python
def print_every_third(nums: list[int]) -> None:
    n = len(nums)
    for i in range(0, n, 3):
        print(nums[i])
```

#### Respostas:
1. **Complexidade de Tempo:** $O(N)$ (Tempo Linear).
   - **Explicação:** O laço executa $\lceil N / 3 \rceil$ iterações. Pela **Regra 1 (Descarte de Constantes)**, fatores multiplicativos são ignorados na ordem assintótica:
     $$O\left(\frac{N}{3}\right) = O\left(\frac{1}{3} \cdot N\right) \longrightarrow O(N)$$
2. **Complexidade de Espaço Auxiliar:** $O(1)$ (Espaço Constante).
   - **Explicação:** Nenhuma estrutura de dados adicional é criada.

---

### Exercício 04: Processamento Sequencial em Duas Etapas

#### Código:
```python
def count_above_average(nums: list[int]) -> int:
    n = len(nums)
    if n == 0:
        return 0
    
    # Etapa 1: Soma total
    total = 0
    for x in nums:
        total += x
    average = total / n
    
    # Etapa 2: Contagem
    count = 0
    for x in nums:
        if x > average:
            count += 1
            
    return count
```

#### Respostas:
1. **Complexidade de Tempo:** $O(N)$ (Tempo Linear).
   - **Explicação:** A primeira etapa executa $N$ operações e a segunda etapa executa $N$ operações. Pela **Regra 4 (Adição)** e **Regra 1 (Descarte de Constantes)**:
     $$\text{Tempo Total} = O(N) + O(N) = O(2N) \longrightarrow O(N)$$
2. **Complexidade de Espaço Auxiliar:** $O(1)$ (Espaço Constante).
   - **Explicação:** Apenas variáveis numéricas (`n`, `total`, `average`, `count`) são mantidas na memória.

---

### Exercício 05: Exibição de Duas Listas Independentes

#### Código:
```python
def display_profiles(list_a: list[str], list_b: list[str]) -> None:
    for name in list_a:
        print(f"Usuário: {name}")
        
    for name in list_b:
        print(f"Administrador: {name}")
```

#### Respostas:
1. **Complexidade de Tempo:** $O(A + B)$, onde $A = \text{len(list\_a)}$ e $B = \text{len(list\_b)}$.
   - **Explicação:** Pela **Regra 3 (Entradas Independentes)**, como as listas possuem tamanhos distintos e os laços são sequenciais, somamos os custos individuais: $O(A) + O(B) = O(A + B)$.
2. **Complexidade de Espaço Auxiliar:** $O(1)$ (Espaço Constante).
   - **Explicação:** Nenhuma memória proporcional a $A$ ou $B$ é alocada.

---

### Exercício 06: Divisões Sucessivas

#### Código:
```python
def count_halvings(n: int) -> int:
    steps = 0
    current = n
    while current > 1:
        current = current // 2
        steps += 1
    return steps
```

#### Respostas:
1. **Complexidade de Tempo:** $O(\log N)$ (Tempo Logarítmico na base 2).
   - **Explicação:** A cada iteração a variável `current` é dividida por 2 ($n, \frac{n}{2}, \frac{n}{4}, \dots, 1$). O número total de divisões necessárias para chegar a 1 é dado por $\lfloor \log_2(n) \rfloor$.
2. **Complexidade de Espaço Auxiliar:** $O(1)$ (Espaço Constante).
   - **Explicação:** Usa apenas variáveis escalares inteiras (`steps`, `current`).

---

### Exercício 07: Combinação de Todos os Pares

#### Código:
```python
def print_all_pairs(nums: list[int]) -> None:
    n = len(nums)
    for i in range(n):
        for j in range(n):
            print(f"Par: ({nums[i]}, {nums[j]})")
```

#### Respostas:
1. **Complexidade de Tempo:** $O(N^2)$ (Tempo Quadrático).
   - **Explicação:** O laço externo executa $N$ vezes. Para cada iteração do laço externo, o laço interno executa $N$ vezes completas. Pela **Regra 4 (Multiplicação)**: $N \times N = O(N^2)$.
2. **Complexidade de Espaço Auxiliar:** $O(1)$ (Espaço Constante).
   - **Explicação:** Utiliza apenas as variáveis de índice `i` e `j`.

---

### Exercício 08: Cruzamento de Duas Listas

#### Código:
```python
def generate_catalog(colors: list[str], sizes: list[str]) -> list[str]:
    catalog = []
    for c in colors:
        for s in sizes:
            item = f"{c} - Tamanho {s}"
            catalog.append(item)
    return catalog
```

#### Respostas:
1. **Complexidade de Tempo:** $O(C \cdot S)$, onde $C = \text{len(colors)}$ e $S = \text{len(sizes)}$.
   - **Explicação:** Para cada um dos $C$ elementos da lista `colors`, o laço interno percorre todos os $S$ elementos da lista `sizes`, resultando em $C \times S$ operações.
2. **Complexidade de Espaço Auxiliar:** $O(C \cdot S)$.
   - **Explicação:** A lista `catalog` gerada armazena exatamente $C \times S$ strings resultantes.

---

### Exercício 09: Busca de Par com Soma Específica

#### Código:
```python
def has_zero_sum_pair(nums: list[int]) -> bool:
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == 0:
                return True
    return False
```

#### Respostas:
1. **Complexidade de Tempo:** $O(N^2)$ no pior caso.
   - **Explicação:** O laço interno executa $(N - 1) + (N - 2) + \dots + 1 = \frac{N(N - 1)}{2} = \frac{N^2 - N}{2}$ comparações. Descartando constantes e termos não-dominantes, o crescimento assintótico é $O(N^2)$.
2. **Complexidade de Espaço Auxiliar:** $O(1)$ (Espaço Constante).
   - **Explicação:** Nenhuma memória adicional é alocada.

---

### Exercício 10: Comparação de Estratégias de Inversão

#### Códigos:
- **Implementação A (Cópia):**
  ```python
  def reverse_copy(nums: list[int]) -> list[int]:
      reversed_list = []
      for i in range(len(nums) - 1, -1, -1):
          reversed_list.append(nums[i])
      return reversed_list
  ```
- **Implementação B (In-Place / Dois Ponteiros):**
  ```python
  def reverse_in_place(nums: list[int]) -> list[int]:
      left = 0
      right = len(nums) - 1
      while left < right:
          nums[left], nums[right] = nums[right], nums[left]
          left += 1
          right -= 1
      return nums
  ```

#### Respostas:
1. **Complexidade de Tempo:**
   - **Implementação A:** $O(N)$ no pior caso (uma varredura linear completa).
   - **Implementação B:** $O(N)$ no pior caso ($\lfloor N / 2 \rfloor$ trocas de elementos).
2. **Complexidade de Espaço Auxiliar:**
   - **Implementação A:** $O(N)$ (cria e aloca uma nova lista `reversed_list` de tamanho $N$).
   - **Implementação B:** $O(1)$ (opera *in-place* diretamente na lista original sem alocação extra).

---

## 🚀 Resoluções dos Desafios

---

### Exercício 11: Verificação de Primalidade

#### Código:
```python
def is_prime(n: int) -> bool:
    if n <= 1:
        return False
    
    i = 2
    while i * i <= n:
        if n % i == 0:
            return False
        i += 1
        
    return True
```

#### Respostas:
1. **Complexidade de Tempo:** $O(\sqrt{N})$ (Tempo de Raiz Quadrada).
   - **Explicação:** A condição `i * i <= n` é matematicamente equivalente a $i \le \sqrt{n}$. No pior caso (quando $n$ é primo), a variável $i$ é incrementada de 1 em 1 desde $2$ até atingir $\lfloor \sqrt{n} \rfloor$, executando cerca de $\sqrt{n}$ iterações.
2. **Complexidade de Espaço Auxiliar:** $O(1)$ (Espaço Constante).
   - **Explicação:** Aloca apenas a variável inteira de controle `i`.

---

### Exercício 12: Processamento com Dobra de Passo

#### Código:
```python
def process_matrix_scale(arr: list[int]) -> None:
    n = len(arr)
    for i in range(n):
        j = 1
        while j < n:
            print(arr[i], j)
            j = j * 2
```

#### Respostas:
1. **Complexidade de Tempo:** $O(N \log N)$ (Tempo Linearítmico).
   - **Explicação:** O laço externo `for i in range(n)` executa exatamente $N$ vezes. Para **cada** iteração do laço externo, a variável `j` dobra de valor a cada passo ($1, 2, 4, 8, \dots$), executando $\log_2(N)$ vezes. Pela **Regra 4 (Multiplicação)**:
     $$\text{Tempo Total} = N \times O(\log N) = O(N \log N)$$
2. **Complexidade de Espaço Auxiliar:** $O(1)$ (Espaço Constante).
   - **Explicação:** Nenhuma estrutura auxiliar é alocada na memória.

---

### Exercício 13: Busca de Tripletos

#### Código:
```python
def count_triplets(arr: list[int]) -> int:
    n = len(arr)
    count = 0
    for i in range(n):
        for j in range(n):
            for k in range(n):
                if arr[i] + arr[j] + arr[k] == 0:
                    count += 1
    return count
```

#### Respostas:
1. **Complexidade de Tempo:** $O(N^3)$ (Tempo Cúbico).
   - **Explicação:** Existem 3 laços aninhados independentes, onde cada um itera de $0$ até $N - 1$. Pela **Regra 4 (Multiplicação)**: $N \times N \times N = N^3$ operações no total.
2. **Complexidade de Espaço Auxiliar:** $O(1)$ (Espaço Constante).
   - **Explicação:** Utiliza apenas as variáveis escalares de índice `i`, `j`, `k` e o acumulador `count`.

---

### Exercício 14: Ramificação Recursiva Dupla

#### Código:
```python
def recursive_branch(n: int) -> int:
    if n <= 1:
        return 1
    return recursive_branch(n - 1) + recursive_branch(n - 1)
```

#### Respostas:
1. **Complexidade de Tempo:** $O(2^N)$ (Tempo Exponencial).
   - **Explicação:** Cada chamada gera 2 novas chamadas recursivas com argumento $n - 1$. Isso constrói uma árvore binária de recursão com altura $N$, totalizando $2^0 + 2^1 + \dots + 2^{N-1} = 2^N - 1 \longrightarrow O(2^N)$ chamadas.
2. **Complexidade de Espaço Auxiliar:** $O(N)$ (Espaço Linear na Pilha de Execução).
   - **Explicação:** A execução da recursão ocorre em profundidade (*Depth-First*). O interpretador empilha apenas o caminho do topo até a folha mais profunda antes de desempilhar, ocupando no máximo $N$ frames simultâneos na memória da pilha (*Call Stack*).

---

### Exercício 15: Processamento de Fila com Remoção Frontal

#### Código:
```python
def drain_queue(tasks: list[str]) -> list[str]:
    processed = []
    while len(tasks) > 0:
        current = tasks.pop(0)
        processed.append(current.upper())
    return processed
```

#### Respostas:
1. **Complexidade de Tempo:** $O(N^2)$ (Tempo Quadrático no pior caso).
   - **Explicação:** O laço `while` executa $N$ vezes. Contudo, em uma lista padrão do Python (array dinâmico contíguo), a operação `tasks.pop(0)` remove o primeiro item e precisa **deslocar todos os $K$ itens restantes uma posição para a esquerda**. O total de deslocamentos é $(N - 1) + (N - 2) + \dots + 1 = \frac{N(N - 1)}{2} = O(N^2)$.
2. **Complexidade de Espaço Auxiliar:** $O(N)$ (Espaço Linear).
   - **Explicação:** A lista `processed` armazena todos os $N$ itens processados.

---

### Exercício 16: Análise de Amostragem de Dados

#### Código:
```python
def sample_sum(nums: list[int]) -> int:
    total = 0
    limit = min(len(nums), 100)
    for i in range(limit):
        total += nums[i]
    return total
```

#### Respostas:
1. **Complexidade de Tempo:** $O(1)$ (Tempo Constante no pior caso).
   - **Explicação:** Embora haja um laço `for` iterando sobre elementos da lista, a condição `limit = min(len(nums), 100)` estabelece um **teto fixo e constante** de no máximo $100$ iterações. Mesmo que a lista de entrada tenha $N = 1.000.000$ ou $N = 10^{12}$ elementos, o laço executará rigorosamente no máximo $100$ passos. Como o número de operações **não cresce** quando $N \rightarrow \infty$, o tempo de execução é delimitado superiormente por uma constante ($c \le 100$), sendo classificado estritamente como **$O(1)$**.
2. **Complexidade de Espaço Auxiliar:** $O(1)$ (Espaço Constante).
   - **Explicação:** Apenas as variáveis escalares `total`, `limit` e `i` são alocadas na memória.

---

## 📊 Tabela de Síntese de Todos os Exercícios

| Exercício | Descrição do Algoritmo | Complexidade de Tempo | Complexidade de Espaço | Regra / Conceito Chave |
| :---: | :--- | :---: | :---: | :--- |
| **01** | Média dos Extremos (`nums[0]`, `nums[-1]`) | $O(1)$ | $O(1)$ | Acesso direto a endereço de memória |
| **02** | Contagem de Números Pares | $O(N)$ | $O(1)$ | Varredura linear elementar |
| **03** | Laço com Salto de 3 em 3 | $O(N)$ | $O(1)$ | Regra 1: Descarte de constantes $\frac{N}{3} \rightarrow N$ |
| **04** | Soma e Contagem Acima da Média | $O(N)$ | $O(1)$ | Regra 4: Soma de laços $O(N + N) \rightarrow O(N)$ |
| **05** | Impressão de Duas Listas Distintas | $O(A + B)$ | $O(1)$ | Regra 3: Variáveis diferentes para entradas distintas |
| **06** | Divisões Sucessivas por 2 (`// 2`) | $O(\log N)$ | $O(1)$ | Redução contínua pela metade ($k = \log_2 N$) |
| **07** | Impressão de Todos os Pares | $O(N^2)$ | $O(1)$ | Laços aninhados independentes ($N \times N$) |
| **08** | Produto Cartesiano de Cores e Tamanhos | $O(C \cdot S)$ | $O(C \cdot S)$ | Regra 4: Multiplicação com entradas distintas |
| **09** | Pares Triangulares (`range(i + 1, n)`) | $O(N^2)$ | $O(1)$ | Soma de PA $\frac{N^2 - N}{2} \rightarrow O(N^2)$ |
| **10** | Inversão Cópia vs *In-Place* | Tempo $O(N)$ | A: $O(N)$<br>B: $O(1)$ | *Trade-off* de memória auxiliar *in-place* |
| **11** | Verificação de Primalidade ($i \times i \le n$) | $O(\sqrt{N})$ | $O(1)$ | Laço proporcional à raiz quadrada |
| **12** | Laço Linear + Laço Logarítmico | $O(N \log N)$ | $O(1)$ | Multiplicação $O(N) \times O(\log N)$ |
| **13** | Busca de Tripletos (3 Laços Aninhados) | $O(N^3)$ | $O(1)$ | Multiplicação de 3 dimensões $N \times N \times N$ |
| **14** | Ramificação Recursiva Dupla | $O(2^N)$ | $O(N)$ | Tempo exponencial vs altura da árvore na pilha |
| **15** | Consumo de Fila com `list.pop(0)` | $O(N^2)$ | $O(N)$ | Custo oculto de deslocamento (*shifting*) |
| **16** | Amostragem com Limite Fixo (`min(N, 100)`) | $O(1)$ | $O(1)$ | Pegadinha: laço com teto constante é $O(1)$ |

---

## 💡 Dica para Análise de Algoritmos
Sempre analise o tempo e o espaço de forma separada:
- **Tempo:** Conta quantas **operações de CPU** são feitas em função do tamanho da entrada conforme $N \rightarrow \infty$.
- **Espaço Auxiliar:** Mede quanta **memória RAM extra** o algoritmo precisa alocar além da própria entrada.
