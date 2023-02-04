import { PgnMove } from '@mliebelt/pgn-types'
import { Chess, Move } from 'chess.js'
import { TrophyCheckResult } from '../types/types'
import { fenToPosition } from '../utils/fen-to-position'

export function ohNoMyQueen(moves: PgnMove[]): TrophyCheckResult {
    const lastMove = moves[moves.length - 1]

    // game must end in checkmate
    if (lastMove.notation.check !== '#') {
        return []
    }

    // there can't be any promoted Queens
    if (moves.some((move) => move.notation.promotion === '=Q')) {
        return []
    }

    const chessJs = new Chess()
    chessJs.loadPgn(moves.map((move) => move.notation.notation).join(' '))

    const chessJsMoves = chessJs.history({ verbose: true }) as Move[]

    for (let moveNum in chessJsMoves) {
        const moveNumber = parseInt(moveNum)

        // if your queen is captured
        // and you checkmate within the next 3 moves
        // and your opponent still has their queen

        if (chessJsMoves[moveNum].captured !== 'q') {
            continue
        }

        if (
            (chessJsMoves[moveNumber + 1] && chessJsMoves[moveNumber + 1].san.endsWith('#')) ||
            (chessJsMoves[moveNumber + 3] && chessJsMoves[moveNumber + 3].san.endsWith('#')) ||
            (chessJsMoves[moveNumber + 5] && chessJsMoves[moveNumber + 5].san.endsWith('#'))
        ) {
            const position = fenToPosition(chessJs.fen())

            // the loser must still have their Queen
            let whiteHasQueen = position.includes('Q')
            let blackHasQueen = position.includes('q')

            if ((lastMove.turn === 'w' && !whiteHasQueen && blackHasQueen) || (lastMove.turn === 'b' && whiteHasQueen && !blackHasQueen)) {
                return [
                    {
                        color: lastMove.turn,
                        onMoveNumber: moveNumber,
                    },
                ]
            }
        }
    }

    return []
}
