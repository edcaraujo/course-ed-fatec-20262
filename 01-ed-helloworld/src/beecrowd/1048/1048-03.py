salario = float(input())

novo_salario = 0
reajuste = 0
percentual = 0

if salario <= 400.00:
    percentual = 15
elif salario <= 800.00:
    percentual = 12
elif salario <= 1200.00:
    percentual = 10
elif salario <= 2000.00:
    percentual = 7
else:
    percentual = 4

novo_salario = salario*(percentual/100 + 1)
reajuste = novo_salario - salario

print(f"Novo salario: {novo_salario:.2f}")
print(f"Reajuste ganho: {reajuste:.2f}")
print(f"Em percentual: {percentual} %")