const formatSinceDate = require('../js/utils/format-since-date.js')

describe('format since date', () => {
    test.each([
        [
            (new Date('2020-01-01 12:00:00')).getTime(),
            'Wednesday, January 1 at 12:00 PM',
        ],
    ])(
        'test input: %p',
        (input, expected) => {
            // console.log(input)
            expect(
                formatSinceDate(input)
            ).toBe(expected)
        }
    )
})
