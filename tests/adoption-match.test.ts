import { Game } from 'chess-fetcher'
import { expect, test } from 'vitest'

import adoptionMatch from '../js/goals/adoption-match'

test('test adoption match (single adoption)', () => {
    adoptionMatch.reset()

    let games = [
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_black' }, black: { username: '_white' } } },
    ] as Game[]

    games.forEach((game) => {
        adoptionMatch.processGame(game)
    })

    expect(adoptionMatch.checkForAdoption(games[games.length - 1], 10)).toStrictEqual([
        {
            color: 'b',
        },
    ])
})

test('test adoption match (double adoption)', () => {
    adoptionMatch.reset()

    let games = [
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'black' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_black' }, black: { username: '_white' } } },
    ] as Game[]

    games.forEach((game) => {
        adoptionMatch.processGame(game)
    })

    expect(adoptionMatch.checkForAdoption(games[games.length - 1], 20)).toStrictEqual([
        {
            color: 'w',
        },
    ])
})

test('test with a draw in the middle', () => {
    adoptionMatch.reset()

    let games = [
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { outcome: 'draw' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
        { result: { winner: 'white' }, players: { white: { username: '_white' }, black: { username: '_black' } } },
    ] as Game[]

    games.forEach((game) => {
        adoptionMatch.processGame(game)
    })

    expect(adoptionMatch.checkForAdoption(games[games.length - 1], 10)).toStrictEqual([])
})
