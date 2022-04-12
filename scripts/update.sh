#!/bin/sh

URL="https://lichess.org/api/games/user/EricRosen?pgnInJson=true&clocks=true&since=$(python3 update-eric-games.py)"

echo $URL

curl -H "Accept: application/x-ndjson" $URL > temp.txt

cat temp.txt EricRosen-AllGames.txt > temp2.txt

mv temp2.txt EricRosen-AllGames.txt

rm temp.txt
