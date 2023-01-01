import { describe, expect, test } from 'vitest'
import { doubleCheckCheckmate } from '../js/goals/double-check-checkmate'
import { parse } from '@mliebelt/pgn-parser'

describe('test double-check checkmate', () => {
    test.each([
        [
            // https://lichess.org/OtlF3AfG
            'd4 Nf6 Bf4 e6 e3 c5 Nf3 b6 c4 Bb7 d5 exd5 Nc3 dxc4 Nb5 d6 Bxd6 Na6 Bxc4 Ne4 Qa4 Qd7 Ne5 Rd8 Bxf7+ Qxf7 Nc7#',
            ['w'],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
        expect(doubleCheckCheckmate(game.moves)).toStrictEqual(expected)
    })
})
