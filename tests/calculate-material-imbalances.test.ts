import { describe, expect, test } from 'vitest'

import calculateMaterialImbalance from '../js/utils/calculate-material-imbalance'
import { fenToPosition } from '../js/utils/fen-to-position'

describe('test material imbalance calculations', () => {
    test.each([
        ['rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', 0],
        ['rbnq4/p7/8/8/8/8/8/8 w - - 0 1', -20],
        ['8/8/8/8/8/8/P7/RBNQ4 w - - 0 1', 20],
        ['rb6/8/8/8/8/8/P7/2NQ4 w - - 0 1', 4],
    ])('test FEN: %p', (fen, value) => {
        expect(calculateMaterialImbalance(fenToPosition(fen))).toEqual(value)
    })
})
