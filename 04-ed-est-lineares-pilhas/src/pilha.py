class Pilha:
    def __init__(self):
        self.elementos = []

    def push(self, item):
        self.elementos.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Pilha está vazia!")
        
        return self.elementos.pop()

    def peek(self):
        if self.is_empty():
            raise IndexError("Pilha está vazia!")
        
        return self.elementos[-1]

    def is_empty(self):
        return self.size() == 0

    def size(self):
        return len(self.elementos)

    def print_pilha(self):
        print(self.elementos)