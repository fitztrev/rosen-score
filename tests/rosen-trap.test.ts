import { describe, expect, test } from 'vitest'
import { parse } from '@mliebelt/pgn-parser'
import { rosenTrap } from '../js/goals/rosen-trap'

describe('test rosen trap', () => {
    test.each([
        [
            // https://lichess.org/fBcFhVs4
            'd4 Nf6 Bf4 d6 Nc3 c6 Nf3 g6 e4 Bg7 Qd2 O-O O-O-O Qa5 Kb1 b5 Bd3 b4 Ne2 Be6 Nc1 Nbd7 Bh6 Nb6 h4 Nc4 Bxc4 Bxc4 Rdg1 Nxe4 Qe3 Nc3+ bxc3 bxc3 Bxg7 Qa3 Qxc3 Qxc3 Bxf8 Rb8+ Nb3 Kxf8 Rh3 a5 Ne5 Qd2 Nd7+ Kg7 Nxb8 Qxf2 Rc1 a4 Nxc6 axb3 axb3 Be6 Nxe7 Bxh3 gxh3 Qxh4 Nd5 Qxd4 Ne7 Qe3 Nd5 Qxh3 c4 Qxb3+ Ka1 Qa3+ Kb1 h5 Rc2 Qb3+ Kc1 Qd3 Ne3 Qxe3+ Kb1 h4 c5 dxc5 Kb2 h3 Kb1 Qd3 Kb2 Qxc2+ Ka1 h2',
            [
                {
                    color: 'w',
                    onMoveNumber: 87,
                },
            ],
        ],
        [
            // https://lichess.org/ky6pPEdI/black
            'Nf3 Nf6 d4 d5 e3 c5 Be2 cxd4 exd4 Nc6 O-O Bf5 Bg5 e6 Nbd2 Bd6 c3 Bg6 Re1 O-O Nf1 Qb8 h3 Nd7 b4 a6 a4 Re8 Qb3 b5 axb5 axb5 Rxa8 Qxa8 Bxb5 Qb7 Qa4 Rc8 Ba6 Qa8 Ra1 Nb6 Qd1 Rc7 Bb5 Ra7 Rxa7 Nxa7 Bd3 Qc8 Bxg6 hxg6 Qd3 Qc4 Qxc4 Nxc4 N1d2 Nb5 Nxc4 dxc4 Bd2 f6 Kf1 g5 Ke2 Kf7 Kd1 Kg6 Kc2 Kf5 Ng1 Ke4 f3+ Kd5 Ne2 e5 dxe5 Bxe5 Be3 Nd6 Bd4 Bh2 Kb2 Nb5 Kc2 f5 Kd2 g6 Be3 g4 fxg4 fxg4 hxg4 Be5 Bf4 Bf6 Be3 Be7 g5 Bd8 Bf4 Be7 Be3 Bf8 Nf4+ Ke4 Nxg6 Bg7 Bd4 Bxd4 cxd4 Kxd4 Nf4 c3+ Kc1 Nd6 g6 Nf5 Ne2+ Kc4 Nxc3 Ng7 b5 Kxc3 b6 Ne6 b7 Nd4 b8=Q Ne2+ Kd1 Nd4 Ke1 Nb3 Qc7+ Kb2 Qb6 Ka2 Qxb3+ Ka1 g7',
            [
                {
                    color: 'b',
                    onMoveNumber: 138,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })

        expect(rosenTrap({ result: { via: 'stalemate' } }, game.moves)).toStrictEqual(expected)
        expect(rosenTrap({ result: { via: 'checkmate' } }, game.moves)).toStrictEqual([])
    })
})

describe('test no rosen trap', () => {
    test.each([
        // https://lichess.org/7HcwmAgs
        // king cannot capture queen
        'd4 Nf6 c4 e6 Nc3 d5 cxd5 exd5 Bg5 Be7 Nf3 O-O e3 b6 Bd3 Ba6 O-O Bxd3 Qxd3 Nbd7 Ne5 c5 Nc6 Qe8 Nxe7+ Qxe7 Nxd5 Qd6 Nxf6+ Nxf6 Bf4 Qd5 Rfd1 cxd4 Qxd4 Qb5 Rac1 h6 Be5 Ne8 a4 Qa6 Qe4 Rc8 Qg4 Rxc1 Rxc1 Qd3 h4 Qd2 Rc8 f6 Qe6+ Kh7 Rxe8 Rxe8 Qxe8 fxe5 Qxe5 Qd1+ Kh2 Qxa4 Qf5+ Kg8 Qc8+ Kh7 Qb7 Qxh4+ Kg1 Qa4 f3 Qb5 Qe4+ Kg8 Qe8+ Qxe8 f4 Qb5 f5 Qxb2 f6 Qxf6 Kh2 Qe5+ g3 Qxe3 Kg2 Qg5 Kg1 Qxg3+ Kh1 h5',

        // https://lichess.org/dpFJKkas#84
        // king cannot capture queen
        'e4 Nf6 Nc3 d5 exd5 Nxd5 Bc4 Nxc3 bxc3 g6 Nf3 Bg7 O-O O-O d4 c5 Qe2 Nc6 Rd1 Bg4 d5 Ne5 Bf4 Nxf3+ gxf3 Bf5 Qe3 b6 Re1 Bf6 Be5 Bxc2 Re2 Bf5 Rae1 Qd7 Kh1 Rad8 Qf4 Qa4 d6 Bxe5 Bxf7+ Rxf7 Qxa4 exd6 f4 Bxc3 Re8+ Rxe8 Rxe8+ Kg7 h4 h5 Qb3 Bf6 Qg3 d5 a4 d4 Qf3 d3 Qa8 c4 Rg8+ Kh7 Rc8 Bxc8 Qxc8 d2 Qd8 Bxd8 Kg2 d1=Q a5 Qd4 a6 Qxf4 Kg1 Qf3 Kh2 Qxf2+ Kh1 Qg3',
    ])('test moves: %p', (moves) => {
        let game = parse(moves, { startRule: 'game' })

        expect(rosenTrap({ result: { via: 'stalemate' } }, game.moves)).toStrictEqual([])
    })
})
