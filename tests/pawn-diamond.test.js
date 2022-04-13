const fenToPosition = require('../js/utils/fen-to-position.js')
const pieceStructures = require('../js/goals/piece-structures.js')

describe('test no pawn diamond', () => {
    test.each([
        ['1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1'],
        ['rnbqkbnr/pppppppp/8/8/4P3/3P1P2/PPP1P2P/RNBQKBNR w KQkq - 0 1',]
    ])(
        'test FEN: %p',
        (fen) => {
            expect(pieceStructures.pawnDiamond(fenToPosition(fen))).toBe(false)
        }
    )
})

describe('test pawn diamond', () => {
    test.each([
        ['white', 'rnbqkbnr/pppppppp/8/3P4/2P1P3/3P4/P4PPP/RNBQKBNR w KQkq - 0 1'],
        ['black', 'rnbqkbnr/pp4pp/3p4/2p1p3/3p4/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],
    ])(
        'test FEN: %p %p',
        (color, fen) => {
            expect(pieceStructures.pawnDiamond(fenToPosition(fen))).toBe(color)
        }
    )
})
