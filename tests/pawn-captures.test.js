import { describe, expect, test } from 'vitest'

import pawnCaptures from '../js/utils/pawn-captures.js'

test('test pawn captures', () => {
    expect(pawnCaptures('black', 'g6')).toStrictEqual(['f7', 'h7'])
    expect(pawnCaptures('black', 'e5')).toStrictEqual(['d6', 'f6'])
    expect(pawnCaptures('b', 'e5')).toStrictEqual(['d6', 'f6'])
    expect(pawnCaptures('white', 'c4')).toStrictEqual(['b3', 'd3'])
    expect(pawnCaptures('white', 'e6')).toStrictEqual(['d5', 'f5'])
    expect(pawnCaptures('w', 'e6')).toStrictEqual(['d5', 'f5'])
})

test('test pawn captures on edge', () => {
    expect(pawnCaptures('white', 'a4')).toStrictEqual(['b3'])

    expect(pawnCaptures('white', 'h5')).toStrictEqual(['g4'])

    expect(pawnCaptures('black', 'a4')).toStrictEqual(['b5'])

    expect(pawnCaptures('black', 'h6')).toStrictEqual(['g7'])
})
