import { PgnMove } from 'chess-fetcher'
import { Chess, Move } from 'chess.js'
import { TrophyCheckResult } from '../types/types'

export function lefongTrap(moves: PgnMove[]): TrophyCheckResult {
    // game must contain a Bishop capture on 1 of the fianchetto squares within the first 10 moves
    if (!moves.slice(0, 10 * 2).some((move) => ['Bxg7', 'Bxg2', 'Bxb7', 'Bxb2'].includes(move.notation.notation))) {
        return []
    }

    const chessJs = new Chess()
    chessJs.loadPgn(moves.map((move) => move.notation.notation).join(' '))

    const chessJsMoves = chessJs.history({ verbose: true }) as Move[]

    for (let moveNum in chessJsMoves) {
        const moveNumber = parseInt(moveNum)

        if (chessJsMoves[moveNumber + 2] === undefined) {
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
                chessJsMoves[moveNumber].san === sequence[0] &&
                chessJsMoves[moveNumber + 1].from === sequence[1][0] &&
                chessJsMoves[moveNumber + 1].san === sequence[1][1] &&
                chessJsMoves[moveNumber + 2].san === sequence[2] &&
                (chessJsMoves[moveNumber + 3] === undefined || chessJsMoves[moveNumber + 3].to !== chessJsMoves[moveNumber + 2].to)
            ) {
                return [
                    {
                        color: chessJsMoves[moveNumber].color,
                        onMoveNumber: moveNumber,
                    },
                ]
            }
        }

        if (chessJsMoves[moveNumber + 3] === undefined) {
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
                chessJsMoves[moveNumber].from === sequence[0][0] &&
                chessJsMoves[moveNumber].san === sequence[0][1] &&
                chessJsMoves[moveNumber + 1].san === sequence[1] &&
                chessJsMoves[moveNumber + 3].san === sequence[2] &&
                (chessJsMoves[moveNumber + 4] === undefined || chessJsMoves[moveNumber + 4].to !== chessJsMoves[moveNumber + 3].to)
            ) {
                return [
                    {
                        color: chessJsMoves[moveNumber + 1].color,
                        onMoveNumber: moveNumber + 1,
                    },
                ]
            }
        }
    }

    return []
}
