import { describe, expect, test } from 'vitest'

import cleanupLichessUsername from '../js/utils/cleanup-lichess-username.js'

describe('test cleanup usernames', () => {
    test.each([
        ['EricRosen', 'EricRosen'],
        ['ericrosen', 'ericrosen'],
        [' ericrosen ', 'ericrosen'],
        ['https://lichess.org/@/EricRosen', 'EricRosen'],
        ['https://lichess.org/EricRosen', 'EricRosen'],
        ['https://lichess.org/EricRosen', 'EricRosen'],
    ])(
        'test input: %p',
        (input, expected) => {
            expect(cleanupLichessUsername(input)).toBe(expected)
        }
    )
})

describe('keep arena links unchanged', () => {
    test.each([
        'https://lichess.org/swiss/48jrx3m6',
        'https://lichess.org/tournament/winter21',
        'https://lichess.org/tournament/2oEh6hZw',
    ])(
        'test input: %p',
        (input) => {
            expect(cleanupLichessUsername(input)).toBe(input)
        }
    )
})
