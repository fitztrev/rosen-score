import { expect, test } from 'vitest'
import { pawnCaptures } from '../js/utils/pawn-captures'

test('test pawn captures', () => {
    expect(pawnCaptures('b', 'g6')).toStrictEqual(['f7', 'h7'])
    expect(pawnCaptures('b', 'e5')).toStrictEqual(['d6', 'f6'])
    expect(pawnCaptures('b', 'e5')).toStrictEqual(['d6', 'f6'])
    expect(pawnCaptures('w', 'c4')).toStrictEqual(['b3', 'd3'])
    expect(pawnCaptures('w', 'e6')).toStrictEqual(['d5', 'f5'])
    expect(pawnCaptures('w', 'e6')).toStrictEqual(['d5', 'f5'])
})

test('test pawn captures on edge', () => {
    expect(pawnCaptures('w', 'a4')).toStrictEqual(['b3'])
    expect(pawnCaptures('w', 'h5')).toStrictEqual(['g4'])
    expect(pawnCaptures('b', 'a4')).toStrictEqual(['b5'])
    expect(pawnCaptures('b', 'h6')).toStrictEqual(['g7'])
})
