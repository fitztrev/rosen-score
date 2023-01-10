import { describe, expect, test } from 'vitest'
import { parse, ParseTree } from '@mliebelt/pgn-parser'
import { checkmateAtMoveNumber } from '../js/goals/checkmate-at-move-number'

test('2 moves', () => {
    let moves = 'g4 e5 f3 Qh4#'
    let game = parse(moves, { startRule: 'game' }) as ParseTree
    expect(checkmateAtMoveNumber(game.moves, 2)).toStrictEqual([{ color: 'b', onMoveNumber: 4 }])
})

describe('test 3 moves', () => {
    test.each([
        [
            // for white
            'e4 f6 d4 g5 Qh5#',
            [{ color: 'w', onMoveNumber: 5 }],
        ],
        [
            // for black
            'f4 e5 g3 exf4 gxf4 Qh4#',
            [{ color: 'b', onMoveNumber: 6 }],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(checkmateAtMoveNumber(game.moves, 3)).toStrictEqual(expected)
    })
})

describe('test 4 moves', () => {
    test.each([
        [
            // for white
            'e4 f6 Nf3 g5 Nxg5 a6 Qh5#',
            [{ color: 'w', onMoveNumber: 7 }],
        ],
        [
            // for black
            'h4 e5 g3 Bc5 b3 Qf6 Bb2 Qxf2#',
            [{ color: 'b', onMoveNumber: 8 }],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(checkmateAtMoveNumber(game.moves, 4)).toStrictEqual(expected)
    })
})
