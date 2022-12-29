import { describe, expect, test } from 'vitest'
import { Chess } from 'chess.js'

import smotheredMate from '../js/goals/smothered-mate'
import smotheredPorkMate from '../js/goals/smothered-pork-mate'

describe('test smothered mate', () => {
    test.each([
        [
            // https://lichess.org/YOdmkxyk#59
            'd4 Nf6 Bf4 d5 e3 e6 Nd2 c5 Ngf3 Nc6 c3 Bd6 Bg3 O-O Bb5 Ne7 Bd3 Nf5 Ne5 Nxg3 hxg3 g6 g4 Ne8 f4 Bxe5 dxe5 f6 exf6 Nxf6 g5 Nh5 Rxh5 gxh5 Qxh5 Qe7 Nf3 Bd7 Ne5 Be8 Qh6 Qg7 Qxe6+ Kh8 O-O-O Bf7 Qd6 c4 Bc2 Rad8 Qc5 Rfe8 Qd4 Bg8 Rh1 Rd6 Bg6 Rxg6 Nxg6#',
            'w',
        ],
        [
            // https://lichess.org/ZGrQDhcf/black#56
            'c4 e6 g3 d5 Bg2 Nf6 Nf3 dxc4 O-O Nbd7 Qa4 c6 Qxc4 Be7 Qc2 O-O b3 c5 Bb2 b5 d4 Bb7 dxc5 Nxc5 Rd1 Qb6 Nc3 Rac8 Rac1 a6 Qb1 Nce4 Nxe4 Nxe4 Qa1 Qxf2+ Kh1 Qe3 Bd4 Nf2+ Kg1 Nh3+ Kh1 Rxc1 Rxc1 Nf2+ Kg1 Nh3+ Kh1 Qh6 Qb2 Ng5 Rf1 Ne4 Bg1 Nxg3#',
            'b',
        ],
    ])('test moves: %p', (moves, color) => {
        let chessJsInstance = new Chess()
        chessJsInstance.loadPgn(moves)
        let lastMove = chessJsInstance.history({ verbose: true }).pop()

        expect(smotheredMate(chessJsInstance, lastMove)).toBe(color)
    })
})

describe('test not smothered mate', () => {
    test.each([
        // https://lichess.org/cZkFvnql#35
        // king is not smothered
        'e4 e5 Nf3 Nc6 Bc4 Bc5 c3 d6 d4 Bb6 Ng5 Nh6 Qh5 Qe7 h3 O-O O-O Kh8 Kh1 f6 Nf3 Nd8 Nh4 Ne6 Bxh6 gxh6 f4 exd4 f5 dxc3 Nxc3 Ng5 Qxh6 Nxe4 Ng6#',
    ])('test moves: %p', (moves) => {
        let chessJsInstance = new Chess()
        chessJsInstance.loadPgn(moves)
        let lastMove = chessJsInstance.history({ verbose: true }).pop()

        expect(smotheredPorkMate(chessJsInstance, lastMove)).toBe(false)
    })
})

describe('test smothered pork', () => {
    test.each([
        [
            // https://lichess.org/39vtGApM#47
            'd4 Nf6 Bf4 g6 Nc3 d5 e3 a6 h4 Bg7 h5 Nxh5 Rxh5 gxh5 Qxh5 c6 Qh2 e5 Bxe5 O-O Qg3 f6 Bxb8 Bf5 Bd6 Re8 Bd3 Bg6 Bf4 f5 Nf3 Qb6 O-O-O c5 Nxd5 Qc6 Bc4 Kh8 Ne5 Qe6 Rh1 Bf7 Qh3 Bg8 Ne7 Qxe7 Ng6#',
            'w',
        ],
        [
            // https://lichess.org/Bc7Zyr8T#43
            // knight fork is against rook instead of queen
            'e4 e5 Nf3 Nc6 Bb5 f6 c3 Bd6 O-O Nge7 Re1 O-O Bc4+ Kh8 d4 Qe8 Be3 Qg6 Nbd2 Nd8 Nh4 Qe8 Nf5 Qg6 Nxd6 cxd6 Nf3 Qxe4 Bd3 Qg4 h3 Qe6 Qc2 Nf5 Bxf5 Qg8 Nh4 Ne6 Qe2 b6 Qh5 Ng5 Ng6#',
            'w',
        ],
    ])('test moves: %p', (moves, color) => {
        let chessJsInstance = new Chess()
        chessJsInstance.loadPgn(moves)
        let lastMove = chessJsInstance.history({ verbose: true }).pop()

        expect(smotheredMate(chessJsInstance, lastMove)).toBe(color)
        expect(smotheredPorkMate(chessJsInstance, lastMove)).toBe(color)
    })
})

describe('test no smothered pork', () => {
    test.each([
        // https://lichess.org/cZkFvnql#35
        // king is not smothered
        'e4 e5 Nf3 Nc6 Bc4 Bc5 c3 d6 d4 Bb6 Ng5 Nh6 Qh5 Qe7 h3 O-O O-O Kh8 Kh1 f6 Nf3 Nd8 Nh4 Ne6 Bxh6 gxh6 f4 exd4 f5 dxc3 Nxc3 Ng5 Qxh6 Nxe4 Ng6#',

        // https://lichess.org/U3Xsn14C#43
        // no pin
        'e4 e6 c4 d5 cxd5 exd5 Qb3 Be6 Qxb7 Nd7 exd5 Bf5 Nc3 Ngf6 Nf3 Ne4 Bb5 Bc5 Bxd7+ Bxd7 Nxe4 O-O Nxc5 Qe7+ Ne6 fxe6 O-O exd5 Qxd5+ Kh8 d4 Qf6 Bg5 Qg6 Ne5 Qxg5 Nf7+ Kg8 Nh6+ Kh8 Qg8+ Rxg8 Nf7#',

        // https://lichess.org/XTL2r2zS/black#62
        // no pin
        'd4 Nf6 Nc3 d5 Bf4 c6 e3 g6 Nf3 Bg7 a3 O-O b4 a5 Na2 Bf5 Bd3 Nbd7 Bxf5 gxf5 Qd3 e6 O-O Ne4 Bg3 Kh8 c3 a4 Nd2 b5 Nxe4 fxe4 Qe2 f5 f4 Qe8 Nc1 Nf6 Qf2 Qg6 Ne2 Rf7 Nc1 Rg8 Ne2 Bf8 Kh1 h5 Bh4 Ng4 Qg3 Rfg7 Bg5 Be7 Ng1 Bxg5 fxg5 Qxg5 Rfe1 h4 Qh3 Nf2#',
    ])('test moves: %p', (moves) => {
        let chessJsInstance = new Chess()
        chessJsInstance.loadPgn(moves)
        let lastMove = chessJsInstance.history({ verbose: true }).pop()

        expect(smotheredPorkMate(chessJsInstance, lastMove)).toBe(false)
    })
})
