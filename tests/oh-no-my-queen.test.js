const { Chess } = require('chess.js')
const ohNoMyQueen = require ('../js/goals/oh-no-my-queen.js')
const fenToPosition = require('../js/utils/fen-to-position.js')

describe('test oh-no-my-queen', () => {
    test.each([
        [
            // https://lichess.org/heNcmap1#39
            'e4 e5 Nf3 Nc6 c3 Nf6 d4 exd4 e5 Ng4 cxd4 d6 h3 dxe5 hxg4 exd4 Bb5 Bd7 Bf4 Be7 Nbd2 O-O Qc2 h6 g5 f5 Bc4+ Kh8 gxh6 gxh6 Bxh6 Kh7 Bxf8+ Kg6 Nh4+ Kf6 Bh6 Ne5 Qe4 fxe4 Nxe4#',
            'white',
        ],
    ])(
        'test moves: %p',
        (moves, color) => {
            let chessJsInstance = new Chess()
            chessJsInstance.load_pgn(moves)

            let finalPosition = fenToPosition(chessJsInstance)

            expect(
                ohNoMyQueen.checkMoves(chessJsInstance.history({ verbose: true }), finalPosition)
            ).toStrictEqual(color)
        }
    )
})

describe('test not oh-no-my-queen', () => {
    test.each([
        // https://lichess.org/duQB4wBE/black#110
        // was a promoted queen
        'e4 c5 Nf3 e6 Nc3 a6 d4 cxd4 Nxd4 b5 Be3 Bb7 Bd3 Qc7 O-O Nf6 Qf3 b4 Na4 d5 e5 Qxe5 Nb6 Bd6 g3 Ne4 Nxa8 Bxa8 Rad1 g5 Bxe4 dxe4 Qh5 h6 Nb3 Nc6 Rfe1 a5 Nd4 Ne7 Nb5 Qxb5 Rxd6 Bd5 Rb6 Qc4 b3 Qc7 Rd1 Nf5 Ra6 Nxe3 fxe3 Qc5 Rf1 Qxe3+ Kg2 Qd2+ Kh3 e5 Ra8+ Ke7 Ra7+ Kd6 Rf6+ Be6+ Rxe6+ fxe6 Qf7 g4+ Kxg4 Qg5+ Kh3 Qf5+ Qxf5 exf5 Ra6+ Kd5 Rxa5+ Kd4 Kg2 Rc8 Kf1 Rxc2 Rb5 f4 Rxb4+ Ke3 Rc4 Rxa2 Rc3+ Kd4 Rc1 e3 Rd1+ Ke4 Rc1 Kf3 Rb1 Rxh2 Kg1 Rg2+ Kh1 Rxg3 b4 e2 b5 Kf2 b6 e1=Q+ Rxe1 Kxe1 b7 Kf2 b8=Q Rh3#',
    ])(
        'test moves: %p',
        (moves) => {
            let chessJsInstance = new Chess()
            chessJsInstance.load_pgn(moves)

            let finalPosition = fenToPosition(chessJsInstance)

            expect(
                ohNoMyQueen.checkMoves(chessJsInstance.history({ verbose: true }), finalPosition)
            ).toBeFalsy()
        }
    )
})
