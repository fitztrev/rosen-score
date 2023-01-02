import { PgnMove } from 'chess-fetcher'

export function alphabetOpening(word: string, moves: PgnMove[]) {
    let whitePieceMoves = moves
        .filter((move) => move.turn === 'w')
        .map((move) => move.notation.notation[0])
        .join('')

    let blackPieceMoves = moves
        .filter((move) => move.turn === 'b')
        .map((move) => move.notation.notation[0])
        .join('')

    let colors = []

    if (whitePieceMoves.indexOf(word) === 0) {
        colors.push('w')
    }

    if (blackPieceMoves.indexOf(word) === 0) {
        colors.push('b')
    }

    return colors
}
