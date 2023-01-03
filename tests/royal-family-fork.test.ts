import { describe, expect, test } from 'vitest'
import { parse } from '@mliebelt/pgn-parser'

import { royalFamilyFork } from '../js/goals/royal-family-fork'

describe('royal family fork', () => {
    test.each([
        [
            // https://lichess.org/VNAD1RDx#47
            'd4 c6 Bf4 d5 e3 Nf6 Nd2 e6 Ngf3 Bd6 Bg3 Bxg3 hxg3 Nbd7 Bd3 Nf8 e4 dxe4 Nxe4 Nxe4 Bxe4 g6 Ne5 Bd7 Qf3 Qe7 O-O-O O-O-O Qb3 f6 Nc4 Be8 Na5 Qc7 Nc4 Bf7 Qa3 f5 Bd3 Nd7 Qxa7 Rhe8 Rhe1 b5 Qa6+ Qb7 Nd6+',
            [
                {
                    color: 'w',
                    onMoveNumber: 46,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
        expect(royalFamilyFork(game.moves)).toStrictEqual(expected)
    })
})
