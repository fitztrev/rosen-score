import { PgnMove } from '@mliebelt/pgn-types'
import { Chess, Square } from 'chess.js'
import { TrophyCheckResult } from '../types/types'
import { knightMoves } from '../utils/knight-moves'

export function royalFamilyFork(moves: PgnMove[]): TrophyCheckResult {
    let chessJS = new Chess()

    let result: TrophyCheckResult = []

    for (const move of moves) {
        let destinationSquare = (move.notation.col + move.notation.row) as Square

        chessJS.move(move.notation.notation)

        /*
            you move the knight with check
            your knight cannot be captured
            your knight attacks K, Q, and ... 2 rooks?
        */
        if (move.notation.fig !== 'N' || move.notation.check !== '+') {
            continue
        }

        // the knight cannot be captured
        if (pieceCanBeCaptured(chessJS, destinationSquare)) {
            continue
        }

        // find what pieces the knight is attacking
        let piecesAttacked = []
        let opponentColor = move.turn === 'w' ? 'b' : 'w'
        for (const knightDestination of knightMoves(destinationSquare)) {
            let pieceOnSquare = chessJS.get(knightDestination)

            if (pieceOnSquare && pieceOnSquare.color === opponentColor) {
                piecesAttacked.push(pieceOnSquare.type)
            }
        }

        // exclude pawns
        piecesAttacked = piecesAttacked.filter((piece) => piece !== 'p')

        // if you're attacking 3+ pieces, including queen and a rook...
        // king is included to make sure the knight is attacking the king
        // (as opposed to a discovered check)
        if (piecesAttacked.length >= 4 && piecesAttacked.includes('k') && piecesAttacked.includes('q') && piecesAttacked.includes('r')) {
            result.push({
                color: move.turn,
                onMoveNumber: moves.indexOf(move) + 1,
            })
        }
    }

    return result
}

function pieceCanBeCaptured(chessJS: Chess, square: Square): boolean {
    const legalMoves = chessJS.moves({ verbose: true })
    for (const legalMove of legalMoves) {
        if (legalMove.to === square) {
            return true
        }
    }

    return false
}
