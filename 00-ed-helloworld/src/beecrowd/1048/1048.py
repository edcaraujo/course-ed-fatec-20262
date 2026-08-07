salario = float(input())

novo_salario = 0
reajuste = 0
percentual = 0

if salario <= 400.00:
    novo_salario = salario*1.15
    reajuste = novo_salario - salario
    percentual = 15
elif salario >= 400.01 and salario <= 800.00:
    novo_salario = salario*1.12
    reajuste = novo_salario - salario
    percentual = 12
elif salario >= 800.01 and salario <= 1200.00:
    novo_salario = salario*1.10
    reajuste = novo_salario - salario
    percentual = 10
elif salario >= 1200.01 and salario <= 2000.00:
    novo_salario = salario*1.07
    reajuste = novo_salario - salario
    percentual = 7
else:
    novo_salario = salario*1.04
    reajuste = novo_salario - salario
    percentual = 4

print(f"Novo salario: {novo_salario:.2f}")
print(f"Reajuste ganho: {reajuste:.2f}")
print(f"Em percentual: {percentual} %")