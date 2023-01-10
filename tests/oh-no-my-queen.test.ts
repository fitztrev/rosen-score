import { describe, expect, test } from 'vitest'
import { parse, ParseTree } from '@mliebelt/pgn-parser'
import { ohNoMyQueen } from '../js/goals/oh-no-my-queen'

describe('test oh-no-my-queen', () => {
    test.each([
        [
            // https://lichess.org/heNcmap1#39
            'e4 e5 Nf3 Nc6 c3 Nf6 d4 exd4 e5 Ng4 cxd4 d6 h3 dxe5 hxg4 exd4 Bb5 Bd7 Bf4 Be7 Nbd2 O-O Qc2 h6 g5 f5 Bc4+ Kh8 gxh6 gxh6 Bxh6 Kh7 Bxf8+ Kg6 Nh4+ Kf6 Bh6 Ne5 Qe4 fxe4 Nxe4#',
            [
                {
                    color: 'w',
                    onMoveNumber: 39,
                },
            ],
        ],
        [
            // https://lichess.org/MJ8rhTBt/black#29
            'd4 d5 e3 c5 dxc5 e5 Bb5+ Nc6 Bxc6+ bxc6 Nc3 Bxc5 Bd2 Nf6 Na4 Bd6 Nf3 e4 Nd4 Qc7 Nc3 O-O g3 Bg4 Nce2 Nd7 c3 c5 Nb5 Ne5 Nxc7 Nf3+ Kf1 Bh3#',
            [
                {
                    color: 'b',
                    onMoveNumber: 30,
                },
            ],
        ],
    ])('test moves: %p', (moves, color) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(ohNoMyQueen(game.moves)).toStrictEqual(color)
    })
})

describe('test not oh-no-my-queen', () => {
    test.each([
        // https://lichess.org/duQB4wBE/black#110
        // was a promoted queen
        'e4 c5 Nf3 e6 Nc3 a6 d4 cxd4 Nxd4 b5 Be3 Bb7 Bd3 Qc7 O-O Nf6 Qf3 b4 Na4 d5 e5 Qxe5 Nb6 Bd6 g3 Ne4 Nxa8 Bxa8 Rad1 g5 Bxe4 dxe4 Qh5 h6 Nb3 Nc6 Rfe1 a5 Nd4 Ne7 Nb5 Qxb5 Rxd6 Bd5 Rb6 Qc4 b3 Qc7 Rd1 Nf5 Ra6 Nxe3 fxe3 Qc5 Rf1 Qxe3+ Kg2 Qd2+ Kh3 e5 Ra8+ Ke7 Ra7+ Kd6 Rf6+ Be6+ Rxe6+ fxe6 Qf7 g4+ Kxg4 Qg5+ Kh3 Qf5+ Qxf5 exf5 Ra6+ Kd5 Rxa5+ Kd4 Kg2 Rc8 Kf1 Rxc2 Rb5 f4 Rxb4+ Ke3 Rc4 Rxa2 Rc3+ Kd4 Rc1 e3 Rd1+ Ke4 Rc1 Kf3 Rb1 Rxh2 Kg1 Rg2+ Kh1 Rxg3 b4 e2 b5 Kf2 b6 e1=Q+ Rxe1 Kxe1 b7 Kf2 b8=Q Rh3#',
        // https://lichess.org/EAo5EogP#29
        // there was a promoted queen
        'e4 e5 f4 exf4 Nf3 g5 Nc3 g4 Ne5 Qh4+ g3 fxg3 Qxg4 g2+ Qxh4 gxh1=Q Nd5 Be7 Qf4 Bd6 Qxf7+ Kd8 d3 Ne7 Bg5 Re8 Nf6 Rh8 Qe8+ Rxe8 Nf7#',
    ])('test moves: %p', (moves) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(ohNoMyQueen(game.moves)).toStrictEqual([])
    })
})
