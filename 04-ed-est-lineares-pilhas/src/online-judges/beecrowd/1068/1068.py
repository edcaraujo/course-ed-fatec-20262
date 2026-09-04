"""
Beecrowd #1068 - Balanço de Parênteses I
Complexidade de Tempo: O(N) por caso de teste
Complexidade de Espaço: O(N)

Solução com a nossa classe Pilha embutida diretamente (sem imports).
"""
import sys

class Pilha:
    def __init__(self):
        self._elementos = []

    def push(self, item):
        self._elementos.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Pilha vazia!")
        return self._elementos.pop()

    def is_empty(self):
        return len(self._elementos) == 0


def verificar_balanco(expressao: str) -> str:
    pilha = Pilha()
    
    for ch in expressao:
        if ch == '(':
            pilha.push(ch)
        elif ch == ')':
            if pilha.is_empty():
                return "incorrect"
            pilha.pop()
            
    return "correct" if pilha.is_empty() else "incorrect"


def main():
    for linha in sys.stdin:
        linha = linha.rstrip('\r\n')
        if not linha:
            continue
        print(verificar_balanco(linha))


if __name__ == "__main__":
    main()
