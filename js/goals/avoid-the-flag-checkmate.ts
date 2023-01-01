import { Game, PgnMove } from 'chess-fetcher'

export function avoidTheFlagCheckmate(game: Game, moves: PgnMove[]) {
    // game must not have increment
    if (game.timeControl.increment !== 0) {
        return []
    }

    const lastMove = moves[moves.length - 1]

    // game must end in checkmate
    if (lastMove.notation.check !== '#') {
        return []
    }

    const winnerClockTimes = moves
        .map((move) => {
            return move.turn + ' - ' + move.commentDiag.clk
        })
        .slice(-40)
        .filter(function (value, index) {
            return index % 2 !== 0
        })

    if (winnerClockTimes.length !== 20) {
        return []
    }

    let timeRemainingTwentyMovesAgo = parseInt(winnerClockTimes[0].replace(/\D/g, ''))

    if (timeRemainingTwentyMovesAgo <= 1) {
        return [lastMove.turn]
    }
}
