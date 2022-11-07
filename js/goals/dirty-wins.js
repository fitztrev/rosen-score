import calculateMaterialImbalance from '../utils/calculate-material-imbalance.js'

export default {
    winInsufficientMaterial: function (gameInfo, position) {
        if (gameInfo.status !== 'outoftime') {
            return
        }

        let piecesRemaining = ''

        if (gameInfo.winner === 'white') {
            piecesRemaining = position.replace(/[Kk\.a-z]/g, '')
        } else if (gameInfo.winner === 'black') {
            piecesRemaining = position.replace(/[Kk\.A-Z]/g, '')
        }

        piecesRemaining = piecesRemaining.toLowerCase()

        if (piecesRemaining === 'b' || piecesRemaining === 'n') {
            return gameInfo.winner
        }

        return false
    },

    clutchPawn: function (gameInfo, position) {
        if (gameInfo.status !== 'outoftime') {
            return
        }

        let winnerPiecesRemaining = ''

        if (gameInfo.winner === 'white') {
            winnerPiecesRemaining = position.replace(/[\.Ka-z]/g, '')
        } else if (gameInfo.winner === 'black') {
            winnerPiecesRemaining = position.replace(/[\.kA-Z]/g, '')
        }

        // the winner can only have exactly 1 pawn remaining
        if (winnerPiecesRemaining.toLowerCase() !== 'p') {
            return
        }

        let materialImbalance = Math.abs(calculateMaterialImbalance(position))

        if (materialImbalance >= 10) {
            return gameInfo.winner
        }
    },
}
