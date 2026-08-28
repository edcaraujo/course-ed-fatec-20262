# 📚 Lista Extra de Exercícios: Big-O e Análise de Complexidade (Parte 1)

**Disciplina:** Estrutura de Dados  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS) — Fatec Ribeirão Preto  
**Professor:** Eduardo Cruz Araujo  
**Tópico:** Fundamentos — Notação Big-O, Complexidade de Tempo e Espaço

> 💡 **Objetivo:** Esta lista de exercícios complementares tem como finalidade reforçar e fixar os conceitos de análise assintótica e complexidade de tempo e espaço (Notação Big-O) apresentados em sala de aula.
>
> 📖 **Gabarito:** As resoluções completas e detalhadas estão disponíveis em: [**`exercicios-part-1-solucao.md`**](exercicios-part-1-solucao.md).

---

## 🧭 Guia Rápido: As 4 Regras de Ouro do Big-O

1. **Regra 1 (Descarte de Constantes):** Multiplicações e divisões numéricas não mudam a classe de crescimento.  
   *Exemplo:* $O(2N) \rightarrow O(N)$; $O(100) \rightarrow O(1)$; $O\left(\frac{N}{2}\right) \rightarrow O(N)$.
2. **Regra 2 (Descarte de Termos Não-Dominantes):** Em somatórios com a mesma variável, apenas o termo que cresce mais rápido importa quando $N \rightarrow \infty$.  
   *Exemplo:* $O(N^2 + 3N + 50) \rightarrow O(N^2)$; $O(N + \log N) \rightarrow O(N)$.
3. **Regra 3 (Entradas Diferentes $\rightarrow$ Variáveis Diferentes):** Se o código recebe duas entradas independentes (ex: listas de tamanhos $A$ e $B$), mantenha ambas na notação.  
   *Exemplo:* Laços sequenciais com entradas diferentes $\rightarrow O(A + B)$; Laços aninhados $\rightarrow O(A \cdot B)$.
4. **Regra 4 (Adição vs Multiplicação):**
   - Ações sequenciais ("faça A e *depois* faça B") $\rightarrow$ **Soma** $O(A + B)$.
   - Ações aninhadas ("para *cada* item de A, faça todo B") $\rightarrow$ **Multiplicação** $O(A \cdot B)$.

---

## 📝 Lista de Exercícios de Fixação

---

### Exercício 01: Média entre Extremos

Analise a função abaixo, que recebe uma lista de números `nums` e retorna a média aritmética entre o primeiro e o último elemento:

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

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

### Exercício 02: Contagem de Números Pares

Analise a função a seguir, que conta quantos números pares existem em uma lista de inteiros:

```python
def count_evens(nums: list[int]) -> int:
    total_evens = 0
    for num in nums:
        if num % 2 == 0:
            total_evens += 1
    return total_evens
```

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

### Exercício 03: Varredura com Passo Fixo

Analise a função a seguir, que percorre uma lista acessando posições com incremento fixo de 3 em 3:

```python
def print_every_third(nums: list[int]) -> None:
    n = len(nums)
    for i in range(0, n, 3):
        print(nums[i])
```

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

### Exercício 04: Processamento Sequencial em Duas Etapas

Analise a função abaixo, que calcula a média dos elementos e em seguida conta quantos itens estão acima desse valor:

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

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

### Exercício 05: Exibição de Duas Listas Independentes

Considere a função abaixo, que recebe duas listas independentes `list_a` e `list_b`:

```python
def display_profiles(list_a: list[str], list_b: list[str]) -> None:
    for name in list_a:
        print(f"Usuário: {name}")
        
    for name in list_b:
        print(f"Administrador: {name}")
```

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

### Exercício 06: Divisões Sucessivas

Analise a função a seguir, que divide repetidamente um número inteiro positivo $n$ por 2:

```python
def count_halvings(n: int) -> int:
    steps = 0
    current = n
    while current > 1:
        current = current // 2
        steps += 1
    return steps
```

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

### Exercício 07: Combinação de Todos os Pares

Analise o algoritmo abaixo, que combina todos os pares possíveis de elementos de uma lista:

```python
def print_all_pairs(nums: list[int]) -> None:
    n = len(nums)
    for i in range(n):
        for j in range(n):
            print(f"Par: ({nums[i]}, {nums[j]})")
```

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

### Exercício 08: Cruzamento de Duas Listas

Considere a função a seguir, que gera combinações entre duas listas independentes `colors` e `sizes`:

```python
def generate_catalog(colors: list[str], sizes: list[str]) -> list[str]:
    catalog = []
    for c in colors:
        for s in sizes:
            item = f"{c} - Tamanho {s}"
            catalog.append(item)
    return catalog
```

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

### Exercício 09: Busca de Par com Soma Específica

Analise a função abaixo, que verifica se existem dois elementos na lista cuja soma resulte em zero:

```python
def has_zero_sum_pair(nums: list[int]) -> bool:
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):
            if nums[i] + nums[j] == 0:
                return True
    return False
```

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

### Exercício 10: Comparação de Estratégias de Inversão

Considere duas implementações diferentes para inverter os elementos de uma lista:

**Implementação A:**
```python
def reverse_copy(nums: list[int]) -> list[int]:
    reversed_list = []
    for i in range(len(nums) - 1, -1, -1):
        reversed_list.append(nums[i])
    return reversed_list
```

**Implementação B:**
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

**Perguntas:**
1. Qual é a **complexidade de tempo** da Implementação A e da Implementação B no pior caso?
2. Qual é a **complexidade de espaço auxiliar** de memória da Implementação A e da Implementação B?

---

## 🚀 Seção de Desafios

---

### Exercício 11: Verificação de Primalidade

Analise a função abaixo, que determina se um número inteiro positivo $n$ é primo:

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

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso em função de $n$?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

### Exercício 12: Processamento com Dobra de Passo

Analise o comportamento da função a seguir para uma lista de tamanho $N$:

```python
def process_matrix_scale(arr: list[int]) -> None:
    n = len(arr)
    for i in range(n):
        j = 1
        while j < n:
            print(arr[i], j)
            j = j * 2
```

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

### Exercício 13: Busca de Tripletos

Analise a função abaixo, que conta quantos tripletos $(i, j, k)$ somam zero em uma lista de números inteiros:

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

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso em função de $N = \text{len(arr)}$?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

### Exercício 14: Ramificação Recursiva Dupla

Considere a função recursiva abaixo:

```python
def recursive_branch(n: int) -> int:
    if n <= 1:
        return 1
    return recursive_branch(n - 1) + recursive_branch(n - 1)
```

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo em função de $n$?
2. Qual é a **complexidade de espaço auxiliar** de memória (considerando a pilha de execução)?

---

### Exercício 15: Processamento de Fila com Remoção Frontal

Analise o código a seguir, que consome sucessivamente elementos do início de uma lista padrão do Python:

```python
def drain_queue(tasks: list[str]) -> list[str]:
    processed = []
    while len(tasks) > 0:
        current = tasks.pop(0)
        processed.append(current.upper())
    return processed
```

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso em função de $N = \text{len(tasks)}$?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

### Exercício 16: Análise de Amostragem de Dados

Analise a função a seguir, que recebe uma lista de números `nums` de tamanho $N$ e calcula a soma de uma amostra inicial:

```python
def sample_sum(nums: list[int]) -> int:
    total = 0
    limit = min(len(nums), 100)
    for i in range(limit):
        total += nums[i]
    return total
```

**Perguntas:**
1. Qual é a **complexidade de tempo** do algoritmo no pior caso em função de $N = \text{len(nums)}$?
2. Qual é a **complexidade de espaço auxiliar** de memória?

---

## 🎯 Gabarito
Após resolver os exercícios, confira as resoluções comentadas em:  
👉 [**`exercicios-part-1-solucao.md`**](exercicios-part-1-solucao.md)
