import fs from 'fs'
import prependFile from 'prepend-file'

let username = process.argv[2].toLowerCase()

console.log('Fetching games for ' + username)

let filename = `${username}.txt`

let lastDownloadedGameAt = fs.existsSync(filename)
    ? fs
          .readFileSync(filename)
          .toString()
          .split('\n')
          .slice(0, 1)
          .map((game) => JSON.parse(game))
          .map((game) => game.createdAt)
          .shift()
    : 0

let url = `https://lichess.org/api/games/user/${username}?pgnInJson=true&clocks=true&since=${lastDownloadedGameAt + 1}`

const response = await fetch(url, {
    headers: {
        Accept: 'application/x-ndjson',
    },
})

const newGames = await response.text()

await prependFile(filename, newGames)
