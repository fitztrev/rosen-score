import { PgnMove } from 'chess-fetcher'

export default {
    castleAfterMove40: function (moves: PgnMove[]) {
        let result = []

        let whiteCastle = moves.findIndex((move) => {
            return move.notation.notation.includes('O-O') && move.turn === 'w'
        })
        let blackCastle = moves.findIndex((move) => {
            return move.notation.notation.includes('O-O') && move.turn === 'b'
        })

        if (whiteCastle >= 40 * 2) {
            result.push('w')
        }

        if (blackCastle >= 40 * 2) {
            result.push('b')
        }

        return result
    },

    pawnCheckmate: function (moves: PgnMove[]) {
        const lastMove = moves[moves.length - 1]

        if (!lastMove.notation.fig && !lastMove.notation.promotion && lastMove.notation.check === '#') {
            return [lastMove.turn]
        }

        return []
    },

    g5mate: function (moves: PgnMove[]) {
        const lastMove = moves[moves.length - 1]
        if (!lastMove.notation.fig && lastMove.notation.col === 'g' && lastMove.notation.row === '5' && lastMove.notation.check === '#') {
            return [lastMove.turn]
        }

        return []
    },

    knightCornerMate: function (moves: PgnMove[]) {
        const lastMove = moves[moves.length - 1]
        let corners = ['a1', 'a8', 'h1', 'h8']

        let destination = lastMove.notation.col + lastMove.notation.row

        if (
            (lastMove.notation.fig === 'N' || lastMove.notation.promotion === '=N') &&
            lastMove.notation.check === '#' &&
            corners.includes(destination)
        ) {
            return [lastMove.turn]
        }

        return []
    },

    enPassantCheckmate: function (moves: PgnMove[]) {
        const lastMove = moves[moves.length - 1]
        if (!lastMove.notation.fig && lastMove.notation.check === '#' && lastMove.notation.flags === 'e') {
            return [lastMove.turn]
        }

        return []
    },

    castleKingsideWithCheckmate: function (moves: PgnMove[]) {
        const lastMove = moves[moves.length - 1]
        if (lastMove.notation.notation === 'O-O#') {
            return [lastMove.turn]
        }

        return []
    },

    castleQueensideWithCheckmate: function (moves: PgnMove[]) {
        const lastMove = moves[moves.length - 1]
        if (lastMove.notation.notation === 'O-O-O#') {
            return [lastMove.turn]
        }

        return []
    },

    checkmateWithKing: function (moves: PgnMove[]) {
        const lastMove = moves[moves.length - 1]
        if (lastMove.notation.fig == 'K' && lastMove.notation.check === '#') {
            return [lastMove.turn]
        }

        return []
    },

    promoteToBishopCheckmate: function (moves: PgnMove[]) {
        const lastMove = moves[moves.length - 1]
        if (lastMove.notation.promotion === '=B' && lastMove.notation.check === '#') {
            return [lastMove.turn]
        }

        return []
    },

    promoteToKnightCheckmate: function (moves: PgnMove[]) {
        const lastMove = moves[moves.length - 1]
        if (lastMove.notation.promotion === '=N' && lastMove.notation.check === '#') {
            return [lastMove.turn]
        }

        return []
    },

    promotePawnBeforeMoveNumber: function (moves: PgnMove[], beforeMove: number) {
        let whiteFirstPromotion = moves.findIndex((move) => {
            return move.notation.promotion && move.turn === 'w'
        })
        let blackFirstPromotion = moves.findIndex((move) => {
            return move.notation.promotion && move.turn === 'b'
        })

        let result = []

        if (whiteFirstPromotion > 0 && whiteFirstPromotion < beforeMove * 2) {
            result.push('w')
        }

        if (blackFirstPromotion > 0 && blackFirstPromotion < beforeMove * 2) {
            result.push('b')
        }

        return result
    },
}
