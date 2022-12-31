import { describe, expect, test } from 'vitest'
import { parse } from '@mliebelt/pgn-parser'
import { checkmateAtMoveNumber } from '../js/goals/checkmate-at-move-number'

test('2 moves', () => {
    let moves = 'g4 e5 f3 Qh4#'
    let game = parse(moves, { startRule: 'game' })
    expect(checkmateAtMoveNumber(game.moves, 2)).toStrictEqual(['b'])
})

describe('test 3 moves', () => {
    test.each([
        [
            // for white
            'e4 f6 d4 g5 Qh5#',
            ['w'],
        ],
        [
            // for black
            'f4 e5 g3 exf4 gxf4 Qh4#',
            ['b'],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
        expect(checkmateAtMoveNumber(game.moves, 3)).toStrictEqual(expected)
    })
})

describe('test 4 moves', () => {
    test.each([
        [
            // for white
            'e4 f6 Nf3 g5 Nxg5 a6 Qh5#',
            ['w'],
        ],
        [
            // for black
            'h4 e5 g3 Bc5 b3 Qf6 Bb2 Qxf2#',
            ['b'],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
        expect(checkmateAtMoveNumber(game.moves, 4)).toStrictEqual(expected)
    })
})
