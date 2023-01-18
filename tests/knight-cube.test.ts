import { describe, expect, test } from 'vitest'
import { knightCube, knightRectangle } from '../js/goals/piece-structures'

describe('test no knight cube', () => {
    test.each([
        'rnbqkbnr/pppppppp/8/8/4P3/3P1P2/PPP1P2P/RNBQKBNR w KQkq - 0 1',
        'k7/8/8/8/8/2NN4/1NN5/K7 w - - 0 1',
        'k7/2nn4/1nn5/8/8/8/8/K7 w - - 0 1',
        'k7/8/8/7N/N6N/N7/8/K7 w - - 0 1',
        'k7/8/7n/n6n/n7/8/8/K7 w - - 0 1',
    ])('test FEN: %p', (fen) => {
        expect(knightCube(fen)).toStrictEqual([])
    })
})

describe('test knight cube', () => {
    test.each([
        [[{ color: 'w' }], 'k7/8/8/8/8/1NN5/1NN5/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/1nn5/1nn5/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], '8/8/3NNN2/2NNNN2/8/8/8/8 w - - 0 1'],
        [[{ color: 'w' }], '8/8/3NNN2/2NNN3/8/8/8/8 w - - 0 1'],
        [[{ color: 'w' }], '8/8/3NNN2/4NNN1/8/8/8/8 w - - 0 1'],

        [[{ color: 'b' }], 'k7/nn6/nn6/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/1nn5/1nn5/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/2nn4/2nn4/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/3nn3/3nn3/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/4nn2/4nn2/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/5nn1/5nn1/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/6nn/6nn/8/8/8/8/K7 w - - 0 1'],

        [[{ color: 'w' }], 'k7/NN6/NN6/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/1NN5/1NN5/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/2NN4/2NN4/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/3NN3/3NN3/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/4NN2/4NN2/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/5NN1/5NN1/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/6NN/6NN/8/8/8/8/K7 w - - 0 1'],

        [[{ color: 'w' }, { color: 'b' }], 'k7/8/4nn2/4nn2/8/2NN4/2NN4/K7 w - - 0 1'],
    ])('test FEN: %p %p', (color, fen) => {
        expect(knightCube(fen)).toStrictEqual(color)
    })
})

describe('test no knight rectangle', () => {
    test.each([
        'rnbqkbnr/pppppppp/8/8/4P3/3P1P2/PPP1P2P/RNBQKBNR w KQkq - 0 1',
        'k7/8/8/8/8/2NN4/1NN5/K7 w - - 0 1',
        'k7/2nn4/1nn5/8/8/8/8/K7 w - - 0 1',
        '8/8/3NNN2/2NNN3/8/8/8/8 w - - 0 1',
        '8/8/3NNN2/4NNN1/8/8/8/8 w - - 0 1',
        'k7/8/7n/nn5n/nn6/8/8/K7 w - - 0 1',
        'k7/8/6nn/n5nn/n7/8/8/K7 w - - 0 1',
        'k7/8/8/7N/NN5N/NN6/8/K7 w - - 0 1',
        'k7/8/8/6NN/N5NN/N7/8/K7 w - - 0 1',

        'k7/7n/n6n/n6n/n7/8/8/K7 w - - 0 1',
        'k7/7N/N6N/N6N/N7/8/8/K7 w - - 0 1',
    ])('test FEN: %p', (fen) => {
        expect(knightRectangle(fen)).toStrictEqual([])
    })
})

describe('test knight rectangle', () => {
    test.each([
        // 3x2 rectangle
        [[{ color: 'w' }], 'k7/8/8/8/8/1NNN4/1NNN4/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/1nnn4/1nnn4/8/8/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], '8/8/3NNN2/2NNNN2/8/8/8/8 w - - 0 1'],

        // 2x3 rectangle
        // https://lichess.org/k0hHAjPr/black#248
        [[{ color: 'b' }], '8/8/8/1nn5/1nn5/1nn2k2/8/2K5 w - - 11 125'],

        // 3x2 rectangles
        [[{ color: 'b' }], 'k7/8/nnn5/nnn5/8/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/1nnn4/1nnn4/8/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/2nnn3/2nnn3/8/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/3nnn2/3nnn2/8/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/4nnn1/4nnn1/8/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/5nnn/5nnn/8/8/8/K7 w - - 0 1'],

        [[{ color: 'w' }], 'k7/8/NNN5/NNN5/8/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/1NNN4/1NNN4/8/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/2NNN3/2NNN3/8/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/3NNN2/3NNN2/8/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/4NNN1/4NNN1/8/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/5NNN/5NNN/8/8/8/K7 w - - 0 1'],

        [[{ color: 'w' }, { color: 'b' }], 'k7/8/3nnn2/3nnn2/8/2NNN3/2NNN3/K7 w - - 0 1'],

        // 2x3 rectangles
        [[{ color: 'b' }], 'k7/8/nn6/nn6/nn6/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/1nn5/1nn5/1nn5/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/2nn4/2nn4/2nn4/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/3nn3/3nn3/3nn3/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/4nn2/4nn2/4nn2/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/5nn1/5nn1/5nn1/8/8/K7 w - - 0 1'],
        [[{ color: 'b' }], 'k7/8/6nn/6nn/6nn/8/8/K7 w - - 0 1'],

        [[{ color: 'w' }], 'k7/8/NN6/NN6/NN6/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/1NN5/1NN5/1NN5/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/2NN4/2NN4/2NN4/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/3NN3/3NN3/3NN3/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/4NN2/4NN2/4NN2/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/5NN1/5NN1/5NN1/8/8/K7 w - - 0 1'],
        [[{ color: 'w' }], 'k7/8/6NN/6NN/6NN/8/8/K7 w - - 0 1'],

        [[{ color: 'w' }, { color: 'b' }], 'k7/3nn3/3nn3/3nn3/3NN3/3NN3/3NN3/K7 w - - 0 1'],
    ])('test FEN: %p %p', (color, fen) => {
        expect(knightRectangle(fen)).toStrictEqual(color)
    })
})
