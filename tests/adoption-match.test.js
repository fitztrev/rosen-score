import { describe, expect, test } from 'vitest'

import adoptionMatch from '../js/goals/adoption-match.js'

test('test adoption match (single adoption)', () => {
    adoptionMatch.reset()

    let games = [
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'black', players: { white: { user: { id: 'bbb' } }, black: { user: { id: 'aaa' } } } },
    ]

    let game

    for (game of games) {
        adoptionMatch.processGame(game)
    }

    expect(adoptionMatch.checkForAdoption(game, 10)).toBe('black')
})

test('test adoption match (double adoption)', () => {
    adoptionMatch.reset()

    let games = [
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'black', players: { white: { user: { id: 'bbb' } }, black: { user: { id: 'aaa' } } } },
    ]

    let game

    for (game of games) {
        adoptionMatch.processGame(game)
    }

    expect(adoptionMatch.checkForAdoption(game, 20)).toBe('black')
})

test('test with a draw in the middle', () => {
    adoptionMatch.reset()

    let games = [
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
        { winner: 'white', players: { white: { user: { id: 'aaa' } }, black: { user: { id: 'bbb' } } } },
    ]

    let game

    for (game of games) {
        adoptionMatch.processGame(game)
    }

    expect(adoptionMatch.checkForAdoption(game, 10)).toBeFalsy()
})
