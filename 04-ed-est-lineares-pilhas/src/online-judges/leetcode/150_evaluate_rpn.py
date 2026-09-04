"""
LeetCode #150 - Evaluate Reverse Polish Notation (Médio)
https://leetcode.com/problems/evaluate-reverse-polish-notation/

Demonstração com a nossa classe Pilha declarada diretamente no código da solução
(pronta para submissão direta no LeetCode sem imports externos).
"""
from typing import List

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


class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        pilha = Pilha()
        operadores = {'+', '-', '*', '/'}
        
        for token in tokens:
            if token not in operadores:
                pilha.push(int(token))
            else:
                b = pilha.pop()
                a = pilha.pop()
                if token == '+':
                    pilha.push(a + b)
                elif token == '-':
                    pilha.push(a - b)
                elif token == '*':
                    pilha.push(a * b)
                elif token == '/':
                    pilha.push(int(a / b))
                
        return pilha.pop()


if __name__ == "__main__":
    sol = Solution()
    assert sol.evalRPN(["2", "1", "+", "3", "*"]) == 9
    assert sol.evalRPN(["4", "13", "5", "/", "+"]) == 6
    assert sol.evalRPN(["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]) == 22
    print("LeetCode #150 com classe Pilha embutida: Todos os testes passaram!")
