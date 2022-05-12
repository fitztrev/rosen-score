import { describe, expect, test } from 'vitest'

import scoring from '../js/utils/scoring.js'

test('test scoring by player accomplishment 2', () => {
    let playerScores = [
        { player: 'Bob', accomplishment: 'foo', points: 1, game: 'A' },
        { player: 'Bob', accomplishment: 'foo', points: 1, game: 'B' },

        { player: 'Bob', accomplishment: 'bar', points: 2, game: 'A' },
        { player: 'Bob', accomplishment: 'bar', points: 2, game: 'C' },

        { player: 'Sue', accomplishment: 'foo', points: 1, game: 'D' },

        { player: 'Sue', accomplishment: 'bar', points: 2, game: 'E' },
        { player: 'Sue', accomplishment: 'bar', points: 2, game: 'F' },
        { player: 'Sue', accomplishment: 'bar', points: 2, game: 'G' },

        { player: 'Bob', accomplishment: 'foo', points: 2, game: 'H' },
    ]

    expect(scoring.byPlayerAccomplishmentWithGames(playerScores)).toStrictEqual([
        { player: 'Bob', accomplishment: 'foo', points: 4, games: ['A', 'B', 'H'] },
        { player: 'Bob', accomplishment: 'bar', points: 4, games: ['A', 'C']  },
        { player: 'Sue', accomplishment: 'foo', points: 1, games: ['D']  },
        { player: 'Sue', accomplishment: 'bar', points: 6, games: ['E', 'F', 'G']  },
    ])
})

test('test scoring by player accomplishment', () => {
    let playerScores = [
        { player: 'Bob', points: 1, accomplishment: 'foo' },
        { player: 'Bob', points: 1, accomplishment: 'foo' },

        { player: 'Bob', points: 2, accomplishment: 'bar' },
        { player: 'Bob', points: 2, accomplishment: 'bar' },

        { player: 'Sue', points: 1, accomplishment: 'foo' },

        { player: 'Sue', points: 2, accomplishment: 'bar' },
        { player: 'Sue', points: 2, accomplishment: 'bar' },
        { player: 'Sue', points: 2, accomplishment: 'bar' },

        { player: 'Bob', points: 2, accomplishment: 'foo' },
    ]

    expect(scoring.byPlayerAccomplishment(playerScores)).toStrictEqual([
        { player: 'Bob', accomplishment: 'foo', points: 4 },
        { player: 'Bob', accomplishment: 'bar', points: 4 },
        { player: 'Sue', accomplishment: 'foo', points: 1 },
        { player: 'Sue', accomplishment: 'bar', points: 6 },
    ])
})

test('test scoring', () => {
    let playerScores = [
        { player: 'Bob', points: 1 },
        { player: 'Bob', points: 1 },

        { player: 'Bob', points: 2 },
        { player: 'Bob', points: 2 },

        { player: 'Sue', points: 1 },

        { player: 'Sue', points: 2 },
        { player: 'Sue', points: 2 },
        { player: 'Sue', points: 2 },
    ]

    expect(scoring.byPlayer(playerScores)).toStrictEqual([
        { player: 'Bob', points: 6 },
        { player: 'Sue', points: 7 },
    ])
})
