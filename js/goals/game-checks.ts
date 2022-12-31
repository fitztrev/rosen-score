import calculateMaterialImbalance from '../utils/calculate-material-imbalance'
import pieceStructures from './piece-structures'
import { Game } from 'chess-fetcher'

export default {
    stalemateTricks: function (game: Game, position: string, whoseTurn: string): string[] {
        if (game.result.via !== 'stalemate') {
            return []
        }

        // if there was only a bishop, call it a draw
        if (position.match(/b/i) && position.replace(/[kbp\.]/gi, '') === '') {
            return []
        }

        let materialImbalance = Math.abs(calculateMaterialImbalance(position))

        if (materialImbalance >= 2) {
            return [whoseTurn]
        }

        return []
    },

    bishopAndKnightMate: function (game: Game, position: string): string[] {
        if (game.result.via !== 'checkmate') {
            return []
        }

        let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')

        if (piecesRemaining === 'BN') {
            return ['white']
        } else if (piecesRemaining === 'bn') {
            return ['black']
        }

        return []
    },

    twoBishopMate: function (game: Game, position: string): string[] {
        if (game.result.via !== 'checkmate') {
            return []
        }

        let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')
        let whitePiecesRemaining = piecesRemaining.replace(/[a-z]/g, '')
        let blackPiecesRemaining = piecesRemaining.replace(/[A-Z]/g, '')

        if ((whitePiecesRemaining === 'BB' && game.result.winner === 'white') || (blackPiecesRemaining === 'bb' && game.result.winner === 'black')) {
            return [game.result.winner]
        }

        return []
    },

    fourKnightMate: function (game: Game, position: string): string[] {
        if (game.result.via !== 'checkmate') {
            return []
        }

        let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')

        if (piecesRemaining === 'NNNN') {
            return ['white']
        } else if (piecesRemaining === 'nnnn') {
            return ['black']
        }

        return []
    },

    fourKnightCubeMate: function (game: Game, position: string): string[] {
        if (game.result.via !== 'checkmate') {
            return []
        }

        if (pieceStructures.knightCube(position).length) {
            let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')

            if (piecesRemaining === 'NNNN') {
                return ['white']
            } else if (piecesRemaining === 'nnnn') {
                return ['black']
            }
        }

        return []
    },

    sixKnightRectangleMate: function (game: Game, position: string): string[] {
        if (game.result.via !== 'checkmate') {
            return []
        }

        if (pieceStructures.knightRectangle(position).length) {
            let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')

            if (piecesRemaining === 'NNNNNN') {
                return ['white']
            } else if (piecesRemaining === 'nnnnnn') {
                return ['black']
            }
        }

        return []
    },
}
