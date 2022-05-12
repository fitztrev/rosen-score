import { describe, expect, test } from 'vitest'
import { Chess } from 'chess.js'

import smotheredPorkMate from '../js/goals/smothered-pork-mate.js'

describe('test smothered pork', () => {
    test.each([
        [
            // https://lichess.org/39vtGApM#47
            'd4 Nf6 Bf4 g6 Nc3 d5 e3 a6 h4 Bg7 h5 Nxh5 Rxh5 gxh5 Qxh5 c6 Qh2 e5 Bxe5 O-O Qg3 f6 Bxb8 Bf5 Bd6 Re8 Bd3 Bg6 Bf4 f5 Nf3 Qb6 O-O-O c5 Nxd5 Qc6 Bc4 Kh8 Ne5 Qe6 Rh1 Bf7 Qh3 Bg8 Ne7 Qxe7 Ng6#',
            'white',
        ],
    ])(
        'test moves: %p',
        (moves, color) => {
            let chessJsInstance = new Chess()
            chessJsInstance.load_pgn(moves)
            let lastMove = chessJsInstance.history({ verbose: true }).pop()

            expect(smotheredPorkMate(chessJsInstance, lastMove)).toBe(color)
        }
    )
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
    ])(
        'test moves: %p',
        (moves) => {
            let chessJsInstance = new Chess()
            chessJsInstance.load_pgn(moves)
            let lastMove = chessJsInstance.history({ verbose: true }).pop()

            expect(smotheredPorkMate(chessJsInstance, lastMove)).toBe(false)
        }
    )
})
