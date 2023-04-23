import { Game } from 'chess-fetcher'
import { TrophyCheckResult } from '../types/types'

export function checkmateWithTenthSecondLeft(game: Game): TrophyCheckResult {
    // game must not have increment
    if (game.timeControl.increment !== 0) {
        return []
    }

    if (game.result.via !== 'checkmate') {
        return []
    }

    const lastClockTime = game.clocks[game.clocks.length - 1]

    if (lastClockTime <= 10) {
        return [
            {
                color: game.result.winner === 'white' ? 'w' : 'b',
                onMoveNumber: game.clocks.length,
            },
        ]
    }

    return []
}

export function avoidTheFlagCheckmate(game: Game): TrophyCheckResult {
    // game must not have increment
    if (game.timeControl.increment !== 0) {
        return []
    }

    if (game.result.via !== 'checkmate') {
        return []
    }

    let timeRemainingTwentyMovesAgo = game.clocks.at(-39)

    if (timeRemainingTwentyMovesAgo && timeRemainingTwentyMovesAgo <= 110) {
        return [
            {
                color: game.result.winner === 'white' ? 'w' : 'b',
                onMoveNumber: game.clocks.length - 41,
            },
        ]
    }

    return []
}
