const { Chess } = require('chess.js')
const moveChecks = require ('../js/goals/move-checks.js')

describe('test castle after move 40', () => {
    test.each([
        [
            // https://lichess.org/LLljJeCV/white#81
            // happens on move 41
            'e4 c5 Nf3 Nc6 c3 e5 Bd3 d6 h3 Be6 Bc2 b5 d3 Be7 Nbd2 Nf6 Nf1 a5 a4 b4 c4 Qb6 b3 Rd8 Ne3 Nd4 Nxd4 exd4 Nf1 Nd7 Bf4 Qc6 Qd2 Bf6 Bd1 Be5 Nh2 h6 Bg4 g5 Bg3 Bxg3 fxg3 Ne5 Bxe6 fxe6 Nf3 Ng6 Rf1 Rf8 Qd1 e5 Qe2 Qd7 Nh2 Ke7 Qh5 Rxf1+ Nxf1 Qe6 Qxh6 Qf6 Qh7+ Ke6 Nd2 g4 hxg4 Rd7 Qh5 Rf7 Qf5+ Ke7 Nf3 Qg7 Qg5+ Kd7 Qh5 Ne7 Qh4 Qf8 O-O-O Rxf3 gxf3 Qxf3 Kc2 Qe2+ Rd2 Qe1 g5 Qa1 Qh7 Qa2+ Kd1 Qxb3+ Ke2 Qb1 g6 Qg1 g7 Qg2+ Kd1 Qf3+ Kc2 Qxg3 Qh2 Qxg7 Rg2 Qf6 Rf2 Qg5 Qh3+ Kc6 Rf7 Ng6 Qc8+ Kb6 Rb7+ Ka6 Qa8#',
            'white',
        ],
    ])(
        'test moves: %p',
        (moves, color) => {
            let chessJsInstance = new Chess()
            chessJsInstance.load_pgn(moves)

            let allMoves = chessJsInstance.history({ verbose: true })

            let result

            for (let moveNum in allMoves) {
                result = moveChecks.castleAfterMove40(allMoves[moveNum], moveNum)
                if (result) {
                    break
                }
            }

            expect(result).toBe(color)
        }
    )
})
