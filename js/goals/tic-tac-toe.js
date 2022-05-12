let alreadyAwardedForGameIds = []

export default function (cubeString, gameId) {
    // based on approach from this blog post:
    // https://dev.to/thetomy/check-for-a-tic-tac-toe-winner-with-regular-expressions-2nch

    let winningLines = [
        // horizontal
        '123',
        '456',
        '789',
        // vertical
        '147',
        '258',
        '369',
        // diagonal
        '159',
        '357',
    ]

    if (gameId && alreadyAwardedForGameIds.includes(gameId)) {
        return
    }

    for (let winningLine of winningLines) {
        let stringPositions = winningLine.split('')
        let line =
            cubeString[stringPositions[0] - 1] + cubeString[stringPositions[1] - 1] + cubeString[stringPositions[2] - 1]
        // If a line is all the same color
        // AND the cube has at least 1 opponent piece
        if (line.match(/[A-Z]{3}/) && cubeString.match(/[a-z]/)) {
            gameId && alreadyAwardedForGameIds.push(gameId)

            return 'white'
        } else if (line.match(/[a-z]{3}/) && cubeString.match(/[A-Z]/)) {
            gameId && alreadyAwardedForGameIds.push(gameId)

            return 'black'
        }
    }

    return false
}
