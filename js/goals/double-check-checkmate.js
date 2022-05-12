import { Ic } from 'isepic-chess'

export default function (fen, gameInfo) {
    if (gameInfo.status !== 'mate') {
        return
    }

    let board = Ic.initBoard({ fen })

    if (board.isCheckmate && board.checks === 2) {
        return gameInfo.winner
    }
}
