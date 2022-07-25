import { describe, expect, test } from 'vitest'
import { Chess } from 'chess.js'

import queenForkReverse from '../js/goals/queen-fork-reverse.js'

describe('test rook block trick', () => {
    test.each([
        [
            // https://lichess.org/r4TFHZev#101
            'e4 c5 Nf3 g6 c4 Nc6 d4 cxd4 Nxd4 Nf6 Nc3 Nxd4 Qxd4 Bg7 e5 Ng8 Bf4 Nh6 Qd2 Nf5 g4 Nh4 O-O-O h6 Bg3 g5 f4 Qa5 Be2 Ng6 Nd5 Qxd2+ Rxd2 Rb8 e6 gxf4 exf7+ Kxf7 Nxf4 Nxf4 Bxf4 d6 Rf1 Ke8 Bd3 Be6 b3 Kd7 Bg3 Bf6 h3 Bg5 Bf4 Rhf8 Bxg5 Rxf1+ Bxf1 hxg5 Rf2 Rh8 Bg2 b6 Kd2 Rh7 Ke3 Rf7 Rxf7 Bxf7 Be4 e5 Bf5+ Kc6 Ke4 Kc5 Bh7 a5 Kf5 Kd4 Kxg5 e4 Kf6 Be8 g5 e3 Ke7 Bc6 g6 e2 g7 e1=Q+ Kf6 Qe5+ Kf7 Be8+ Kf8 Qf6+ Kxe8 Qxg7 Bf5 Qe5+ Be6 Qf5 Bxf5',
            {color: 'w', onMoveNumber: 99},
        ],
        [
            // https://lichess.org/sND9HcOj/black#40
            'd4 Nf6 Bg5 e6 Bxf6 Qxf6 Nf3 Qd8 Nc3 d5 e4 c5 exd5 cxd4 dxe6 Bb4 exf7+ Kxf7 Bc4+ Be6 O-O dxc3 Ne5+ Kf6 Bxe6 Kxe5 Qg4 Kf6 bxc3 g6 Rad1 Kg7 Rxd8 Rxd8 Bb3 Rf8 Qxb4 Nc6 Qxb7+ Ne7 Qc6 Nxc6 h4 Ne7 h5 Nf5 h6+ Kxh6 g4 Kg7 gxf5 Rf7 c4 Rf6 c5 Rxf5 c6 Rg5+ Kh2 Rf8 f4 Rh5+ Kg3 Rff5 Kf3 Rh6 Ke3 Rh3+ Rf3 Rh4 Rg3 Rhh5 Rxg6+ hxg6 Bf7 Rh4 Bg8 Rhxf4 Kd2 Re5 Kc1 Ref5 Kb2 Re4 a4 Rd4 a5 Rc4',
            {color: 'b', onMoveNumber: 38},
        ],
        [
            // https://lichess.org/OdfF1wFx#105
            'd4 d5 Bf4 Nf6 e3 c5 Nf3 Nc6 Nbd2 Qb6 dxc5 Qxc5 a3 Bg4 Be2 e6 c4 Rd8 b4 Qb6 Qc2 Bf5 Qb3 Rc8 O-O Be7 Rac1 O-O Rfd1 a6 Nf1 dxc4 Bxc4 Qa7 h3 Be4 N1d2 Bd5 Qb1 b5 Bd3 Nb8 Ng5 h6 Nge4 Nxe4 Nxe4 Nd7 Nd6 Rxc1 Rxc1 Qb6 Ne4 Nf6 Nd2 Qb7 Bf1 Rc8 Rd1 Rd8 Be5 Ne4 Qb2 Nxd2 Rxd2 Bf8 Bd4 Bc6 f3 Bd5 e4 Bc6 Bf2 Rd7 Rxd7 Qxd7 Qc3 Qe8 Qe3 Qd7 Bd3 g6 h4 h5 Qd2 Bg7 Qe2 Be5 g3 Bc7 Kg2 Be5 Bc2 Bd4 Be3 e5 Bd3 Bxe3 Qxe3 Qd4 f4 Qxe3 fxe5 Qd2+ Be2 Qd3 Bxd3 Bd7 Be2 Be6 Kf2 f6 Ke3 fxe5 Bd3 Kf7 Bc2 Ke7 Bd3 Kd6 Bxb5 Bd5 Bxa6 Bc4 Bb5 Bxb5',
            {color: 'w', onMoveNumber: 103},
        ],
    ])(
        'test moves: %p',
        (moves, result) => {
            let chessJsInstance = new Chess()
            chessJsInstance.load_pgn(moves)

            expect(queenForkReverse(chessJsInstance.history({ verbose: true }))).toStrictEqual(result)
        }
    )
})

describe('test no rook block trap', () => {
    test.each([
        // https://lichess.org/lXtaMAgB#83
        'e4 c5 Nc3 Nc6 Bb5 Nd4 Bc4 e6 Nge2 Nf6 O-O Be7 d3 O-O a4 a6 Ba2 b5 Nxd4 cxd4 Ne2 Qb6 a5 Qa7 Bd2 Bb7 f4 d6 Qe1 Rac8 Rc1 d5 e5 Nd7 Kh1 Rc7 Bb3 Rfc8 f5 Nc5 Ba2 Na4 Qg3 Bf8 Bh6 Kh8 fxe6 fxe6 Nf4 gxh6 Nxe6 Bg7 Rf3 Re7 Qg4 Rg8 Rcf1 Bc8 Qxg7+ Rexg7 Nxg7 Qxg7 g3 Be6 Kg2 Nc5 b4 Nd7 c4 Nxe5 cxd5 Bxd5 Bxd5 Nxf3 Rxf3 Re8 Be4 Rxe4 dxe4 Qe5 Rd3 Qxe4+ Rf3 Qd3 Rxd3 Kg7 Rxd4 h5 Rd6 h4 Rxa6 h3+ Kxh3 h6 Rb6 h5 Rxb5 h4 a6 hxg3',
        // https://lichess.org/fXGB2cZY#65
        'd4 b6 Bf4 Bb7 e3 Nf6 c4 e6 Nf3 Bb4+ Nfd2 d6 a3 Bxd2+ Qxd2 Nbd7 Bd3 e5 Bg5 Bxg2 Rg1 Bb7 Bh4 g6 Nc3 Qc8 O-O-O O-O f4 exd4 exd4 c5 d5 Kg7 f5 Re8 fxg6 hxg6 Qg5 Re5 Qf4 Qe8 Rdf1 Nh5 Qf3 a6 Ne4 Qf8 Rg5 b5 Qxh5 Rxg5 Qxg5 bxc4 Bxc4 Re8 Nf6 Nxf6 Qxf6+ Kg8 Rg1 Re4 Bd3 Qh6+ Bg5 Qh4 Bxh4',
        // https://lichess.org/xxqBDfAo#11
        'e4 Nf6 Nc3 e5 f4 Bb4 fxe5 Nxe4 Nxe4 Qh4+ Ng3 Qe4+ Nxe4 O-O Qh5 d5 Nf6+ gxf6 exf6 Re8+ Be2 Nd7 Qg5+ Kf8 Qg7#',
        // https://lichess.org/fONO9v0Q#93
        'c4 c5 Nc3 e6 g3 Nc6 Bg2 Nf6 Nf3 Be7 O-O O-O d4 cxd4 Nxd4 Qc7 Nxc6 bxc6 e4 a6 b3 Bb7 Bf4 d6 Qe2 e5 Be3 Rfe8 Rad1 Nd7 h3 Nb6 Rd2 Nd7 Rfd1 Nf6 g4 Rad8 g5 Nd7 h4 f6 f3 fxg5 hxg5 g6 Qf2 Rf8 Bh3 Rf4 Bxf4 exf4 Be6+ Kg7 Qh4 Ne5 Qh6+ Kh8 Rf1 c5 Rh2 Bf8 Qh3 Nd3 Nd5 Bxd5 exd5 Re8 Qh6 Bxh6 Rxh6 Rxe6 dxe6 Qe7 Rh2 Qxe6 Kh1 Qe3 Rg2 Ne5 Rgf2 Qd4 Kg2 Qc3 Re2 Qb4 Rfe1 Qb7 Re4 Qe7 Rxf4 Qxg5+ Rg4 Qf4 Rxf4 Nd3 Rfe4 Nxe1+ Rxe1 Kg7 Re8 Kh6 Ra8 Kh5 Rxa6 Kg5 Rxd6',
        // https://lichess.org/GqHB21O0/black#70
        'e4 c5 Nf3 e6 d4 cxd4 Nxd4 Nc6 Nc3 Qc7 Be2 a6 O-O Nf6 Kh1 Bb4 Bg5 Nxd4 Qxd4 Bc5 Qd3 d6 f4 Ng4 Bxg4 h6 Bh4 e5 Bxc8 Rxc8 fxe5 dxe5 Nd5 Qd6 Qg3 g5 Rad1 gxh4 Qxh4 Qg6 Nf6+ Kf8 Nd7+ Kg7 Nxc5 Rxc5 Rd7 Rc6 Rfxf7+ Qxf7 Rxf7+ Kxf7 Qh5+ Kg7 Qxe5+ Rf6 g4 Rd8 g5 hxg5 Qxg5+ Kf7 Qh5+ Ke6 Qh3+ Ke5 Qb3 Rd2 Qc3+ Rd4 Qd2 Rxd2 h3 Rf1#',
        // https://lichess.org/3YRm2XKY#67
        'e4 c6 Nc3 d5 h3 dxe4 Nxe4 Bf5 Ng3 Bg6 h4 Nf6 Nf3 Nh5 Ne5 Nxg3 Nxg6 hxg6 fxg3 e6 Qf3 Bd6 d3 Qf6 Bf4 Bxf4 gxf4 Qxb2 Rc1 Qc3+ Kd1 Qc5 Qe3 Qf5 Qd2 Qd5 g4 Qd7 Be2 Na6 Rf1 Nc5 f5 exf5 gxf5 gxf5 Bf3 O-O-O Re1 Ne6 c4 Nd4 Be2 Nxe2 Rxe2 f4 Kc2 f3 d4 fxe2 Qxe2 Qxd4 Qd3 Qxd3+ Kb2 Qd2+ Rc2 Qc1+ Rxc1 Rd3 c5 Rd2+ Rc2 Rd4 Rd2 Rd5 Kc2 Rxc5+ Kb3 Rd5 Rc2 Rd2 Rc3 Rd5 Rd3 Rb5+ Kc4 Rd5 Kb4 Rxd3 Ka5 Rd5+',
    ])(
        'test moves: %p',
        (moves) => {
            let chessJsInstance = new Chess()
            chessJsInstance.load_pgn(moves)

            expect(queenForkReverse(chessJsInstance.history({ verbose: true }))).toBeFalsy()
        }
    )
})
