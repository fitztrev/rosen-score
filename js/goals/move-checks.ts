import { PgnMove } from 'chess-fetcher'
import { Chess } from 'chess.js'

export function castleAfterMove40(moves: PgnMove[]) {
    let result = []

    let whiteCastle = moves.findIndex((move) => {
        return move.notation.notation.includes('O-O') && move.turn === 'w'
    })
    let blackCastle = moves.findIndex((move) => {
        return move.notation.notation.includes('O-O') && move.turn === 'b'
    })

    if (whiteCastle >= 40 * 2) {
        result.push('w')
    }

    if (blackCastle >= 40 * 2) {
        result.push('b')
    }

    return result
}

export function pawnCheckmate(moves: PgnMove[]) {
    const lastMove = moves[moves.length - 1]

    if (!lastMove.notation.fig && !lastMove.notation.promotion && lastMove.notation.check === '#') {
        return [lastMove.turn]
    }

    return []
}

export function g5mate(moves: PgnMove[]) {
    const lastMove = moves[moves.length - 1]
    if (!lastMove.notation.fig && lastMove.notation.col === 'g' && lastMove.notation.row === '5' && lastMove.notation.check === '#') {
        return [lastMove.turn]
    }

    return []
}

export function knightCornerMate(moves: PgnMove[]) {
    const lastMove = moves[moves.length - 1]
    let corners = ['a1', 'a8', 'h1', 'h8']

    let destination = lastMove.notation.col + lastMove.notation.row

    if ((lastMove.notation.fig === 'N' || lastMove.notation.promotion === '=N') && lastMove.notation.check === '#' && corners.includes(destination)) {
        return [lastMove.turn]
    }

    return []
}

export function enPassantCheckmate(moves: PgnMove[]) {
    const lastMove = moves[moves.length - 1]

    // last move has to be a pawn capture checkmate
    if (lastMove.notation.fig || lastMove.notation.strike !== 'x' || lastMove.notation.check !== '#') {
        return []
    }

    const chessJs = new Chess()
    chessJs.loadPgn(moves.map((move) => move.notation.notation).join(' '))

    const chessJsLastMove = chessJs.history({ verbose: true })[moves.length - 1]

    if (chessJsLastMove.flags.includes('e')) {
        return [lastMove.turn]
    }

    return []
}

export function castleKingsideWithCheckmate(moves: PgnMove[]) {
    const lastMove = moves[moves.length - 1]
    if (lastMove.notation.notation === 'O-O#') {
        return [lastMove.turn]
    }

    return []
}

export function castleQueensideWithCheckmate(moves: PgnMove[]) {
    const lastMove = moves[moves.length - 1]
    if (lastMove.notation.notation === 'O-O-O#') {
        return [lastMove.turn]
    }

    return []
}

export function checkmateWithKing(moves: PgnMove[]) {
    const lastMove = moves[moves.length - 1]
    if (lastMove.notation.fig == 'K' && lastMove.notation.check === '#') {
        return [lastMove.turn]
    }

    return []
}

export function promoteToBishopCheckmate(moves: PgnMove[]) {
    const lastMove = moves[moves.length - 1]
    if (lastMove.notation.promotion === '=B' && lastMove.notation.check === '#') {
        return [lastMove.turn]
    }

    return []
}

export function promoteToKnightCheckmate(moves: PgnMove[]) {
    const lastMove = moves[moves.length - 1]
    if (lastMove.notation.promotion === '=N' && lastMove.notation.check === '#') {
        return [lastMove.turn]
    }

    return []
}

export function promotePawnBeforeMoveNumber(moves: PgnMove[], beforeMove: number) {
    let whiteFirstPromotion = moves.findIndex((move) => {
        return move.notation.promotion && move.turn === 'w'
    })
    let blackFirstPromotion = moves.findIndex((move) => {
        return move.notation.promotion && move.turn === 'b'
    })

    let result = []

    if (whiteFirstPromotion > 0 && whiteFirstPromotion < beforeMove * 2) {
        result.push('w')
    }

    if (blackFirstPromotion > 0 && blackFirstPromotion < beforeMove * 2) {
        result.push('b')
    }

    return result
}
