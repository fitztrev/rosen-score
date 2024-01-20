import { Game } from 'chess-fetcher'
import { TrophyCheckResult } from '../types/types'
import { fenToPosition } from '../utils/fen-to-position'

export function originalSetupCheckmate(game: Game, fen: string): TrophyCheckResult {
    if (game.result.via !== 'checkmate') {
        return []
    }

    let position = fenToPosition(fen)

    if (position.startsWith('rnbqkbnr..K') || position.endsWith('k.....RNBQKBNR')) {
        return [
            {
                color: game.result.winner === 'white' ? 'w' : 'b',
            },
        ]
    }

    return []
}
