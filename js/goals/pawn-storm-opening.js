export default function (allMoves, gameInfoJson) {
    if (!gameInfoJson.winner) {
        return
    }

    let moves = allMoves
        .filter(function (move) {
            return move.color === gameInfoJson.winner[0]
        })
        .slice(0, 12)
        .filter(function (move) {
            return move.piece === 'p'
        })

    if (moves.length === 12) {
        return gameInfoJson.winner
    }
}
