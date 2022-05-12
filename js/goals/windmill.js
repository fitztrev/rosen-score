/*
https://chess.stackexchange.com/questions/14795/how-many-windmills-types-exist-in-chess
 */

import { Chess } from 'chess.js'

export default function (allMoves) {
    for (let moveNum in allMoves) {
        moveNum = parseInt(moveNum)

        // if you capture a piece with check
        // king moves
        // piece moves back to its original square with check
        // king moves
        // piece moves and captures another piece
        // king moves
        // piece moves back to its original square with check

        if (allMoves[moveNum + 8] === undefined) {
            return
        }

        if (
            // you capture a piece with check
            allMoves[moveNum].captured &&
            allMoves[moveNum].san.endsWith('+') &&
            // their king moves
            allMoves[moveNum + 1].piece === 'k'
        ) {
            let checkingSquare = allMoves[moveNum].from
            // let kingSquareWithDiscoveredCheck = allMoves[moveNum + 1].from
            // let kingSquareWithDirectCheck = allMoves[moveNum + 1].to

            if (
                // you move the same piece back with check
                allMoves[moveNum + 2].from === allMoves[moveNum].to &&
                allMoves[moveNum + 2].to === checkingSquare &&
                allMoves[moveNum + 2].san.endsWith('+') &&
                // their king moves
                allMoves[moveNum + 3].piece === 'k' &&
                // you move the same piece with check
                allMoves[moveNum + 4].from === checkingSquare &&
                allMoves[moveNum + 4].san.endsWith('+') &&
                // their king moves
                allMoves[moveNum + 5].piece === 'k' &&
                // you move back to the checking square
                allMoves[moveNum + 6].from === allMoves[moveNum + 4].to &&
                allMoves[moveNum + 6].to === checkingSquare &&
                allMoves[moveNum + 6].san.endsWith('+') &&
                // their king moves
                allMoves[moveNum + 7].piece === 'k' &&
                // you capture a piece with check
                allMoves[moveNum + 8].captured &&
                allMoves[moveNum + 8].san.endsWith('+')
            ) {
                console.log(moveNum)
                return true
            }
        }
    }
}
