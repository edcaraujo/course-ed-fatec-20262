# 📖 Gabarito e Resoluções: Algoritmos com Arrays e Strings (Parte 1)

**Disciplina:** Estrutura de Dados  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS) — Fatec Ribeirão Preto  
**Professor:** Eduardo Cruz Araujo  
**Tópico:** Gabarito Comentado — Implementação Prática de Vetores e Sequências

> 👈 **Enunciados:** Para consultar a lista original com os modelos de código inicial, acesse: [**`exercicios-part-1.md`**](exercicios-part-1.md).

---

## 📝 Resoluções dos Exercícios de Fixação

---

### Exercício 01: Espelhamento de Elementos

#### 1. Implementação em Python:
```python
def espelhar_sequencia(codigos: list) -> list:
    left = 0
    right = len(codigos) - 1
    
    while left < right:
        # Troca os elementos nas extremidades
        codigos[left], codigos[right] = codigos[right], codigos[left]
        left += 1
        right -= 1
        
    return codigos
```

#### 2. Complexidade de Tempo:
- **$O(N)$ no pior caso**, pois o laço executa exatamente $\lfloor N / 2 \rfloor$ trocas, realizando uma única varredura convergente.

#### 3. Complexidade de Espaço Auxiliar:
- **$O(1)$ (Constante)**, pois as trocas ocorrem diretamente no vetor original (*in-place*), utilizando apenas duas variáveis de índice (`left` e `right`).

---

### Exercício 02: Filtragem de Leituras Inválidas

#### 1. Implementação em Python:
```python
def reorganizar_falhas(leituras: list[int]) -> list[int]:
    slow = 0  # Posição onde o próximo valor válido deve ser colocado
    
    for fast in range(len(leituras)):
        if leituras[fast] != -1:
            # Troca o valor válido com a posição do índice slow
            leituras[slow], leituras[fast] = leituras[fast], leituras[slow]
            slow += 1
            
    return leituras
```

#### 2. Complexidade de Tempo:
- **$O(N)$ no pior caso**, pois o ponteiro `fast` percorre a lista de $N$ elementos uma única vez.

#### 3. Complexidade de Espaço Auxiliar:
- **$O(1)$ (Constante)**, pois opera diretamente no vetor original sem alocação de lista auxiliar.

---

### Exercício 03: Separação de Pacotes por Prioridade

#### 1. Implementação em Python:
```python
def separar_por_prioridade(pesos: list[int]) -> list[int]:
    left = 0
    right = len(pesos) - 1
    
    while left < right:
        if pesos[left] % 2 == 0:
            left += 1
        elif pesos[right] % 2 != 0:
            right -= 1
        else:
            pesos[left], pesos[right] = pesos[right], pesos[left]
            left += 1
            right -= 1
            
    return pesos
```

#### 2. Complexidade de Tempo:
- **$O(N)$ no pior caso**, pois a cada passo pelo menos um dos ponteiros avança ou recua até que ambos se encontrem.

#### 3. Complexidade de Espaço Auxiliar:
- **$O(1)$ (Constante)**, mantendo a reorganização *in-place*.

---

### Exercício 04: Verificação de Simetria em Sequências

#### 1. Implementação em Python:
```python
def verificar_simetria(nums: list[int]) -> bool:
    left = 0
    right = len(nums) - 1
    
    while left < right:
        if nums[left] != nums[right]:
            return False
        left += 1
        right -= 1
        
    return True
```

#### 2. Complexidade de Tempo:
- **$O(N)$ no pior caso** (quando a lista é simétrica e precisa ser comparada até o centro) e **$\Omega(1)$ no melhor caso** (quando os primeiros elementos já são diferentes).

#### 3. Complexidade de Espaço Auxiliar:
- **$O(1)$ (Constante)**, sem criação de novas listas.

---

### Exercício 05: Maior Produção em Período de $K$ Dias

#### 1. Implementação em Python:
```python
def maior_producao_continua(producao: list[int], k: int) -> int:
    if not producao or k <= 0 or k > len(producao):
        return 0
        
    # 1. Soma da primeira janela de tamanho k
    janela_atual = sum(producao[:k])
    maior_soma = janela_atual
    
    # 2. Desliza a janela da posição k até o fim em O(1) por passo
    for i in range(k, len(producao)):
        janela_atual += producao[i] - producao[i - k]
        if janela_atual > maior_soma:
            maior_soma = janela_atual
            
    return maior_soma
```

#### 2. Complexidade de Tempo:
- **$O(N)$ no pior caso**, pois a transição de uma janela para a seguinte requer apenas 1 adição e 1 subtração ($O(1)$ por deslocamento).

#### 3. Complexidade de Espaço Auxiliar:
- **$O(1)$ (Constante)**, mantendo apenas acumuladores numéricos.

---

### Exercício 06: Detecção de Pico de Alertas em Intervalo Fixo

#### 1. Implementação em Python:
```python
def maximo_alertas_janela(logs: str, k: int) -> int:
    if not logs or k <= 0 or k > len(logs):
        return 0
        
    # 1. Contagem na primeira janela
    alertas_atuais = sum(1 for ch in logs[:k] if ch == 'A')
    max_alertas = alertas_atuais
    
    # 2. Desliza a janela
    for i in range(k, len(logs)):
        if logs[i] == 'A':
            alertas_atuais += 1
        if logs[i - k] == 'A':
            alertas_atuais -= 1
            
        if alertas_atuais > max_alertas:
            max_alertas = alertas_atuais
            
    return max_alertas
```

#### 2. Complexidade de Tempo:
- **$O(N)$ no pior caso**, percorrendo a cadeia de caracteres uma única vez.

#### 3. Complexidade de Espaço Auxiliar:
- **$O(1)$ (Constante)**.

---

### Exercício 07: Período Mínimo para Atingir Meta Financeira

#### 1. Implementação em Python:
```python
def menor_periodo_meta(vendas: list[int], meta: int) -> int:
    left = 0
    soma_atual = 0
    menor_periodo = float('inf')
    
    for right in range(len(vendas)):
        # Expande a janela somando o elemento da direita
        soma_atual += vendas[right]
        
        # Contrai a janela pela esquerda enquanto a meta for satisfeita
        while soma_atual >= meta:
            tamanho_janela = right - left + 1
            if tamanho_janela < menor_periodo:
                menor_periodo = tamanho_janela
                
            soma_atual -= vendas[left]
            left += 1
            
    return menor_periodo if menor_periodo != float('inf') else 0
```

#### 2. Complexidade de Tempo:
- **$O(N)$ Amortizado no pior caso**, pois cada elemento é somado no máximo 1 vez pelo ponteiro `right` e subtraído no máximo 1 vez pelo ponteiro `left`.

#### 3. Complexidade de Espaço Auxiliar:
- **$O(1)$ (Constante)**.

---

### Exercício 08: Relatório de Faturamento por Intervalo

#### 1. Implementação em Python:
```python
class ConsultaFaturamento:
    def __init__(self, balancos: list[int]):
        self.prefix = [0] * len(balancos)
        if balancos:
            self.prefix[0] = balancos[0]
            for i in range(1, len(balancos)):
                self.prefix[i] = self.prefix[i - 1] + balancos[i]
                
    def somar_periodo(self, inicio: int, fim: int) -> int:
        if inicio == 0:
            return self.prefix[fim]
        return self.prefix[fim] - self.prefix[inicio - 1]
```

#### 2. Complexidade de Tempo:
- **Inicialização (`__init__`):** $O(N)$ (uma passagem linear para construir o vetor acumulado).
- **Consulta (`somar_periodo`):** $O(1)$ por consulta via subtração direta $P[\text{fim}] - P[\text{inicio}-1]$.

#### 3. Complexidade de Espaço Auxiliar:
- **$O(N)$**, para armazenar a lista de somas acumuladas `self.prefix`.

---

### Exercício 09: Ponto de Equilíbrio de Cargas

#### 1. Implementação em Python:
```python
def encontrar_ponto_equilibrio(cargas: list[int]) -> int:
    soma_total = sum(cargas)  # O(N)
    soma_esquerda = 0
    
    for i, peso in enumerate(cargas):
        soma_direita = soma_total - soma_esquerda - peso
        
        if soma_esquerda == soma_direita:
            return i
            
        soma_esquerda += peso
        
    return -1
```

#### 2. Complexidade de Tempo:
- **$O(N)$ no pior caso**, somando o total inicial e depois varrendo a lista linearmente.

#### 3. Complexidade de Espaço Auxiliar:
- **$O(1)$ (Constante)**, utilizando apenas acumuladores numéricos escalares.

---

### Exercício 10: Comparador de Inventário de Letras

#### 1. Implementação em Python:
```python
def mesmo_inventario(palavra1: str, palavra2: str) -> bool:
    if len(palavra1) != len(palavra2):
        return False
        
    # Vetor de frequência para as 26 letras minúsculas
    frequencia = [0] * 26
    
    for ch1, ch2 in zip(palavra1, palavra2):
        frequencia[ord(ch1) - ord('a')] += 1
        frequencia[ord(ch2) - ord('a')] -= 1
        
    for contagem in frequencia:
        if contagem != 0:
            return False
            
    return True
```

#### 2. Complexidade de Tempo:
- **$O(N)$ no pior caso**, onde $N = \text{len(palavra1)}$, varrendo ambas as palavras em uma única passada.

#### 3. Complexidade de Espaço Auxiliar:
- **$O(1)$ (Constante)**, pois o vetor de frequências possui tamanho fixo em 26 posições.

---

## 🚀 Resoluções dos Desafios

---

### Exercício 11: Compactação de Sequências Repetidas

#### 1. Implementação em Python:
```python
def remover_duplicados_consecutivos(numeros: list[int]) -> int:
    if not numeros:
        return 0
        
    slow = 0  # Índice do último elemento único confirmado
    
    for fast in range(1, len(numeros)):
        if numeros[fast] != numeros[slow]:
            slow += 1
            numeros[slow] = numeros[fast]
            
    return slow + 1
```

#### 2. Complexidade de Tempo:
- **$O(N)$ no pior caso**, percorrendo a lista linearmente.

#### 3. Complexidade de Espaço Auxiliar:
- **$O(1)$ (Constante)**, modificando a lista *in-place*.

---

### Exercício 12: Maior Sequência Contínua de Dias Positivos

#### 1. Implementação em Python:
```python
def maior_sequencia_positiva(rendimentos: list[int]) -> int:
    maior_tamanho = 0
    tamanho_atual = 0
    
    for valor in rendimentos:
        if valor > 0:
            tamanho_atual += 1
            if tamanho_atual > maior_tamanho:
                maior_tamanho = tamanho_atual
        else:
            tamanho_atual = 0
            
    return maior_tamanho
```

#### 2. Complexidade de Tempo:
- **$O(N)$ no pior caso**, com apenas uma passagem linear.

#### 3. Complexidade de Espaço Auxiliar:
- **$O(1)$ (Constante)**.

---

## 📊 Tabela de Síntese de Todos os Exercícios

| Exercício | Problema | Padrão / Técnica | Complexidade de Tempo | Complexidade de Espaço |
| :---: | :--- | :--- | :---: | :---: |
| **01** | Espelhamento de Elementos | Two Pointers (Convergentes) | $O(N)$ | $O(1)$ |
| **02** | Filtragem de Leituras Inválidas | Two Pointers (Lento & Rápido) | $O(N)$ | $O(1)$ |
| **03** | Separação de Pacotes por Prioridade | Two Pointers (Particionamento) | $O(N)$ | $O(1)$ |
| **04** | Verificação de Simetria | Two Pointers (Convergentes) | $O(N)$ | $O(1)$ |
| **05** | Maior Produção em $K$ Dias | Sliding Window (Janela Fixa) | $O(N)$ | $O(1)$ |
| **06** | Detecção de Pico de Alertas | Sliding Window (Janela Fixa) | $O(N)$ | $O(1)$ |
| **07** | Período Mínimo para Meta | Sliding Window (Janela Dinâmica) | $O(N)$ amort. | $O(1)$ |
| **08** | Relatório de Faturamento | Prefix Sum (Consultas Rápidas) | $O(1)$ por consulta | $O(N)$ tabela |
| **09** | Ponto de Equilíbrio de Cargas | Prefix Sum (Soma Total / Esquerda) | $O(N)$ | $O(1)$ |
| **10** | Comparador de Inventário | Vetor de Frequência (26 letras) | $O(N)$ | $O(1)$ |
| **11** | Compactação de Repetidos | Two Pointers (Lento & Rápido) | $O(N)$ | $O(1)$ |
| **12** | Maior Sequência de Positivos | Varredura com Janela Contígua | $O(N)$ | $O(1)$ |

---

## 💡 Dica de Implementação
Ao implementar soluções com Arrays e Strings:
- Tente sempre manter o espaço auxiliar em $O(1)$ reaproveitando o próprio vetor (*in-place*) quando o problema permitir.
- Em problemas de substring/subarray contíguo, prefira **Sliding Window** ou **Prefix Sum** em vez de laços aninhados $O(N^2)$.
