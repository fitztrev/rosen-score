import { PgnMove } from 'chess-fetcher'
import { TrophyCheckResult } from '../types/types'

export function checkmateAtMoveNumber(moves: PgnMove[], moveNumber: number): TrophyCheckResult {
    const lastMove = moves[moves.length - 1]

    if (lastMove.notation.check === '#' && Math.ceil(moves.length / 2) === moveNumber) {
        return [
            {
                color: lastMove.turn,
                onMoveNumber: moves.length,
            },
        ]
    }

    return []
}
