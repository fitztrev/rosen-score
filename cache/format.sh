#!/bin/sh

sort eric.txt > sorted.txt

sed -i '' s/$/,/ sorted.txt

echo "export default [" > eric.js
cat sorted.txt >> eric.js
echo "]" >> eric.js

rm sorted.txt

echo "export default '$(date +%s000)'" > eric-last-updated.js
