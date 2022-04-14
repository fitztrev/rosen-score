const fenToPosition = require('../js/utils/fen-to-position.js')
const getPiecesOnFiles = require('../js/utils/position-to-files.js')
const pieceStructures = require('../js/goals/piece-structures.js')

test('test no pawn stacks', () => {
    let fen = '1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1'
    expect(pieceStructures.quadrupledPawns(fenToPosition(fen))).toBe(false)
    expect(pieceStructures.tripleDoublePawns(fenToPosition(fen))).toBe(false)
})

describe('test quad pawns', () => {
    test.each([
        [
            'rnbqkbnr/pppppppp/8/3P4/3P4/3P4/PP1P2PP/RNBQKBNR w KQkq - 0 1',
            'white',
        ],
        [
            'rnbqkbnr/pp1p2pp/3p4/3p4/3p4/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            'black',
        ],
        [
            'k7/8/6P1/8/6P1/6P1/6P1/K7 w - - 0 1',
            'white',
        ],
        [
            'k7/3p4/3p4/8/3p4/8/3p4/K7 w - - 0 1',
            'black',
        ],
    ])(
        'test FEN: %p',
        (fen, color) => {
            let files = getPiecesOnFiles(fenToPosition(fen))
            expect(pieceStructures.quadrupledPawns(files)).toBe(color)
        }
    )
})

test('test triple double pawns for white', () => {
    let fen = '4k3/q2p3p/p6p/P6p/P5Qp/2P4P/2P4P/4K3 w - - 0 1'
    expect(pieceStructures.tripleDoublePawns(fenToPosition(fen))).toBe('white')
})

test('test triple double pawns for black', () => {
    let fen = '4k3/3p2pp/3p2pp/8/P7/2P4P/2P4P/4K3 w - - 0 1'
    expect(pieceStructures.tripleDoublePawns(fenToPosition(fen))).toBe('black')
})

test('test quad pawns do not count for triple double pawns', () => {
    let fen = '1q2k3/2pp3p/2Pp3p/b1P4p/2P3nN/1RP4P/1RP4P/4K2B w - - 0 1'
    expect(pieceStructures.tripleDoublePawns(fenToPosition(fen))).toBe(false)
})

test('triple double pawns with spaces in between', () => {
    let fen = '4k3/6P1/5n2/1N1P2P1/1P1q4/3P4/1P6/4K3 w - - 0 1'
    expect(pieceStructures.tripleDoublePawns(fenToPosition(fen))).toBe('white')
})

test('realistic position of triple double pawns with spaces in between', () => {
    let fen = '4k3/q2p3p/p6p/P6p/P1P3Qp/7P/2P4P/4K3 w - - 0 1'
    expect(pieceStructures.tripleDoublePawns(fenToPosition(fen))).toBe('white')
})

test('test 6 pawns in the same file', () => {
    let fen = 'k7/3p4/3p4/3p4/3P4/3P4/3P4/K7 w - - 0 1'
    expect(pieceStructures.sixPawnsInTheSameFile(fenToPosition(fen))).toBe(true)
})

test('test only 5 pawns in the same file', () => {
    let fen = 'k7/8/3p4/3p4/3P4/3P4/3P4/K7 w - - 0 1'
    expect(pieceStructures.sixPawnsInTheSameFile(fenToPosition(fen))).toBe(false)
})
