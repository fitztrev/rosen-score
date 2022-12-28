import fs from 'fs'

let games = fs
    .readFileSync('eric.txt')
    .toString()
    .split('\n')
    .filter(Boolean)
    .map((game) => JSON.parse(game))
    .sort((a, b) => (a.createdAt > b.createdAt ? -1 : 1))
    .map((game) => '  ' + JSON.stringify(game) + ',')
    .join('\n')
    .slice(0, -1) // remove the last trailing comma

fs.writeFileSync('./eric.json', `[\n${games}\n]`)

fs.writeFileSync('./eric-last-updated.json', JSON.stringify(new Date().getTime()))
