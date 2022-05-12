export default function (allMoves) {
    for (let moveNum in allMoves) {
        moveNum = parseInt(moveNum)

        // to have a "King Fork" moment, it requires at least 2 followup moves
        if (allMoves[moveNum + 2] !== undefined) {
            // if playerA castles with check
            // and then playerA's next move is King captures a piece (N, B, or R)
            // then it was a king fork

            if (
                allMoves[moveNum].san.endsWith('O-O+') &&
                allMoves[moveNum + 2].piece === 'k' &&
                ['b', 'n', 'r'].includes(allMoves[moveNum + 2].captured)
            ) {
                return moveNum % 2 ? 'black' : 'white'
            }
        }
    }

    return false
}
