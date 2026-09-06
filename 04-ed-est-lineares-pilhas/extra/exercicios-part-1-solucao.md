# 📖 Gabarito e Soluções: Estruturas Lineares — Pilhas (Parte 1)

**Disciplina:** Estrutura de Dados  
**Curso:** Análise e Desenvolvimento de Sistemas (ADS) — Fatec Ribeirão Preto  
**Professor:** Eduardo Cruz Araujo  
**Tópico:** Gabarito Comentado da Lista Extra de Pilhas

---

## Solução do Exercício 01: Inversor de Palavras em Texto

### Código Completo (Autossuficiente):
```python
class Pilha:
    def __init__(self): self._elementos = []
    def push(self, item): self._elementos.append(item)
    def pop(self): return self._elementos.pop() if self._elementos else None
    def is_empty(self): return len(self._elementos) == 0

def inverter_letras_palavras(frase: str) -> str:
    pilha = Pilha()
    resultado = []

    for char in frase:
        if char != " ":
            pilha.push(char)
        else:
            # Descarrega a pilha da palavra atual
            while not pilha.is_empty():
                resultado.append(pilha.pop())
            resultado.append(" ")

    # Descarrega a última palavra (se houver)
    while not pilha.is_empty():
        resultado.append(pilha.pop())

    return "".join(resultado)
```

### Análise de Complexidade:
- **Tempo:** $O(N)$ — Cada caractere da frase é empilhado exatamente uma vez e desempilhado exatamente uma vez. A junção com `"".join()` também é $O(N)$.
- **Espaço Auxiliar:** $O(N)$ — Memória para a pilha da palavra e para a lista do resultado.

---

## Solução do Exercício 02: Validador de Tags HTML

### Código Completo:
```python
def validar_tags_html(html: str) -> bool:
    stack = []
    i = 0
    n = len(html)

    while i < n:
        if html[i] == '<':
            fim = html.find('>', i)
            if fim == -1:
                return False  # Tag malformada sem fechamento '>'
            
            tag_conteudo = html[i + 1:fim].strip()
            
            # Se for tag de fechamento: </tag>
            if tag_conteudo.startswith('/'):
                tag_nome = tag_conteudo[1:].strip()
                if not stack or stack.pop() != tag_nome:
                    return False
            else:
                # Tag de abertura (ignora eventuais atributos internos)
                tag_nome = tag_conteudo.split()[0]
                stack.append(tag_nome)
                
            i = fim + 1
        else:
            i += 1

    return len(stack) == 0
```

### Análise de Complexidade:
- **Tempo:** $O(N)$ — Percorre os caracteres do texto HTML extraindo as tags linearmente.
- **Espaço Auxiliar:** $O(N)$ — Para armazenar a profundidade das tags aninhadas na pilha.

---

## Solução do Exercício 03: Remoção de Duplicados Adjacentes (LeetCode #1047)

### Código Completo:
```python
def remover_duplicados_adjacentes(s: str) -> str:
    stack = []

    for char in s:
        # Se a pilha não estiver vazia e o caractere atual for igual ao do topo:
        # significa que encontramos um par adjacente duplicado -> desempilha!
        if stack and stack[-1] == char:
            stack.pop()
        else:
            stack.append(char)

    return "".join(stack)
```

### Análise de Complexidade:
- **Tempo:** $O(N)$ — Apenas uma passagem pela string; cada caractere sofre no máximo um `append` e um `pop`.
- **Espaço Auxiliar:** $O(N)$ — A pilha guarda a sequência resultante no pior caso.

---

## Solução do Exercício 04: Pilha com Consulta de Mínimo em $O(1)$ (`MinStack`)

### Código Completo:
```python
class MinPilha:
    """
    Pilha com suporte a push, pop, top e get_min em estrito O(1).
    Estratégia: Mantém uma pilha auxiliar que armazena o menor valor histórico até aquele nível.
    """
    def __init__(self):
        self._stack = []
        self._min_stack = []

    def push(self, val: int) -> None:
        self._stack.append(val)
        # Se min_stack estiver vazia ou val for <= ao menor atual, empilha em min_stack
        if not self._min_stack or val <= self._min_stack[-1]:
            self._min_stack.append(val)

    def pop(self) -> int:
        if not self._stack:
            raise IndexError("Stack Underflow")
        removido = self._stack.pop()
        if removido == self._min_stack[-1]:
            self._min_stack.pop()
        return removido

    def peek(self) -> int:
        if not self._stack:
            raise IndexError("Stack Underflow")
        return self._stack[-1]

    def get_min(self) -> int:
        if not self._min_stack:
            raise IndexError("Stack Underflow")
        return self._min_stack[-1]
```

### Análise de Complexidade:
- **Tempo:** $O(1)$ para **todas** as operações (`push`, `pop`, `peek`, `get_min`).
- **Espaço Auxiliar:** $O(N)$ — No pior caso de ordem decrescente, a pilha auxiliar armazena $N$ elementos.

---

## Solução do Exercício 05: Conversão de Decimal para Binário

### Código Completo:
```python
def decimal_para_binario(n: int) -> str:
    if n == 0:
        return "0"

    pilha = []
    numero = n

    while numero > 0:
        resto = numero % 2
        pilha.append(str(resto))
        numero //= 2

    # Descarrega a pilha: como é LIFO, os restos saem na ordem inversa (correta)
    resultado = []
    while pilha:
        resultado.append(pilha.pop())

    return "".join(resultado)
```

### Análise de Complexidade:
- **Tempo:** $O(\log_2 N)$ — O número de divisões sucessivas por $2$ é igual ao número de bits do número.
- **Espaço Auxiliar:** $O(\log_2 N)$ — Armazena a quantidade de bits na pilha.

---

## Solução do Exercício 06: Histórico de Navegação Web

### Código Completo:
```python
class NavegadorWeb:
    def __init__(self, homepage: str):
        self.pagina_atual = homepage
        self.pilha_voltar = []
        self.pilha_avancar = []

    def visitar(self, url: str) -> None:
        self.pilha_voltar.append(self.pagina_atual)
        self.pagina_atual = url
        self.pilha_avancar.clear()

    def voltar(self, passos: int) -> str:
        while passos > 0 and self.pilha_voltar:
            self.pilha_avancar.append(self.pagina_atual)
            self.pagina_atual = self.pilha_voltar.pop()
            passos -= 1
        return self.pagina_atual

    def avancar(self, passos: int) -> str:
        while passos > 0 and self.pilha_avancar:
            self.pilha_voltar.append(self.pagina_atual)
            self.pagina_atual = self.pilha_avancar.pop()
            passos -= 1
        return self.pagina_atual
```

### Análise de Complexidade:
- `visitar`: $O(1)$
- `voltar`: $O(K)$, onde $K = \min(\text{passos}, \text{tamanho da pilha})$
- `avancar`: $O(K)$, onde $K = \min(\text{passos}, \text{tamanho da pilha})$
- Espaço: $O(N)$ proporcional ao total de páginas no histórico.
