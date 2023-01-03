import { describe, expect, test } from 'vitest'
import { doubleCheckCheckmate } from '../js/goals/double-check-checkmate'

describe('test double-check checkmate', () => {
    test.each([
        [
            // https://lichess.org/OtlF3AfG
            '3rkb1r/pbN2qpp/np1B4/2p1N3/Q3n3/4P3/PP3PPP/R3K2R b KQk - 1 14',
            [
                {
                    color: 'w',
                    onMoveNumber: 3,
                },
            ],
        ],
    ])('test fen: %p', (fen, expected) => {
        expect(doubleCheckCheckmate({ result: { winner: 'white', via: 'checkmate' }, moves: [1, 2, 3] }, fen)).toStrictEqual(expected)
    })
})
