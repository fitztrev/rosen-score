import { Ic } from 'isepic-chess'
import { PgnMove } from 'chess-fetcher'

export function doubleCheckCheckmate(moves: PgnMove[]) {
    const lastMove = moves[moves.length - 1]

    if (lastMove.notation.check !== '#') {
        return []
    }

    const pgn = moves.map((move) => move.notation.notation).join(' ')

    const board = Ic.initBoard({ pgn })

    if (board.isCheckmate && board.checks === 2) {
        return [lastMove.turn]
    }

    return []
}
