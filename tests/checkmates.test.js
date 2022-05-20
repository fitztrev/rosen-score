import { describe, expect, test } from 'vitest'

import fenToPosition from '../js/utils/fen-to-position.js'
import gameChecks from '../js/goals/game-checks.js'

describe('test 4-knight cube mate', () => {
    test.each([
        ['white', 'k7/8/1NN5/1NN5/8/8/8/K7 w - - 0 1'],
        ['black', 'K7/8/1nn5/1nn5/8/8/8/k7 w - - 0 1'],
    ])(
        'test FEN: %p %p',
        (color, fen) => {
            expect(gameChecks.fourKnightMate({ status: 'mate' }, fenToPosition(fen))).toStrictEqual(color)
            expect(gameChecks.fourKnightCubeMate({ status: 'mate' }, fenToPosition(fen))).toStrictEqual(color)

            expect(gameChecks.fourKnightMate({ status: 'draw' }, fenToPosition(fen))).toBeFalsy()
            expect(gameChecks.fourKnightCubeMate({ status: 'draw' }, fenToPosition(fen))).toBeFalsy()
        }
    )
})

describe('test not 4-knight cube mate', () => {
    test.each([
        // white has an extra piece besides the 4 knights
        'k7/8/1NN5/1NN5/8/8/4Q3/K7 w - - 0 1',
    ])(
        'test FEN: %p %p',
        (fen) => {
            expect(gameChecks.fourKnightMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()
            expect(gameChecks.fourKnightCubeMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()
        }
    )
})

describe('test 4-knight mate', () => {
    test.each([
        ['white', '8/8/8/6K1/4NN2/3NN3/8/4k3 w - - 16 91'],
        ['black', '8/8/8/6k1/4nn2/3nn3/8/4K3 w - - 16 91'],
    ])(
        'test FEN: %p %p',
        (color, fen) => {
            expect(gameChecks.fourKnightMate({ status: 'mate' }, fenToPosition(fen))).toStrictEqual(color)
            expect(gameChecks.fourKnightCubeMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()
            expect(gameChecks.fourKnightMate({ status: 'draw' }, fenToPosition(fen))).toBeFalsy()
        }
    )
})
