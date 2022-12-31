import { PgnMove } from 'chess-fetcher'

export function blockCheckWithCheckmate(moves: PgnMove[]) {
    for (const moveNum in moves) {
        const moveNumber = parseInt(moveNum)

        // if it is checkmate
        // and the move before was a check
        // and it was not a King move
        // and it was not a capture
        if (
            moves[moveNumber].notation.check === '#' &&
            moves[moveNumber - 1].notation.check === '+' &&
            moves[moveNumber].notation.fig !== 'K' &&
            moves[moveNumber].notation.strike !== 'x'
        ) {
            return [moves[moveNumber].turn]
        }
    }

    return []
}
