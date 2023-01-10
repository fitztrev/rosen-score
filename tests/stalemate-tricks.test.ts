import { Game } from 'chess-fetcher'
import { describe, expect, test } from 'vitest'
import { stalemateTricks } from '../js/goals/game-checks'

describe('test no stalemate tricks', () => {
    test.each([
        '7k/7P/7K/8/8/8/8/8 b - - 2 79', // 1 rook pawn
        'k7/2K5/8/2B5/8/p7/P7/8 b - - 16 76', // https://lichess.org/CP6xHNub/black

        // '1k6/1P6/1K6/2P5/8/8/8/8 b - - 0 61', // https://lichess.org/Pp12QY72#121
        // '8/8/5R2/8/8/8/7p/5K1k b - - 0 90', // https://lichess.org/t5kHhAuR#179
        // '8/8/8/8/8/5p2/5K1p/7k b - - 1 61', // https://lichess.org/iaGKskaV#121
    ])('test FEN: %p', (fen) => {
        expect(stalemateTricks({ result: { via: 'stalemate' } } as Game, fen)).toStrictEqual([])
    })
})

describe('test stalemate tricks', () => {
    test.each([
        [[{ color: 'b' }], '7k/7P/5PK1/8/8/6P1/8/8 b - - 0 55'], // https://lichess.org/7SXEmbld/black#109
        [[{ color: 'w' }], '3K4/q7/2q5/3k4/8/8/8/8 w - - 2 59'],
        [[{ color: 'w' }], '5K2/6r1/6q1/8/8/8/4k3/8 w - - 2 90'],
        [[{ color: 'b' }], '8/8/8/8/5P2/3QK3/8/4k3 b - - 8 71'],
        [[{ color: 'w' }], '8/1kbK4/8/8/8/8/8/4q3 w - - 0 67'], // https://lichess.org/gH4J7oSg#132
        [[{ color: 'w' }], '8/8/8/6k1/8/qp6/8/1K6 w - - 0 62'], // https://lichess.org/T5duSJA2#122
        [[{ color: 'b' }], '8/8/8/5K2/k7/2B5/1Q6/8 b - - 1 75'], // https://lichess.org/7sRJGam2#149
        [[{ color: 'b' }], '8/8/8/8/2N1K3/8/2Q5/k7 b - - 24 80'], // https://lichess.org/a0hS2yEI#159
        [[{ color: 'b' }], '7k/5P2/6KP/8/8/8/8/8 b - - 0 86'], // https://lichess.org/nu7gNPvZ#171
        [[{ color: 'w' }], '3K4/8/3kq3/8/8/8/8/8 w - - 17 91'], // https://lichess.org/oRsGcDax#180
    ])('test FEN: %p %p', (expected, fen) => {
        expect(stalemateTricks({ result: { via: 'stalemate' } } as Game, fen)).toStrictEqual(expected)
    })
})
