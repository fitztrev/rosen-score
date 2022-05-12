import { describe, expect, test } from 'vitest'

import fenToPosition from '../js/utils/fen-to-position.js'
import pieceStructures from '../js/goals/piece-structures.js'

describe('test not connect 4/5', () => {
    test.each([
        ['1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1'],
    ])(
        'test FEN: %p',
        (fen) => {
            expect(pieceStructures.connectFour(fenToPosition(fen))).toBe(false)
        }
    )
})

describe('test connect 4', () => {
    test.each([
        ['white', 'rnbqkbnr/pppppppp/8/3P4/2P5/1P6/P3PPPP/RNBQKBNR w KQkq - 0 1'],
        ['white', 'rnbqkbnr/pppppppp/8/3P4/4P3/5P2/PPP3PP/RNBQKBNR w KQkq - 0 1'],
        ['black', 'rnbqkbnr/ppp3pp/5p2/4p3/3p4/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],
        ['black', 'rnbqkbnr/p3pppp/1p6/2p5/3p4/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],
    ])(
        'test FEN: %p',
        (color, fen) => {
            expect(pieceStructures.connectFour(fenToPosition(fen))).toBe(color)
        }
    )
})

describe('test connect 5', () => {
    test.each([
        ['white', 'rnbqkbnr/pppppppp/4P3/3P4/2P5/1P6/P4PPP/RNBQKBNR w KQkq - 0 1'],
        ['white', 'rnbqkbnr/pppppppp/2P5/3P4/4P3/5P2/PPP3PP/RNBQKBNR w KQkq - 0 1'],
        ['black', 'rnbqkbnr/ppp3pp/5p2/4p3/3p4/2p5/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],
        ['black', 'rnbqkbnr/p4ppp/1p6/2p5/3p4/4p3/PPPPPPPP/RNBQKBNR w KQkq - 0 1'],
    ])(
        'test FEN: %p',
        (color, fen) => {
            expect(pieceStructures.connectFive(fenToPosition(fen))).toBe(color)
        }
    )
})

describe('test connect 6', () => {
    test.each([
        ['white', 'rnbqkbnr/pppppPpp/4P3/3P4/2P5/1P6/P4PPP/RNBQKBNR w KQkq - 0 1'],
        ['white', 'rnbqkbnr/pPpppppp/2P5/3P4/4P3/5P2/PPP3PP/RNBQKBNR w KQkq - 0 1'],
        ['black', 'rnbqkbnr/ppp3pp/5p2/4p3/3p4/2p5/PpPPPPPP/RNBQKBNR w KQkq - 0 1'],
        ['black', 'rnbqkbnr/p4ppp/1p6/2p5/3p4/4p3/PPPPPpPP/RNBQKBNR w KQkq - 0 1'],
    ])(
        'test FEN: %p',
        (color, fen) => {
            expect(pieceStructures.connectSix(fenToPosition(fen))).toBe(color)
        }
    )
})
