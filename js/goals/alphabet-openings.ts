import { PgnMove } from 'chess-fetcher'
import { TrophyCheckResult } from '../types/types'

export function alphabetOpening(word: string, moves: PgnMove[]): TrophyCheckResult {
    let whitePieceMoves = moves
        .filter((move) => move.turn === 'w')
        .map((move) => move.notation.notation[0])
        .join('')

    let blackPieceMoves = moves
        .filter((move) => move.turn === 'b')
        .map((move) => move.notation.notation[0])
        .join('')

    let result: TrophyCheckResult = []

    if (whitePieceMoves.indexOf(word) === 0) {
        result.push({
            color: 'w',
            onMoveNumber: word.length * 2,
        })
    }

    if (blackPieceMoves.indexOf(word) === 0) {
        result.push({
            color: 'b',
            onMoveNumber: word.length * 2,
        })
    }

    return result
}
