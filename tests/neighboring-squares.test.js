const neighboringSquares = require('../js/utils/neighboring-squares.js')

test('test neighboring squares', () => {
    expect(neighboringSquares('a1')).toStrictEqual([
        'a2',
        'b1',
        'b2',
    ])
    expect(neighboringSquares('c1')).toStrictEqual([
        'b1',
        'b2',
        'c2',
        'd1',
        'd2',
    ])
    expect(neighboringSquares('d4')).toStrictEqual([
        'c3',
        'c4',
        'c5',
        'd3',
        'd5',
        'e3',
        'e4',
        'e5',
    ])
})
