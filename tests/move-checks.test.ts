import { describe, expect, test } from 'vitest'
import { parse } from '@mliebelt/pgn-parser'
import { pawnCheckmate, g5mate, enPassantCheckmate } from '../js/goals/move-checks'

describe('test pawn checkmate', () => {
    test.each([
        [
            'e4 e5 Nf3 d6 Nc3 Nc6 Bc4 a6 a4 Bg4 h3 Bxf3 Qxf3 Nf6 d3 Nd4 Qd1 h6 O-O Be7 f4 exf4 Bxf4 Qd7 Qd2 Ne6 Be3 c6 Bb3 Nc5 Bxc5 dxc5 e5 Nd5 Ne4 O-O-O Rxf7 g5 Kh1 Qe6 Raf1 Rhf8 Rxf8 Rxf8 Rxf8+ Bxf8 Qf2 Be7 Nxc5 Bxc5 Qxc5 Qxe5 Bxd5 Qxb2 Be6+ Kb8 Qd6+ Ka7 Kh2 Qxc2 a5 Qb2 Bc4 Qf2 Qe5 Qf4+ Qxf4 gxf4 Kg1 h5 Kf2 b5 axb6+ Kxb6 Kf3 a5 Kxf4 a4 g4 hxg4 hxg4 Kc7 Kf5 a3 g5 a2 Bxa2 Kd8 g6 Ke8 g7 Kd7 g8=Q Kc7 Ke5 Kb6 Qb8+ Kc5 d4#',
            [
                {
                    color: 'w',
                    onMoveNumber: 98,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
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
                    onMoveNumber: 69,
                },
            ],
        ],
        [
            // hxg5#
            '1. e4 e5 2. Qe2 Ke7 3. Qe3 Kf6 4. Be2 Kg6 5. h4 a6 6. Qg3+ Kh6 7. Bg4 a5 8. Bf5 a4 9. b3 axb3 10. Bb2 bxa2 11. Bxe5 g5 12. hxg5#',
            [
                {
                    color: 'w',
                    onMoveNumber: 22,
                },
            ],
        ],
        [
            // fxg5#
            '1. e4 e5 2. Qe2 Ke7 3. Qe3 Kf6 4. Be2 Kg6 5. f4 Kh6 6. b3 g5 7. Bb2 a6 8. Bxe5 c6 9. a3 Qc7 10. Nf3 a5 11. Nh4 a4 12. fxg5#',
            [
                {
                    color: 'w',
                    onMoveNumber: 22,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
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
                    onMoveNumber: 71,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
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
        let game = parse(moves, { startRule: 'game' })
        expect(enPassantCheckmate(game.moves)).toStrictEqual([])
    })
})
