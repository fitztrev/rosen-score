import { describe, expect, test } from 'vitest'
import { cleanupInput } from '../js/utils/cleanup-input'

describe('test cleanup usernames', () => {
    test.each([
        ['EricRosen', 'EricRosen'],
        ['ericrosen', 'ericrosen'],
        [' ericrosen ', 'ericrosen'],
        ['https://lichess.org/@/EricRosen', 'EricRosen'],
        ['https://lichess.org/EricRosen', 'EricRosen'],
        ['https://lichess.org/EricRosen', 'EricRosen'],
        ['https://www.chess.com/member/imrosen', 'imrosen'],
    ])('test input: %p', (input, expected) => {
        expect(cleanupInput(input)).toBe(expected)
    })
})

describe('keep arena links unchanged', () => {
    test.each(['https://lichess.org/swiss/48jrx3m6', 'https://lichess.org/tournament/winter21', 'https://lichess.org/tournament/2oEh6hZw'])(
        'test input: %p',
        (input) => {
            expect(cleanupInput(input)).toBe(input)
        }
    )
})
