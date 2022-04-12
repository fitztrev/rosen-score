const { Chess } = require('chess.js')
const fenToPosition = require('../js/utils/fen-to-position.js')
const gameChecks = require('../js/goals/game-checks.js')
const pieceStructures = require('../js/goals/piece-structures.js')

describe('test no stalemate tricks', () => {
    test.each([
        'k7/2K5/8/2B5/8/p7/P7/8 b - - 16 76', // https://lichess.org/CP6xHNub/black
    ])(
        'test FEN: %p',
        (fen) => {
            // console.log(fen)
            let chessJsInstance = new Chess(fen)
            expect(gameChecks.stalemateTricks({ status: 'stalemate' }, fenToPosition(chessJsInstance), 'white')).toBe(false)
        }
    )
})

// describe('test stalemate tricks', () => {
//     test.each([
//         ['white', 'k7/8/8/8/8/1NN5/1NN5/K7 w - - 0 1'],
//         ['black', 'k7/1nn5/1nn5/8/8/8/8/K7 w - - 0 1'],
//     ])(
//         'test FEN: %p',
//         (color, fen) => {
//             // console.log(fen)
//             let chessJsInstance = new Chess(fen)
//             expect(gameChecks.stalemateTricks({ status: 'stalemate' }, fenToPosition(chessJsInstance), color)).toBe(false)
//         }
//     )
// })
