const { Chess } = require('chess.js')
const fenToPosition = require('../js/utils/fen-to-position.js')

describe('convert fens to position strings', () => {
    test.each([
        [
            'starting position',
            'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            'rnbqkbnrpppppppp................................PPPPPPPPRNBQKBNR',
        ],
        [
            'random position',
            '1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1',
            '.r...rk..b..q.bp.pnppnp.p.p..p..P.P....P.PNP.PPN.B.QP.B...R..RK.',
        ],
    ])(
        'test %p FEN: %p',
        (desc, fen, position) => {
            let chessJsInstance = new Chess(fen)

            expect(fenToPosition(chessJsInstance)).toEqual(position)
        }
    )
})
