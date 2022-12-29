import { describe, expect, test } from 'vitest'
import { Chess, Move } from 'chess.js'

import alphabetOpeningSearch from '../js/utils/alphabet-opening-search'

describe('test alphabet opening search', () => {
    test.each([
        [
            '1. a3 a6 2. b3 b6 3. c3 c6 4. d3 d6 5. e3 e6 6. f3 f6 7. g3 g6 8. h3 h6',
            {
                white: 'abcdefgh',
                black: 'abcdefgh',
            },
        ],
        [
            '1. a3 h6 2. b3 g6 3. c3 f6 4. d3 e6 5. e3 d6 6. f3 c6 7. g3 b6 8. h3 a6',
            {
                white: 'abcdefgh',
                black: 'hgfedcba',
            },
        ],
        [
            '1. a3 a6 2. b3 b6 3. c3 c6 4. d3 d6 5. e3 e6 6. Nf3 Nf6 7. g3 g6 8. h3 h6',
            {
                white: 'abcde',
                black: 'abcde',
            },
        ],
        [
            // first move is knight
            '1. Nc3 Nc6 2. a3 a6 3. b3 b6',
            {
                white: '',
                black: '',
            },
        ],
        [
            // captures
            '1. d4 d5 2. e4 e5 3. c4 c5 4. cxd5 f5 5. f4 g5 6. g4 gxf4 7. h4 h5',
            {
                white: 'dec',
                black: 'decfg',
            },
        ],
    ])('test alphabet opening search: %p', (moves, expected) => {
        let chessJsInstance = new Chess()
        chessJsInstance.loadPgn(moves)

        let allMoves = chessJsInstance.history({ verbose: true }) as Move[]

        expect(alphabetOpeningSearch(allMoves)).toStrictEqual(expected)
    })
})
