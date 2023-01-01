import { PgnMove } from 'chess-fetcher'

export function lefongTrap(moves: PgnMove[]) {
    for (let moveNum in allMoves) {
        moveNum = parseInt(moveNum)

        // has to be within 10 moves?
        if (moveNum > 10 * 2) {
            return []
        }

        if (allMoves[moveNum + 2] === undefined) {
            return []
        }

        let lefongSequences

        // you move your bishop first
        lefongSequences = [
            ['Bh6', ['f8', 'Bg7'], 'Bxg7'],
            ['Ba6', ['c8', 'Bb7'], 'Bxb7'],
            ['Bh3', ['f1', 'Bg2'], 'Bxg2'],
            ['Ba3', ['c1', 'Bb2'], 'Bxb2'],
        ]

        for (let sequence of lefongSequences) {
            if (
                allMoves[moveNum].san === sequence[0] &&
                allMoves[moveNum + 1].from === sequence[1][0] &&
                allMoves[moveNum + 1].san === sequence[1][1] &&
                allMoves[moveNum + 2].san === sequence[2] &&
                (allMoves[moveNum + 3] === undefined || allMoves[moveNum + 3].to !== allMoves[moveNum + 2].to)
            ) {
                return allMoves[moveNum].color
            }
        }

        if (allMoves[moveNum + 3] === undefined) {
            return []
        }

        // they move their bishop first
        // ex: https://lichess.org/0Gc7xOLO#6
        lefongSequences = [
            [['f8', 'Bg7'], 'Bh6', 'Bxg7'],
            [['c8', 'Bb7'], 'Ba6', 'Bxb7'],
            [['f1', 'Bg2'], 'Bh3', 'Bxg2'],
            [['c1', 'Bb2'], 'Ba3', 'Bxb2'],
        ]

        for (let sequence of lefongSequences) {
            if (
                allMoves[moveNum].from === sequence[0][0] &&
                allMoves[moveNum].san === sequence[0][1] &&
                allMoves[moveNum + 1].san === sequence[1] &&
                allMoves[moveNum + 3].san === sequence[2] &&
                (allMoves[moveNum + 4] === undefined || allMoves[moveNum + 4].to !== allMoves[moveNum + 3].to)
            ) {
                return allMoves[moveNum + 1].color
            }
        }
    }
}
