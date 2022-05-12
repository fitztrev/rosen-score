export default {
    getMoveNumberOfFirstCapture: function (allMoves) {
        return allMoves.findIndex((move) => move.captured)
    },

    noCapturesBeforeMoveNumber(allMoves, moveNumber) {
        let firstCapture = this.getMoveNumberOfFirstCapture(allMoves)

        if (firstCapture >= (moveNumber - 1) * 2) {
            return firstCapture
        }

        return false
    },
}
