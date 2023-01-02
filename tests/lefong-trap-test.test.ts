import { describe, expect, test } from 'vitest'
import { parse } from '@mliebelt/pgn-parser'
import { lefongTrap } from '../js/goals/lefong-trap'

describe('test lefong trap', () => {
    test.each([
        [
            // https://lichess.org/h3SFNcuA
            'd4 d5 c4 c5 cxd5 cxd4 Nf3 f6 Nxd4 g6 Nc3 Nh6 e4 Nf7 Bh6 Bg7 Bxg7 Rg8 Bxf6 exf6 Bb5+ Bd7 Qa4 a6 Bxd7+ Nxd7 Ne6 Qe7 Nc7+ Kf8 Nxa8 Kg7 Nb6 Nfe5 Nxd7 Qxd7 Qc2 Rc8 Qe2 b6 f4 b5 fxe5 fxe5 O-O b4 Nd1 Rf8 Ne3 Rf2 Nf5+ Qxf5 Rxf2 Qxe4 Qxe4',
            ['w'],
        ],
        [
            // https://lichess.org/grYgSoUq/black
            'd4 Nf6 Nf3 d5 g3 Bh3 Bg2 Bxg2 Rg1 Bxf3',
            ['b'],
        ],
        [
            // https://lichess.org/grYgSoUq/black
            '1. d4 Nf6 2. Nf3 d5 3. g3 Bh3 4. Bg2 Bxg2',
            ['b'],
        ],
        [
            // https://lichess.org/0Gc7xOLO#5
            'e4 g6 d4 Bg7 Bh6 e6 Bxg7 Ne7 Bxh8 d6 Qg4 Bd7 Bc4 Nbc6 Nf3 Na5 Qh4 Nxc4 Qh6 c5 Qxh7 Qa5+ c3 O-O-O Qxf7 Nc6 Bf6 Re8 Ng5 Nxb2 Nxe6 Rxe6 Qf8+ Re8 Qxd6 Nd3+ Ke2 cxd4 Kxd3 dxc3 Nxc3 Qa6+ Kc2 Qc4 Rab1 Nb4+ Kd2 Nc6 Qa3 Re6 Rxb7 Kxb7 Qb2+ Ka8 Rb1',
            ['w'],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
        expect(lefongTrap(game.moves)).toStrictEqual(expected)
    })
})

describe('test no lefong trap', () => {
    test.each([
        // https://lichess.org/Sdrobca8/black
        // bishop was not on starting square
        'g3 Nc6 Bg2 Nf6 c3 e5 d4 d5 dxe5 Nxe5 Nf3 Nxf3+ Bxf3 Bh3 Bg2 Bxg2 Rg1 Be4 f3 Bg6 Nd2 Bc5 Nb3 Bb6 Rh1 c6 Bf4 Qe7 Nd4 Nh5 Bd2 O-O b3 Rfe8 e4 Nf6 e5 Qxe5+ Qe2 Bxd4 Qxe5 Bxe5 Ke2 Rad8',

        // https://lichess.org/4ktfWlOv#11
        // bishop recaptured
        'd4 Nf6 Bf4 d6 Nc3 Nbd7 Nf3 g6 Qd2 Bg7 Bh6 O-O Bxg7 Kxg7 e4 Ne5 dxe5 Nd7 exd6 cxd6 h4 h6 O-O-O a6 Bc4 Qa5 Bb3 Nc5 h5 g5 Nd4 Bd7 f4 f6 Rhe1 gxf4 Qxf4 Nxb3+ Nxb3 Qxh5 Nd5 Rae8 Kb1 Qg5 Qf3 Bc6 Rh1 e6 Nf4 f5 Nh5+ Kh7 Qc3 Bxe4 Nd4 e5 Nf3 Qe7 Rde1 Rg8 Qe3 Rg6 Ng3 d5 Nh4 Rf6 Nxe4 fxe4 Nf5 Qe6 Nxh6 Rxh6 Rhf1 Rh8 Qa3 Rg8 Qb3 Rg7 a4 d4 Qxe6 Rxe6 Rh1+ Kg6 Rxe4 Kf5 Ree1 Rxg2 Rhf1+ Kg5 Rd1 e4 Rc1 e3 Rg1 Rxg1 Rxg1+ Kf4 Re1 Kf3 Kc1 Kf2 Rh1 e2 Rh2+ Kg1 Rxe2 Rxe2 Kd1 Re3 Kd2 Kf2 c3 dxc3+',

        // resign before bishop captured
        '1. d4 Nf6 2. Nf3 d5 3. g3 Bh3 4. Bg2',

        // early termination
        '1. d4 d5',

        // a failed lefong
        '1. d4 Nf6 2. Nf3 d5 3. g3 Bh3 4. Bxh3',

        // https://lichess.org/juNVZaHK#11
        // white bishop was protected
        // 'd4 c5 Nf3 cxd4 Qxd4 Nf6 Nc3 Nc6 Qh4 g6 Bh6 Bg7 Bxg7 Rg8 Bxf6 exf6 O-O-O Qb6 Qxh7 Rf8 Nd5 Qa5 Nxf6+ Ke7 Qg7 Qxa2 Nd5+ Ke6 Ng5+ Kf5 e4+ Kxg5 h4+',
    ])('test moves: %p', (moves) => {
        let game = parse(moves, { startRule: 'game' })
        expect(lefongTrap(game.moves)).toStrictEqual([])
    })
})
