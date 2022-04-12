module.exports = {
    noCapturesBeforeMove30: function (moveNumber, position) {
        if (moveNumber == 30 * 2) {
            return position.replace(/\./g, '').length === 16 * 2
        }
    },

    promotePawnBeforeMoveNumber: function (moveInfo, move, beforeMove) {
        if (move < beforeMove * 2 && moveInfo.promotion && moveInfo.promotion === 'q') {
            return move % 2 ? 'black' : 'white'
        }
    },

    castleAfterMove40: function (moveInfo, move) {
        if (move >= 40 * 2 && moveInfo.san.includes('O-O')) {
            return move % 2 ? 'black' : 'white'
        }
    },

    pawnCheckmate: function (moveInfo, move) {
        if (moveInfo && moveInfo.piece === 'p' && !moveInfo.promotion && moveInfo.san.endsWith('#')) {
            return move % 2 ? 'black' : 'white'
        }
    },

    g5mate: function (moveInfo, move) {
        if (moveInfo && moveInfo.san === 'g5#') {
            return move % 2 ? 'black' : 'white'
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
            return move % 2 ? 'black' : 'white'
        }
    },

    enPassantCheckmate: function (moveInfo, move) {
        if (moveInfo && moveInfo.piece === 'p' && moveInfo.san.endsWith('#') && moveInfo.flags === 'e') {
            return move % 2 ? 'black' : 'white'
        }
    },

    castleKingsideWithCheckmate: function (moveInfo, move) {
        if (moveInfo && moveInfo.san === 'O-O#') {
            return move % 2 ? 'black' : 'white'
        }
    },

    castleQueensideWithCheckmate: function (moveInfo, move) {
        if (moveInfo && moveInfo.san === 'O-O-O#') {
            return move % 2 ? 'black' : 'white'
        }
    },

    checkmateWithKing: function (moveInfo, move) {
        if (moveInfo && moveInfo.piece == 'k' && moveInfo.san.endsWith('#')) {
            return move % 2 ? 'black' : 'white'
        }
    },

    promoteToBishopCheckmate: function (moveInfo, move) {
        if (moveInfo && moveInfo.promotion && moveInfo.promotion === 'b' && moveInfo.san.endsWith('#')) {
            return move % 2 ? 'black' : 'white'
        }
    },

    promoteToKnightCheckmate: function (moveInfo, move) {
        if (moveInfo && moveInfo.promotion && moveInfo.promotion === 'n' && moveInfo.san.endsWith('#')) {
            return move % 2 ? 'black' : 'white'
        }
    },
}
