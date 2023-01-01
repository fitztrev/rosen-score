import { describe, expect, test } from 'vitest'
import { twoBishopMate, fourKnightMate, fourKnightCubeMate, sixKnightRectangleMate, bishopAndKnightMate } from '../js/goals/game-checks'

describe('2-bishop mate', () => {
    test.each([
        ['white', 'k7/8/1K6/3BB3/8/8/8/8 b - - 0 1'],
        ['black', '8/8/8/4b3/4b3/1k6/8/K7 w - - 0 1'],

        ['white', 'k7/8/1K6/3BB3/8/8/8/5q2 b - - 0 1'],
        ['black', '8/1P6/8/4b3/4b3/1k6/8/K7 w - - 0 1'],
    ])('test FEN: %p %p', (color, fen) => {
        expect(
            twoBishopMate(
                {
                    result: {
                        via: 'checkmate',
                        winner: color,
                    },
                },
                fen
            )
        ).toStrictEqual([color])
    })

    test('game did not end in checkmate', () => {
        expect(twoBishopMate({ result: { via: 'draw' } })).toStrictEqual([])
    })
})

describe('test 4-knight mate', () => {
    test.each([
        [['white'], '8/8/8/6K1/4NN2/3NN3/8/4k3 w - - 16 91'],
        [['black'], '8/8/8/6k1/4nn2/3nn3/8/4K3 w - - 16 91'],
    ])('test FEN: %p %p', (result, fen) => {
        expect(fourKnightMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual(result)
        expect(fourKnightCubeMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual([])
        expect(sixKnightRectangleMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual([])

        expect(fourKnightMate({ result: { via: 'draw' } }, fen)).toStrictEqual([])
    })
})

describe('test 4-knight cube mate', () => {
    test.each([
        [['white'], 'k7/8/1NN5/1NN5/8/8/8/K7 w - - 0 1'],
        [['black'], 'K7/8/1nn5/1nn5/8/8/8/k7 w - - 0 1'],
    ])('test FEN: %p %p', (result, fen) => {
        expect(fourKnightMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual(result)
        expect(fourKnightCubeMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual(result)

        expect(sixKnightRectangleMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual([])

        expect(fourKnightMate({ result: { via: 'draw' } }, fen)).toStrictEqual([])
        expect(fourKnightCubeMate({ result: { via: 'draw' } }, fen)).toStrictEqual([])
    })
})

describe('test not 4-knight cube mate', () => {
    test.each([
        // white has an extra piece besides the 4 knights
        'k7/8/1NN5/1NN5/8/8/4Q3/K7 w - - 0 1',
    ])('test FEN: %p %p', (fen) => {
        expect(fourKnightMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual([])
        expect(fourKnightCubeMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual([])
        expect(sixKnightRectangleMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual([])
    })
})

describe('test 6-knight rectangle mate', () => {
    test.each([
        // 3x2
        [['white'], '3k4/8/2NNN3/2NNN3/8/8/8/3K4 w - - 0 1'],
        [['black'], '3K4/8/2nnn3/2nnn3/8/8/8/3k4 w - - 0 1'],

        // 2x3
        [['white'], '8/8/4NN2/4NN1k/4NN2/8/8/3K4 w - - 0 1'],
        [['black'], '8/8/4nn2/4nn1K/4nn2/8/8/3k4 w - - 0 1'],
    ])('test FEN: %p %p', (result, fen) => {
        expect(fourKnightMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual([])
        expect(fourKnightCubeMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual([])
        expect(sixKnightRectangleMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual(result)

        expect(sixKnightRectangleMate({ result: { via: 'draw' } }, fen)).toStrictEqual([])
    })
})

describe('test not 6-knight rectangle mate', () => {
    test.each([
        // white has an extra piece
        '3k4/8/2NNN3/2NNN3/8/3Q4/8/3K4 w - - 0 1',

        // https://lichess.org/hNHKL89Z
        '8/8/8/3K4/1NNNNN2/3Nk3/8/8 b - - 35 105',
    ])('test FEN: %p %p', (fen) => {
        expect(fourKnightMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual([])
        expect(fourKnightCubeMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual([])
        expect(sixKnightRectangleMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual([])
    })
})

describe('test bishop+knight mate', () => {
    test.each([
        [['white'], 'k7/3N4/1KB5/8/8/8/8/8 b - - 0 1'],
        [['black'], 'K7/3n4/1kb5/8/8/8/8/8 w - - 0 1'],
    ])('test FEN: %p %p', (result, fen) => {
        expect(bishopAndKnightMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual(result)
        expect(bishopAndKnightMate({ result: { via: 'draw' } }, fen)).toStrictEqual([])
    })
})

describe('test not bishop+knight mate', () => {
    test.each([
        // white has an extra piece
        'k7/3N4/1KB5/8/8/6P1/8/8 w - - 0 1',
    ])('test FEN: %p %p', (fen) => {
        expect(bishopAndKnightMate({ result: { via: 'checkmate' } }, fen)).toStrictEqual([])
        expect(bishopAndKnightMate({ result: { via: 'draw' } }, fen)).toStrictEqual([])
    })
})