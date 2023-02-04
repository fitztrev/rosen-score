import { PgnMove } from '@mliebelt/pgn-types'
import { Game } from 'chess-fetcher'
import { TrophyCheckResult } from '../types/types'

export function avoidTheFlagCheckmate(game: Game, moves: PgnMove[]): TrophyCheckResult {
    // game must not have increment
    if (game.timeControl.increment !== 0) {
        return []
    }

    const lastMove = moves[moves.length - 1]

    // game must end in checkmate
    if (lastMove.notation.check !== '#') {
        return []
    }

    // some older games don't have clk times in the PGN
    if (!moves[0].commentDiag) {
        return []
    }

    const clockTimes = moves
        .map((move) => {
            if (!move.commentDiag || !move.commentDiag.clk) {
                return ''
            }
            return move.commentDiag.clk
        })
        .slice(-20 * 2)

    if (clockTimes.length !== 20 * 2) {
        return []
    }

    let timeRemainingTwentyMovesAgo = parseInt(clockTimes[1].replace(/\D/g, ''))

    if (timeRemainingTwentyMovesAgo <= 1) {
        return [
            {
                color: lastMove.turn,
                onMoveNumber: moves.length - 1,
            },
        ]
    }

    return []
}
