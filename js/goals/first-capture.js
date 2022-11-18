export default {
    getMoveNumberOfFirstCapture: function (allMoves) {
        return allMoves.findIndex((move) => move.captured)
    },

    noCapturesBeforeMoveNumber(allMoves, moveNumber) {
        let firstCapture = this.getMoveNumberOfFirstCapture(allMoves)

        if (firstCapture >= (moveNumber - 1) * 2) {
            return true
        }

        if (firstCapture === -1 && allMoves.length >= moveNumber * 2) {
            return true
        }

        return false
    },
}
