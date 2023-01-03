import { describe, expect, test } from 'vitest'
import { parse } from '@mliebelt/pgn-parser'
import { castleAfterMove40 } from '../js/goals/move-checks'

describe('test castle after move 40', () => {
    test.each([
        [
            // https://lichess.org/LLljJeCV/white#81
            // happens on move 41
            'e4 c5 Nf3 Nc6 c3 e5 Bd3 d6 h3 Be6 Bc2 b5 d3 Be7 Nbd2 Nf6 Nf1 a5 a4 b4 c4 Qb6 b3 Rd8 Ne3 Nd4 Nxd4 exd4 Nf1 Nd7 Bf4 Qc6 Qd2 Bf6 Bd1 Be5 Nh2 h6 Bg4 g5 Bg3 Bxg3 fxg3 Ne5 Bxe6 fxe6 Nf3 Ng6 Rf1 Rf8 Qd1 e5 Qe2 Qd7 Nh2 Ke7 Qh5 Rxf1+ Nxf1 Qe6 Qxh6 Qf6 Qh7+ Ke6 Nd2 g4 hxg4 Rd7 Qh5 Rf7 Qf5+ Ke7 Nf3 Qg7 Qg5+ Kd7 Qh5 Ne7 Qh4 Qf8 O-O-O Rxf3 gxf3 Qxf3 Kc2 Qe2+ Rd2 Qe1 g5 Qa1 Qh7 Qa2+ Kd1 Qxb3+ Ke2 Qb1 g6 Qg1 g7 Qg2+ Kd1 Qf3+ Kc2 Qxg3 Qh2 Qxg7 Rg2 Qf6 Rf2 Qg5 Qh3+ Kc6 Rf7 Ng6 Qc8+ Kb6 Rb7+ Ka6 Qa8#',
            [
                {
                    color: 'w',
                    onMoveNumber: 80,
                },
            ],
        ],
        [
            '1. a4 a5 2. b4 b5 3. c4 c5 4. d4 d5 5. e4 e5 6. f4 f5 7. g4 g5 8. h4 h5 9. Nc3 Nc6 10. Nf3 Nf6 11. Bb2 Bb7 12. Bg2 Bg7 13. Qc2 Qc7 14. Qd2 Qd7 15. Qc2 Qc7 16. Qd2 Qd7 17. Qc2 Qc7 18. Qd2 Qd7 19. Qc2 Qc7 20. Qd2 Qd7 21. Qc2 Qc7 22. Qd2 Qd7 23. Qc2 Qc7 24. Qd2 Qd7 25. Qc2 Qc7 26. Qd2 Qd7 27. Qc2 Qc7 28. Qd2 Qd7 29. Qc2 Qc7 30. Qd2 Qd7 31. Qc2 Qc7 32. Qd2 Qd7 33. Qc2 Qc7 34. Qd2 Qd7 35. Qc2 Qc7 36. Qd2 Qd7 37. Qc2 Qc7 38. Qd2 Qd7 39. Qc2 Qc7 40. Qd2 Qd7 41. O-O Qc7',
            [
                {
                    color: 'w',
                    onMoveNumber: 80,
                },
            ],
        ],
        [
            '1. a4 a5 2. b4 b5 3. c4 c5 4. d4 d5 5. e4 e5 6. f4 f5 7. g4 g5 8. h4 h5 9. Nc3 Nc6 10. Nf3 Nf6 11. Bb2 Bb7 12. Bg2 Bg7 13. Qc2 Qc7 14. Qd2 Qd7 15. Qc2 Qc7 16. Qd2 Qd7 17. Qc2 Qc7 18. Qd2 Qd7 19. Qc2 Qc7 20. Qd2 Qd7 21. Qc2 Qc7 22. Qd2 Qd7 23. Qc2 Qc7 24. Qd2 Qd7 25. Qc2 Qc7 26. Qd2 Qd7 27. Qc2 Qc7 28. Qd2 Qd7 29. Qc2 Qc7 30. Qd2 Qd7 31. Qc2 Qc7 32. Qd2 Qd7 33. Qc2 Qc7 34. Qd2 Qd7 35. Qc2 Qc7 36. Qd2 Qd7 37. Qc2 Qc7 38. Qd2 Qd7 39. Qc2 Qc7 40. Qd2 Qd7 41. Qc2 O-O-O',
            [
                {
                    color: 'b',
                    onMoveNumber: 81,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
        expect(castleAfterMove40(game.moves)).toStrictEqual(expected)
    })
})

describe('test not castle after move 40', () => {
    test.each([
        // each side castles on exactly move 40
        '1. a4 a5 2. b4 b5 3. c4 c5 4. d4 d5 5. e4 e5 6. f4 f5 7. g4 g5 8. h4 h5 9. Nc3 Nc6 10. Nf3 Nf6 11. Bb2 Bb7 12. Bg2 Bg7 13. Qc2 Qc7 14. Qd2 Qd7 15. Qc2 Qc7 16. Qd2 Qd7 17. Qc2 Qc7 18. Qd2 Qd7 19. Qc2 Qc7 20. Qd2 Qd7 21. Qc2 Qc7 22. Qd2 Qd7 23. Qc2 Qc7 24. Qd2 Qd7 25. Qc2 Qc7 26. Qd2 Qd7 27. Qc2 Qc7 28. Qd2 Qd7 29. Qc2 Qc7 30. Qd2 Qd7 31. Qc2 Qc7 32. Qd2 Qd7 33. Qc2 Qc7 34. Qd2 Qd7 35. Qc2 Qc7 36. Qd2 Qd7 37. Qc2 Qc7 38. Qd2 Qd7 39. Qc2 Qc7 40. O-O-O O-O',
    ])('test moves: %p', (moves) => {
        let game = parse(moves, { startRule: 'game' })
        expect(castleAfterMove40(game.moves)).toStrictEqual([])
    })
})
