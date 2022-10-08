import { describe, expect, test } from 'vitest'

import alphabetOpenings from '../js/goals/alphabet-openings.js'

describe('test not alphabet opening', () => {
    test.each([
        ['egg', 'a3 a6 b3 b6 c3 c6'],
        ['egg', 'x3 x6 e3 Nf6 g3 a6 g4'],
        ['egg', 'e3 x1 g3 x1 Bg2'],
    ])('test alphabet opening: %p', (word, moves) => {
        expect(alphabetOpenings.checkWord(word, moves)).toStrictEqual([])
    })
})

describe('test alphabet openings', () => {
    test.each([
        ['beachcafe', 'b3 a6 e3 b6 a3 c6 c3 d6 h3 e6 c4 f6 a4 g6 f3 h6 e4 h5'],
        ['beefhead', 'b3 a6 e3 b6 e4 c6 f3 d6 h3 e6 e5 f6 a3 g6 d3 h6'],
        ['cabbage', 'c3 a6 a3 b6 b3 c6 b4 d6 a4 e6 g3 f6 e3 h6'],
        ['cabbagehead', 'c3 a6 a3 b6 b3 c6 b4 d6 a4 e6 g3 f6 e3 h6 h3 g6 e4 b5 a5 e5 d3 h5'],
        ['chacha', 'c3 a6 h3 b6 a3 c6 c4 d6 h4 e6 a4 f6'],
        ['decade', 'd3 d6 e3 e6 c3 c6 a3 b6 d4 d5 e4 f6'],
        ['eggegg', 'e3 Nf6 g3 a6 g4 b6 e4 c6 g5 Nxe4 g6 hxg6'],
        ['egghead', 'e3 Nf6 g3 a6 g4 b6 h3 c6 e4 d6 a3 e6 d3 h6'],

        // captures
        ['egg', 'e3 x1 g3 x1 gxf4'],
    ])('test alphabet opening: %p', (word, moves) => {
        // test for white
        expect(alphabetOpenings.checkWord(word, moves)).toStrictEqual(['white'])

        // test for black
        expect(alphabetOpenings.checkWord(word, 'XX ' + moves)).toStrictEqual(['black'])
    })
})

describe('test both colors play it', () => {
    test.each([['egg', 'e3 e6 g3 g6 g4 g5']])('test alphabet opening: %p', (word, moves) => {
        expect(alphabetOpenings.checkWord(word, moves)).toStrictEqual(['white', 'black'])
    })
})

describe('test move input as array', () => {
    test.each([['egg', ['e3', 'Nf6', 'g3', 'a6', 'g4']]])('test move input types: %p', (word, moves) => {
        expect(alphabetOpenings.checkWord(word, moves)).toStrictEqual(['white'])
        expect(alphabetOpenings.checkWord(word, ['XX', ...moves])).toStrictEqual(['black'])
    })
})
