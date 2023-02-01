import { Game } from 'chess-fetcher'
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
        expect(doubleCheckCheckmate({ result: { winner: 'white', via: 'checkmate' }, moves: [{}, {}, {}] } as Game, fen)).toStrictEqual(expected)
    })
})

describe('test not double-check checkmate', () => {
    test.each([
        [
            // king not in check
            'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',

            // king in check by 1 piece
            'rnbqkbnr/ppppp1pp/8/5p1Q/8/4P3/PPPP1PPP/RNB1KBNR b KQkq - 0 1',
        ],
    ])('test fen: %p', (fen) => {
        expect(doubleCheckCheckmate({ result: { outcome: 'draw' }, moves: [{}, {}, {}] } as Game, fen)).toStrictEqual([])
        expect(doubleCheckCheckmate({ result: { winner: 'white', via: 'checkmate' }, moves: [{}, {}, {}] } as Game, fen)).toStrictEqual([])
    })
})
