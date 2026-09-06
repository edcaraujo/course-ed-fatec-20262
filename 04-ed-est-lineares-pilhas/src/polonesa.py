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

for c in s:
    #if c != '+' or c != '-' or c != '*' or c != "/":
    if c not in ['+','-','*','/']:
        p.push(c)
    else:
        y = int(p.pop())
        x = int(p.pop())

        r = 0

        if c == '+':
            r = x+y
        elif c == '-':
            r = x-y
        elif c == '*':
            r = x*y
        else:
            r = x/y

        p.push(str(r))

print(p.pop())          
