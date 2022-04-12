import json

with open('EricRosen-AllGames.txt') as f:
    firstline = f.readline().rstrip()

lastDownloadedGame = json.loads(firstline)

print(lastDownloadedGame['createdAt'] + 1)
