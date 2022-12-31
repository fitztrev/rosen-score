export default function (moves) {
    let totalCaptures = 0

    let kingSquares = {
        w: null,
        b: null,
    }

    for (let move in moves) {
        move = parseInt(move)

        if (moves[move].captured) {
            totalCaptures++
        }

        if (moves[move].piece === 'k') {
            kingSquares[moves[move].color] = moves[move].to
        }

        if (
            totalCaptures === 28 &&
            typeof moves[move + 1] !== 'undefined' &&
            moves[move].promotion === 'q' &&
            moves[move + 1].promotion === 'q' &&
            moves[move + 1].san.endsWith('+') &&
            ((moves[move].to[0] === 'a' && moves[move + 1].to[0] === 'h') || (moves[move].to[0] === 'h' && moves[move + 1].to[0] === 'a')) &&
            !['b2', 'b7', 'g2', 'g7'].includes(kingSquares[moves[move].color])
        ) {
            return moves[move + 1].color
        }
    }
}
