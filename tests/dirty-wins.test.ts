import { describe, expect, test } from 'vitest'
import { clutchPawn, winInsufficientMaterial } from '../js/goals/dirty-wins'

describe('clutch pawn', () => {
    test.each([
        [
            // https://lichess.org/tgMQgOSk#149
            '1r6/4K3/P7/8/2q5/3qk3/8/8 b - - 2 75',
            [{ color: 'w' }],
        ],
    ])('test fen: %p', (fen, expected) => {
        expect(clutchPawn({ result: { winner: 'white', via: 'timeout' } }, fen)).toStrictEqual(expected)
    })
})

describe('insufficient material', () => {
    test.each([
        [
            // https://lichess.org/nYz9xUgc#141
            '8/8/8/8/4kn2/4Bp2/6q1/4K3 b - - 3 71',
            [{ color: 'w' }],
        ],
    ])('test fen: %p', (fen, expected) => {
        expect(winInsufficientMaterial({ result: { winner: 'white', via: 'timeout' } }, fen)).toStrictEqual(expected)
    })
})
