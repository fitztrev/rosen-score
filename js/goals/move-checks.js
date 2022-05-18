export default {
    promotePawnBeforeMoveNumber: function (moveInfo, move, beforeMove) {
        if (move < beforeMove * 2 && moveInfo.promotion) {
            return moveInfo.color
        }
    },

    castleAfterMove40: function (moveInfo, move) {
        if (move >= 40 * 2 && moveInfo.san.includes('O-O')) {
            return moveInfo.color
        }
    },

    pawnCheckmate: function (moveInfo, move) {
        if (moveInfo && moveInfo.piece === 'p' && !moveInfo.promotion && moveInfo.san.endsWith('#')) {
            return moveInfo.color
        }
    },

    g5mate: function (moveInfo) {
        if (moveInfo && moveInfo.san.endsWith('#') && moveInfo.to === 'g5' && moveInfo.piece === 'p') {
            return moveInfo.color
        }
    },

    knightCornerMate: function (moveInfo, move) {
        let corners = ['a1', 'a8', 'h1', 'h8']

        if (
            moveInfo &&
            (moveInfo.piece === 'n' || moveInfo.promotion === 'n') &&
            moveInfo.san.endsWith('#') &&
            corners.includes(moveInfo.to)
        ) {
            return moveInfo.color
        }
    },

    enPassantCheckmate: function (moveInfo, move) {
        if (moveInfo && moveInfo.piece === 'p' && moveInfo.san.endsWith('#') && moveInfo.flags === 'e') {
            return moveInfo.color
        }
    },

    castleKingsideWithCheckmate: function (moveInfo, move) {
        if (moveInfo && moveInfo.san === 'O-O#') {
            return moveInfo.color
        }
    },

    castleQueensideWithCheckmate: function (moveInfo, move) {
        if (moveInfo && moveInfo.san === 'O-O-O#') {
            return moveInfo.color
        }
    },

    checkmateWithKing: function (moveInfo, move) {
        if (moveInfo && moveInfo.piece == 'k' && moveInfo.san.endsWith('#')) {
            return moveInfo.color
        }
    },

    promoteToBishopCheckmate: function (moveInfo, move) {
        if (moveInfo && moveInfo.promotion && moveInfo.promotion === 'b' && moveInfo.san.endsWith('#')) {
            return moveInfo.color
        }
    },

    promoteToKnightCheckmate: function (moveInfo, move) {
        if (moveInfo && moveInfo.promotion && moveInfo.promotion === 'n' && moveInfo.san.endsWith('#')) {
            return moveInfo.color
        }
    },
}
