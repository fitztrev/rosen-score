import { describe, expect, test } from 'vitest'

import fenToPosition from '../js/utils/fen-to-position.js'
import pieceStructures from '../js/goals/piece-structures.js'
import ticTacToe from '../js/goals/tic-tac-toe.js'

describe('test 3x3 cube', () => {
    test.each([
        ['8/8/2ppP3/2PpP3/2PPp3/8/8/8 w - - 0 1', ['ppPPpPPPp']],
        ['8/1ppP4/1PpP4/1PPp4/8/4nnN1/4nNn1/4Nnn1 w - - 0 1', ['ppPPpPPPp', 'nnNnNnNnn']],
        ['2kr1b1r/p1q2p1p/1ppnp3/3pNp2/3PnP2/2PNPQ2/PP4PP/R1B2RK1 b - - 5 16', ['pNpPnPNPQ']],
        // ['2kr1b1r/p1q4p/1ppnpp2/3pNp2/3PnP2/2PNPQ2/PP4PP/R1B2RK1 w - - 0 17', [
        //     'npppNpPnP',
        //     'pNpPnPNPQ',
        // ]],
    ])(
        'test FEN: %p',
        (fen, result) => {
            expect(pieceStructures.threeByThreeCubes(fenToPosition(fen))).toStrictEqual(result)
        }
    )
})

describe('test not a 3x3 cube', () => {
    test.each([
        '8/6pp/p5pp/p5pp/p7/8/8/8 w - - 0 1',
        '8/7p/pp5p/pp5p/pp6/8/8/8 w - - 0 1',
        '8/8/8/6PP/P5PP/P5PP/P7/8 w - - 0 1',
        '8/8/8/7P/PP5P/PP5P/PP6/8 w - - 0 1',
    ])(
        'test FEN: %p',
        (fen) => {
            expect(pieceStructures.threeByThreeCubes(fenToPosition(fen))).toStrictEqual([])
        }
    )
})

describe('test tic-tac-toe', () => {
    test.each([
        ['xxx.....X', 'black'],
        ['XXX.....x', 'white'],
        ['...XXX..x', 'white'],
        ['x.....XXX', 'white'],
        ['Xx..X...X', 'white'],
        ['..X.X.X.x', 'white'],
    ])(
        'test tic-tac-toe: %p',
        (cube, result) => {
            expect(ticTacToe(cube)).toBe(result)
        }
    )
})

describe('test not tic-tac-toe', () => {
    // these cubes do not contain any opponent pieces
    // (the characters are all the same case)
    test.each([
        'xxx......',
        'xxxxxxxxx',
        'XXXXXXXXX',
    ])(
        'test tic-tac-toe: %p',
        (cube) => {
            expect(ticTacToe(cube)).toBe(false)
        }
    )
})

describe('test prevent double awarding tic-tac-toe', () => {
    test('in game 1, black gets it first', () => {
        expect(ticTacToe('xxx.....X', '1')).toBe('black')
    })
    test('then white gets it but it should not count', () => {
        expect(ticTacToe('XXX.....x', '1')).toBeFalsy()
    })
    test('then white gets it in game 2', () => {
        expect(ticTacToe('XXX.....x', '2')).toBe('white')
    })
})
