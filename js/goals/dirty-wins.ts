import calculateMaterialImbalance from '../utils/calculate-material-imbalance'
import { Game } from 'chess-fetcher'
import fenToPosition from '../utils/fen-to-position'

export function winInsufficientMaterial(game: Game, fen: string): string[] {
    if (game.result.via !== 'timeout') {
        return []
    }

    let position = fenToPosition(fen)

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
}

export function clutchPawn(game: Game, fen: string): string[] {
    if (game.result.via !== 'timeout') {
        return []
    }

    let position = fenToPosition(fen)

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
}
