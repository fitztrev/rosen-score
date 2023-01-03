import { Game, PgnMove } from 'chess-fetcher'
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

    const winnerClockTimes = moves
        .map((move) => {
            if (!move.commentDiag || !move.commentDiag.clk) {
                console.log('no clk', game)
            }
            return move.turn + ' - ' + move.commentDiag.clk
        })
        .slice(-40)
        .filter(function (_value, index) {
            return index % 2 !== 0
        })

    if (winnerClockTimes.length !== 20) {
        return []
    }

    let timeRemainingTwentyMovesAgo = parseInt(winnerClockTimes[0].replace(/\D/g, ''))

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
