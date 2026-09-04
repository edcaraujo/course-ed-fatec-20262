"""
Problema: Avaliação de Expressões em Notação Polonesa Reversa (RPN / Postfix)
LeetCode #150 - Evaluate Reverse Polish Notation

Neste arquivo, a classe Pilha é definida diretamente aqui (sem imports externos),
permitindo copiar e colar o código em qualquer plataforma ou juiz online.
"""

# ============================================================================
# Nossa Classe Pilha (Definida diretamente no arquivo do problema)
# ============================================================================
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


# ============================================================================
# Abordagem 1: Utilizando a nossa própria classe Pilha (TAD)
# ============================================================================
def avaliar_rpn_com_classe(tokens: list[str]) -> int:
    """
    Avalia a expressão RPN com a classe Pilha.
    Complexidade de Tempo: O(N)
    Complexidade de Espaço: O(N)
    """
    pilha = Pilha()
    operadores = {'+', '-', '*', '/'}

    for token in tokens:
        if token not in operadores:
            pilha.push(int(token))
        else:
            # Em LIFO, o primeiro desempilhado é o operando da direita (b)!
            b = pilha.pop()
            a = pilha.pop()

            if token == '+':
                resultado = a + b
            elif token == '-':
                resultado = a - b
            elif token == '*':
                resultado = a * b
            elif token == '/':
                resultado = int(a / b)  # Trunca para zero

            pilha.push(resultado)

    return pilha.pop()


# ============================================================================
# Abordagem 2: Utilizando list nativa do Python
# ============================================================================
def avaliar_rpn_com_list(tokens: list[str]) -> int:
    """Versão idiomática com list."""
    stack = []
    operacoes = {
        '+': lambda a, b: a + b,
        '-': lambda a, b: a - b,
        '*': lambda a, b: a * b,
        '/': lambda a, b: int(a / b)
    }

    for token in tokens:
        if token in operacoes:
            b = stack.pop()
            a = stack.pop()
            stack.append(operacoes[token](a, b))
        else:
            stack.append(int(token))

    return stack.pop()


if __name__ == "__main__":
    exemplos = [
        (["2", "1", "+", "3", "*"], 9),
        (["4", "13", "5", "/", "+"], 6),
        (["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"], 22)
    ]

    print("=== Teste RPN com Classe Customizada Pilha (Sem Imports) ===")
    for tokens, esperado in exemplos:
        res = avaliar_rpn_com_classe(tokens)
        status = "✅ PASSOU" if res == esperado else "❌ FALHOU"
        print(f"Expressão: {' '.join(tokens):<35} | Resultado: {res:<4} (Esperado: {esperado}) -> {status}")

    print("\n=== Teste RPN com List Nativa do Python ===")
    for tokens, esperado in exemplos:
        res = avaliar_rpn_com_list(tokens)
        status = "✅ PASSOU" if res == esperado else "❌ FALHOU"
        print(f"Expressão: {' '.join(tokens):<35} | Resultado: {res:<4} (Esperado: {esperado}) -> {status}")
