"""
Problema: Validação de Escopos (Parênteses, Chaves e Colchetes)
LeetCode #20 - Valid Parentheses / Beecrowd #1068 - Balanço de Parênteses I

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
def validar_escopos_com_classe(s: str) -> bool:
    """
    Verifica se a sequência de delimitadores () [] {} é válida
    utilizando a nossa classe Pilha.
    
    Complexidade de Tempo: O(N)
    Complexidade de Espaço: O(N)
    """
    pilha = Pilha()
    mapa_pares = {')': '(', ']': '[', '}': '{'}

    for char in s:
        # Se for caractere de abertura, empilha
        if char in mapa_pares.values():
            pilha.push(char)
        # Se for caractere de fechamento
        elif char in mapa_pares:
            if pilha.is_empty() or pilha.pop() != mapa_pares[char]:
                return False

    return pilha.is_empty()


# ============================================================================
# Abordagem 2: Utilizando a list nativa do Python como pilha
# ============================================================================
def validar_escopos_com_list(s: str) -> bool:
    """
    Versão idiomática em Python utilizando 'list' simulando LIFO com append() e pop().
    """
    stack = []
    mapa = {')': '(', ']': '[', '}': '{'}

    for char in s:
        if char in mapa.values():
            stack.append(char)
        elif char in mapa:
            if not stack or stack.pop() != mapa[char]:
                return False

    return len(stack) == 0


if __name__ == "__main__":
    testes = [
        ("()", True),
        ("()[]{}", True),
        ("(]", False),
        ("([)]", False),
        ("{[]}", True),
        ("(((", False),
        (")", False),
        ("a + (b * [c + {d / 2}])", True),
    ]

    print("=== Teste com Classe Customizada Pilha (Sem Imports) ===")
    for entrada, esperado in testes:
        resultado = validar_escopos_com_classe(entrada)
        status = "✅ PASSOU" if resultado == esperado else "❌ FALHOU"
        print(f"Entrada: {entrada:<25} | Esperado: {str(esperado):<5} | Obtido: {str(resultado):<5} -> {status}")

    print("\n=== Teste com List Nativa do Python ===")
    for entrada, esperado in testes:
        resultado = validar_escopos_com_list(entrada)
        status = "✅ PASSOU" if resultado == esperado else "❌ FALHOU"
        print(f"Entrada: {entrada:<25} | Esperado: {str(esperado):<5} | Obtido: {str(resultado):<5} -> {status}")
