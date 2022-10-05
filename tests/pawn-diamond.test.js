import { describe, expect, test } from 'vitest'

import fenToPosition from '../js/utils/fen-to-position.js'
import pieceStructures from '../js/goals/piece-structures.js'

describe('test pawn diamond', () => {
    test.each([
        [['white'], 'rnbqkbnr/pppppppp/8/3P4/2P1P3/3P4/P4PPP/RNBQKBNR w KQkq - 0 1'],
        [['white'], 'rnbqkbnr/pppppppp/8/8/3P4/2P1P3/P2P1PPP/RNBQKBNR w KQkq - 0 1'],
        [['black'], 'rnbqkbnr/pp4pp/3p4/2p1p3/3p4/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],
        [['black'], 'rnbqkbnr/pp1p2pp/2p1p3/3p4/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],
        [['white'], 'rnbqkbnr/pppppppp/8/8/4P3/3P1P2/PPP1P2P/RNBQKBNR w KQkq - 0 1'],

        [['white'], 'k7/8/8/8/1P6/P1P5/1P6/K7 w - - 0 1'],
        [['white'], 'k7/8/8/8/2P5/1P1P4/2P5/K7 w - - 0 1'],
        [['white'], 'k7/8/8/8/3P4/2P1P3/3P4/K7 w - - 0 1'],
        [['white'], 'k7/8/8/8/4P3/3P1P2/4P3/K7 w - - 0 1'],
        [['white'], 'k7/8/8/8/5P2/4P1P1/5P2/K7 w - - 0 1'],
        [['white'], 'k7/8/8/8/6P1/5P1P/6P1/K7 w - - 0 1'],

        [['black'], 'k7/6p1/5p1p/6p1/8/8/8/K7 w - - 0 1'],
        [['black'], 'k7/5p2/4p1p1/5p2/8/8/8/K7 w - - 0 1'],
        [['black'], 'k7/4p3/3p1p2/4p3/8/8/8/K7 w - - 0 1'],
        [['black'], 'k7/3p4/2p1p3/3p4/8/8/8/K7 w - - 0 1'],
        [['black'], 'k7/2p5/1p1p4/2p5/8/8/8/K7 w - - 0 1'],
        [['black'], 'k7/1p6/p1p5/1p6/8/8/8/K7 w - - 0 1'],

        [['white',  'black'], 'k7/5p2/4p1p1/2P2p2/1P1P4/2P5/8/K7 w - - 0 1'],
    ])(
        'test FEN: %p %p',
        (color, fen) => {
            expect(pieceStructures.pawnDiamond(fenToPosition(fen))).toStrictEqual(color)
            expect(pieceStructures.pawnDiamondSolid(fenToPosition(fen))).toStrictEqual([])
            expect(pieceStructures.doublePawnDiamond(fenToPosition(fen))).toStrictEqual([])
        }
    )
})

describe('test no pawn diamond', () => {
    test.each([
        ['1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1'],
        ['8/6p1/p4p1p/1p2kP1P/p2p2P1/P2K4/8/8 w - - 0 40'],

        ['k7/8/8/7P/6PP/P6P/8/K7 w - - 0 1'],
        ['k7/8/8/P6P/PP6/P7/8/K7 w - - 0 1'],

        ['k7/8/8/7p/6pp/p6p/8/K7 w - - 0 1'],
        ['k7/8/8/p6p/pp6/p7/8/K7 w - - 0 1'],
    ])(
        'test FEN: %p',
        (fen) => {
            expect(pieceStructures.pawnDiamond(fenToPosition(fen))).toStrictEqual([])
            expect(pieceStructures.pawnDiamondSolid(fenToPosition(fen))).toStrictEqual([])
            expect(pieceStructures.doublePawnDiamond(fenToPosition(fen))).toStrictEqual([])
        }
    )
})

describe('test solid pawn diamond', () => {
    test.each([
        [['white'], 'k7/8/8/8/1P6/PPP5/1P6/K7 w - - 0 1'],
        [['white'], 'k7/8/8/8/2P5/1PPP4/2P5/K7 w - - 0 1'],
        [['white'], 'k7/8/8/8/3P4/2PPP3/3P4/K7 w - - 0 1'],
        [['white'], 'k7/8/8/8/4P3/3PPP2/4P3/K7 w - - 0 1'],
        [['white'], 'k7/8/8/8/5P2/4PPP1/5P2/K7 w - - 0 1'],
        [['white'], 'k7/8/8/8/6P1/5PPP/6P1/K7 w - - 0 1'],

        [['black'], 'k7/6p1/5ppp/6p1/8/8/8/K7 w - - 0 1'],
        [['black'], 'k7/5p2/4ppp1/5p2/8/8/8/K7 w - - 0 1'],
        [['black'], 'k7/4p3/3ppp2/4p3/8/8/8/K7 w - - 0 1'],
        [['black'], 'k7/3p4/2ppp3/3p4/8/8/8/K7 w - - 0 1'],
        [['black'], 'k7/2p5/1ppp4/2p5/8/8/8/K7 w - - 0 1'],
        [['black'], 'k7/1p6/ppp5/1p6/8/8/8/K7 w - - 0 1'],

        [['white',  'black'], 'k7/5p2/4ppp1/2P2p2/1PPP4/2P5/8/K7 w - - 0 1'],
    ])(
        'test FEN: %p %p',
        (color, fen) => {
            expect(pieceStructures.pawnDiamond(fenToPosition(fen))).toStrictEqual(color)
            expect(pieceStructures.pawnDiamondSolid(fenToPosition(fen))).toStrictEqual(color)
            expect(pieceStructures.doublePawnDiamond(fenToPosition(fen))).toStrictEqual([])
        }
    )
})

describe('test double pawn diamond', () => {
    test.each([
        // https://lichess.org/QS3XRq0K/black#44
        [['black'], '2kr4/1p3p2/p1n1p1p1/3p1p2/PP1PpP1r/N1P1P2P/6P1/2K2R1R w - - 0 23'],

        [['white'], '8/8/6P1/5P1P/2P3P1/1P1P4/2P5/8 w - - 0 1'],
        [['white', 'black'], '8/2p2p2/1p1pp1p1/2p2p2/2P2P2/1P1PP1P1/2P2P2/8 w - - 0 1'],

        // conjoined (with 2 pawns)
        [['white'], '8/8/8/3P4/2P1P3/1P1P4/2P5/8 w - - 0 1'],
        [['black'], '8/5p2/4p1p1/3p1p2/4p3/8/8/8 w - - 0 1'],

        // conjoined (with 1 pawn)
        [['white'], '8/8/8/8/2P1P3/1P1P1P2/2P1P3/8 w - - 0 1'],
        [['black'], '8/3p1p2/2p1p1p1/3p1p2/8/8/8/8 w - - 0 1'],
    ])(
        'test FEN: %p %p',
        (color, fen) => {
            expect(pieceStructures.pawnDiamond(fenToPosition(fen))).toStrictEqual(color)
            expect(pieceStructures.pawnDiamondSolid(fenToPosition(fen))).toStrictEqual([])
            expect(pieceStructures.doublePawnDiamond(fenToPosition(fen))).toStrictEqual(color)
        }
    )
})
