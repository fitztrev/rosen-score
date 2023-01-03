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

    // if there was only a bishop, call it a draw
    if (position.match(/b/i) && position.replace(/[kbp\.]/gi, '') === '') {
        return []
    }

    let materialImbalance = Math.abs(calculateMaterialImbalance(position))

    if (materialImbalance >= 2) {
        return [
            {
                color: fen.split(' ')[1],
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

export function twoBishopMate(game: Game, fen: string): TrophyCheckResult {
    if (game.result.via !== 'checkmate') {
        return []
    }

    let position = fenToPosition(fen)

    let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')
    let whitePiecesRemaining = piecesRemaining.replace(/[a-z]/g, '')
    let blackPiecesRemaining = piecesRemaining.replace(/[A-Z]/g, '')

    if (whitePiecesRemaining === 'BB' && game.result.winner === 'white') {
        return [
            {
                color: 'w',
            },
        ]
    } else if (blackPiecesRemaining === 'bb' && game.result.winner === 'black') {
        return [
            {
                color: 'b',
            },
        ]
    }

    return []
}

export function fourKnightMate(game: Game, fen: string): TrophyCheckResult {
    if (game.result.via !== 'checkmate') {
        return []
    }

    let position = fenToPosition(fen)

    let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')

    if (piecesRemaining === 'NNNN') {
        return [
            {
                color: 'w',
            },
        ]
    } else if (piecesRemaining === 'nnnn') {
        return [
            {
                color: 'b',
            },
        ]
    }

    return []
}

export function fourKnightCubeMate(game: Game, fen: string): TrophyCheckResult {
    if (game.result.via !== 'checkmate') {
        return []
    }

    let position = fenToPosition(fen)

    if (knightCube(fen).length) {
        let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')

        if (piecesRemaining === 'NNNN') {
            return [
                {
                    color: 'w',
                },
            ]
        } else if (piecesRemaining === 'nnnn') {
            return [
                {
                    color: 'b',
                },
            ]
        }
    }

    return []
}

export function sixKnightRectangleMate(game: Game, fen: string): TrophyCheckResult {
    if (game.result.via !== 'checkmate') {
        return []
    }

    let position = fenToPosition(fen)

    if (knightRectangle(fen).length) {
        let piecesRemaining = position.replace(/[k\.]/gi, '').split('').sort().join('')

        if (piecesRemaining === 'NNNNNN') {
            return [
                {
                    color: 'w',
                },
            ]
        } else if (piecesRemaining === 'nnnnnn') {
            return [
                {
                    color: 'b',
                },
            ]
        }
    }

    return []
}
