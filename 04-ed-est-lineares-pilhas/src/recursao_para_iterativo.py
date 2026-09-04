"""
Problema: Conversão de Lógicas Recursivas para Iterativas usando Pilha Explícita
Conceito: Call Stack do Sistema Operacional vs. Heap Stack em Estrutura de Dados

Neste arquivo, a classe Pilha é definida diretamente aqui (sem imports externos),
permitindo copiar e colar o código em qualquer plataforma ou juiz online.
"""

import sys
from typing import Optional, List


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


class NoArvore:
    """Nó para representar uma árvore binária ou estrutura hierárquica."""
    def __init__(self, valor: str, esq: Optional['NoArvore'] = None, dir: Optional['NoArvore'] = None):
        self.valor = valor
        self.esq = esq
        self.dir = dir


# ============================================================================
# 1. Abordagem Recursiva (Usa a Call Stack da CPU / Interpretador Python)
# ============================================================================
def dfs_pre_ordem_recursivo(raiz: Optional[NoArvore], visitados: Optional[List[str]] = None) -> List[str]:
    """
    Percurso Pré-Ordem (Raiz -> Esquerda -> Direita) utilizando Recursão.
    A cada chamada, o SO aloca um Stack Frame na pilha de execução da CPU.
    """
    if visitados is None:
        visitados = []

    if raiz is None:
        return visitados

    visitados.append(raiz.valor)                  # Visita nó atual
    dfs_pre_ordem_recursivo(raiz.esq, visitados)   # Subárvore esquerda
    dfs_pre_ordem_recursivo(raiz.dir, visitados)   # Subárvore direita

    return visitados


# ============================================================================
# 2. Abordagem Iterativa (Usa a nossa Pilha customizada na Memória Heap)
# ============================================================================
def dfs_pre_ordem_iterativo_com_classe(raiz: Optional[NoArvore]) -> List[str]:
    """
    Percurso Pré-Ordem Iterativo utilizando a nossa classe Pilha.
    
    Como a Pilha é LIFO:
    - Para processar primeiro a ESQUERDA e depois a DIREITA,
      devemos empilhar primeiro o filho DIREITO e depois o ESQUERDO!
    """
    if raiz is None:
        return []

    visitados = []
    pilha = Pilha()
    pilha.push(raiz)

    while not pilha.is_empty():
        atual = pilha.pop()
        visitados.append(atual.valor)

        # Empilha filho direito primeiro para que o esquerdo fique no TOPO
        if atual.dir is not None:
            pilha.push(atual.dir)
        if atual.esq is not None:
            pilha.push(atual.esq)

    return visitados


# ============================================================================
# 3. Abordagem Iterativa com 'list' Nativa
# ============================================================================
def dfs_pre_ordem_iterativo_com_list(raiz: Optional[NoArvore]) -> List[str]:
    """Versão idiomática com list do Python."""
    if not raiz:
        return []

    visitados = []
    stack = [raiz]

    while stack:
        atual = stack.pop()
        visitados.append(atual.valor)

        if atual.dir:
            stack.append(atual.dir)
        if atual.esq:
            stack.append(atual.esq)

    return visitados


if __name__ == "__main__":
    # Montando a árvore de teste:
    #         A
    #       /   \
    #      B     C
    #     / \     \
    #    D   E     F
    raiz = NoArvore("A",
        esq=NoArvore("B", esq=NoArvore("D"), dir=NoArvore("E")),
        dir=NoArvore("C", dir=NoArvore("F"))
    )

    print("=== Percurso Pré-Ordem (DFS) ===")
    res_rec = dfs_pre_ordem_recursivo(raiz)
    res_it_classe = dfs_pre_ordem_iterativo_com_classe(raiz)
    res_it_list = dfs_pre_ordem_iterativo_com_list(raiz)

    print(f"Recursivo (Call Stack):     {res_rec}")
    print(f"Iterativo (Classe Pilha):   {res_it_classe}")
    print(f"Iterativo (list Python):    {res_it_list}")

    assert res_rec == res_it_classe == res_it_list
    print("✅ Todos os métodos produziram exatamente o mesmo resultado!")
