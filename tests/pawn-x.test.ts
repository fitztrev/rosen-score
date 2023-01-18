import { describe, expect, test } from 'vitest'
import { pawnX } from '../js/goals/piece-structures'

describe('test pawn X', () => {
    test.each([
        [[{ color: 'w' }], 'k7/8/8/P1P5/1P6/P1P5/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/8/1P1P4/2P5/1P1P4/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/8/2P1P3/3P4/2P1P3/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/8/3P1P2/4P3/3P1P2/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/8/4P1P1/5P2/4P1P1/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/8/5P1P/6P1/5P1P/8/K7 w - - 0 1'],

        [[{ color: 'b' }], 'k7/8/8/p1p5/1p6/p1p5/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/8/1p1p4/2p5/1p1p4/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/8/2p1p3/3p4/2p1p3/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/8/3p1p2/4p3/3p1p2/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/8/4p1p1/5p2/4p1p1/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/8/5p1p/6p1/5p1p/8/K7 w - - 0 1'],
    ])('test FEN: %p %p', (color, fen) => {
        expect(pawnX(fen)).toStrictEqual(color)
    })
})

describe('test no pawn X', () => {
    test.each([
        // white pawns that wrap ranks
        ['k7/8/6P1/P6P/6P1/P7/8/K7 w - - 0 1'],
        ['k7/8/7P/1P6/P6P/1P6/8/K7 w - - 0 1'],

        // black pawns that wrap ranks
        ['k7/8/6p1/p6p/6p1/p7/8/K7 w - - 0 1'],
        ['k7/8/7p/1p6/p6p/1p6/8/K7 w - - 0 1'],
    ])('test FEN: %p', (fen) => {
        expect(pawnX(fen)).toStrictEqual([])
    })
})
