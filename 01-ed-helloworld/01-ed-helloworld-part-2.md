---
marp: true

author: "Eduardo Cruz Araujo"
title: "Estruturas de Dados"
description: "Disciplina de Estruturas de Dados."

theme: "default"
class: "invert"

footer: "Eduardo Cruz Araujo | Fatec | 2026.2 | Estruturas de Dados | Hello World (Part. 2)"

paginate: "true"

---

# Estrutura de Dados :mortar_board:
## Hello World (Part. 2)

--- 

Hello World (Part. 2)
## Python

---

Python
## Filosofia do Python, Tipagem Dinâmica e Indentação

---

## A filosofia do Python

Python foi criado para ser **legível** e **simples**. Isso não é só estilo — é princípio de design.

> "Legibilidade conta." — *Zen do Python*

```python
import this
```

Rodando isso no interpretador, o próprio Python imprime seus princípios (o "Zen do Python").

Consequência prática: **código limpo > código "esperto"**.

---

## Tipagem dinâmica

Em Python, você **não declara o tipo** da variável — o interpretador descobre isso em tempo de execução.

```python
x = 10        # int
x = "dez"     # agora x é uma string
x = 10.0      # agora x é float
```

- A mesma variável pode receber tipos diferentes ao longo do programa
- Isso dá flexibilidade, mas exige atenção: erros de tipo só aparecem **em tempo de execução**

```python
idade = "20"
print(idade + 5)   # TypeError: não dá pra somar str com int
```

---

## Verificando tipos

```python
x = 10
print(type(x))        # <class 'int'>

y = "texto"
print(type(y))         # <class 'str'>
```

Conversões explícitas de tipo (*casting*):

```python
idade = int("20")      # str -> int
altura = float("1.75") # str -> float
texto = str(42)        # int -> str
```

Isso vai ser **essencial** mais pra frente, quando formos ler dados do teclado.

---

## Indentação: a Regra de Ouro do Python

Em Python, **a indentação não é estética — é sintaxe**.

Ela define **blocos de código** (o que pertence a um `if`, `for`, `while`, função etc.)

```python
if True:
    print("Este print está dentro do if")
print("Este print está fora do if")
```

- Use **4 espaços** por nível (padrão da comunidade — PEP 8)
- Nunca misture espaços e tabs
- Editores como VS Code já ajustam isso automaticamente

---

## O que acontece se eu errar a indentação?

```python
if True:
print("Isso vai dar erro!")
```

```
IndentationError: expected an indented block
```

⚠️ Esse é um dos erros mais comuns para quem está começando.
Sempre que aparecer `IndentationError`, o problema é **alinhamento**.

Vamos guardar essa regra: **tudo que "pertence" a uma linha com `:` no final deve estar indentado abaixo dela.**

---

Python
## Operadores e Estruturas de Decisão

---

## Operadores em Python

| Categoria | Operadores | Exemplo |
|-----------|-----------|---------|
| Aritméticos | `+ - * / // % **` | `7 // 2 = 3` |
| Comparação | `== != > < >= <=` | `5 == 5` |
| Lógicos | `and` `or` `not` | `True and False` |

- `/` sempre retorna `float`
- `//` é divisão inteira (descarta o resto)
- `%` retorna o resto da divisão (módulo)

```python
print(7 / 2)    # 3.5
print(7 // 2)   # 3
print(7 % 2)    # 1
```

---

## Estrutura condicional: `if`

Permite tomar decisões no código.

```python
idade = 20

if idade >= 18:
    print("Maior de idade")
```

- A condição depois do `if` deve resultar em `True` ou `False`
- O bloco indentado só executa se a condição for verdadeira

---

## `if`, `elif` e `else`

```python
nota = 7

if nota >= 9:
    print("Aprovado com excelência")
elif nota >= 6:
    print("Aprovado")
else:
    print("Reprovado")
```

- `elif` = "senão, se" → testa outra condição
- `else` = "senão" → executa quando nenhuma condição anterior foi verdadeira
- Pode haver vários `elif`, mas só um `if` e um `else`

---

## Combinando condições

```python
idade = 25
tem_carteira = True

if idade >= 18 and tem_carteira:
    print("Pode dirigir")
else:
    print("Não pode dirigir")
```

- `and` → as duas precisam ser verdadeiras
- `or` → basta uma ser verdadeira
- `not` → inverte o valor lógico

---

Python
## Laços de Repetição: `while` e `for`

---

## Estrutura de repetição: `while`

Usado quando repetimos **enquanto uma condição for verdadeira** — não sabemos de antemão quantas vezes.

```python
contador = 0

while contador < 5:
    print(contador)
    contador += 1
```

⚠️ Cuidado com **loops infinitos**: sempre garanta que a condição vai se tornar falsa em algum momento!

---

## Estrutura de repetição: `for` com `range()`

Usado quando sabemos **quantas vezes** queremos repetir.

```python
for i in range(5):
    print(i)          # 0, 1, 2, 3, 4
```

`range()` tem três formas de uso:

```python
range(5)        # 0 a 4
range(2, 6)     # 2 a 5
range(0, 10, 2) # 0, 2, 4, 6, 8 (pula de 2 em 2)
```

---

## `for` vs `while`: quando usar cada um?

| Situação | Use |
|----------|-----|
| Sei o número de repetições (ou uso `range`) | `for` |
| Repito até uma condição deixar de ser verdadeira | `while` |

```python
resposta = ""
while resposta != "sair":
    resposta = input("Digite algo (ou 'sair'): ")
```

```python
for tentativa in range(3):
    print("Tentativa número", tentativa + 1)
```

---

Python
## Coleções Básicas

---

## Criando listas

Listas guardam **várias informações em uma única variável**, em ordem.

```python
numeros = [4, 7, 2, 9, 1]
nomes = ["Ana", "Bruno", "Carla"]
mista = [1, "dois", 3.0, True]

vazia = []
```

- Podem conter qualquer tipo de dado, até misturados
- São **mutáveis** (podem ser alteradas depois de criadas)

---

## Acessando por índice

O índice começa em **0**.

```python
frutas = ["maçã", "banana", "uva"]

print(frutas[0])   # maçã
print(frutas[1])   # banana
print(frutas[-1])  # uva (índice negativo = a partir do fim)
```

```python
frutas[1] = "morango"   # substitui "banana" por "morango"
print(frutas)            # ['maçã', 'morango', 'uva']
```

⚠️ Acessar um índice que não existe gera `IndexError`.

---

## Adicionando itens: `.append()`

```python
frutas = ["maçã", "banana"]

frutas.append("uva")
print(frutas)   # ['maçã', 'banana', 'uva']
```

- `.append()` sempre adiciona **ao final** da lista
- Muito usado dentro de laços para ir "montando" uma lista

```python
quadrados = []

for i in range(5):
    quadrados.append(i ** 2)

print(quadrados)   # [0, 1, 4, 9, 16]
```

---

## Percorrendo listas com `for`

```python
frutas = ["maçã", "banana", "uva"]

for fruta in frutas:
    print(fruta)
```

Também é comum usar `len()` junto com `range()`:

```python
for i in range(len(frutas)):
    print(i, frutas[i])
```

`len(frutas)` retorna o tamanho da lista (quantidade de itens).

---

## As 4 estruturas de dados essenciais

Python tem quatro coleções básicas, cada uma com um propósito diferente:

| Estrutura | Sintaxe | Ordenada | Mutável | Repetição |
|-----------|---------|----------|---------|-----------|
| Lista | `[]` | ✅ | ✅ | ✅ |
| Tupla | `()` | ✅ | ❌ | ✅ |
| Dicionário | `{chave: valor}` | ✅ (desde 3.7) | ✅ | chaves não repetem |
| Set | `set()` | ❌ | ✅ | ❌ |

Escolher a estrutura certa é escolher a **ferramenta certa para o problema**.

---

## Listas: a base de quase tudo

```python
numeros = [4, 7, 2, 9, 1]
```

- **Mutáveis**: posso alterar, adicionar e remover itens
- **Ordenadas**: a ordem dos elementos é preservada
- **Aceitam repetição**: `[1, 1, 2, 2]` é uma lista válida

Já vimos: criação, índice, `.append()`, percorrer com `for`.
É a estrutura mais usada no dia a dia — flexível, mas isso tem um custo (menos otimizada que as outras para certos usos).

---

## Tuplas: mais rápidas e seguras para leitura

```python
ponto = (10, 20)
cores = ("vermelho", "verde", "azul")
```

- **Imutáveis**: uma vez criada, não dá pra alterar, adicionar ou remover itens
- **Ordenadas**: assim como as listas, mantêm a ordem dos elementos

```python
ponto[0] = 99   # TypeError: 'tuple' object does not support item assignment
```

Por que usar tupla em vez de lista?
- Mais **rápida** e **segura**: já que não muda, o Python otimiza o acesso
- Sinaliza para quem lê o código: "isso não deveria mudar"
- Muito usada para agrupar valores que formam um "pacote" (ex: coordenadas)

---

## Dicionários: acesso rápido por chave

```python
aluno = {
    "nome": "Eduardo",
    "idade": 30,
    "curso": "ADS"
}

print(aluno["nome"])   # Eduardo
aluno["idade"] = 31    # atualiza o valor
```

- **Mutáveis**: posso adicionar, alterar e remover pares chave-valor
- Cada **chave é única** (chaves repetidas se sobrescrevem)
- Acesso ao valor pela chave é em **O(1)** — tempo praticamente constante, não importa o tamanho do dicionário

💡 É a nossa futura **Tabela Hash**: por baixo dos panos, o dicionário usa uma função de hash para localizar o valor direto, sem precisar percorrer item por item.

---

## Percorrendo dicionários

```python
aluno = {"nome": "Eduardo", "idade": 30}

for chave in aluno:
    print(chave, "->", aluno[chave])

for chave, valor in aluno.items():
    print(chave, "->", valor)
```

- `.keys()` → só as chaves
- `.values()` → só os valores
- `.items()` → pares (chave, valor)

---

## Sets: coleções sem repetição

```python
numeros = {1, 2, 2, 3, 3, 3}
print(numeros)   # {1, 2, 3} -> repetições somem automaticamente
```

- **Mutáveis**: posso adicionar (`.add()`) e remover itens
- **Sem ordem**: não existe índice, não há garantia de ordem de exibição
- **Não aceitam repetição**: cada valor aparece uma única vez
- Busca (`in`) também é em **O(1)**, assim como o dicionário

```python
frutas = {"maçã", "banana"}
frutas.add("uva")
print("banana" in frutas)   # True — busca muito rápida
```

---

## Quando usar cada uma?

| Preciso de... | Use |
|----------------|-----|
| Uma coleção que muda bastante e mantém ordem | **Lista** |
| Um agrupamento fixo de valores (coordenadas, RGB) | **Tupla** |
| Associar uma informação a um identificador (chave) | **Dicionário** |
| Garantir que não haja valores repetidos / busca rápida | **Set** |

Essa escolha vai aparecer o tempo todo nos problemas do Beecrowd — muitas vezes a diferença entre um **Time Limit Exceeded** e um **Accepted** é usar a estrutura certa.

---

Python
## Entrada e Saída (I/O) e Formatação de Strings

---

## Lendo dados do teclado: `input()`

```python
nome = input("Digite seu nome: ")
print("Olá,", nome)
```

⚠️ `input()` **sempre retorna uma string**, mesmo se o usuário digitar um número.

```python
idade = input("Digite sua idade: ")
print(type(idade))   # <class 'str'>
```

Para usar como número, é preciso converter:

```python
idade = int(input("Digite sua idade: "))
print(idade + 1)
```

---

## Formatando strings: f-strings

A forma mais moderna e recomendada de formatar texto em Python.

```python
nome = "Eduardo"
idade = 30

print(f"{nome} tem {idade} anos")
```

Também dá para fazer contas e formatar números dentro da f-string:

```python
preco = 19.999
print(f"Preço: R$ {preco:.2f}")   # Preço: R$ 20.00
```

`:.2f` → arredonda para 2 casas decimais.

---

Python
## Beecrowd

---

## Lendo vários dados na mesma linha

Muitos problemas do Beecrowd pedem múltiplos valores **em uma única linha de entrada**, separados por espaço.

```python
linha = input()          # "3 7 10"
partes = linha.split()   # ['3', '7', '10']
print(partes)
```

`.split()` quebra a string em uma **lista de strings**, usando espaço como separador por padrão.

---

## Combinando `split()` com `map()`

O problema: `.split()` gera strings, mas geralmente precisamos de números.

```python
a, b, c = map(int, input().split())
print(a + b + c)
```

- `input().split()` → lista de strings: `['3', '7', '10']`
- `map(int, ...)` → converte cada item para `int`
- Podemos "desempacotar" direto em variáveis (`a, b, c`)

```python
numeros = list(map(int, input().split()))
print(numeros)   # [3, 7, 10]
```

---

## Ambientação no Beecrowd

**Beecrowd** (antigo URI Online Judge) é uma plataforma de exercícios de programação:

- Você lê o enunciado do problema
- Escreve o código em Python
- Envia (submete) a solução
- A plataforma testa automaticamente com vários casos de teste

---

## Entendendo os vereditos do Beecrowd

| Veredito | Significado |
|----------|-------------|
| **Accepted (AC)** | Solução correta ✅ |
| **Wrong Answer (WA)** | Saída diferente do esperado (lógica) |
| **Runtime Error (RE)** | Erro durante a execução (ex: índice inválido) |
| **Time Limit Exceeded (TLE)** | Demorou demais para responder |
| **Compilation Error (CE)** | Erro de sintaxe/indentação |
| **Presentation Error (PE)** | Saída certa, mas formatação (espaços/quebras) errada |

---

## Como submeter no Beecrowd

1. Acesse o problema indicado
2. Leia com atenção a **entrada** e **saída esperada**
3. Escreva o código em Python no editor (ou cole a solução)
4. Selecione a linguagem: **Python 3**
5. Clique em **Submit/Enviar**
6. Acompanhe o resultado no histórico de envios

⚠️ Atenção ao formato exato de saída (espaços, quebras de linha, texto exato pedido)

---

## Vamos resolver juntos: Problema 1042 (ou 1001 / 1038)

Estrutura sugerida para atacar o problema:

1. Entender o que a entrada representa
2. Definir como ler os dados (`input()`, `split()`, `map()`)
3. Pensar na lógica (`if`/`for`/`while`?)
4. Escrever, testar mentalmente e submeter
5. Se der erro, identificar o veredito e ajustar

---

## Code Review

Depois de resolver, vamos revisar o código em conjunto observando:

- **Indentação** está consistente?
- Nomes de variáveis fazem sentido?
- Existe alguma repetição de código que poderia virar um laço?
- A saída está **exatamente** no formato pedido?
- Daria para simplificar usando `f-string`, `.append()` ou `range()`?

---

# Contato :mortar_board:

---

![bg right:35%](images/94c58c652f08235bd2c1c3abd95cd2ac.png)

## Eduardo Cruz Araujo

- E-mail: [eduardo.araujo@cps.sp.gov.br](eduardo.araujo@cps.sp.gov.br)
- Linkedin: [edcaraujo](https://www.instagram.com/)
- Github: [edcaraujo](https://github.com/edcaraujo)






