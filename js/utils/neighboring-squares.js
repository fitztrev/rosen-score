export default function (square) {
    let neighbors = [
        [-1, -1],
        [-1, 0],
        [-1, +1],
        [0, -1],
        [0, +1],
        [+1, -1],
        [+1, 0],
        [+1, +1],
    ]

    let files = 'abcdefgh'
    let ranks = '12345678'

    let currentFile = files.indexOf(square[0])
    let currentRank = ranks.indexOf(square[1])

    let neighborSquares = []

    for (const adjacent of neighbors) {
        let neighborFile = files.charAt(currentFile + adjacent[0])
        let neighborRank = ranks.charAt(currentRank + adjacent[1])

        if (neighborFile && neighborRank) {
            neighborSquares.push(neighborFile + neighborRank)
        }
    }

    return neighborSquares.sort()
}
