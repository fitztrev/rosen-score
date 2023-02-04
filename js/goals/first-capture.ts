import { PgnMove } from '@mliebelt/pgn-types'
import { TrophyCheckResult } from '../types/types'

export function getMoveNumberOfFirstCapture(moves: PgnMove[]): number {
    return moves.findIndex((move) => move.notation.strike === 'x')
}

export function noCapturesBeforeMoveNumber(moves: PgnMove[], beforeMoveNumber: number): TrophyCheckResult {
    let firstCapture = getMoveNumberOfFirstCapture(moves)

    if (firstCapture >= (beforeMoveNumber - 1) * 2) {
        return [
            {
                color: 'w',
                onMoveNumber: firstCapture,
            },
            {
                color: 'b',
                onMoveNumber: firstCapture,
            },
        ]
    }

    if (firstCapture === -1 && moves.length >= beforeMoveNumber * 2) {
        return [
            {
                color: 'w',
                onMoveNumber: moves.length,
            },
            {
                color: 'b',
                onMoveNumber: moves.length,
            },
        ]
    }

    return []
}
