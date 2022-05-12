import { describe, expect, test } from 'vitest'

import fenToPosition from '../js/utils/fen-to-position.js'
import pieceStructures from '../js/goals/piece-structures.js'

describe('test no pawn cube', () => {
    test.each([
        ['1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1'],

        // reported because this game was rewarding a pawn cube for BLACK after 8...gxh6
        // there were 2 double pawns on the A and H files
        ['2bqkb1r/2p2p1p/p1n2n1p/p2pp3/3P4/P3PN2/1PP2PP1/RNBQK2R w KQk - 0 9'],

        // https://lichess.org/BACrmUFO#79
        ['8/8/3p3k/1PpP3P/P5KP/P7/8/8 b - - 0 40'],

        // black pawns that wrap ranks
        ['8/7p/p6p/p7/8/8/8/8 w - - 0 1'],
        ['8/8/7p/p6p/p7/8/8/8 w - - 0 1'],
        ['8/p7/p6p/7p/8/8/8/8 w - - 0 1'],
        ['8/8/p7/p6p/7p/8/8/8 w - - 0 1'],

        // white pawns that wrap ranks
        ['8/8/8/8/7P/P6P/P7/8 w - - 0 1'],
        ['8/8/8/7P/P6P/P7/8/8 w - - 0 1'],
        ['8/8/8/8/P7/P6P/7P/8 w - - 0 1'],
        ['8/8/8/P7/P6P/7P/8/8 w - - 0 1'],
    ])(
        'test FEN: %p',
        (fen) => {
            expect(pieceStructures.pawnCube(fenToPosition(fen))).toBe(false)
        }
    )
})

describe('test pawn cubes', () => {
    test.each([
        ['white', 'rnbqkbnr/pppppppp/8/8/8/1PP5/1PP1PPPP/RNBQKBNR w KQkq - 0 1'],
        ['black', 'rnbqkbnr/pppp1pp1/5pp1/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],
        ['black', '8/pp6/pp6/8/8/8/8/8 w - - 0 1'],

        ['black', 'k7/pp6/pp6/8/8/8/8/K7 w - - 0 1'],
        ['black', 'k7/1pp5/1pp5/8/8/8/8/K7 w - - 0 1'],
        ['black', 'k7/2pp4/2pp4/8/8/8/8/K7 w - - 0 1'],
        ['black', 'k7/3pp3/3pp3/8/8/8/8/K7 w - - 0 1'],
        ['black', 'k7/4pp2/4pp2/8/8/8/8/K7 w - - 0 1'],
        ['black', 'k7/5pp1/5pp1/8/8/8/8/K7 w - - 0 1'],
        ['black', 'k7/6pp/6pp/8/8/8/8/K7 w - - 0 1'],

        ['white', 'k7/PP6/PP6/8/8/8/8/K7 w - - 0 1'],
        ['white', 'k7/1PP5/1PP5/8/8/8/8/K7 w - - 0 1'],
        ['white', 'k7/2PP4/2PP4/8/8/8/8/K7 w - - 0 1'],
        ['white', 'k7/3PP3/3PP3/8/8/8/8/K7 w - - 0 1'],
        ['white', 'k7/4PP2/4PP2/8/8/8/8/K7 w - - 0 1'],
        ['white', 'k7/5PP1/5PP1/8/8/8/8/K7 w - - 0 1'],
        ['white', 'k7/6PP/6PP/8/8/8/8/K7 w - - 0 1'],
    ])(
        'test FEN: %p %p',
        (color, fen) => {
            expect(pieceStructures.pawnCube(fenToPosition(fen))).toBe(color)
        }
    )
})

describe('test center pawn cubes', () => {
    test.each([
        ['white', 'k7/8/8/3PP3/3PP3/8/8/K7 w - - 0 1'],
        ['black', 'k7/8/8/3pp3/3pp3/8/8/K7 w - - 0 1'],
    ])(
        'test FEN: %p %p',
        (color, fen) => {
            expect(pieceStructures.pawnCubeCenter(fenToPosition(fen))).toBe(color)
        }
    )
})
