export default function (moves) {
    let getPawnPushes = function (moves, color) {
        moves = moves
            .filter((move) => move.color === color)
            .map(function (move) {
                return move.piece === 'p' && !move.captured ? move.san[0] : '.'
            })
            .join('')

        let upto = moves.indexOf('.')
        if (upto > -1) {
            return moves.substr(0, upto)
        }

        return moves
    }

    return {
        white: getPawnPushes(moves, 'w'),
        black: getPawnPushes(moves, 'b'),
    }
}
