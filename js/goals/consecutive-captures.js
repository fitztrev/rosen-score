export default {
    /*
     * This basically converts all the moves in a game to a string
     * with either an x (indicating a capture) or a . (non-capture)
     * ex: .....xx.xx............xxxxxxxxxxx..
     * then return the longest sequence of x's along with their position in the string
     */
    anySquare: function (allMoves) {
        return [
            ...allMoves
                .map(function (move) {
                    return move.captured ? 'x' : '.'
                })
                .join('')
                .matchAll(/x+/g),
        ]
            .map(function (match) {
                return {
                    consecutiveCaptures: match[0].length,
                    onMoveNumber: match.index - 1,
                }
            })
            .reduce(function (prev, curr) {
                return prev.consecutiveCaptures > curr.consecutiveCaptures ? prev : curr
            }, false)
    },

    sameSquare: function (allMoves) {
        let lastSquare

        return [
            ...allMoves
                .map(function (move) {
                    if (move.captured && lastSquare === move.to) {
                        lastSquare = move.to
                        return 'x'
                    }

                    lastSquare = move.to
                    return '.'
                })
                .join('')
                .matchAll(/x+/g),
        ]
            .map(function (match) {
                return {
                    consecutiveCaptures: match[0].length,
                    onMoveNumber: match.index - 1,
                }
            })
            .reduce(function (prev, curr) {
                return prev.consecutiveCaptures > curr.consecutiveCaptures ? prev : curr
            }, false)
    },
}
