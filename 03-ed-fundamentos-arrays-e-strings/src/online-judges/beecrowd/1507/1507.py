n = int(input())

for _ in range(n):
    s = input()
    q = int(input())

    for _ in range(q):
        sub = input()
        x = 0

        result = "No"

        for i in range(len(s)):
            if s[i] == sub[x]:
                x += 1

                if x == len(sub): # Achei todos os caracteres de 'sub' em 's'
                    result = "Yes"
                    break

        print(result)



