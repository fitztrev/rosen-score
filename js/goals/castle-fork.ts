import { PgnMove } from '@mliebelt/pgn-types'
import { TrophyCheckResult } from '../types/types'

export function castleFork(moves: PgnMove[]): TrophyCheckResult {
    // game must have a castle with check to be considered
    let castleWithCheck = moves.findIndex((move) => {
        return move.notation.notation.endsWith('O-O+')
    })

    if (castleWithCheck === -1) {
        return []
    }

    for (const moveNum in moves) {
        const moveNumber = parseInt(moveNum)

        // to have a "Castle Fork" moment, it requires at least 2 followup moves (the opponent's move + your capture)
        if (moves[moveNumber + 2] === undefined) {
            return []
        }

        // you castle with check
        // then your next move is your King captures a piece
        if (
            moves[moveNumber].notation.notation.endsWith('O-O+') &&
            moves[moveNumber + 2].notation.fig === 'K' &&
            moves[moveNumber + 2].notation.strike === 'x'
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
