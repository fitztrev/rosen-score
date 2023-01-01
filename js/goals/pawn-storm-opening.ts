import { Game, PgnMove } from 'chess-fetcher'

export function pawnStormOpening(game: Game, moves: PgnMove[]) {
    if (!game.result.winner) {
        return
    }

    let winnersMoves = moves
        .filter(function (move) {
            return move.turn === game.result.winner[0]
        })
        .slice(0, 12)
        .filter(function (move) {
            return !move.notation.fig
        })

    if (winnersMoves.length === 12) {
        return game.result.winner === 'white' ? ['w'] : ['b']
    }
}
