import { describe, expect, test } from 'vitest'

import fenToPosition from '../js/utils/fen-to-position.js'
import pieceStructures from '../js/goals/piece-structures.js'

describe('test pawn trapezoid', () => {
    test.each([
        ['white', 'rnbqkbnr/pppppppp/3PP3/2P2P2/1P4P1/8/P6P/RNBQKBNR w KQkq - 0 1'],
        ['black', 'rnbqkbnr/p6p/8/1p4p1/2p2p2/3pp3/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],

        ['white', 'k7/8/2PP4/1P2P3/P4P2/8/8/K7 w - - 0 1'],
        ['white', 'k7/8/3PP3/2P2P2/1P4P1/8/8/K7 w - - 0 1'],
        ['white', 'k7/8/4PP2/3P2P1/2P4P/8/8/K7 w - - 0 1'],

        ['white', 'k7/2PP4/1P2P3/P4P2/8/8/8/K7 w - - 0 1'],
        ['white', 'k7/3PP3/2P2P2/1P4P1/8/8/8/K7 w - - 0 1'],
        ['white', 'k7/4PP2/3P2P1/2P4P/8/8/8/K7 w - - 0 1'],

        ['black', '7k/8/8/2p4p/3p2p1/4pp2/8/7K w - - 0 1'],
        ['black', '7k/8/8/1p4p1/2p2p2/3pp3/8/7K w - - 0 1'],
        ['black', '7k/8/8/p4p2/1p2p3/2pp4/8/7K w - - 0 1'],

        ['black', '7k/8/8/8/2p4p/3p2p1/4pp2/7K w - - 0 1'],
        ['black', '7k/8/8/8/1p4p1/2p2p2/3pp3/7K w - - 0 1'],
        ['black', '7k/8/8/8/p4p2/1p2p3/2pp4/7K w - - 0 1'],
    ])(
        'test FEN: %p %p',
        (color, fen) => {
            expect(pieceStructures.pawnTrapezoid(fenToPosition(fen))).toStrictEqual([color])
        }
    )
})

describe('test no pawn trapezoid', () => {
    test.each([
        '1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1',

        'k7/8/8/8/2PP4/1P2P3/P4P2/K7 w - - 0 1',
        'k7/8/8/3PP3/2P2P2/1P4P1/8/K7 w - - 0 1',

        // white, wraps to new line
        'k7/5PP1/4P2P/3P4/P7/8/8/K7 w - - 0 1',
        'k7/6PP/5P2/P3P3/1P6/8/8/K7 w - - 0 1',
        'k7/7P/P5P1/1P3P2/2P5/8/8/K7 w - - 0 1',
        'k7/8/PP5P/2P3P1/3P4/8/8/K7 w - - 0 1',
        'k7/8/1PP5/P2P3P/4P3/8/8/K7 w - - 0 1',

        // black, wraps to new line
        '7k/8/8/7p/4p3/p2p4/1pp5/7K w - - 0 1',
        '7k/8/8/6p1/3p3p/2p5/pp6/7K w - - 0 1',
        '7k/8/8/5p2/2p3p1/1p5p/p7/7K w - - 0 1',
        '7k/8/8/4p3/1p3p2/p5pp/8/7K w - - 0 1',
        '7k/8/8/3p4/p3p2p/5pp1/8/7K w - - 0 1',
    ])(
        'test FEN: %p',
        (fen) => {
            expect(pieceStructures.pawnTrapezoid(fenToPosition(fen))).toStrictEqual([])
        }
    )
})
