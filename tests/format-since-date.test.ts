import { describe, expect, test } from 'vitest'
import { formatSinceDate } from '../js/utils/format-since-date'

describe('format since date', () => {
    test.each([[new Date('2020-01-01 12:00:00').getTime(), 'Wednesday, January 1 at 12:00 PM']])('test input: %p', (input, expected) => {
        expect(formatSinceDate(input)).toBe(expected)
    })
})
