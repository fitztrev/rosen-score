import { Game } from 'chess-fetcher'
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
        expect(clutchPawn({ result: { winner: 'white', via: 'timeout' } } as Game, fen)).toStrictEqual(expected)
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
        expect(winInsufficientMaterial({ result: { winner: 'white', via: 'timeout' } } as Game, fen)).toStrictEqual(expected)
    })
})

describe('insufficient material with old chess.com game', () => {
    test.each([
        [
            // https://www.chess.com/analysis/game/live/88723632?tab=analysis&flip=true&move=0153
            // This trophy isn't usually available on Chess.com, but this is a game
            // from 2011 where it must have been possible at the time.
            '8/7P/8/8/4K3/8/1bk5/8 w - - 0 78',
            [{ color: 'b' }],
        ],
    ])('test fen: %p', (fen, expected) => {
        expect(winInsufficientMaterial({ result: { winner: 'black', via: 'timeout' } } as Game, fen)).toStrictEqual(expected)
    })
})
