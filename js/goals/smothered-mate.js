import neighboringSquares from '../utils/neighboring-squares.js'
import knightMoves from '../utils/knight-moves.js'

// https://github.com/jhlywa/chess.js/issues/174#issuecomment-388633402
const get_piece_positions = (game, piece) => {
    return []
        .concat(...game.board())
        .map((p, index) => {
            if (p !== null && p.type === piece.type && p.color === piece.color) {
                return index
            }
        })
        .filter(Number.isInteger)
        .map((piece_index) => {
            const row = 'abcdefgh'[piece_index % 8]
            const column = Math.ceil((64 - piece_index) / 8)
            return row + column
        })
}

export default function (chessJS, moveInfo) {
    /*
        knight delivers checkmate
        and the King is fully surrounded by his own pieces
    */
    if (moveInfo && moveInfo.piece === 'n' && moveInfo.san.endsWith('#')) {
        let whoseTurn = moveInfo.color === 'w' ? 'b' : 'w'
        // return move % 2 ? 'black' : 'white'

        let kingSquare = get_piece_positions(chessJS, {
            type: 'k',
            color: whoseTurn,
        })[0]

        // all the neighbor squares must have same color pieces
        for (const neighborSquare of neighboringSquares(kingSquare)) {
            let pieceOnSquare = chessJS.get(neighborSquare)

            if (!pieceOnSquare || pieceOnSquare.color !== whoseTurn) {
                return false
            }
        }

        return moveInfo.color
    }
}
