const { Chess } = require('chess.js')

module.exports = function (gameInfo, allMoves) {
    if (gameInfo.status !== 'stalemate') {
        return
    }

    for (let moveNum in allMoves) {
        moveNum = parseInt(moveNum)

        // to have a "Rosen Trap" moment, it requires at least 1 followup move
        if (allMoves[moveNum + 1] !== undefined) {
            // if playerA captures a piece with check on one of the "stalemate squares"
            // AND playerB moves king to corner
            // AND game is a stalemate
            // AND playerB *could* have captured the queen with king
            if (
                allMoves[moveNum].piece === 'q' &&
                allMoves[moveNum].captured &&
                allMoves[moveNum].san.endsWith('+') &&
                ['b3', 'b6', 'c2', 'c7', 'f2', 'f7', 'g3', 'g6'].includes(allMoves[moveNum].to)
            ) {
                if (
                    ['Ka1', 'Ka8', 'Kh1', 'Kh8'].includes(allMoves[moveNum + 1].san) &&
                    allMoves[moveNum + 3] === undefined
                ) {
                    // King must be have option to capture queen
                    let movesUntilKingGoesToCorner = allMoves
                        .map((move) => move.san)
                        .slice(0, -2)
                        .join(' ')

                    let chessJs = new Chess()
                    chessJs.load_pgn(movesUntilKingGoesToCorner)

                    for (const kingMove of chessJs.moves({ verbose: true })) {
                        // if king could move to the square the queen captured on...
                        if (kingMove.to === allMoves[moveNum].to) {
                            return allMoves.length % 2 ? 'black' : 'white'
                        }
                    }
                }
            }
        }
    }

    return false
}
