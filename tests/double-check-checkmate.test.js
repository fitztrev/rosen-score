import { describe, expect, test } from 'vitest'

import doubleCheckCheckmate from '../js/goals/double-check-checkmate.js'

describe('test double-check checkmate', () => {
    test.each([
        [
            // https://lichess.org/study/T5QhB3e7
            '6r1/5r2/1p5k/4b2P/1PPN3Q/P4q2/2B2p2/5RK1 w - - 0 38',
            'black',
        ],
        [
            // https://lichess.org/study/wx7tsFtw
            '4R2k/7p/6p1/8/8/2B5/8/1K6 b - - 1 1',
            'white',
        ],
        [
            // https://lichess.org/study/wx7tsFtw
            'r4rRk/pp5p/1bp5/1n2Q3/3q4/1B3N2/P5PP/1R5K b - - 2 2',
            'white',
        ],
    ])(
        'test fen: %p',
        (fen, color) => {
            expect(doubleCheckCheckmate(fen, {status: 'mate', winner: color})).toBe(color)
        }
    )
})

describe('test not double-check checkmate', () => {
    test.each([
        // https://lichess.org/study/wx7tsFtw
        // double-check but not checkmate
        '4R2k/5bp1/3q2Np/7P/8/1Pp5/P1P5/1K6 b - - 1 1',
        'rn3rk1/p5pp/2p5/3Pp3/8/1Q1b4/PPPB2PP/R4KNR w - - 1 2',
        'rn1k1b1r/pp2ppp1/5n1p/B3q2b/4N3/6N1/PPP3PP/2KR1B1R b K - 1 2',
        'r4r2/4npkp/1q1bp1p1/p1np1N2/1pp1P3/1P1P2P1/PBP2PBP/1NK4R b K - 1 2',
        'r1r1n3/1pqbbkpp/p2pP3/4n1P1/P2NP3/2N1B3/1PP1Q2P/R4RK1 b - - 0 2',
    ])(
        'test fen: %p',
        (fen) => {
            expect(doubleCheckCheckmate(fen, {status: 'mate'})).toBeFalsy()
        }
    )
})
