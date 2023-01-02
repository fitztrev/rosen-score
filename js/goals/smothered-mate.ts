import { PgnMove } from 'chess-fetcher'
import { Chess, Color, Piece, Square } from 'chess.js'
import { knightMoves } from '../utils/knight-moves'
import { neighboringSquares } from '../utils/neighboring-squares'
import { pawnCaptures } from '../utils/pawn-captures'

// https://github.com/jhlywa/chess.js/issues/174#issuecomment-388633402
const get_piece_positions = (chessJs: Chess, piece: Piece) => {
    return chessJs
        .board()
        .flat()
        .map((p, index) => {
            if (p !== null && p.type === piece.type && p.color === piece.color) {
                return index
            }
        })
        .filter(Number.isInteger)
        .map((index) => {
            const piece_index = index as number
            const row = 'abcdefgh'[piece_index % 8]
            const column = Math.ceil((64 - piece_index) / 8)
            return row + column
        })
}

export function smotheredMate(moves: PgnMove[]) {
    const lastMove = moves[moves.length - 1]
    /*
        knight delivers checkmate
        and the King is fully surrounded by his own pieces
    */
    if (lastMove.notation.fig === 'N' && lastMove.notation.check === '#') {
        let losingColor = lastMove.turn === 'w' ? 'b' : ('w' as Color)

        let chessJs = new Chess()
        chessJs.loadPgn(moves.map((move) => move.notation.notation).join(' '))

        let kingSquare = get_piece_positions(chessJs, {
            type: 'k',
            color: losingColor,
        })[0] as Square

        // all the neighbor squares must have same color pieces
        for (const neighborSquare of neighboringSquares(kingSquare)) {
            let pieceOnSquare = chessJs.get(neighborSquare)

            if (!pieceOnSquare || pieceOnSquare.color !== losingColor) {
                return []
            }
        }

        return [lastMove.turn]
    }

    return []
}

export function smotheredPorkMate(moves: PgnMove[]) {
    const lastMove = moves[moves.length - 1]
    const toSquare = (lastMove.notation.col + lastMove.notation.row) as Square
    /*
        knight delivers checkmate
        knight forks king + queen/rook
        there is a pawn that could recapture the knight but it is pinned
        the king is smothered
    */
    if (lastMove.notation.fig === 'N' && lastMove.notation.check === '#') {
        let losingColor = lastMove.turn === 'w' ? 'b' : ('w' as Color)

        let chessJs = new Chess()
        chessJs.loadPgn(moves.map((move) => move.notation.notation).join(' '))

        let isQueenOrRookForked = false
        for (const knightDestination of knightMoves(toSquare)) {
            let pieceOnSquare = chessJs.get(knightDestination)

            if (pieceOnSquare && pieceOnSquare.color === losingColor && ['q', 'r'].includes(pieceOnSquare.type)) {
                isQueenOrRookForked = true
            }
        }

        // check for pinned pawns that otherwise would be able to capture the knight
        let isPawnPinned = false
        for (const pawnAttackingSquare of pawnCaptures(losingColor, toSquare)) {
            let pieceOnSquare = chessJs.get(pawnAttackingSquare)

            if (pieceOnSquare && pieceOnSquare.color === losingColor && pieceOnSquare.type === 'p') {
                isPawnPinned = true
            }
        }

        if (isQueenOrRookForked && isPawnPinned) {
            return smotheredMate(moves)
        }
    }

    return []
}
