const { Chess } = require('chess.js')
const moveChecks = require ('../js/goals/move-checks.js')

describe('test promote pawn before move number', () => {
    test.each([
        [
            // https://lichess.org/BFHHMjq5#14
            'd4 d5 c4 e5 dxe5 d4 e3 Bb4+ Bd2 dxe3 Bxb4 exf2+ Ke2 fxg1=N+ Rxg1 Bg4+ Kf2 Qxd1 Bc3 Nh6 e6 Bxe6 Bxg7 Ng4+',
            'black',
        ],
        [
            // https://lichess.org/Ds0n1EPw
            'e4 f5 exf5 d6 Qh5+ g6 fxg6 Nf6 g7+ Nxh5 gxh8=Q Bf5 d3 e6 Bh6 Qe7 Qxf8+ Qxf8 Bxf8 Kxf8 Nc3 Bg6 g4 Nf6 Bg2 c6 g5 Nfd7 h4 Ne5 f4 Ng4 Kd2 Nd7 Re1 Bf5 Nh3 Kf7 Bf3 Nb6 h5 Nd5 Nxd5 cxd5 Reg1 e5 Bxg4 Bxg4 Rxg4 e4 f5',
            'white',
        ],

        [
            // test on move 8 for white
            '1. a4 h5 2. a5 h4 3. a6 h3 4. b4 g5 5. b5 g4 6. b6 g3 7. axb7 hxg2 8. bxa8=Q',
            'white',
        ],
        [
            // test on move 8 for black
            '1. a4 h5 2. a5 h4 3. a6 h3 4. b4 g5 5. b5 g4 6. b6 g3 7. axb7 hxg2 8. c4 gxh1=Q',
            'black',
        ],
    ])(
        'test moves: %p',
        (moves, color) => {
            let chessJsInstance = new Chess()
            chessJsInstance.load_pgn(moves)

            let allMoves = chessJsInstance.history({ verbose: true })

            let result

            for (let moveNum in allMoves) {
                result = moveChecks.promotePawnBeforeMoveNumber(allMoves[moveNum], moveNum, 8)
                if (result) {
                    break
                }
            }

            expect(result).toBe(color)
        }
    )
})
