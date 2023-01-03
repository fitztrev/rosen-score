import { describe, expect, test } from 'vitest'
import { parse } from '@mliebelt/pgn-parser'

import { pawnStormOpening } from '../js/goals/pawn-storm-opening'

describe('pawn storm opening', () => {
    test.each([
        [
            // https://lichess.org/eplysicB
            'c4 c5 b3 d6 e3 Nc6 d3 e5 h3 Nf6 g4 g6 a3 h5 b4 hxg4 b5 Ne7 a4 gxh3 a5 Nf5 a6 b6 Rxh3 Rxh3 Bxh3 Rb8 Bg2 Nh4 Bh1 Bg7 Nc3 Nf5 Nge2 Be6 Qc2 d5 cxd5 Nxd5 Nxd5 Bxd5 e4 Nd4 Nxd4 exd4 exd5 Qh4 Bf3 Kf8 Kf1 Re8 Bd2 Qh3+ Bg2 Qf5 Re1 Rd8 Qd1 Qxd3+ Qe2 c4 Qxd3 cxd3 d6 Rc8 Bb4 Rd8 d7+ Kg8 Re8+ Bf8 Rxd8 d2 Rxf8+ Kg7 Ke2 d3+ Kd1 g5 d8=Q g4 Rh8 g3 Qg8+ Kf6 fxg3 Ke6 Bc3',
            [
                {
                    color: 'w',
                    onMoveNumber: 24,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
        expect(pawnStormOpening({ result: { winner: 'white' } }, game.moves)).toStrictEqual(expected)
    })
})
