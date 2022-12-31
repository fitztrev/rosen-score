import { describe, expect, test } from 'vitest'

import fenToPosition from '../js/utils/fen-to-position'
import pieceStructures from '../js/goals/piece-structures'

test('test no pawn stacks', () => {
    let fen = '1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1'
    expect(pieceStructures.quadrupledPawns(fenToPosition(fen))).toStrictEqual([])
})

describe('test quad pawns', () => {
    test.each([
        ['rnbqkbnr/pppppppp/8/3P4/3P4/3P4/PP1P2PP/RNBQKBNR w KQkq - 0 1', ['white']],
        ['rnbqkbnr/pp1p2pp/3p4/3p4/3p4/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', ['black']],
        ['k7/8/6P1/8/6P1/6P1/6P1/K7 w - - 0 1', ['white']],
        ['k7/3p4/3p4/8/3p4/8/3p4/K7 w - - 0 1', ['black']],
        ['k7/5p2/5p2/3P1p2/3P1p2/3P4/3P4/K7 w - - 0 1', ['white', 'black']],
    ])('test FEN: %p', (fen, color) => {
        expect(pieceStructures.quadrupledPawns(fenToPosition(fen))).toStrictEqual(color)
    })
})

test('test 6 pawns in the same file', () => {
    let fen = 'k7/3p4/3p4/3p4/3P4/3P4/3P4/K7 w - - 0 1'
    expect(pieceStructures.sixPawnsInTheSameFile(fenToPosition(fen))).toStrictEqual(['white', 'black'])
})

test('test only 5 pawns in the same file', () => {
    let fen = 'k7/8/3p4/3p4/3P4/3P4/3P4/K7 w - - 0 1'
    expect(pieceStructures.sixPawnsInTheSameFile(fenToPosition(fen))).toStrictEqual([])
})
