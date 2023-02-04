import { PgnMove } from '@mliebelt/pgn-types'
import { Game } from 'chess-fetcher'
import { TrophyCheckResult } from '../types/types'

export function alphabetOpening(game: Game, word: string, moves: PgnMove[]): TrophyCheckResult {
    if (!game.result.winner) {
        return []
    }

    const winningColor = game.result.winner[0] as 'w' | 'b'

    const winnersPieceMoves = moves
        .filter((move) => move.turn === winningColor)
        .map((move) => move.notation.notation[0])
        .join('')

    if (winnersPieceMoves.indexOf(word) === 0) {
        return [
            {
                color: winningColor,
                onMoveNumber: word.length * 2,
            },
        ]
    }

    return []
}
