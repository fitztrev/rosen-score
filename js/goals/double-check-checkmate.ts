import { Ic } from 'isepic-chess'
import { Game } from 'chess-fetcher'

export default function (fen: string, game: Game): string[] {
    if (game.result.via !== 'checkmate') {
        return []
    }

    let board = Ic.initBoard({ fen })

    if (board.isCheckmate && board.checks === 2) {
        return [game.result.winner]
    }

    return []
}
