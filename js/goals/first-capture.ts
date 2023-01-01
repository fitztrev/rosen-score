import { PgnMove } from 'chess-fetcher'

export function getMoveNumberOfFirstCapture(moves: PgnMove[]) {
    return moves.findIndex((move) => move.notation.strike === 'x')
}

export function noCapturesBeforeMoveNumber(moves: PgnMove[], beforeMoveNumber: number) {
    let firstCapture = getMoveNumberOfFirstCapture(moves)

    if (firstCapture >= (beforeMoveNumber - 1) * 2) {
        return ['w', 'b']
    }

    if (firstCapture === -1 && moves.length >= beforeMoveNumber * 2) {
        return ['w', 'b']
    }

    return []
}
