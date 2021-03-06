import { describe, expect, test } from 'vitest'
import { Chess } from 'chess.js'

import moveChecks from '../js/goals/move-checks.js'

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

describe('test en passant mate', () => {
    test.each([
        [
            'e4 e5 Nf3 Bc5 Nc3 Nf6 Bc4 b5 Bxb5 c6 Bc4 d5 exd5 cxd5 Bb5+ Bd7 Bxd7+ Nbxd7 O-O e4 d4 Bd6 Ne5 Nxe5 dxe5 Bxe5 f4 Bc7 f5 Bb6+ Kh1 O-O Bg5 h6 Bxf6 Qxf6 Qxd5 Rfe8 Nxe4 Qxb2 Nd6 Rf8 Qb3 Qe5 Nc4 Qc5 f6 g6 a4 Rac8 Nxb6 axb6 Qh3 Kh7 Qb3 Rc6 Ra2 Qc4 h3 Ra8 Qxc4 Rxc4 Rb2 Ra6 Rfb1 Rcxa4 Rxb6 Rxb6 Rxb6 g5 Rc6 Ra1+ Kh2 Kg6 c4 Rc1 Kg3 Kf5 c5 Rc3+ Kf2 h5 Kg1 h4 Kh2 Kf4 Rc7 Ke5 Rxf7 Rxc5 Rh7 Kxf6 Rh6+ Kf5 Rd6 Rc2 Rd2 Rxd2 Kg1 Kf4 Kh2 Ke3 Kh1 Kf2 Kh2 Rd1 g4 hxg3',
            'b',
        ],
    ])(
        'test moves: %p',
        (moves, color) => {
            let chessJsInstance = new Chess()
            chessJsInstance.load_pgn(moves)

            let allMoves = chessJsInstance.history({ verbose: true })

            let result

            for (let moveNum in allMoves) {
                result = moveChecks.enPassantCheckmate(allMoves[moveNum])
                if (result) {
                    break
                }
            }

            expect(result).toBe(color)
        }
    )
})
