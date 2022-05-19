export default {
    hasPromotedQueen: function (color, moves) {
        return moves.filter((move) => move.color === color[0]).filter((move) => move.promotion).length > 0
    },

    checkMoves: function (allMoves, position) {
        for (let moveNum in allMoves) {
            moveNum = parseInt(moveNum)

            // if your queen is captured
            // and you checkmate within the next 3 moves
            // and your opponent still has their queen
            // * your queen must not have been a promoted queen

            if (allMoves[moveNum].captured === 'q') {
                if (
                    (allMoves[moveNum + 1] && allMoves[moveNum + 1].san.endsWith('#')) ||
                    (allMoves[moveNum + 3] && allMoves[moveNum + 3].san.endsWith('#')) ||
                    (allMoves[moveNum + 5] && allMoves[moveNum + 5].san.endsWith('#'))
                ) {
                    let winningColor = allMoves.length % 2 ? 'white' : 'black'

                    // the loser must still have their Queen
                    let blackQueensRemaining = (position.match(/q/) || []).length
                    let whiteQueensRemaining = (position.match(/Q/) || []).length

                    if (
                        (winningColor === 'white' &&
                            whiteQueensRemaining === 0 &&
                            blackQueensRemaining >= 1 &&
                            !this.hasPromotedQueen('white', allMoves)) ||
                        (winningColor === 'black' &&
                            whiteQueensRemaining >= 1 &&
                            blackQueensRemaining === 0 &&
                            !this.hasPromotedQueen('black', allMoves))
                    ) {
                        return winningColor
                    }
                }
            }
        }

        return false
    },
}
