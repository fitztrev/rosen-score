import { describe, expect, test } from 'vitest'
import { parse, ParseTree } from '@mliebelt/pgn-parser'
import {
    pawnCheckmate,
    g5mate,
    enPassantCheckmate,
    promoteToBishopCheckmate,
    promoteToKnightCheckmate,
    castleKingsideWithCheckmate,
    castleQueensideWithCheckmate,
} from '../js/goals/move-checks'

describe('test pawn checkmate', () => {
    test.each([
        [
            'e4 e5 Nf3 d6 Nc3 Nc6 Bc4 a6 a4 Bg4 h3 Bxf3 Qxf3 Nf6 d3 Nd4 Qd1 h6 O-O Be7 f4 exf4 Bxf4 Qd7 Qd2 Ne6 Be3 c6 Bb3 Nc5 Bxc5 dxc5 e5 Nd5 Ne4 O-O-O Rxf7 g5 Kh1 Qe6 Raf1 Rhf8 Rxf8 Rxf8 Rxf8+ Bxf8 Qf2 Be7 Nxc5 Bxc5 Qxc5 Qxe5 Bxd5 Qxb2 Be6+ Kb8 Qd6+ Ka7 Kh2 Qxc2 a5 Qb2 Bc4 Qf2 Qe5 Qf4+ Qxf4 gxf4 Kg1 h5 Kf2 b5 axb6+ Kxb6 Kf3 a5 Kxf4 a4 g4 hxg4 hxg4 Kc7 Kf5 a3 g5 a2 Bxa2 Kd8 g6 Ke8 g7 Kd7 g8=Q Kc7 Ke5 Kb6 Qb8+ Kc5 d4#',
            [
                {
                    color: 'w',
                    onMoveNumber: 99,
                },
            ],
        ],
        [
            // https://lichess.org/BJvbtS9B
            // castle mate, O-O#
            // including this so that it's not incorrectly flagged as a pawn checkmate because the PgnMove doesn't have a `fig` property
            'e4 d5 Nf3 dxe4 Ng5 e5 d3 exd3 Bxd3 h6 Qh5 Qf6 Nxf7 Be6 Nd6+ Kd7 Qe8+ Kxd6 Nc3 Bd5 Nb5+ Kc5 Be3+ Kb4 a3+ Ka4 Nxc7+ Bc6 Bb5+ Ka5 b4+ Bxb4+ axb4+ Kxb4 Ra4+ Kc3 Bd2+ Kxc2 Ra2+ Kb3 Qf8 Kxa2 Bc4+ Kb2 Qb4+ Kc2 Qc3+ Kb1 O-O#',
            [],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(pawnCheckmate(game.moves)).toStrictEqual(expected)
    })
})

describe('test g5#', () => {
    test.each([
        [
            // g5#
            // https://lichess.org/oSMRMqtB/black
            'd4 Nf6 Bf4 d5 e3 c5 c3 Nc6 Nd2 cxd4 exd4 Bf5 Ngf3 e6 Bb5 Bd6 Bxd6 Qxd6 O-O O-O Bxc6 bxc6 b4 Rfe8 Nb3 Bg4 h3 Bxf3 Qxf3 e5 dxe5 Qxe5 Nd4 Rac8 Rfe1 Ne4 Nf5 Qxc3 Qg4 Qb2 Rab1 Qxf2+ Kh1 g6 Rf1 h5 Nh6+ Kg7 Qd7 Ng3+ Kh2 Nxf1+ Rxf1 Qxf1 Nf5+ Qxf5 Qd6 Qe5+ Qxe5+ Rxe5 Kg3 Rce8 Kh4 Re2 b5 R8e3 bxc6 Kh6 a4 g5#',
            [
                {
                    color: 'b',
                    onMoveNumber: 70,
                },
            ],
        ],
        [
            // hxg5#
            '1. e4 e5 2. Qe2 Ke7 3. Qe3 Kf6 4. Be2 Kg6 5. h4 a6 6. Qg3+ Kh6 7. Bg4 a5 8. Bf5 a4 9. b3 axb3 10. Bb2 bxa2 11. Bxe5 g5 12. hxg5#',
            [
                {
                    color: 'w',
                    onMoveNumber: 23,
                },
            ],
        ],
        [
            // fxg5#
            '1. e4 e5 2. Qe2 Ke7 3. Qe3 Kf6 4. Be2 Kg6 5. f4 Kh6 6. b3 g5 7. Bb2 a6 8. Bxe5 c6 9. a3 Qc7 10. Nf3 a5 11. Nh4 a4 12. fxg5#',
            [
                {
                    color: 'w',
                    onMoveNumber: 23,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(pawnCheckmate(game.moves)).toStrictEqual(expected)
        expect(g5mate(game.moves)).toStrictEqual(expected)
    })
})

describe('test en passant mate', () => {
    test.each([
        [
            'Nf3 e5 Nxe5 Nc6 Nxc6 dxc6 e3 Nf6 b3 Bd6 Bb2 h5 d4 Qe7 Nd2 Bf5 Nc4 Bf4 Be2 Bh6 Qd2 O-O-O O-O Kb8 a4 Ne4 Qa5 Bc8 Ba3 Qh4 Ne5 f6 Bc5 Nxc5 Nxc6+ bxc6 Qxc5 Bb7 a5 a6 Ra4 Rd5 Qc3 Qg5 Rb4 Rb5 Bxb5 cxb5 f3 Qxe3+ Qxe3 Bxe3+ Kh1 h4 Re1 Bd2 Re7 Bxb4 Rxg7 Re8 Kg1 Bc3 f4 Bxd4+ Kf1 Bc6 Rh7 b4 Rxh4 Bb5+ c4 bxc3#',
            [
                {
                    color: 'b',
                    onMoveNumber: 72,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(enPassantCheckmate(game.moves)).toStrictEqual(expected)
    })
})

describe('test not en passant mate', () => {
    test.each([
        // pawn push mate
        'e4 e5 Nf3 d6 Nc3 Nc6 Bc4 a6 a4 Bg4 h3 Bxf3 Qxf3 Nf6 d3 Nd4 Qd1 h6 O-O Be7 f4 exf4 Bxf4 Qd7 Qd2 Ne6 Be3 c6 Bb3 Nc5 Bxc5 dxc5 e5 Nd5 Ne4 O-O-O Rxf7 g5 Kh1 Qe6 Raf1 Rhf8 Rxf8 Rxf8 Rxf8+ Bxf8 Qf2 Be7 Nxc5 Bxc5 Qxc5 Qxe5 Bxd5 Qxb2 Be6+ Kb8 Qd6+ Ka7 Kh2 Qxc2 a5 Qb2 Bc4 Qf2 Qe5 Qf4+ Qxf4 gxf4 Kg1 h5 Kf2 b5 axb6+ Kxb6 Kf3 a5 Kxf4 a4 g4 hxg4 hxg4 Kc7 Kf5 a3 g5 a2 Bxa2 Kd8 g6 Ke8 g7 Kd7 g8=Q Kc7 Ke5 Kb6 Qb8+ Kc5 d4#',
        // pawn capture mate
        'e4 e5 Qe2 Ke7 Qe3 Kf6 Be2 Kg6 f4 Kh6 b3 g5 Bb2 a6 Bxe5 c6 a3 Qc7 Nf3 a5 Nh4 a4 fxg5#',
    ])('test moves', (moves) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(enPassantCheckmate(game.moves)).toStrictEqual([])
    })
})

describe('test O-O#', () => {
    test.each([
        [
            'e4 d5 Nf3 dxe4 Ng5 e5 d3 exd3 Bxd3 h6 Qh5 Qf6 Nxf7 Be6 Nd6+ Kd7 Qe8+ Kxd6 Nc3 Bd5 Nb5+ Kc5 Be3+ Kb4 a3+ Ka4 Nxc7+ Bc6 Bb5+ Ka5 b4+ Bxb4+ axb4+ Kxb4 Ra4+ Kc3 Bd2+ Kxc2 Ra2+ Kb3 Qf8 Kxa2 Bc4+ Kb2 Qb4+ Kc2 Qc3+ Kb1 O-O#',
            [
                {
                    color: 'w',
                    onMoveNumber: 49,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(castleKingsideWithCheckmate(game.moves)).toStrictEqual(expected)
    })
})

describe('test O-O-O#', () => {
    test.each([
        [
            'b3 e5 Bb2 Nc6 Nf3 e4 Nd4 Nxd4 Bxd4 d5 e3 Bf5 c4 c5 Bb2 d4 exd4 cxd4 d3 Bb4+ Ke2 exd3+ Kf3 Nf6 Kg3 Ne4+ Kf4 Qg5+ Ke5 f6+ Kxd4 O-O-O#',
            [
                {
                    color: 'b',
                    onMoveNumber: 32,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(castleQueensideWithCheckmate(game.moves)).toStrictEqual(expected)
    })
})

describe('test promote to bishop mate', () => {
    test.each([
        [
            'e4 e5 Nf3 Nf6 Nxe5 Nc6 Nxc6 dxc6 d3 Bc5 Be2 h5 c3 Ng4 d4 Qh4 g3 Qf6 Bf3 Bd6 e5 Bxe5 dxe5 Nxe5 Bf4 Nxf3+ Qxf3 Bg4 Qe4+ Qe7 Qxe7+ Kxe7 O-O Rhc8 Nd2 Kf8 Be3 b6 Kg2 Re8 h3 Be6 Rae1 Rad8 Kg1 Bxa2 Nf3 Bc4 Nd2 Bxf1 Kxf1 Rxe3 fxe3 Rxd2 b3 Rh2 c4 Rxh3 Kf2 Rh2+ Kf1 Rh1+ Kf2 Rxe1 Kxe1 Ke7 Ke2 Kd6 Kd2 Kc5 Kc2 Kb4 Kb2 a5 Kc2 a4 Kb2 a3+ Ka2 g5 e4 h4 e5 hxg3 e6 fxe6 Ka1 Kxb3 c5 bxc5 Kb1 g2 Kc1 g1=N Kd2 e5 Ke1 a2 Kd2 Nh3 Ke1 g4 Kd2 g3 Ke3 g2 Ke4 g1=Q Kf5 Qg6+ Kxe5 a1=B#',
            [
                {
                    color: 'b',
                    onMoveNumber: 112,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(promoteToBishopCheckmate(game.moves)).toStrictEqual(expected)
    })
})

describe('test promote to knight mate', () => {
    test.each([
        [
            'd4 d5 c4 e6 Nc3 Nf6 Bg5 Be7 e3 O-O Nf3 a6 Rc1 Nbd7 cxd5 exd5 Bd3 Re8 O-O Nf8 h3 Ng6 Ne5 c6 f4 Nd7 Bxe7 Qxe7 Qh5 Ndf8 Rce1 a5 a3 Bd7 Na4 Nxe5 fxe5 Ng6 Rf3 Be6 Ref1 Rf8 g4 Rab8 Bf5 b6 Rc1 c5 Nc3 b5 Ne2 Rfc8 Rcf1 Rf8 Nf4 b4 a4 c4 Bxe6 fxe6 Nxg6 hxg6 Rxf8+ Rxf8 Rxf8+ Kxf8 Qxg6 c3 Qc2 Qc7 Kf2 b3 Qc1 c2 Ke2 Qc4+ Kd2 Qb4+ Kd3 Qc4+ Kd2 Qb4+ Kd3 Qxa4 Qf1+ Ke7 Qe1 Qc4+ Kd2 Qb4+ Kd3 Qxe1 e4 c1=N#',
            [
                {
                    color: 'b',
                    onMoveNumber: 94,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(promoteToKnightCheckmate(game.moves)).toStrictEqual(expected)
    })
})
