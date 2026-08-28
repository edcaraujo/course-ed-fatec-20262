# 📚 Lista Extra de Exercícios: Algoritmos com Arrays e Strings (Parte 1)

**Disciplina:** Estrutura de Dados  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS) — Fatec Ribeirão Preto  
**Professor:** Eduardo Cruz Araujo  
**Tópico:** Fundamentos — Arrays, Strings e Padrões Algorítmicos

> 💡 **Objetivo:** Esta lista de exercícios práticos tem como finalidade reforçar e fixar a implementação de algoritmos para manipulação eficiente de vetores e sequências com as técnicas vistas em aula (Two Pointers, Sliding Window, Prefix Sum e Análise de Frequências).
>
> 📖 **Gabarito:** As implementações comentadas e análises detalhadas estão disponíveis em: [**`exercicios-part-1-solucao.md`**](exercicios-part-1-solucao.md).

---

## 🧭 Guia Rápido de Padrões

- **Two Pointers (Convergentes):** Dois ponteiros iniciando nas extremidades e caminhando para o centro. Muito útil para inversões, simetrias e particionamento.
- **Two Pointers (Lento e Rápido):** Um ponteiro marca a posição de escrita enquanto o outro varre a lista. Ideal para filtragens e rearranjos *in-place*.
- **Sliding Window (Janela Fixa):** Mantém a soma/estado de um bloco de tamanho $K$ somando o elemento que entra pela direita e subtraindo o que sai pela esquerda em $O(1)$.
- **Sliding Window (Janela Dinâmica):** Expande a borda direita para incluir elementos e contrai a borda esquerda para ajustar a janela ao tamanho ótimo.
- **Prefix Sum:** Pré-calcula a soma acumulada dos elementos para responder a somas de qualquer intervalo $[L, R]$ em tempo constante $O(1)$.
- **Tabela de Frequência:** Contabiliza ocorrências de caracteres usando vetores de tamanho fixo ou dicionários sem necessidade de ordenação prévia.

---

## 📝 Lista de Exercícios de Implementação

---

### Exercício 01: Espelhamento de Elementos

Uma esteira automatizada de produção armazena os códigos das etapas de montagem em uma lista `codigos`. Implemente a função `espelhar_sequencia(codigos)` que inverta a ordem de todos os elementos diretamente na lista original (*in-place*), sem criar uma nova lista e sem utilizar `codigos.reverse()` ou `codigos[::-1]`.

**Exemplo:**
- **Entrada:** `codigos = [10, 20, 30, 40, 50]`
- **Saída:** `[50, 40, 30, 20, 10]`

**Código Inicial:**
```python
def espelhar_sequencia(codigos: list) -> list:
    # TODO: Implemente a inversão in-place aqui
    pass
```

**Perguntas:**
1. Implemente a função em Python para resolver o problema proposto.
2. Qual é a **complexidade de tempo** da sua implementação no pior caso?
3. Qual é a **complexidade de espaço auxiliar** de memória da sua implementação?

---

### Exercício 02: Filtragem de Leituras Inválidas

Um sensor de temperatura registra medições em uma lista `leituras`. O valor `-1` indica uma falha momentânea de leitura. Implemente a função `reorganizar_falhas(leituras)` que mova todas as leituras de valor `-1` para o final da lista, preservando a ordem original de todas as leituras válidas. A alteração deve ser feita *in-place*.

**Exemplo:**
- **Entrada:** `leituras = [22, -1, 25, -1, 30, 28]`
- **Saída:** `[22, 25, 30, 28, -1, -1]`

**Código Inicial:**
```python
def reorganizar_falhas(leituras: list[int]) -> list[int]:
    # TODO: Implemente a reorganização in-place aqui
    pass
```

**Perguntas:**
1. Implemente a função em Python para resolver o problema proposto.
2. Qual é a **complexidade de tempo** da sua implementação no pior caso?
3. Qual é a **complexidade de espaço auxiliar** de memória da sua implementação?

---

### Exercício 03: Separação de Pacotes por Prioridade

Em um centro de distribuição, pacotes com peso par têm prioridade padrão e pacotes com peso ímpar têm prioridade urgente. Implemente a função `separar_por_prioridade(pesos)` que reorganize a lista de modo que todos os números pares fiquem no início e todos os ímpares fiquem no final (*in-place*). A ordem interna entre os números pares ou ímpares não precisa ser preservada.

**Exemplo:**
- **Entrada:** `pesos = [7, 2, 9, 4, 6, 1]`
- **Saída Possível:** `[6, 2, 4, 9, 7, 1]` (qualquer configuração com pares no início e ímpares no final)

**Código Inicial:**
```python
def separar_por_prioridade(pesos: list[int]) -> list[int]:
    # TODO: Implemente o particionamento in-place aqui
    pass
```

**Perguntas:**
1. Implemente a função em Python para resolver o problema proposto.
2. Qual é a **complexidade de tempo** da sua implementação no pior caso?
3. Qual é a **complexidade de espaço auxiliar** de memória da sua implementação?

---

### Exercício 04: Verificação de Simetria em Sequências

Um sistema de auditoria precisa verificar se uma sequência de números inteiros `nums` é perfeitamente simétrica (possui os mesmos valores lidos da esquerda para a direita e da direita para a esquerda). Implemente a função `verificar_simetria(nums)` que retorne `True` se for simétrica e `False` caso contrário, sem criar uma lista invertida auxiliar.

**Exemplos:**
- **Entrada:** `nums = [1, 4, 9, 4, 1]` $\longrightarrow$ **Saída:** `True`
- **Entrada:** `nums = [1, 2, 3, 4]` $\longrightarrow$ **Saída:** `False`

**Código Inicial:**
```python
def verificar_simetria(nums: list[int]) -> bool:
    # TODO: Implemente a verificação de simetria aqui
    pass
```

**Perguntas:**
1. Implemente a função em Python para resolver o problema proposto.
2. Qual é a **complexidade de tempo** da sua implementação no pior caso?
3. Qual é a **complexidade de espaço auxiliar** de memória da sua implementação?

---

### Exercício 05: Maior Produção em Período de $K$ Dias

Uma indústria monitora o total diário de peças fabricadas na lista `producao`. Implemente a função `maior_producao_continua(producao, k)` que determine a **maior soma de peças** produzidas em qualquer sequência contígua de exatamente $k$ dias ($k \le \text{len(producao)}$).

**Exemplo:**
- **Entrada:** `producao = [100, 200, 150, 400, 300, 100]`, `k = 3`
- **Saída:** `850` (correspondente ao período `[150, 400, 300]`)

**Código Inicial:**
```python
def maior_producao_continua(producao: list[int], k: int) -> int:
    # TODO: Implemente o cálculo com janela deslizante aqui
    pass
```

**Perguntas:**
1. Implemente a função em Python para resolver o problema proposto.
2. Qual é a **complexidade de tempo** da sua implementação no pior caso?
3. Qual é a **complexidade de espaço auxiliar** de memória da sua implementação?

---

### Exercício 06: Detecção de Pico de Alertas em Intervalo Fixo

Em um servidor, os registros de log são representados por uma string `logs`, onde `'A'` representa um alerta e `'N'` representa tráfego normal. Implemente a função `maximo_alertas_janela(logs, k)` que encontre o **número máximo de alertas `'A'`** presentes em qualquer intervalo contíguo de tamanho $k$.

**Exemplos:**
- **Entrada:** `logs = "NNANAAANNN"`, `k = 4` $\longrightarrow$ **Saída:** `3` (trecho `"ANAA"`)
- **Entrada:** `logs = "NNNN"`, `k = 2` $\longrightarrow$ **Saída:** `0`

**Código Inicial:**
```python
def maximo_alertas_janela(logs: str, k: int) -> int:
    # TODO: Implemente a contagem em janela fixa aqui
    pass
```

**Perguntas:**
1. Implemente a função em Python para resolver o problema proposto.
2. Qual é a **complexidade de tempo** da sua implementação no pior caso?
3. Qual é a **complexidade de espaço auxiliar** de memória da sua implementação?

---

### Exercício 07: Período Mínimo para Atingir Meta Financeira

Um comerciante registrou os ganhos diários em uma lista de números inteiros positivos `vendas`. Implemente a função `menor_periodo_meta(vendas, meta)` que retorne o **menor número de dias consecutivos** necessários para somar um valor maior ou igual a `meta`. Se a meta não puder ser atingida, retorne `0`.

**Exemplos:**
- **Entrada:** `vendas = [2, 1, 5, 2, 3, 2]`, `meta = 7` $\longrightarrow$ **Saída:** `2` (período `[5, 2]`)
- **Entrada:** `vendas = [1, 2, 1]`, `meta = 10` $\longrightarrow$ **Saída:** `0`

**Código Inicial:**
```python
def menor_periodo_meta(vendas: list[int], meta: int) -> int:
    # TODO: Implemente a janela dinâmica aqui
    pass
```

**Perguntas:**
1. Implemente a função em Python para resolver o problema proposto.
2. Qual é a **complexidade de tempo** da sua implementação no pior caso?
3. Qual é a **complexidade de espaço auxiliar** de memória da sua implementação?

---

### Exercício 08: Relatório de Faturamento por Intervalo

Um sistema financeiro armazena os balanços diários na lista `balancos`. Implemente a classe `ConsultaFaturamento` que receba a lista no construtor e disponibilize o método `somar_periodo(inicio, fim)` para retornar a soma dos balanços do dia `inicio` até o dia `fim` inclusive em **tempo $O(1)$ por consulta**.

**Exemplo:**
```python
cf = ConsultaFaturamento([10, -5, 20, 15, -10])
print(cf.somar_periodo(0, 2))  # 10 + (-5) + 20 = 25
print(cf.somar_periodo(1, 3))  # -5 + 20 + 15 = 30
```

**Código Inicial:**
```python
class ConsultaFaturamento:
    def __init__(self, balancos: list[int]):
        # TODO: Construa o vetor de prefix sum aqui
        pass
        
    def somar_periodo(self, inicio: int, fim: int) -> int:
        # TODO: Responda a consulta em O(1) aqui
        pass
```

**Perguntas:**
1. Implemente a classe em Python para resolver o problema proposto.
2. Qual é a **complexidade de tempo** do pré-processamento e de cada consulta?
3. Qual é a **complexidade de espaço auxiliar** de memória da estrutura?

---

### Exercício 09: Ponto de Equilíbrio de Cargas

Uma balança digital precisa identificar o **primeiro índice de equilíbrio** em uma sequência de cargas `cargas`. O índice de equilíbrio $i$ ocorre quando a soma dos pesos estritamente à esquerda de $i$ é igual à soma dos pesos estritamente à direita de $i$. Implemente a função `encontrar_ponto_equilibrio(cargas)`. Se não houver equilíbrio, retorne `-1`.

**Exemplos:**
- **Entrada:** `cargas = [2, 4, 6, 1, 5]` $\longrightarrow$ **Saída:** `2`  
  *(Esquerda: $2+4 = 6$; Direita: $1+5 = 6$)*
- **Entrada:** `cargas = [1, 2, 3]` $\longrightarrow$ **Saída:** `-1`

**Código Inicial:**
```python
def encontrar_ponto_equilibrio(cargas: list[int]) -> int:
    # TODO: Implemente a busca do ponto de equilíbrio aqui
    pass
```

**Perguntas:**
1. Implemente a função em Python para resolver o problema proposto.
2. Qual é a **complexidade de tempo** da sua implementação no pior caso?
3. Qual é a **complexidade de espaço auxiliar** de memória da sua implementação?

---

### Exercício 10: Comparador de Inventário de Letras

Em um jogo de formação de palavras, o sistema recebe duas palavras `palavra1` e `palavra2` compostas apenas por letras minúsculas (`'a'` até `'z'`). Implemente a função `mesmo_inventario(palavra1, palavra2)` que retorne `True` se ambas possuírem exatamente as mesmas letras nas mesmas quantidades, sem utilizar ordenação (`sorted()`).

**Exemplos:**
- **Entrada:** `palavra1 = "alegria"`, `palavra2 = "galeria"` $\longrightarrow$ **Saída:** `True`
- **Entrada:** `palavra1 = "teste"`, `palavra2 = "texto"` $\longrightarrow$ **Saída:** `False`

**Código Inicial:**
```python
def mesmo_inventario(palavra1: str, palavra2: str) -> bool:
    # TODO: Implemente a verificação com contagem de frequência aqui
    pass
```

**Perguntas:**
1. Implemente a função em Python para resolver o problema proposto.
2. Qual é a **complexidade de tempo** da sua implementação no pior caso?
3. Qual é a **complexidade de espaço auxiliar** de memória da sua implementação?

---

## 🚀 Seção de Desafios

---

### Exercício 11: Compactação de Sequências Repetidas

Implemente a função `remover_duplicados_consecutivos(numeros)` que receba uma lista de números inteiros onde repetições consecutivas podem ocorrer e reorganize a lista *in-place* de modo que cada número apareça apenas uma vez no início. A função deve retornar o novo tamanho da lista sem repetições consecutivas.

**Exemplo:**
- **Entrada:** `numeros = [1, 1, 2, 3, 3, 4]`
- **Saída:** Retorna `4`, com a lista modificada contendo `[1, 2, 3, 4, ...]`

**Código Inicial:**
```python
def remover_duplicados_consecutivos(numeros: list[int]) -> int:
    # TODO: Implemente a compactação in-place com ponteiro lento e rápido aqui
    pass
```

**Perguntas:**
1. Implemente a função em Python para resolver o problema proposto.
2. Qual é a **complexidade de tempo** da sua implementação no pior caso?
3. Qual é a **complexidade de espaço auxiliar** de memória da sua implementação?

---

### Exercício 12: Maior Sequência Contínua de Dias Positivos

Um investidor registrou os rendimentos diários na lista `rendimentos`. Implemente a função `maior_sequencia_positiva(rendimentos)` que encontre o **comprimento da maior sequência contínua de dias com rendimento positivo** ($> 0$).

**Exemplo:**
- **Entrada:** `rendimentos = [10, 20, -5, 30, 40, 50, 60, -2, 10]`
- **Saída:** `4` (sequência `[30, 40, 50, 60]`)

**Código Inicial:**
```python
def maior_sequencia_positiva(rendimentos: list[int]) -> int:
    # TODO: Implemente a varredura linear de contiguidade aqui
    pass
```

**Perguntas:**
1. Implemente a função em Python para resolver o problema proposto.
2. Qual é a **complexidade de tempo** da sua implementação no pior caso?
3. Qual é a **complexidade de espaço auxiliar** de memória da sua implementação?

---

## 🎯 Gabarito
Após implementar suas soluções, confira as implementações completas comentadas em:  
👉 [**`exercicios-part-1-solucao.md`**](exercicios-part-1-solucao.md)
