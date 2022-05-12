import knightMoves from '../utils/knight-moves.js'

export default function (chessJS, moveInfo, gameInfo) {
    /*
        you move the knight with check
        your knight cannot be captured
        your knight attacks K, Q, and ... 2 rooks?
    */
    if (moveInfo.piece === 'n' && moveInfo.san.endsWith('+')) {
        let whoseTurn = moveInfo.color === 'w' ? 'b' : 'w'

        // the knight cannot be captured
        for (const legalMove of chessJS.moves({ verbose: true })) {
            if (legalMove.to === moveInfo.to) {
                return
            }
        }

        let piecesAttacked = []
        for (const knightDestination of knightMoves(moveInfo.to)) {
            let pieceOnSquare = chessJS.get(knightDestination)

            if (pieceOnSquare && pieceOnSquare.color === whoseTurn) {
                piecesAttacked.push(pieceOnSquare.type)
            }
        }

        piecesAttacked = piecesAttacked.sort().join('').replace(/[p]/g, '')

        // if you're attacking 3+ pieces, including queen and a rook...
        // king is included to make sure the knight is attacking the king
        // (as opposed to a discovered check)
        if (
            piecesAttacked.length >= 4 &&
            piecesAttacked.includes('k') &&
            piecesAttacked.includes('q') &&
            piecesAttacked.includes('r')
        ) {
            return moveInfo.color
        }
    }
}
