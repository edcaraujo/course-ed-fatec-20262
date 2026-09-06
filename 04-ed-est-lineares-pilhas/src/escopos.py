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

s = input()

p = Pilha()

is_valid = True

for c in s: # Para cara caractere 'c' em 's' faça
    if c == '(' or c == '{' or c == '[':
        p.push(c)
    else:
        
        if (c == ')' and p.peek() != '(') or \
           (c == ']' and p.peek() != '[') or \
           (c == '}' and p.peek() != '{'):
            is_valid = False
            break
        else:
            p.pop()

if is_valid and p.is_empty():
    print("Balanciado")
else:
    print("Invalido")