class Fila:
    def __init__(self,capacidade = 100):
        self._capacidade = capacidade
        self._elementos = [None]*self._capacidade
        self._inicio = 0
        self._fim = 0
        self._tamanho = 0


    def empilhar(self,item):
        if self._tamanho == self._capacidade:
            raise OverflowError("Queue Overflow!")

        self._elementos[self._fim] = item

        #logica do circular
        if self._fim+1 >= self._capacidade:
            self._fim = 0
        else:
            self._fim += 1

        self._tamanho += 1

    def desempilhar(self):
        if self.eh_vazio():
            raise IndexError("Queue Underflow!")

        item = self._elementos[self._inicio]

        #logica do circular
        if self._inicio+1 >= self._capacidade:
            self._inicio = 0
        else:
            self._inicio += 1

        self._tamanho -= 1

        return item

    def topo(self):
        if self.eh_vazio():
            raise IndexError("Queue Underflow!")

        item = self._elementos[self._inicio]

        return item

    def eh_vazio(self):
        return self._tamanho == 0

    def tamanho(self):
        return self._tamanho


minha_fila = Fila()

minha_fila.empilhar(30)
minha_fila.empilhar(2)
minha_fila.empilhar(5)
minha_fila.empilhar(13)

while not minha_fila.eh_vazio():
    item = minha_fila.desempilhar()

    print(item)

