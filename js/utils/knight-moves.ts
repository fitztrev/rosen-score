import { Square } from 'chess.js'

export function knightMoves(square: Square): Square[] {
    let knightMoves = [
        [-2, -1],
        [-2, +1],
        [+2, -1],
        [+2, +1],
        [-1, -2],
        [-1, +2],
        [+1, -2],
        [+1, +2],
    ]

    let files = 'abcdefgh'
    let ranks = '12345678'

    let currentFile = files.indexOf(square[0])
    let currentRank = ranks.indexOf(square[1])

    let destinations = []

    for (const knightMove of knightMoves) {
        let destinationFile = files.charAt(currentFile + knightMove[0])
        let destinationRank = ranks.charAt(currentRank + knightMove[1])

        if (destinationFile && destinationRank) {
            destinations.push(destinationFile + destinationRank)
        }
    }

    destinations = destinations.sort((a, b) => a.localeCompare(b))

    return destinations as Square[]
}
