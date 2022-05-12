import calculateMaterialImbalance from '../utils/calculate-material-imbalance.js'
import pieceStructures from './piece-structures.js'

export default {
    stalemateTricks: function (gameInfoJson, position, whoseTurn) {
        if (gameInfoJson.status === 'stalemate') {
            // if there was only a bishop, call it a draw
            if (position.match(/b/i) && position.replace(/[kbp\.]/gi, '') === '') {
                return false
            }

            let materialImbalance = Math.abs(calculateMaterialImbalance(position))

            if (materialImbalance >= 2) {
                return whoseTurn
            }
        }

        return false
    },

    bishopAndKnightMate: function (gameInfoJson, position) {
        if (gameInfoJson.status !== 'mate') {
            return
        }

        let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')

        if (piecesRemaining === 'BN') {
            return 'white'
        } else if (piecesRemaining === 'bn') {
            return 'black'
        }

        return false
    },

    // twoKnightsVsPawnMate: function (gameInfoJson, position) {
    //     let piecesRemaining = position
    //         .replace(/[k\.]/gi, '')
    //         .split('')
    //         .sort()
    //         .join('')

    //     if (gameInfoJson.status === 'mate') {
    //         let whitePiecesRemaining = piecesRemaining.replace(/[a-z]/g, '')
    //         let blackPiecesRemaining = piecesRemaining.replace(/[A-Z]/g, '')

    //         if (
    //             (whitePiecesRemaining === 'NN' && blackPiecesRemaining.length <= 1 && gameInfoJson.winner === 'white') ||
    //             (blackPiecesRemaining === 'nn' && whitePiecesRemaining.length <= 1 && gameInfoJson.winner === 'black')
    //         ) {
    //             return gameInfoJson.winner
    //         }
    //     }

    //     return false
    // },

    fourKnightMate: function (gameInfoJson, position) {
        let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')

        if (gameInfoJson.status === 'mate') {
            if (piecesRemaining === 'NNNN') {
                return 'white'
            } else if (piecesRemaining === 'nnnn') {
                return 'black'
            }
        }

        return false
    },

    fourKnightCubeMate: function (gameInfoJson, position) {
        if (gameInfoJson.status === 'mate' && pieceStructures.knightCube(position)) {
            let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')

            if (piecesRemaining === 'NNNN') {
                return 'white'
            } else if (piecesRemaining === 'nnnn') {
                return 'black'
            }
        }

        return false
    },

    sixKnightRectangleMate: function (gameInfoJson, position) {
        if (gameInfoJson.status === 'mate' && pieceStructures.knightRectangle(position)) {
            let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')

            if (piecesRemaining === 'NNNNNN') {
                return 'white'
            } else if (piecesRemaining === 'nnnnnn') {
                return 'black'
            }
        }

        return false
    },
}
