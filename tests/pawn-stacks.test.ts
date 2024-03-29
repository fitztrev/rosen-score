import { describe, expect, test } from 'vitest'
import { quadrupledPawns, sixPawnsInTheSameFile } from '../js/goals/piece-structures'

test('test no pawn stacks', () => {
    let fen = '1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1'
    expect(quadrupledPawns(fen)).toStrictEqual([])
})

describe('test quad pawns', () => {
    test.each([
        ['rnbqkbnr/pppppppp/8/3P4/3P4/3P4/PP1P2PP/RNBQKBNR w KQkq - 0 1', [{ color: 'w' }]],
        ['rnbqkbnr/pp1p2pp/3p4/3p4/3p4/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', [{ color: 'b' }]],
        ['k7/8/6P1/8/6P1/6P1/6P1/K7 w - - 0 1', [{ color: 'w' }]],
        ['k7/3p4/3p4/8/3p4/8/3p4/K7 w - - 0 1', [{ color: 'b' }]],
        ['k7/5p2/5p2/3P1p2/3P1p2/3P4/3P4/K7 w - - 0 1', [{ color: 'w' }, { color: 'b' }]],
    ])('test FEN: %p', (fen, color) => {
        expect(quadrupledPawns(fen)).toStrictEqual(color)
    })
})

test('test 6 pawns in the same file', () => {
    let fen = 'k7/3p4/3p4/3p4/3P4/3P4/3P4/K7 w - - 0 1'
    expect(sixPawnsInTheSameFile(fen)).toStrictEqual([{ color: 'w' }, { color: 'b' }])
})

test('test only 5 pawns in the same file', () => {
    let fen = 'k7/8/3p4/3p4/3P4/3P4/3P4/K7 w - - 0 1'
    expect(sixPawnsInTheSameFile(fen)).toStrictEqual([])
})
