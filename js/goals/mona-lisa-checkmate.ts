import { Game } from 'chess-fetcher'
import { TrophyCheckResult } from '../types/types'

export function monaLisaCheckmate(game: Game, fen: string): TrophyCheckResult {
    if (game.result.via !== 'checkmate') {
        return []
    }

    if (fen.startsWith('8/8/8/8/8/8/2k5/RNBQKBNR') || fen.startsWith('rnbqkbnr/2K5/8/8/8/8/8/8')) {
        return [
            {
                color: game.result.winner === 'white' ? 'w' : 'b',
            },
        ]
    }

    return []
}
