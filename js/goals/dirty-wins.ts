import calculateMaterialImbalance from '../utils/calculate-material-imbalance'
import { Game } from 'chess-fetcher'

export default {
    winInsufficientMaterial: function (game: Game, position: string): string[] {
        if (game.result.via !== 'timeout') {
            return []
        }

        let piecesRemaining = ''

        if (game.result.winner === 'white') {
            piecesRemaining = position.replace(/[Kk\.a-z]/g, '')
        } else if (game.result.winner === 'black') {
            piecesRemaining = position.replace(/[Kk\.A-Z]/g, '')
        }

        piecesRemaining = piecesRemaining.toLowerCase()

        if (piecesRemaining === 'b' || piecesRemaining === 'n') {
            return [game.result.winner === 'white' ? 'w' : 'b']
        }

        return []
    },

    clutchPawn: function (game: Game, position: string): string[] {
        if (game.result.via !== 'timeout') {
            return []
        }

        let winnerPiecesRemaining = ''

        if (game.result.winner === 'white') {
            winnerPiecesRemaining = position.replace(/[\.Ka-z]/g, '')
        } else if (game.result.winner === 'black') {
            winnerPiecesRemaining = position.replace(/[\.kA-Z]/g, '')
        }

        // the winner can only have exactly 1 pawn remaining
        if (winnerPiecesRemaining.toLowerCase() !== 'p') {
            return []
        }

        let materialImbalance = Math.abs(calculateMaterialImbalance(position))

        if (materialImbalance >= 10) {
            return [game.result.winner === 'white' ? 'w' : 'b']
        }

        return []
    },
}
