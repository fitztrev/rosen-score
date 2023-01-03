import { describe, expect, test } from 'vitest'
import { parse } from '@mliebelt/pgn-parser'
import { castleFork } from '../js/goals/castle-fork'

describe('castle fork', () => {
    test.each([
        [
            // https://lichess.org/xEjSVeYp#41
            'e3 Nf6 e4 Nxe4 Nc3 Nxc3 dxc3 g6 h4 d6 h5 Bg7 Be3 Nc6 Bc4 Be6 Bxe6 fxe6 hxg6 hxg6 Rxh8+ Bxh8 Qg4 Ne5 Qxe6 Bf6 f4 Nd7 Qe4 Nf8 Qxb7 Rb8 Qc6+ Qd7 Qxd7+ Kxd7 Bxa7 Rxb2 Bc5 dxc5 O-O-O+ Kc6 Kxb2 Ne6 g3 Ng7 Nf3 Nf5 Ne5+ Bxe5 fxe5 Nxg3 Rg1 Ne4 Rxg6+ Kd5 a4 c4 a5 Nc5 a6 Nxa6 Rxa6 Kxe5 Rc6 Kd5 Rxc7 e5 Kc1 Kd6 Rxc4 Kd5 Rh4 e4 Kd2 Ke5 Ke3 Kd5 Rh5+ Kc4 Kxe4 Kxc3 Rc5+ Kb4 Kd4 Ka4 Kc3 Ka3 Ra5#',
            [
                {
                    color: 'w',
                    onMoveNumber: 40,
                },
            ],
        ],
        [
            // https://lichess.org/WZYC4JRd/black#38
            'e4 Nf6 Nc3 d5 e5 d4 exf6 dxc3 bxc3 gxf6 d4 Rg8 Nf3 Qd5 g3 Bg4 c4 Qxf3 Qxf3 Bxf3 Rg1 Nc6 Bg2 Nxd4 Kf1 Be2+ Ke1 Bxc4 Be3 Nxc2+ Kd2 Nxa1 Rxa1 c6 Rb1 e5 Rxb7 O-O-O+ Kc3 Kxb7 Kxc4 Rg4+ f4 exf4 Bxf4 Bd6 Bh3 Rxf4+ gxf4 Bxf4 Bg2 Bd2 Kc5 Be3+ Kc4 a5 Kb3 Kb6 Bf1 Rd2 h3 Bd4 Ka3 Kc5 Ka4 Rxa2+ Kb3 Rb2+ Ka3 Bc3 Bg2 Kc4 Bf1+ Kd4 Bg2 Rb1 Bxc6 Kc4 Ka2 Ra1#',
            [
                {
                    color: 'b',
                    onMoveNumber: 37,
                },
            ],
        ],
        [
            // https://lichess.org/gmYjjaY6/black#48
            'e4 e5 Nf3 Nf6 Nxe5 Nc6 Nxc6 dxc6 Nc3 Bc5 h3 h5 Qe2 Bd4 Nd1 Be5 c3 c5 d3 h4 f4 Nh5 Rg1 Ng3 Qf3 Bf6 e5 Be7 Be3 c6 d4 Bf5 Nf2 cxd4 Bxd4 Bc2 Bd3 Qxd4 Bxc2 Qc4 O-O-O Qxa2 Kd2 Qxb2 Rb1 Qa2 Rxb7 O-O-O+ Nd3 Kxb7 Rb1+ Kc7 Kc1 Ba3+ Kd2 Rxd3+ Qxd3 Rd8 Qxd8+ Kxd8 Rd1 Kc7 c4 Qxc4 Bd3 Qxf4+ Kc3 Qb4+ Kc2 Qb2#',
            [
                {
                    color: 'b',
                    onMoveNumber: 47,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
        expect(castleFork(game.moves)).toStrictEqual(expected)
    })
})
