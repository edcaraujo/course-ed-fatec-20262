# 📚 Lista Extra de Exercícios: Estruturas Lineares — Pilhas (Parte 1)

**Disciplina:** Estrutura de Dados  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS) — Fatec Ribeirão Preto  
**Professor:** Eduardo Cruz Araujo  
**Tópico:** Estruturas Lineares — Pilhas (LIFO), TADs e Aplicações Práticas

> 💡 **Objetivo:** Esta lista de exercícios tem como finalidade consolidar a compreensão do princípio LIFO (*Last-In, First-Out*), o desenvolvimento de Tipos Abstratos de Dados (TAD) simples e autossuficientes, e a aplicação de pilhas na resolução de problemas reais de engenharia de software (validação de delimitadores, avaliação de expressões, histórico de estados e controle de chamadas).
>
> 📖 **Gabarito:** As implementações comentadas e análises detalhadas estão disponíveis em: [**`exercicios-part-1-solucao.md`**](exercicios-part-1-solucao.md).

---

## 🧭 Guia Rápido de Padrões e Conceitos

- **LIFO (Last-In, First-Out):** O último elemento a entrar é o primeiro a sair. Todas as operações acontecem estritamente no **Topo**.
- **Operações Primitivas:** `push(item)` (adicionar), `pop()` (remover do topo), `peek()` (consultar o topo), `is_empty()` (verificar se está vazia) — todas em tempo constante **$O(1)$**.
- **Stack Underflow:** Tentativa de desempilhar ou inspecionar uma pilha vazia.
- **Validação de Escopos:** Todo delimitador de abertura é uma promessa de fechamento futuro. O fechamento deve sempre casar com a abertura mais recente no topo da pilha.
- **Pilha Autossuficiente (Sem Imports):** A classe `Pilha` básica pode ser declarada diretamente dentro do arquivo da solução para facilitar testes e submissões em juízes online.

```python
class Pilha:
    def __init__(self):
        self._elementos = []

    def push(self, item):
        self._elementos.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Stack Underflow: pilha vazia!")
        return self._elementos.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Stack Underflow: pilha vazia!")
        return self._elementos[-1]

    def is_empty(self):
        return len(self._elementos) == 0

    def size(self):
        return len(self._elementos)
```

---

## 📝 Lista de Exercícios de Implementação

---

### Exercício 01: Inversor de Palavras em Texto

Um editor de texto precisa de uma função que inverta a ordem das letras de **cada palavra individualmente** em uma frase, mantendo os espaços e a ordem original das palavras na frase.

Implemente a função `inverter_letras_palavras(frase: str) -> str` utilizando o princípio LIFO de uma Pilha.

**Exemplo:**
- **Entrada:** `"FATEC RIBEIRAO PRETO"`
- **Saída:** `"CETAF OAERIEBIR OTERP"`

**Código Inicial:**
```python
class Pilha:
    def __init__(self): self._elementos = []
    def push(self, item): self._elementos.append(item)
    def pop(self): return self._elementos.pop() if self._elementos else None
    def is_empty(self): return len(self._elementos) == 0

def inverter_letras_palavras(frase: str) -> str:
    # TODO: Implemente a lógica utilizando a Pilha acima
    pass
```

**Perguntas:**
1. Implemente a função utilizando a classe `Pilha` fornecida.
2. Qual a complexidade de tempo e de espaço da sua solução?

---

### Exercício 02: Validador de Tags HTML Simplificado

Navegadores web utilizam pilhas para verificar se o documento HTML está sintaticamente bem formado. Implemente a função `validar_tags_html(html: str) -> bool` que verifica se todas as tags de abertura (ex: `<div>`, `<p>`, `<b>`) possuem suas respectivas tags de fechamento (ex: `</div>`, `</p>`, `</b>`) fechadas na ordem correta.

**Exemplo:**
- **Entrada:** `"<html><body><h1>Titulo</h1><p>Texto</p></body></html>"` $\longrightarrow$ `True`
- **Entrada:** `"<div><p>Texto</div></p>"` $\longrightarrow$ `False` (cruzamento inválido)
- **Entrada:** `"<div><p>Texto</p>"` $\longrightarrow$ `False` (tag aberta não fechada)

**Código Inicial:**
```python
class Pilha:
    def __init__(self): self._elementos = []
    def push(self, item): self._elementos.append(item)
    def pop(self): return self._elementos.pop() if self._elementos else None
    def is_empty(self): return len(self._elementos) == 0

def validar_tags_html(html: str) -> bool:
    # TODO: Implemente a validação utilizando a Pilha
    pass
```

---

### Exercício 03: Remoção de Caracteres Adjacentes Duplicados (LeetCode #1047)

Dada uma string `s` composta por letras minúsculas. Uma *remoção de duplicado* consiste em escolher dois caracteres adjacentes e iguais e removê-los. O processo se repete até que não haja mais duplicados vizinhos.

Implemente a função `remover_duplicados_adjacentes(s: str) -> str`.

**Exemplo:**
- **Entrada:** `s = "abbaca"`
- **Passo a passo:** `"abbaca"` $\rightarrow$ remove `"bb"` $\rightarrow$ vira `"aaca"` $\rightarrow$ remove `"aa"` $\rightarrow$ vira `"ca"`.
- **Saída:** `"ca"`

**Código Inicial:**
```python
def remover_duplicados_adjacentes(s: str) -> str:
    # TODO: Utilize uma pilha para resolver em O(N) tempo e O(N) espaço
    pass
```

---

### Exercício 04: Pilha com Consulta de Mínimo em $O(1)$ (`MinStack` - LeetCode #155)

Projete uma classe `MinPilha` que, além das operações tradicionais `push`, `pop`, `peek`, suporte uma operação `get_min()` que retorna o menor elemento presente na pilha em **tempo constante $O(1)$**.

**Requisito:** Todas as operações (`push`, `pop`, `peek`, `get_min`) devem ser rigorosamente **$O(1)$**.

**Código Inicial:**
```python
class MinPilha:
    def __init__(self):
        # Dica: mantenha duas listas/pilhas internas: valores e minimos_historicos
        self._stack = []
        self._min_stack = []

    def push(self, val: int) -> None:
        pass

    def pop(self) -> int:
        pass

    def peek(self) -> int:
        pass

    def get_min(self) -> int:
        pass
```

---

### Exercício 05: Conversão de Base Decimal para Binário

O algoritmo clássico de conversão de um número inteiro positivo da base decimal para binário consiste em divisões sucessivas por $2$, acumulando os restos. Como os restos são obtidos do bit menos significativo para o mais significativo, a ordem de leitura para formar o número final é exatamente a inversa da ordem em que foram calculados.

Implemente a função `decimal_para_binario(n: int) -> str` utilizando uma Pilha.

**Exemplo:**
- **Entrada:** `25`
- **Saída:** `"11001"`

---

### Exercício 06: Histórico de Navegação (Back / Forward)

Implemente a classe `NavegadorWeb` que simula os botões "Acessar Página", "Voltar" e "Avançar" de um browser utilizando **duas pilhas** (`pilha_voltar` e `pilha_avancar`).

- `visitar(url)`: Abre uma nova URL. Limpa o histórico de avançar.
- `voltar(passos)`: Retorna no histórico até o número de passos solicitados.
- `avancar(passos)`: Avança no histórico até o número de passos solicitados.
