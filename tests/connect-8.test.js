const fenToPosition = require('../js/utils/fen-to-position.js')
const pieceStructures = require('../js/goals/piece-structures.js')

test('test no connect 8', () => {
    let fen = '1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1'
    expect(pieceStructures.connectEightOnRank4(fenToPosition(fen))).toBe(false)
    expect(pieceStructures.connectEightOnRank5(fenToPosition(fen))).toBe(false)
    expect(pieceStructures.connectEightOnRank6(fenToPosition(fen))).toBe(false)
    expect(pieceStructures.connectEightOnRank7(fenToPosition(fen))).toBe(false)
})

test('test connect 8 on 4th for white', () => {
    let fen = 'rnbqkbnr/pppppppp/8/8/PPPPPPPP/8/8/RNBQKBNR w KQkq - 0 1'
    expect(pieceStructures.connectEightOnRank4(fenToPosition(fen))).toBe('white')
})

test('test connect 8 on 5th for white', () => {
    let fen = 'rnbqkbnr/pppppppp/8/PPPPPPPP/8/8/8/RNBQKBNR w KQkq - 0 1'
    expect(pieceStructures.connectEightOnRank5(fenToPosition(fen))).toBe('white')
})

test('test connect 8 on 6th for white', () => {
    let fen = 'rnbqkbnr/pppppppp/PPPPPPPP/8/8/8/8/RNBQKBNR w KQkq - 0 1'
    expect(pieceStructures.connectEightOnRank6(fenToPosition(fen))).toBe('white')
})

test('test connect 8 on 7th for white', () => {
    let fen = 'rnbqkbnr/PPPPPPPP/8/8/8/8/8/RNBQKBNR w KQkq - 0 1'
    expect(pieceStructures.connectEightOnRank7(fenToPosition(fen))).toBe('white')
})

test('test connect 8 on 4th for black', () => {
    let fen = 'rnbqkbnr/8/8/pppppppp/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    expect(pieceStructures.connectEightOnRank4(fenToPosition(fen))).toBe('black')
})

test('test connect 8 on 5th for black', () => {
    let fen = 'rnbqkbnr/8/8/8/pppppppp/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    expect(pieceStructures.connectEightOnRank5(fenToPosition(fen))).toBe('black')
})

test('test connect 8 on 6th for black', () => {
    let fen = 'rnbqkbnr/8/8/8/8/pppppppp/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    expect(pieceStructures.connectEightOnRank6(fenToPosition(fen))).toBe('black')
})

test('test connect 8 on 7th for black', () => {
    let fen = 'rnbqkbnr/8/8/8/8/8/pppppppp/RNBQKBNR w KQkq - 0 1'
    expect(pieceStructures.connectEightOnRank7(fenToPosition(fen))).toBe('black')
})

describe('test vertical connect 8', () => {
    test.each([
        '2k5/2q5/2b5/2p5/2P5/2n5/2Q5/2K5 w - - 0 1',
        '2k5/2q5/2b5/2p5/2P5/2n5/2Q4P/2K5 w - - 0 1',
    ])(
        'test FEN: %p',
        (fen) => {
            expect(pieceStructures.verticalConnect8(fenToPosition(fen))).toBe(true)
        }
    )
})

describe('test not vertical connect 8', () => {
    test.each([
        '2k5/2q5/3b4/2p5/2P5/2n5/2Q5/2K5 w - - 0 1',
    ])(
        'test FEN: %p',
        (fen) => {
            expect(pieceStructures.verticalConnect8(fenToPosition(fen))).toBe(false)
        }
    )
})
