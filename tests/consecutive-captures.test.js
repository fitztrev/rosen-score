import { describe, expect, test } from 'vitest'
import { Chess } from 'chess.js'

import consecutiveCaptures from '../js/goals/consecutive-captures'

describe('test consecutive captures - any square', () => {
    test.each([
        [
            // https://chess.stackexchange.com/a/24233
            '1. d3 d6 2. Bg5 Bg4 3. Bxe7 Bxe2 4. Bxd6 Bxf1 5. Bxc7 Qxd3 6. Bxb8 Qxc2 7. Bxa7 Rxa7 8. Qxc2 Rxa2 9. Qxh7 Rxb2 10. Qxg8 Rxb1 11. Rxb1 Rxh2 12. Rxb7 Rxh1 13. Rxf7 Rxg1 14. Rxg7 Rxg2 15. Qxf8+ Kxf8 16. Kxf1 Rxf2+ 17. Kxf2 Kxg7',
            {
                consecutiveCaptures: 30,
                onMoveNumber: 3,
            },
        ],
        [
            '1.e4 e5 2.Nf3 d6 3.d4 Bg4 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Bc4 Nf6 7.Qb3 Qe7 8.Nc3 c6 9.Bg5 b5 10.Nxb5 cxb5 11.Bxb5+ Nbd7 12.O-O-O Rd8 13.Rxd7 Rxd7 14.Rd1 Qe6 15.Bxd7+ Nxd7 16.Qb8+ Nxb8 17.Rd8#',
            {
                consecutiveCaptures: 4,
                onMoveNumber: 5,
            },
        ],
        [
            // this game was causing an issue because there were no captures
            // https://lichess.org/75MDeuSm
            'Nf3 e5 g3 e4 Ng1 Bc5 d3 Qf6 f3 Qb6 Nc3 Bf2+ Kd2 e3#',
            false,
        ],
    ])('test', (moves, expected) => {
        let chessJsInstance = new Chess()
        chessJsInstance.loadPgn(moves)
        let allMoves = chessJsInstance.history({ verbose: true })

        expect(consecutiveCaptures.anySquare(allMoves)).toStrictEqual(expected)
    })
})

describe('test consecutive captures - same square', () => {
    test.each([
        [
            // https://www.chessgames.com/perl/chessgame?gid=2024868
            // https://timkr.home.xs4all.nl/records/recordstxt.htm
            '1.b4 Nf6 2.Bb2 d6 3.c4 Nbd7 4.e3 g6 5.Nf3 Bg7 6.Be2 O-O 7.O-O c5 8.b5 b6 9.d3 Bb7 10.Nbd2 e6 11.Qc2 d5 12.Rfd1 Qc7 13.h3 Rfd8 14.Rac1 Rac8 15.Nf1 a6 16.a4 a5 17.Ng3 e5 18.Rb1 d4 19.e4 Rf8 20.Bc1 Ne8 21.Nh2 f5 22.f3 f4 23.Nh1 h5 24.Bd2 g5 25.Rf1 Ndf6 26.Nf2 Rd8 27.Qd1 Bc8 28.Rb2 Be6 29.Rc2 Kh7 30.Nh1 Ng8 31.Kf2 Qd7 32.Ke1 Nef6 33.Nf2 Nh6 34.Rb2 Rg8 35.Bc1 Bf8 36.Kd2 g4 37.hxg4 hxg4 38.fxg4 Nhxg4 39.Nhxg4 Nxg4 40.Nxg4 Bxg4 41.Bxg4 Qxg4 42.Qxg4 Rxg4 43.Rg1 Bh6 44.Ke1 Rdg8 45.Kf1 Rg3 46.Rb3 R8g6 47.Bd2 f3 48.Bxh6 fxg2+ 49.Kf2 Kxh6 50.Ra3 Kh5 51.Ke2 Kh4',
            {
                consecutiveCaptures: 12,
                onMoveNumber: 71,
            },
        ],
        [
            '1.e4 e5 2.Nf3 d6 3.d4 Bg4 4.dxe5 Bxf3 5.Qxf3 dxe5 6.Bc4 Nf6 7.Qb3 Qe7 8.Nc3 c6 9.Bg5 b5 10.Nxb5 cxb5 11.Bxb5+ Nbd7 12.O-O-O Rd8 13.Rxd7 Rxd7 14.Rd1 Qe6 15.Bxd7+ Nxd7 16.Qb8+ Nxb8 17.Rd8#',
            {
                consecutiveCaptures: 3,
                onMoveNumber: 17,
            },
        ],
        [
            // this game was causing an issue because there were no captures
            // https://lichess.org/75MDeuSm
            'Nf3 e5 g3 e4 Ng1 Bc5 d3 Qf6 f3 Qb6 Nc3 Bf2+ Kd2 e3#',
            false,
        ],
    ])('test', (moves, expected) => {
        let chessJsInstance = new Chess()
        chessJsInstance.loadPgn(moves)
        let allMoves = chessJsInstance.history({ verbose: true })

        expect(consecutiveCaptures.sameSquare(allMoves)).toStrictEqual(expected)
    })
})
