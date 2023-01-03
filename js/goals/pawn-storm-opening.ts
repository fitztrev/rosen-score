import { Game, PgnMove } from 'chess-fetcher'
import { TrophyCheckResult } from '../types/types'

export function pawnStormOpening(game: Game, moves: PgnMove[]): TrophyCheckResult {
    if (!game.result.winner) {
        return []
    }

    let winnersMoves = moves
        .filter(function (move) {
            return move.turn === game.result.winner![0]
        })
        .map(function (move) {
            return move.notation.fig ? 'x' : '.'
        })

    let firstPieceMove = winnersMoves.indexOf('x')
    if (firstPieceMove >= 12) {
        return [
            {
                color: game.result.winner === 'white' ? 'w' : 'b',
                onMoveNumber: firstPieceMove * 2,
            },
        ]
    }

    return []
}
