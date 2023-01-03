import { PgnMove } from 'chess-fetcher'
import { TrophyCheckResult } from '../types/types'

export function blockCheckWithCheckmate(moves: PgnMove[]): TrophyCheckResult {
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
            return [
                {
                    color: moves[moveNumber].turn,
                    onMoveNumber: moveNumber,
                },
            ]
        }
    }

    return []
}
