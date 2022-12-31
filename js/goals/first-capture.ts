import { PgnMove } from 'chess-fetcher'

export default {
    getMoveNumberOfFirstCapture: function (moves: PgnMove[]) {
        return moves.findIndex((move) => move.notation.strike === 'x')
    },

    noCapturesBeforeMoveNumber(moves: PgnMove[], beforeMoveNumber: number) {
        let firstCapture = this.getMoveNumberOfFirstCapture(moves)

        if (firstCapture >= (beforeMoveNumber - 1) * 2) {
            return ['w', 'b']
        }

        if (firstCapture === -1 && moves.length >= beforeMoveNumber * 2) {
            return ['w', 'b']
        }

        return []
    },
}
