import { describe, expect, test } from 'vitest'
import { fenToPosition, positionToFiles } from '../js/utils/fen-to-position'

describe('convert fens to position strings', () => {
    test.each([
        ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 'rnbqkbnrpppppppp................................PPPPPPPPRNBQKBNR'],
        ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', 'rnbqkbnrpppppppp................................PPPPPPPPRNBQKBNR'],
        [
            '1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1',
            '.r...rk..b..q.bp.pnppnp.p.p..p..P.P....P.PNP.PPN.B.QP.B...R..RK.',
        ],
    ])('test FEN: %p', (fen, position) => {
        expect(fenToPosition(fen)).toEqual(position)
    })
})

test('test getting pieces on files', () => {
    let position = 'abcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefghabcdefgh'
    expect(positionToFiles(position)).toStrictEqual(['aaaaaaaa', 'bbbbbbbb', 'cccccccc', 'dddddddd', 'eeeeeeee', 'ffffffff', 'gggggggg', 'hhhhhhhh'])
})
