---
marp: true

author: "Eduardo Cruz Araujo"
title: "Estruturas de Dados"
description: "Disciplina de Estruturas de Dados - Aula 06: Pré-avaliação (Simulado P1)."

theme: "default"
class: "invert"

footer: "Eduardo Cruz Araujo | Fatec | 2026.2 | Estruturas de Dados | Pré-avaliação (Simulado P1)"

paginate: "true"

---

# Estrutura de Dados :mortar_board:
## Aula 06: Pré-avaliação (Simulado P1)

Simulação prática e teórica preparatória para a primeira avaliação formal (**P1**).
Revisão integrada de Complexidade Assintótica (Big-O), Arrays, Strings, Pilhas (LIFO) e Filas/Deques (FIFO).

---

Pré-avaliação (Simulado P1)
## Instruções e Estrutura da Avaliação

---

## 🎯 Objetivo e Orientações Gerais

Esta pré-avaliação foi estruturada como um **ensaio fidedigno da Prova P1**:

1. **Parte I — Questões de Análise Assintótica (3 Questões):**
   - Determinação formal da **complexidade de tempo** (Big-O) no pior caso.
   - Determinação formal da **complexidade de espaço auxiliar** de memória.
   - Justificativa técnica baseada na arquitetura de memória e no fluxo de execução.

2. **Parte II — Problemas Práticos de Implementação (4 Problemas):**
   - Problema 01: Triagem de Materiais na Esteira.
   - Problema 02: Detecção de Alerta Térmico em Datacenter.
   - Problema 03: Normalizador de Rotas de API.
   - Problema 04: Reversão Prioritária de Pacotes em Fila.

> ⚠️ **Atenção:** Em conformidade com o cronograma da disciplina, **não há** problemas nesta avaliação envolvendo *Janela Deslizante Dinâmica*.

---

Pré-avaliação (Simulado P1)
## Parte I: Questões de Análise Assintótica

---

## 📝 Questão 01: Médias Acumuladas em Vetor

⭐ `1.0 ponto(s)`

Analise a função abaixo, que recebe uma lista de inteiros `valores` e constrói um vetor de médias parciais acumuladas:

```python
def processar_medias_acumuladas(valores: list[int]) -> list[float]:
    n = len(valores)
    if n == 0:
        return []
    
    # Etapa 1: Construção do array de somas acumuladas (Prefix Sum)
    prefixo = [0] * (n + 1)
    for i in range(n):
        prefixo[i + 1] = prefixo[i] + valores[i]
        
    # Etapa 2: Cálculo das médias acumuladas
    medias = []
    for i in range(1, n + 1):
        medias.append(prefixo[i] / i)
        
    return medias
```

**Perguntas:**
1. Qual é a **complexidade de tempo** O(...) no pior caso? 
2. Qual é a **complexidade de espaço auxiliar** O(...) de memória? 

---

## 📝 Questão 02: A Armadilha da Fila Ingênua

⭐ `1.0 ponto(s)`

Um desenvolvedor precisa implementar um gerenciador de tarefas FIFO e escreve a função abaixo utilizando uma lista nativa de Python:

```python
def processar_fila_tarefas(tarefas: list[str]) -> list[str]:
    fila = list(tarefas)  # Cópia da lista original
    processadas = []
    
    while fila:
        tarefa_atual = fila.pop(0)  # Atende a primeira tarefa da fila
        if len(tarefa_atual) > 3:
            processadas.append(tarefa_atual.upper())
            
    return processadas
```

**Perguntas:**
1. Qual é a **complexidade de tempo** O(...) no pior caso? 
2. Qual é a **complexidade de espaço auxiliar** O(...) de memória? 

---

## 📝 Questão 03: Auditoria de Conformidade de Lote

⭐ `1.0 ponto(s)`

Analise atentamente o fluxo de execução e a indentação da função a seguir, projetada para auditar registros numéricos em lote:

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

**Perguntas:**
1. Qual é a **complexidade de tempo** O(...) no pior caso? 
2. Qual é a **complexidade de espaço auxiliar** O(...) de memória? 

---

Pré-avaliação (Simulado P1)
## Parte II: Problemas Práticos de Implementação

---

## 💻 Problema 01: Triagem de Materiais na Esteira

⭐ `3.0 ponto(s)`

### Contexto:
Uma central de reciclagem possui uma esteira automatizada com leitor óptico. Os materiais que passam pela esteira são rotulados com códigos inteiros conforme sua classe:
- `0` representa **Plástico**
- `1` representa **Vidro**
- `2` representa **Metal**

Dada uma lista de inteiros `itens`, implemente a função `organizar_triagem(itens: list[int]) -> list[int]` que reorganize a lista **diretamente no vetor original (*in-place*)**, de modo que todos os plásticos (`0`) fiquem no início, todos os vidros (`1`) no meio e todos os metais (`2`) ao final.

### Restrições Obrigatórias de Complexidade:
- **Tempo:** O(N), onde N = len(itens). Realize a triagem em uma **única varredura linear**.
- **Espaço Auxiliar:** O(1). É **terminantemente proibido** utilizar métodos prontos de ordenação (`sort()`, `sorted()`) ou alocar vetores auxiliares.

---

## 💻 Problema 01: Exemplos e Assinatura

### Exemplos:
- **Exemplo 1:**
  - **Entrada:** `itens = [2, 0, 2, 1, 1, 0]`
  - **Saída:** `[0, 0, 1, 1, 2, 2]`
- **Exemplo 2:**
  - **Entrada:** `itens = [2, 0, 1]`
  - **Saída:** `[0, 1, 2]`
- **Exemplo 3:**
  - **Entrada:** `itens = [0]`
  - **Saída:** `[0]`

### Cabeçalho da Função:
```python
def organizar_triagem(itens: list[int]) -> list[int]:
    
    pass
```

---

## 💻 Problema 02: Detecção de Alerta Térmico em Datacenter

⭐ `3.0 ponto(s)`

### Contexto:
O sistema de refrigeração de um datacenter mede a temperatura média de operação de um corredor de servidores a cada minuto, gerando uma lista histórica de inteiros `leituras`.

Para diagnosticar aquecimentos sustentados sem disparar alarmes falsos por picos isolados, o protocolo de segurança avalia a **maior média térmica** registrada em qualquer intervalo contínuo de exatamente **k minutos consecutivos**.

Implemente a função `maior_media_janela(leituras: list[int], k: int) -> float` que determine a média máxima observada em uma janela contígua de tamanho k.

### Restrições Obrigatórias de Complexidade:
- **Tempo:** O(N), onde N = len(leituras).
- **Espaço Auxiliar:** O(1).

---

## 💻 Problema 02: Exemplos e Assinatura

### Exemplos:
- **Exemplo 1:**
  - **Entrada:** `leituras = [1, 12, -5, -6, 50, 3]`, `k = 4`
  - **Saída:** `12.75`
  - **Explicação:**
    - Janela `[1, 12, -5, -6]`: soma = 2, média = 0.5
    - Janela `[12, -5, -6, 50]`: soma = 51, média = 12.75 (máxima!)
    - Janela `[-5, -6, 50, 3]`: soma = 42, média = 10.5
- **Exemplo 2:**
  - **Entrada:** `leituras = [5]`, `k = 1`
  - **Saída:** `5.0`
- **Exemplo 3:**
  - **Entrada:** `leituras = [4, 0, 4, 3, 3]`, `k = 2`
  - **Saída:** `3.5` (janela `[4, 3]`, soma = 7)

### Cabeçalho da Função:
```python
def maior_media_janela(leituras: list[int], k: int) -> float:
    
    pass
```

---

## 💻 Problema 03: Normalizador de Rotas de API

⭐ `3.0 ponto(s)`

### Contexto:
Um API Gateway de microsserviços recebe caminhos de requisição contendo segmentos relativos no padrão de diretórios Unix. O roteador precisa normalizar a URL para o seu caminho canônico absoluto antes de encaminhá-la.

As regras de resolução de caminhos são:
- Uma barra simples `/` separa os nomes de recursos. Barras consecutivas como `//` devem ser tratadas como uma única `/`.
- O ponto simples `.` refere-se ao recurso/diretório atual e deve ser ignorado.
- O ponto duplo `..` refere-se ao nível anterior e **desfaz o último recurso acessado** (se houver).
- O caminho resultante deve sempre iniciar com `/`, conter os recursos separados por `/` simples e **não** deve terminar com `/` à direita (exceto se a raiz for o único diretório).

### Restrições Obrigatórias de Complexidade:
- **Tempo:** O(N), onde N = len(caminho).
- **Espaço Auxiliar:** O(N).

---

## 💻 Problema 03: Exemplos e Assinatura

### Exemplos:
- **Exemplo 1:**
  - **Entrada:** `caminho = "/servicos/v1/../v2/./dados/"`
  - **Saída:** `"/servicos/v2/dados"`
- **Exemplo 2:**
  - **Entrada:** `caminho = "/home//usuario/"`
  - **Saída:** `"/home/usuario"`
- **Exemplo 3:**
  - **Entrada:** `caminho = "/../"`
  - **Saída:** `"/"`
  - **Explicação:** Não é possível subir acima da raiz principal.
- **Exemplo 4:**
  - **Entrada:** `caminho = "/a/./b/../../c/"`
  - **Saída:** `"/c"`

### Cabeçalho da Função:
```python
def normalizar_rota(caminho: str) -> str:
    
    pass
```

---

## 💻 Problema 04: Reversão Prioritária de Pacotes em Fila

⭐ `3.0 ponto(s)`

### Contexto:
Em um comutador de rede, pacotes chegam em uma fila cronológica `pacotes: list[int]`. Devido a uma diretiva de QoS (*Quality of Service*), uma rajada prioritária exige que os primeiros `k` pacotes da fila tenham sua ordem de despacho **invertida** (o k-ésimo pacote passa a ser transmitido primeiro), enquanto todos os pacotes restantes da fila original devem preservar sua ordem de chegada intacta.

Implemente a função `inverter_primeiros_k(pacotes: list[int], k: int) -> list[int]`.

### Restrições de Estrutura e Complexidade:
- Utilize uma **Fila FIFO** (`collections.deque`) como estrutura primária e uma **Pilha auxiliar** para efetuar a inversão estrita dos primeiros k itens.
- **Tempo:** O(N), onde N = len(pacotes).
- **Espaço Auxiliar:** O(K) para a pilha temporária.

---

## 💻 Problema 04: Exemplos e Assinatura

### Exemplos:
- **Exemplo 1:**
  - **Entrada:** `pacotes = [10, 20, 30, 40, 50]`, `k = 3`
  - **Saída:** `[30, 20, 10, 40, 50]`
  - **Explicação:** Os primeiros 3 itens (`10, 20, 30`) foram invertidos para `[30, 20, 10]`, e os itens restantes `[40, 50]` mantiveram suas posições relativas.
- **Exemplo 2:**
  - **Entrada:** `pacotes = [1, 2, 3, 4]`, `k = 2`
  - **Saída:** `[2, 1, 3, 4]`
- **Exemplo 3:**
  - **Entrada:** `pacotes = [5, 6, 7]`, `k = 3`
  - **Saída:** `[7, 6, 5]`

### Cabeçalho da Função:
```python
from collections import deque

def inverter_primeiros_k(pacotes: list[int], k: int) -> list[int]:
    
    pass
```

