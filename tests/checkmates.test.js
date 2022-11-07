import { describe, expect, test } from 'vitest'

import fenToPosition from '../js/utils/fen-to-position.js'
import gameChecks from '../js/goals/game-checks.js'

describe('single bishop mate', () => {
    test.each([
        ['black', 'K7/P1k5/8/8/8/8/6b1/8 w - - 1 74'],
    ])('test FEN: %p %p', (color, fen) => {
        expect(
            gameChecks.singleBishopMate(
                {
                    status: 'mate',
                    winner: color,
                },
                fenToPosition(fen)
            )
        ).toStrictEqual(color)
    })

    test('game did not end in checkmate', () => {
        expect(gameChecks.singleBishopMate({ status: 'draw' })).toStrictEqual(false)
    })
})

describe('2-bishop mate', () => {
    test.each([
        ['white', 'k7/8/1K6/3BB3/8/8/8/8 b - - 0 1'],
        ['black', '8/8/8/4b3/4b3/1k6/8/K7 w - - 0 1'],

        ['white', 'k7/8/1K6/3BB3/8/8/8/5q2 b - - 0 1'],
        ['black', '8/1P6/8/4b3/4b3/1k6/8/K7 w - - 0 1'],
    ])('test FEN: %p %p', (color, fen) => {
        expect(
            gameChecks.twoBishopMate(
                {
                    status: 'mate',
                    winner: color,
                },
                fenToPosition(fen)
            )
        ).toStrictEqual(color)
    })

    test('game did not end in checkmate', () => {
        expect(gameChecks.twoBishopMate({ status: 'draw' })).toStrictEqual(false)
    })
})

describe('test 4-knight mate', () => {
    test.each([
        ['white', '8/8/8/6K1/4NN2/3NN3/8/4k3 w - - 16 91'],
        ['black', '8/8/8/6k1/4nn2/3nn3/8/4K3 w - - 16 91'],
    ])('test FEN: %p %p', (color, fen) => {
        expect(gameChecks.fourKnightMate({ status: 'mate' }, fenToPosition(fen))).toStrictEqual(color)
        expect(gameChecks.fourKnightCubeMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()
        expect(gameChecks.sixKnightRectangleMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()

        expect(gameChecks.fourKnightMate({ status: 'draw' }, fenToPosition(fen))).toBeFalsy()
    })
})

describe('test 4-knight cube mate', () => {
    test.each([
        ['white', 'k7/8/1NN5/1NN5/8/8/8/K7 w - - 0 1'],
        ['black', 'K7/8/1nn5/1nn5/8/8/8/k7 w - - 0 1'],
    ])('test FEN: %p %p', (color, fen) => {
        expect(gameChecks.fourKnightMate({ status: 'mate' }, fenToPosition(fen))).toStrictEqual(color)
        expect(gameChecks.fourKnightCubeMate({ status: 'mate' }, fenToPosition(fen))).toStrictEqual(color)

        expect(gameChecks.sixKnightRectangleMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()

        expect(gameChecks.fourKnightMate({ status: 'draw' }, fenToPosition(fen))).toBeFalsy()
        expect(gameChecks.fourKnightCubeMate({ status: 'draw' }, fenToPosition(fen))).toBeFalsy()
    })
})

describe('test not 4-knight cube mate', () => {
    test.each([
        // white has an extra piece besides the 4 knights
        'k7/8/1NN5/1NN5/8/8/4Q3/K7 w - - 0 1',
    ])('test FEN: %p %p', (fen) => {
        expect(gameChecks.fourKnightMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()
        expect(gameChecks.fourKnightCubeMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()
        expect(gameChecks.sixKnightRectangleMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()
    })
})

describe('test 6-knight rectangle mate', () => {
    test.each([
        // 3x2
        ['white', '3k4/8/2NNN3/2NNN3/8/8/8/3K4 w - - 0 1'],
        ['black', '3K4/8/2nnn3/2nnn3/8/8/8/3k4 w - - 0 1'],

        // 2x3
        ['white', '8/8/4NN2/4NN1k/4NN2/8/8/3K4 w - - 0 1'],
        ['black', '8/8/4nn2/4nn1K/4nn2/8/8/3k4 w - - 0 1'],
    ])('test FEN: %p %p', (color, fen) => {
        expect(gameChecks.fourKnightMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()
        expect(gameChecks.fourKnightCubeMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()
        expect(gameChecks.sixKnightRectangleMate({ status: 'mate' }, fenToPosition(fen))).toStrictEqual(color)

        expect(gameChecks.sixKnightRectangleMate({ status: 'draw' }, fenToPosition(fen))).toBeFalsy()
    })
})

describe('test not 6-knight rectangle mate', () => {
    test.each([
        // white has an extra piece
        '3k4/8/2NNN3/2NNN3/8/3Q4/8/3K4 w - - 0 1',

        // https://lichess.org/hNHKL89Z
        '8/8/8/3K4/1NNNNN2/3Nk3/8/8 b - - 35 105',
    ])('test FEN: %p %p', (fen) => {
        expect(gameChecks.fourKnightMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()
        expect(gameChecks.fourKnightCubeMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()
        expect(gameChecks.sixKnightRectangleMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()
    })
})

describe('test bishop+knight mate', () => {
    test.each([
        ['white', 'k7/3N4/1KB5/8/8/8/8/8 b - - 0 1'],
        ['black', 'K7/3n4/1kb5/8/8/8/8/8 w - - 0 1'],
    ])('test FEN: %p %p', (color, fen) => {
        expect(gameChecks.bishopAndKnightMate({ status: 'mate' }, fenToPosition(fen))).toStrictEqual(color)
        expect(gameChecks.bishopAndKnightMate({ status: 'draw' }, fenToPosition(fen))).toBeFalsy()
    })
})

describe('test not bishop+knight mate', () => {
    test.each([
        // white has an extra piece
        'k7/3N4/1KB5/8/8/6P1/8/8 w - - 0 1',
    ])('test FEN: %p %p', (fen) => {
        expect(gameChecks.bishopAndKnightMate({ status: 'mate' }, fenToPosition(fen))).toBeFalsy()
        expect(gameChecks.bishopAndKnightMate({ status: 'draw' }, fenToPosition(fen))).toBeFalsy()
    })
})
