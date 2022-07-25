import { Chess } from 'chess.js'

export default function (allMoves) {
    for (let moveNum in allMoves) {
        moveNum = parseInt(moveNum)

        if (allMoves[moveNum + 3] === undefined) {
            return
        }

        // their queen gives a check
        // you interpose a piece (R, B, N)
        // their queen moves to the square you came from
        // you capture their queen on that square

        // when you interpose, that piece must not be defended

        if (
            allMoves[moveNum].piece === 'q' &&
            allMoves[moveNum].san.endsWith('+') &&
            ['r', 'b', 'n'].includes(allMoves[moveNum + 1].piece) &&
            allMoves[moveNum + 2].from === allMoves[moveNum].to &&
            allMoves[moveNum + 2].to === allMoves[moveNum + 1].from &&
            allMoves[moveNum + 3].from === allMoves[moveNum + 1].to &&
            allMoves[moveNum + 3].to === allMoves[moveNum + 2].to
        ) {
            let movesUntilQueenTriesToCapture = allMoves
                .slice(0, moveNum + 2)
                .map((move) => move.san)
                .join(' ')

            let chessJs = new Chess()
            chessJs.load_pgn(movesUntilQueenTriesToCapture)
            chessJs.move('Qx' + allMoves[moveNum + 1].to)
            let canBeRecaptured =
                chessJs.moves({ verbose: true }).filter((move) => move.to === allMoves[moveNum + 1].to).length > 0

            if (canBeRecaptured) {
                return false
            }

            return {
                color: allMoves[moveNum + 1].color,
                onMoveNumber: moveNum,
            }
        }
    }
}
