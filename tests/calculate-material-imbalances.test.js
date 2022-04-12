const { Chess } = require('chess.js')
const calculateMaterialImbalance = require('../js/utils/calculate-material-imbalance.js')
const fenToPosition = require('../js/utils/fen-to-position.js')

describe('test material imbalance calculations', () => {
    test.each([
        [
            'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
            0,
        ],
        [
            'rbnq4/p7/8/8/8/8/8/8 w - - 0 1',
            -20,
        ],
        [
            '8/8/8/8/8/8/P7/RBNQ4 w - - 0 1',
            20,
        ],
        [
            'rb6/8/8/8/8/8/P7/2NQ4 w - - 0 1',
            4,
        ],
    ])(
        'test FEN: %p',
        (fen, value) => {
            let chessJsInstance = new Chess(fen)

            let position = fenToPosition(chessJsInstance)

            expect(calculateMaterialImbalance(position)).toEqual(value)
        }
    )
})
