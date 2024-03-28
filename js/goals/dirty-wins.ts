import { PgnMove } from '@mliebelt/pgn-types'
import { Game } from 'chess-fetcher'
import { Chess } from 'chess.js'
import { TrophyCheckResult } from '../types/types'
import { calculateMaterialImbalance } from '../utils/calculate-material-imbalance'
import { fenToPosition } from '../utils/fen-to-position'

export function flagOpponentWhoHadMateInOne(game: Game, moves: PgnMove[]): TrophyCheckResult {
    if (!game.result.winner || game.result.via !== 'timeout') {
        return []
    }

    const chessJs = new Chess()
    chessJs.loadPgn(moves.map((move) => move.notation.notation).join(' '))

    let matingMoves = chessJs.moves({ verbose: true }).filter((move) => move.san.endsWith('#'))

    if (matingMoves.length > 0) {
        return [
            {
                color: game.result.winner === 'white' ? 'w' : 'b',
            },
        ]
    }

    return []
}

export function winInsufficientMaterial(game: Game, fen: string): TrophyCheckResult {
    if (game.result.via !== 'timeout') {
        return []
    }

    let position = fenToPosition(fen)

    let piecesRemaining = ''

    if (game.result.winner === 'white') {
        piecesRemaining = position.replace(/[.Ka-z]/g, '')
    } else if (game.result.winner === 'black') {
        piecesRemaining = position.replace(/[.kA-Z]/g, '')
    }

    piecesRemaining = piecesRemaining.toLowerCase()

    if (piecesRemaining === 'b' || piecesRemaining === 'n') {
        return [
            {
                color: game.result.winner === 'white' ? 'w' : 'b',
            },
        ]
    }

    return []
}

export function clutchPawn(game: Game, fen: string): TrophyCheckResult {
    if (game.result.via !== 'timeout') {
        return []
    }

    let position = fenToPosition(fen)

    let winnerPiecesRemaining = ''

    if (game.result.winner === 'white') {
        winnerPiecesRemaining = position.replace(/[.Ka-z]/g, '')
    } else if (game.result.winner === 'black') {
        winnerPiecesRemaining = position.replace(/[.kA-Z]/g, '')
    }

    // the winner can only have exactly 1 pawn remaining
    if (winnerPiecesRemaining.toLowerCase() !== 'p') {
        return []
    }

    let materialImbalance = Math.abs(calculateMaterialImbalance(position))

    if (materialImbalance >= 10) {
        return [
            {
                color: game.result.winner === 'white' ? 'w' : 'b',
            },
        ]
    }

    return []
}
