import { Game } from 'chess-fetcher'
import { TrophyCheckResult } from '../types/types'
import { Chess } from 'chessops/chess'
import { parseFen } from 'chessops/fen'
import { defined, opposite } from 'chessops'

export function doubleCheckCheckmate(game: Game, fen: string): TrophyCheckResult {
    if (game.result.via !== 'checkmate') {
        return []
    }

    const setup = parseFen(fen).unwrap()
    const pos = Chess.fromSetup(setup).unwrap()

    let winner = game.result.winner as 'white' | 'black'

    const king = pos.board.kingOf(opposite(winner))

    if (!defined(king)) {
        return []
    }

    let piecesAttackingKing = pos.kingAttackers(king, winner, pos.board.occupied)

    if (piecesAttackingKing.size() === 2) {
        return [
            {
                color: game.result.winner === 'white' ? 'w' : 'b',
                onMoveNumber: game.moves.length,
            },
        ]
    }

    return []
}
