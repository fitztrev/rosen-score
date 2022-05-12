import knightMoves from '../utils/knight-moves.js'
import pawnCaptures from '../utils/pawn-captures.js'

import smotheredMate from './smothered-mate.js'

export default function (chessJS, moveInfo) {
    /*
        knight delivers checkmate
        knight attacks both the King and queen
        there is a pawn that could recapture the knight but it is pinned
        the king is smothered
    */
    if (moveInfo && moveInfo.piece === 'n' && moveInfo.san.endsWith('#')) {
        let whoseTurn = moveInfo.color === 'w' ? 'b' : 'w'

        let isRoyalFork = false
        for (const knightDestination of knightMoves(moveInfo.to)) {
            let pieceOnSquare = chessJS.get(knightDestination)

            if (pieceOnSquare && pieceOnSquare.color === whoseTurn && pieceOnSquare.type === 'q') {
                isRoyalFork = true
            }
        }

        // check for pinned pawns that otherwise would be able to capture the knight
        let isPawnPinned = false
        for (const pawnAttackingSquare of pawnCaptures(whoseTurn, moveInfo.to)) {
            let pieceOnSquare = chessJS.get(pawnAttackingSquare)

            if (pieceOnSquare && pieceOnSquare.color === whoseTurn && pieceOnSquare.type === 'p') {
                isPawnPinned = true
            }
        }

        if (isRoyalFork && isPawnPinned) {
            return smotheredMate(chessJS, moveInfo)
        }
    }

    return false
}
