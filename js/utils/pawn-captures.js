export default function (colorToMove, squareToAttack) {
    let pawnsAttackFrom

    if (colorToMove[0] === 'w') {
        pawnsAttackFrom = [
            [-1, -1],
            [+1, -1],
        ]
    } else {
        pawnsAttackFrom = [
            [-1, +1],
            [+1, +1],
        ]
    }

    let files = 'abcdefgh'
    let ranks = '12345678'

    let currentFile = files.indexOf(squareToAttack[0])
    let currentRank = ranks.indexOf(squareToAttack[1])

    let destinations = []

    for (const pawnMove of pawnsAttackFrom) {
        let destinationFile = files.charAt(currentFile + pawnMove[0])
        let destinationRank = ranks.charAt(currentRank + pawnMove[1])

        if (destinationFile && destinationRank) {
            destinations.push(destinationFile + destinationRank)
        }
    }

    return destinations.sort()
}
