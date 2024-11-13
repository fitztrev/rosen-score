import { Game } from 'chess-fetcher'
import { describe, expect, test } from 'vitest'
import { monaLisaCheckmate } from '../js/goals/mona-lisa-checkmate'

describe('original setup checkmate', () => {
    test.each([
        ['white', { color: 'w' }, '8/8/8/8/8/8/2k5/RNBQKBNR b KQ - 0 1'],
        ['black', { color: 'b' }, 'rnbqkbnr/2K5/8/8/8/8/8/8 w kq - 0 1'],
    ])('test FEN', (winner, expected, fen) => {
        expect(
            monaLisaCheckmate(
                {
                    result: {
                        via: 'checkmate',
                        winner: winner,
                    },
                } as Game,
                fen
            )
        ).toStrictEqual([expected])
    })
})
