import { expect, test } from 'vitest'
import { knightMoves } from '../js/utils/knight-moves'

test('test knight moves', () => {
    expect(knightMoves('a1')).toStrictEqual(['b3', 'c2'])
    expect(knightMoves('b3')).toStrictEqual(['a1', 'a5', 'c1', 'c5', 'd2', 'd4'])
    expect(knightMoves('d5')).toStrictEqual(['b4', 'b6', 'c3', 'c7', 'e3', 'e7', 'f4', 'f6'])
})
