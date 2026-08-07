salario = float(input())

salarios = [400.00, 800.00, 1200.00, 2000.00]
percentuais = [15, 12, 10, 7]

novo_salario = 0
reajuste = 0
percentual = 4

for i in range(len(salarios)):
    if salario <= salarios[i]:
        percentual = percentuais[i]
        break

novo_salario = salario*(percentual/100 + 1)
reajuste = novo_salario - salario

print(f"Novo salario: {novo_salario:.2f}")
print(f"Reajuste ganho: {reajuste:.2f}")
print(f"Em percentual: {percentual} %")