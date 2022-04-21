const { Chess } = require('chess.js')
const moveChecks = require ('../js/goals/move-checks.js')

describe('test g5#', () => {
    test.each([
        [
            // g5#
            // https://lichess.org/oSMRMqtB/black
            'd4 Nf6 Bf4 d5 e3 c5 c3 Nc6 Nd2 cxd4 exd4 Bf5 Ngf3 e6 Bb5 Bd6 Bxd6 Qxd6 O-O O-O Bxc6 bxc6 b4 Rfe8 Nb3 Bg4 h3 Bxf3 Qxf3 e5 dxe5 Qxe5 Nd4 Rac8 Rfe1 Ne4 Nf5 Qxc3 Qg4 Qb2 Rab1 Qxf2+ Kh1 g6 Rf1 h5 Nh6+ Kg7 Qd7 Ng3+ Kh2 Nxf1+ Rxf1 Qxf1 Nf5+ Qxf5 Qd6 Qe5+ Qxe5+ Rxe5 Kg3 Rce8 Kh4 Re2 b5 R8e3 bxc6 Kh6 a4 g5#',
            'b',
        ],
        [
            // hxg5#
            '1. e4 e5 2. Qe2 Ke7 3. Qe3 Kf6 4. Be2 Kg6 5. h4 a6 6. Qg3+ Kh6 7. Bg4 a5 8. Bf5 a4 9. b3 axb3 10. Bb2 bxa2 11. Bxe5 g5 12. hxg5#',
            'w',
        ],
        [
            // fxg5#
            '1. e4 e5 2. Qe2 Ke7 3. Qe3 Kf6 4. Be2 Kg6 5. f4 Kh6 6. b3 g5 7. Bb2 a6 8. Bxe5 c6 9. a3 Qc7 10. Nf3 a5 11. Nh4 a4 12. fxg5#',
            'w',
        ],
    ])(
        'test moves: %p',
        (moves, color) => {
            let chessJsInstance = new Chess()
            chessJsInstance.load_pgn(moves)

            let allMoves = chessJsInstance.history({ verbose: true })

            let result

            for (let moveNum in allMoves) {
                result = moveChecks.g5mate(allMoves[moveNum])
                if (result) {
                    break
                }
            }

            expect(result).toBe(color)
        }
    )
})
