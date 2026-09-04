"""
LeetCode #20 - Valid Parentheses (Fácil)
https://leetcode.com/problems/valid-parentheses/

Demonstração com a nossa classe Pilha declarada diretamente no código da solução
(pronta para submissão direta no LeetCode sem imports externos).
"""

class Pilha:
    def __init__(self):
        self._elementos = []

    def push(self, item):
        self._elementos.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Pilha vazia!")
        return self._elementos.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Pilha vazia!")
        return self._elementos[-1]

    def is_empty(self):
        return len(self._elementos) == 0

    def size(self):
        return len(self._elementos)


class Solution:
    def isValid(self, s: str) -> bool:
        pilha = Pilha()
        mapa = {')': '(', '}': '{', ']': '['}

        for ch in s:
            if ch in mapa.values():
                pilha.push(ch)
            elif ch in mapa:
                if pilha.is_empty() or pilha.pop() != mapa[ch]:
                    return False

        return pilha.is_empty()


if __name__ == "__main__":
    sol = Solution()
    assert sol.isValid("()") is True
    assert sol.isValid("()[]{}") is True
    assert sol.isValid("(]") is False
    assert sol.isValid("([])") is True
    print("LeetCode #20 com classe Pilha embutida: Todos os testes passaram!")
