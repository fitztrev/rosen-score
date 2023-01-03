import { describe, expect, test } from 'vitest'
import { parse } from '@mliebelt/pgn-parser'
import { checkmateWithKing } from '../js/goals/move-checks'

describe('test checkmate with king', () => {
    test.each([
        [
            // https://lichess.org/BJvbtS9B
            // O-O#
            'e4 d5 Nf3 dxe4 Ng5 e5 d3 exd3 Bxd3 h6 Qh5 Qf6 Nxf7 Be6 Nd6+ Kd7 Qe8+ Kxd6 Nc3 Bd5 Nb5+ Kc5 Be3+ Kb4 a3+ Ka4 Nxc7+ Bc6 Bb5+ Ka5 b4+ Bxb4+ axb4+ Kxb4 Ra4+ Kc3 Bd2+ Kxc2 Ra2+ Kb3 Qf8 Kxa2 Bc4+ Kb2 Qb4+ Kc2 Qc3+ Kb1 O-O#',
            [
                {
                    color: 'w',
                    onMoveNumber: 49,
                },
            ],
        ],
        [
            // https://lichess.org/JCR11y6i/black
            // King move discovered checkmate
            'e4 e5 Nf3 Nf6 Nxe5 Nc6 Nf3 Nxe4 Nc3 Nxc3 dxc3 Bc5 Bd3 O-O O-O d6 Bg5 f6 Bf4 Bg4 Be2 Qd7 Bg3 Rae8 Re1 Kh8 h3 Bh5 Nh2 Bg6 Nf3 a6 Nd4 Ne5 Qd2 Re7 Bd3 Rfe8 Bxg6 hxg6 Bxe5 dxe5 Nf3 Qxd2 Nxd2 Rd7 Ne4 Be7 c4 Red8 Re2 Rd1+ Rxd1 Rxd1+ Kh2 f5 Nc3 Rd4 b3 e4 g3 c6 Kg2 Bf6 Na4 b5 cxb5 cxb5 Nc5 a5 Nb7 a4 Nc5 Kg8 Ne6 Rd1 Nf4 Kf7 h4 g5 hxg5 Bxg5 Nh3 Bf6 Nf4 g5 Nh3 a3 Ng1 Ra1 c4 bxc4 bxc4 Rc1 g4 Rxc4 gxf5 Be5 Nh3 Kf6 f3 exf3+ Kxf3 Kxf5 Nf2 Rc3+ Kg2 Rg3+ Kf1 Rc3 Ne4 Rc1+ Kg2 Rb1 Nxg5 Rb2 Kf3 Rxe2 Kxe2 Kxg5 Kd1 Kf4 Kc2 Ke4 Kb1 Kd3 Kc1 Bf4+ Kb1 Be3 Ka1 Bf4 Kb1 Bg5 Ka1 Kc3 Kb1 Bf4 Ka1 Be3 Kb1 Bf4 Ka1 Be3 Kb1 Bd4 Ka1 Kc2#',
            [
                {
                    color: 'b',
                    onMoveNumber: 148,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
        expect(checkmateWithKing(game.moves)).toStrictEqual(expected)
    })
})
