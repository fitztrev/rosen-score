import { Game } from 'chess-fetcher'
import { knightCube, knightRectangle } from './piece-structures'
import { fenToPosition } from '../utils/fen-to-position'
import { calculateMaterialImbalance } from '../utils/calculate-material-imbalance'
import { TrophyCheckResult } from '../types/types'

export function stalemateTricks(game: Game, fen: string): TrophyCheckResult {
    if (game.result.via !== 'stalemate') {
        return []
    }

    let position = fenToPosition(fen)
    let materialImbalance = Math.abs(calculateMaterialImbalance(position))

    if (materialImbalance >= 4) {
        return [
            {
                color: fen.split(' ')[1] as 'w' | 'b',
            },
        ]
    }

    // if there was only a bishop, call it a draw
    if (position.match(/b/i) && position.replace(/[kbp\.]/gi, '') === '') {
        return []
    }

    if (materialImbalance >= 2) {
        return [
            {
                color: fen.split(' ')[1] as 'w' | 'b',
            },
        ]
    }

    return []
}

export function bishopAndKnightMate(game: Game, fen: string): TrophyCheckResult {
    if (game.result.via !== 'checkmate') {
        return []
    }

    let position = fenToPosition(fen)

    let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')

    if (piecesRemaining === 'BN') {
        return [
            {
                color: 'w',
            },
        ]
    } else if (piecesRemaining === 'bn') {
        return [
            {
                color: 'b',
            },
        ]
    }

    return []
}

function specificPieceComboMate(game: Game, fen: string, pieces: string): TrophyCheckResult {
    if (game.result.via !== 'checkmate') {
        return []
    }

    let position = fenToPosition(fen)

    let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')
    let whitePiecesRemaining = piecesRemaining.replace(/[a-z]/g, '')
    let blackPiecesRemaining = piecesRemaining.replace(/[A-Z]/g, '')

    if (whitePiecesRemaining === pieces.toUpperCase() && game.result.winner === 'white') {
        return [
            {
                color: 'w',
            },
        ]
    } else if (blackPiecesRemaining === pieces.toLowerCase() && game.result.winner === 'black') {
        return [
            {
                color: 'b',
            },
        ]
    }

    return []
}

export function singleBishopMate(game: Game, fen: string): TrophyCheckResult {
    return specificPieceComboMate(game, fen, 'B')
}

export function singleKnightMate(game: Game, fen: string): TrophyCheckResult {
    return specificPieceComboMate(game, fen, 'N')
}

export function twoBishopMate(game: Game, fen: string): TrophyCheckResult {
    return specificPieceComboMate(game, fen, 'BB')
}

export function fourKnightMate(game: Game, fen: string): TrophyCheckResult {
    return specificPieceComboMate(game, fen, 'NNNN')
}

export function fourKnightCubeMate(game: Game, fen: string): TrophyCheckResult {
    if (game.result.via !== 'checkmate') {
        return []
    }

    if (knightCube(fen).length) {
        return specificPieceComboMate(game, fen, 'NNNN')
    }

    return []
}

export function sixKnightRectangleMate(game: Game, fen: string): TrophyCheckResult {
    if (game.result.via !== 'checkmate') {
        return []
    }

    if (knightRectangle(fen).length) {
        return specificPieceComboMate(game, fen, 'NNNNNN')
    }

    return []
}
