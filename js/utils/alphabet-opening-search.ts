import { Color, Move } from 'chess.js'

export default function (moves: Move[]) {
    let getPawnPushes = function (moves: Move[], color: Color) {
        let moveString = moves
            .filter((move) => move.color === color)
            .map(function (move) {
                return move.piece === 'p' && !move.captured ? move.san[0] : '.'
            })
            .join('')

        let upto = moveString.indexOf('.')
        if (upto > -1) {
            return moveString.substr(0, upto)
        }

        return moveString
    }

    return {
        white: getPawnPushes(moves, 'w'),
        black: getPawnPushes(moves, 'b'),
    }
}
