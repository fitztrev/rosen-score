import { PgnMove } from '@mliebelt/pgn-types'
import { TrophyCheckResult } from '../types/types'

/*
 * This basically converts all the moves in a game to a string
 * with either an x (indicating a capture) or a . (non-capture)
 * ex: .....xx.xx............xxxxxxxxxxx..
 */

export function consecutiveCapturesAnySquare(moves: PgnMove[], count: number): TrophyCheckResult {
    let captures = moves.map((move) => (move.notation.strike === 'x' ? 'x' : '.')).join('')

    if (captures.includes('x'.repeat(count))) {
        return [
            {
                color: 'w',
                onMoveNumber: captures.indexOf('x'.repeat(count)),
            },
            {
                color: 'b',
                onMoveNumber: captures.indexOf('x'.repeat(count)),
            },
        ]
    }

    return []
}

export function consecutiveCapturesSameSquare(moves: PgnMove[], count: number): TrophyCheckResult {
    let captures = moves
        .map((move, index) => {
            let previousIndex = Math.max(index - 1, 0)

            const currentDestinationSquare = move.notation.col + move.notation.row
            const previousDestinationSquare = moves[previousIndex].notation.col + moves[previousIndex].notation.row

            if (move.notation.strike === 'x' && currentDestinationSquare === previousDestinationSquare) {
                return 'x'
            } else {
                return '.'
            }
        })
        .join('')

    if (captures.includes('x'.repeat(count))) {
        return [
            {
                color: 'w',
                onMoveNumber: captures.indexOf('x'.repeat(count)),
            },
            {
                color: 'b',
                onMoveNumber: captures.indexOf('x'.repeat(count)),
            },
        ]
    }

    return []
}
