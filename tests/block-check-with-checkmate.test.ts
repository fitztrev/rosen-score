import { describe, expect, test } from 'vitest'
import { parse } from '@mliebelt/pgn-parser'

import { blockCheckWithCheckmate } from '../js/goals/block-check-with-checkmate'

describe('block a check with checkmate', () => {
    test.each([
        [
            // https://lichess.org/DrC87aK3#81
            'd4 d5 Bf4 h5 Nf3 Nf6 c4 c6 Nc3 g6 e3 Bg7 Be2 O-O h3 Ne4 O-O Bf5 Rc1 Nxc3 bxc3 Nd7 cxd5 cxd5 c4 Nf6 Qb3 b6 Rfd1 Rc8 Ne5 Nd7 cxd5 Nxe5 dxe5 Be4 Rxc8 Qxc8 Bd3 Bxd3 Qxd3 Rd8 e4 Qd7 Qc4 Rc8 Qb3 Rc5 Be3 Rc8 f4 Qb7 Qd3 Rd8 Bd4 Bf8 Kh2 Qd7 Rf1 Qa4 Rf2 Rc8 Bb2 Qxa2 d6 Qa4 f5 Qd7 Qg3 Kh7 fxg6+ fxg6 Rf7+ Kh8 e6+ Bg7 Bxg7+ Kg8 Qxg6 Qxd6+ Be5#',
            ['w'],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
        expect(blockCheckWithCheckmate(game.moves)).toStrictEqual(expected)
    })
})
