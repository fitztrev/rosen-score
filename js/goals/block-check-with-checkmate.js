module.exports = function (allMoves, gameInfoJson) {
    for (let moveNum in allMoves) {
        moveNum = parseInt(moveNum)

        // if it is checkmate
        // and the move before was a check
        // and it was not a King move
        // and it was not a capture
        if (
            allMoves[moveNum].san.endsWith('#') &&
            allMoves[moveNum - 1].san.endsWith('+') &&
            allMoves[moveNum].piece !== 'k' &&
            !allMoves[moveNum].captured
        ) {
            return gameInfoJson.winner
        }
    }

    return false
}
