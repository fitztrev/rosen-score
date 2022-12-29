import { describe, expect, test } from 'vitest'
import { Chess } from 'chess.js'

describe('disco fork', () => {
    test.skip.each([
        [
            // https://lichess.org/odBxPod5/black#46
            'd4 c5 Nf3 cxd4 Nxd4 Nf6 Nc3 d5 g3 e5 Nf3 Nc6 Bg5 d4 Nb1 e4 Nxd4 Nxd4 c3 Nc6 Qa4 Bc5 Nd2 e3 Bxe3 Bxe3 fxe3 Bf5 O-O-O O-O e4 Bg6 Bg2 Qb6 Nc4 Qf2 Bf3 Nxe4 Rhf1 Qc5 Rd5 Qxd5 Rd1 Qg5+ Kb1 Nxc3+',
            'w',
        ],
    ])('test moves: %p', (moves, color) => {
        let chessJsInstance = new Chess()
        chessJsInstance.loadPgn(moves)

        expect(discoFork(chessJsInstance.history({ verbose: true }))).toBe(color)
    })
})
