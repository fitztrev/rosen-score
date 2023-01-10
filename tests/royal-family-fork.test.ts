import { describe, expect, test } from 'vitest'
import { parse, ParseTree } from '@mliebelt/pgn-parser'

import { royalFamilyFork } from '../js/goals/royal-family-fork'

describe('royal family fork', () => {
    test.each([
        [
            // https://lichess.org/VNAD1RDx#47
            'd4 c6 Bf4 d5 e3 Nf6 Nd2 e6 Ngf3 Bd6 Bg3 Bxg3 hxg3 Nbd7 Bd3 Nf8 e4 dxe4 Nxe4 Nxe4 Bxe4 g6 Ne5 Bd7 Qf3 Qe7 O-O-O O-O-O Qb3 f6 Nc4 Be8 Na5 Qc7 Nc4 Bf7 Qa3 f5 Bd3 Nd7 Qxa7 Rhe8 Rhe1 b5 Qa6+ Qb7 Nd6+',
            [
                {
                    color: 'w',
                    onMoveNumber: 47,
                },
            ],
        ],
        [
            // https://lichess.org/SSjGVeZz/black#52
            'e4 e5 f4 d5 Nc3 d4 Nce2 Nc6 Nf3 d3 cxd3 Bc5 fxe5 g5 d4 g4 dxc5 gxf3 gxf3 Nxe5 Ng3 Qd4 Be2 h5 h4 Ne7 d3 Rg8 Nxh5 Rg2 Rf1 N7g6 Bg5 Qxb2 Nf6+ Kf8 Rf2 Rg1+ Rf1 Qc3+ Kf2 Rxf1+ Kxf1 Bh3+ Kg1 Qd4+ Kh2 Be6 Qg1 Qb2 Re1 Nxf3+',
            [
                {
                    color: 'b',
                    onMoveNumber: 52,
                },
            ],
        ],
        [
            // https://lichess.org/UwJfzGAn#37
            'e4 e5 Nf3 d6 d4 exd4 Nxd4 Be7 Nc3 Nf6 Bc4 Nc6 Bf4 O-O O-O h6 Nf5 Bxf5 exf5 Qd7 g4 Nh7 Nd5 Bg5 Bg3 Bf6 c3 Be5 f4 Bf6 Qf3 Rfe8 h4 g5 fxg6 fxg6 Nxf6+',
            [
                {
                    color: 'w',
                    onMoveNumber: 37,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(royalFamilyFork(game.moves)).toStrictEqual(expected)
    })
})

describe('not royal family fork', () => {
    // knight can be captured in each of these
    test.each([
        // https://lichess.org/DokGxEFk#41
        'd4 g6 Bf4 Bh6 Bxh6 Nxh6 Qd2 Ng8 Nc3 d6 e4 Nf6 Nf3 e5 O-O-O exd4 Nxd4 Nc6 Nde2 Bg4 f3 Be6 h4 Nd7 h5 Qe7 Nd5 Bxd5 exd5 Nce5 Nc3 O-O-O Qd4 Kb8 Nb5 Nb6 Qf4 a6 Nd4 g5 Nc6+ bxc6 Qb4 cxd5 Bxa6 Ka7 Bb5 c5 Qa3+ Kb8 Qa6 Qa7 f4 gxf4 Rhe1 Nd3+ Bxd3 Qxa6 Bxa6 Rhe8 Bb5 Rxe1 Kb1 Rxd1#',
        // https://lichess.org/ADgWOR9O#47
        'd4 g6 Bf4 Bg7 Nc3 d6 Qd2 Nc6 e3 Bd7 Be2 e6 Nf3 Nge7 O-O O-O h3 a6 Bh2 b5 Rfe1 Rb8 Nd1 Nd5 c3 Nf6 Bd3 Ne7 e4 Qc8 Bg3 Qb7 Bh4 Rfe8 Qc2 c5 Ne3 cxd4 cxd4 Rbc8 Qd2 Nxe4 Bxe4 Qxe4 Ng4 Qd5 Nf6+ Bxf6 Bxf6 Qf5 Bg5 Nd5 Bh6 Rc2 Qa5 Qh5 Be3 Nxe3 Rxe3 Bc6 Qxa6 Bxf3 Rxf3 Rxb2 Qxd6 Qd5 Qf4 Qf5 a4 Qxf4 Rxf4 bxa4 Rxa4 Re7 Kh2 Kg7 h4 Rd2 g3 h6 Kg2 Rd7 Kf3 g5 hxg5 hxg5 Re4 Kg6 Ke3 Rd1 Ke2 Rb1 Ra5 Rb2+ Kf3 Rd5 Rxd5 exd5 Re5 Rb3+ Kg2 Rb5 Kh3 f6 Re6 Rb4 Rd6 Rxd4 Kg2 Kf5 Rd8 Ke5 Re8+',
        // https://lichess.org/v3CLmM5w/black#38
        'e4 e5 Nf3 Nf6 Nc3 Bc5 Nxe5 Nc6 Nf3 O-O d4 Bb4 e5 Ne4 Bd2 Nxd2 Qxd2 d6 exd6 Qxd6 O-O-O Bg4 Be2 Rad8 Kb1 Bxf3 Bxf3 Nxd4 Bxb7 c5 g3 Qb6 Be4 Nb5 Nd5 Rxd5 Qxd5 Nc3+ bxc3 Bxc3+ Qb3 Qf6 f4 a5 Rd3 Bb4 a3 Rb8 Ka2 c4 Qxc4 Bf8 Rb3 Rd8 Bd5 g6 Rd1 Kh8 Rdd3 Bg7 c3 Re8 Rb2 h5 Bxf7 Rf8 Bd5 a4 Rc2 Qe7 Qb4 Qe1 Rdd2 Rd8 Qe4 Qg1 Qxg6 Qc5 Qxh5+ Bh6 Qxh6#',
        // https://lichess.org/dN9toDCc/black#62
        'd4 e6 Bf4 b6 Nf3 Bb7 Nc3 h6 Nb5 d6 e3 g5 Bg3 Bg7 Nc3 Nd7 h4 g4 Nd2 f5 Be2 Ngf6 f3 Nh5 Bh2 g3 Bg1 Bf6 f4 Ng7 Bh5+ Kf8 Bf3 Qc8 Bxb7 Qxb7 Qf3 d5 O-O-O Ne8 Qxg3 Rg8 Qf3 Rg4 Rh3 h5 Rg3 Nd6 Rxg4 hxg4 Qe2 Ke7 g3 b5 Bf2 b4 Na4 Qc6 b3 Nb5 Kb1 Nc3+ Nxc3 bxc3 Nc4 dxc4 Qxc4 Qxc4 bxc4 Rb8+ Ka1 Nb6 Rb1 Nd7 Rxb8 Nxb8 c5 Nd7 Kb1 c6 h5 Kf7 h6 Kg6 a4 Kh7 Ka2 Kxh6 Kb3 Kg6 Kxc3 Nxc5 Kc4 Ne4 Be1 e5 Ba5 exf4 gxf4 g3 Be1 g2 Bf2 Nxf2 d5 g1=Q dxc6 Qf1+ Kd5 Qa6 Ke6 Qc8+',
    ])('test moves: %p', (moves) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(royalFamilyFork(game.moves)).toStrictEqual([])
    })
})
