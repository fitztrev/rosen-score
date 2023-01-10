import { describe, expect, test } from 'vitest'
import { parse, ParseTree } from '@mliebelt/pgn-parser'
import { alphabetOpening } from '../js/goals/alphabet-openings'
import { Game } from 'chess-fetcher'

describe('test not alphabet opening', () => {
    test.each([
        ['egg', '1. a3 a6 2. b3 b6 3. c3 c6'], // abc
        ['egg', '1. a3 a6 2. e3 b6 3. g4 c6 4. g5'], // egg after move 1 ("aegg")
        ['egg', '1. e3 a6 2. g4 b6 3. Bc4'], // "egB"
    ])('test alphabet opening: %p', (word, moves) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(
            alphabetOpening(
                {
                    result: {
                        winner: 'white',
                    },
                } as Game,
                word,
                game.moves
            )
        ).toStrictEqual([])
        expect(
            alphabetOpening(
                {
                    result: {
                        winner: 'black',
                    },
                } as Game,
                word,
                game.moves
            )
        ).toStrictEqual([])
        expect(
            alphabetOpening(
                {
                    result: {
                        outcome: 'draw',
                    },
                } as Game,
                word,
                game.moves
            )
        ).toStrictEqual([])
    })
})

describe('test alphabet openings', () => {
    test.each([
        ['beachcafe', '1. b3 a6 2. e3 b6 3. a3 c6 4. c3 d6 5. h3 e6 6. c4 f6 7. a4 g6 8. f3 h6 9. e4'],
        ['beefhead', '1. b3 a6 2. e3 b6 3. e4 d6 4. f3 e6 5. h3 f6 6. e5 g6 7. a3 h6 8. d3'],
        ['cabbage', '1. c3 a6 2. a3 b6 3. b3 c6 4. b4 d6 5. a4 e6 6. g3 g6 7. e3'],
        ['cabbagehead', '1. c3 a6 2. a3 b6 3. b3 c6 4. b4 d6 5. a4 e6 6. g3 g6 7. e3 h6 8. h3 h5 9. e4 f6 10. a5 g5 11. d3'],
        ['chacha', '1. c3 d6 2. h3 h6 3. a3 e6 4. c4 f6 5. h4 g6 6. a4'],
        ['decade', '1. d3 a6 2. e3 b6 3. c3 c6 4. a3 d6 5. d4 e6 6. e4'],
        ['eggegg', '1. e3 f6 2. g3 e6 3. g4 d6 4. e4 c6 5. g5 b6 6. g6'],
        ['egghead', '1. e3 a6 2. g3 b6 3. g4 c6 4. h3 d6 5. e4 e6 6. a3 f6 7. d3'],

        // captures
        ['egg', '1. e4 b6 2. g4 f5 3. gxf5'],
    ])('test alphabet opening: %p', (word, moves) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(
            alphabetOpening(
                {
                    result: {
                        winner: 'white',
                    },
                } as Game,
                word,
                game.moves
            )
        ).toStrictEqual([
            {
                color: 'w',
                onMoveNumber: word.length * 2,
            },
        ])
    })

    test.each([
        ['beachcafe', '1. a3 b6 2. b3 e6 3. c3 a6 4. d3 c6 5. e3 h6 6. f3 c5 7. g3 a5 8. h3 f6 9. h4 e5'],

        // captures
        ['egg', '1. a3 e6 2. f4 g5 3. b3 gxf4'],
    ])('test alphabet opening: %p', (word, moves) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(
            alphabetOpening(
                {
                    result: {
                        winner: 'black',
                    },
                } as Game,
                word,
                game.moves
            )
        ).toStrictEqual([
            {
                color: 'b',
                onMoveNumber: word.length * 2,
            },
        ])
    })
})

describe('test both colors play it, but black wins', () => {
    test.each([['egg', '1. e3 e6 2. g3 g6 3. g4 g5']])('test alphabet opening: %p', (word, moves) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(
            alphabetOpening(
                {
                    result: {
                        winner: 'black',
                    },
                } as Game,
                word,
                game.moves
            )
        ).toStrictEqual([{ color: 'b', onMoveNumber: word.length * 2 }])
    })
})

describe('test alphabet opening from real game', () => {
    test.each([
        // https://lichess.org/5MQyXZJN#15
        [
            'cabbage',
            'c4 c5 a3 Nf6 b3 g6 b4 Bg7 a4 cxb4 g3 O-O e3 d6 Bg2 Nc6 d4 Bg4 Ne2 e5 d5 Na5 Nd2 Rc8 h3 Bf5 e4 Bd7 Qc2 Qc7 Bb2 Nxc4 Rc1 b5 axb5 Bxb5 O-O Qb6 Nxc4 Rxc4 Qd2 Rfc8 g4 Nd7 h4 a5 h5 a4 Rb1 Rc2 Rfc1 Rxd2 Rxc8+ Bf8 Bc1 Rxe2 Bh6 Qxf2+ Kh1 Qxg2#',
        ],
    ])('test alphabet opening: %p', (word, moves) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree
        expect(
            alphabetOpening(
                {
                    result: {
                        winner: 'white',
                    },
                } as Game,
                word,
                game.moves
            )
        ).toStrictEqual([
            {
                color: 'w',
                onMoveNumber: word.length * 2,
            },
        ])
    })
})
