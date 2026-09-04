"""
Estrutura de Dados — Fatec Ribeirão Preto 2026.2
Módulo de Implementação Customizada de Pilha (Stack - LIFO)
Autor: Eduardo Cruz Araujo

Esta é a classe base apresentada em aula: simples, direta e autossuficiente,
podendo ser copiada e colada dentro de qualquer arquivo ou juiz online sem imports!
"""


class Pilha:
    """
    Implementação simples e direta do TAD Pilha (LIFO - Last-In, First-Out).
    
    Todas as operações no topo possuem complexidade O(1):
    - push(item): Adiciona item sobre o topo
    - pop(): Remove e retorna o item do topo
    - peek(): Retorna o item do topo sem remover
    - is_empty(): Retorna True se a pilha estiver vazia
    - size(): Retorna a quantidade de itens na pilha
    """

    def __init__(self):
        self._elementos = []

    def push(self, item):
        """Insere um novo elemento no topo da pilha."""
        self._elementos.append(item)

    def pop(self):
        """Remove e retorna o elemento do topo. Lança IndexError se estiver vazia."""
        if self.is_empty():
            raise IndexError("Stack Underflow: A pilha está vazia!")
        return self._elementos.pop()

    def peek(self):
        """Retorna o elemento do topo sem remover. Lança IndexError se estiver vazia."""
        if self.is_empty():
            raise IndexError("Stack Underflow: A pilha está vazia!")
        return self._elementos[-1]

    def is_empty(self):
        """Informa se a pilha está vazia."""
        return len(self._elementos) == 0

    def size(self):
        """Retorna a quantidade de elementos empilhados."""
        return len(self._elementos)

    def clear(self):
        """Esvazia a pilha."""
        self._elementos.clear()

    def __len__(self):
        return len(self._elementos)

    def __bool__(self):
        return not self.is_empty()

    def __repr__(self):
        if self.is_empty():
            return "Pilha: [] (vazia)"
        itens = ", ".join(repr(x) for x in self._elementos)
        return f"Pilha: [{itens}] <- TOPO"


# ============================================================================
# MATERIAL DE REFERÊNCIA AVANÇADA: VERSÃO COM TIPAGEM ESTÁTICA E GENÉRICOS
# (Apresentado ao final da aula para estudantes interessados em type hints)
# ============================================================================
from typing import Generic, TypeVar, Optional

T = TypeVar('T')

class PilhaGenerica(Generic[T]):
    """Versão de referência utilizando tipagem estática moderna (Generic[T])."""
    def __init__(self, capacidade_maxima: Optional[int] = None) -> None:
        self._elementos: list[T] = []
        self._capacidade_maxima = capacidade_maxima

    def push(self, item: T) -> None:
        if self._capacidade_maxima and len(self._elementos) >= self._capacidade_maxima:
            raise OverflowError("Stack Overflow: capacidade máxima atingida.")
        self._elementos.append(item)

    def pop(self) -> T:
        if self.is_empty():
            raise IndexError("Stack Underflow: pilha vazia.")
        return self._elementos.pop()

    def peek(self) -> T:
        if self.is_empty():
            raise IndexError("Stack Underflow: pilha vazia.")
        return self._elementos[-1]

    def is_empty(self) -> bool:
        return len(self._elementos) == 0

    def size(self) -> int:
        return len(self._elementos)
