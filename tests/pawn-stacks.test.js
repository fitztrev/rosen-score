const { Chess } = require('chess.js')
const fenToPosition = require('../js/utils/fen-to-position.js')
const pieceStructures = require('../js/goals/piece-structures.js')

test('test no pawn stacks', () => {
    let fen = '1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1'
    let chessJsInstance = new Chess(fen)
    expect(pieceStructures.tripledPawns(fenToPosition(chessJsInstance))).toBe(false)
    expect(pieceStructures.quadrupledPawns(fenToPosition(chessJsInstance))).toBe(false)
})

test('test triple pawns for white', () => {
    let fen = 'rnbqkbnr/pppppppp/8/8/5P2/5P2/PPPP1P1P/RNBQKBNR w KQkq - 0 1'
    let chessJsInstance = new Chess(fen)
    expect(pieceStructures.tripledPawns(fenToPosition(chessJsInstance))).toBe('white')
})

test('test triple pawns for black', () => {
    let fen = 'rnbqkbnr/pppp1p1p/5p2/5p2/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    let chessJsInstance = new Chess(fen)
    expect(pieceStructures.tripledPawns(fenToPosition(chessJsInstance))).toBe('black')
})

test('test quad pawns for white', () => {
    let fen = 'rnbqkbnr/pppppppp/8/3P4/3P4/3P4/PP1P2PP/RNBQKBNR w KQkq - 0 1'
    let chessJsInstance = new Chess(fen)
    expect(pieceStructures.quadrupledPawns(fenToPosition(chessJsInstance))).toBe('white')
})

test('test quad pawns for black', () => {
    let fen = 'rnbqkbnr/pp1p2pp/3p4/3p4/3p4/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    let chessJsInstance = new Chess(fen)
    expect(pieceStructures.quadrupledPawns(fenToPosition(chessJsInstance))).toBe('black')
})

test('test 6 pawns in the same file', () => {
    let fen = 'k7/3p4/3p4/3p4/3P4/3P4/3P4/K7 w - - 0 1'
    let chessJsInstance = new Chess(fen)
    expect(pieceStructures.sixPawnsInTheSameFile(fenToPosition(chessJsInstance))).toBe(true)
})

test('test only 5 pawns in the same file', () => {
    let fen = 'k7/8/3p4/3p4/3P4/3P4/3P4/K7 w - - 0 1'
    let chessJsInstance = new Chess(fen)
    expect(pieceStructures.sixPawnsInTheSameFile(fenToPosition(chessJsInstance))).toBe(false)
})

