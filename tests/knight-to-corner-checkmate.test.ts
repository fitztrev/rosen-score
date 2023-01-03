import { describe, expect, test } from 'vitest'
import { parse } from '@mliebelt/pgn-parser'
import { knightCornerMate } from '../js/goals/move-checks'

describe('knight to the corner checkmate', () => {
    test.each([
        [
            // knight moves to corner with checkmate
            '1. d4 d5 2. Qd3 e5 3. dxe5 c5 4. Qxd5 b5 5. Qxc5 a5 6. Qxb5+ Qd7 7. Qxb8 f5 8. Qxa8 g5 9. Qxc8+ Kf7 10. Qxd7+ Kg6 11. Qxf5+ Kh6 12. Qxf8+ Kh5 13. Qxg8 a4 14. Qxh8 Kg6 15. e6 Kf5 16. Qxh7+ Kf6 17. e7 g4 18. Qe4 Kf7 19. e8=Q+ Kg7 20. Qd7+ Kf6 21. Qd6+ Kf7 22. Qxg4 Ke8 23. h4 Kf7 24. h5 Ke8 25. h6 Kf7 26. h7 Ke8 27. Nf3 Kf7 28. Ne5+ Ke8 29. Ng6 Kf7 30. Rh3 Ke8 31. Re3+ Kf7 32. Nh8#',
            [
                {
                    color: 'w',
                    onMoveNumber: 62,
                },
            ],
        ],
        [
            // knight captures in corner with checkmate
            '1. d4 d5 2. Qd3 e5 3. dxe5 c5 4. Qxd5 b5 5. Qxc5 a5 6. Qxb5+ Qd7 7. Qxb8 f5 8. Qxa8 g5 9. Qxc8+ Kf7 10. Qxd7+ Kg6 11. Qxf5+ Kh6 12. Qxf8+ Kh5 13. Qxg8 Kg4 14. Qxh7 a4 15. Qa7 Kf5 16. Qxa4 Kg6 17. Qc6+ Kf7 18. h4 Kg7 19. hxg5 Kf7 20. g6+ Kg7 21. Qb7+ Kxg6 22. Qc6+ Kf7 23. Rh3 Kg7 24. Rg3+ Kf7 25. Nf3 Kf8 26. Ng5 Kg7 27. Nh3+ Kf8 28. Nf4 Kf7 29. Ng6 Kg8 30. Bh6 Kf7 31. Qd6 Rd8 32. e4 Rh8 33. Bb5 Rd8 34. Nc3 Kg8 35. Rd1 Kf7 36. Rd4 Kg8 37. Ra4 Kf7 38. Ra8 Rh8 39. Nxh8#',
            [
                {
                    color: 'w',
                    onMoveNumber: 76,
                },
            ],
        ],
        [
            // h pawn promotes to knight with checkmate
            '1. d4 d5 2. Qd3 e5 3. dxe5 c5 4. Qxd5 b5 5. Qxc5 a5 6. Qxb5+ Qd7 7. Qxb8 f5 8. Qxa8 g5 9. Qxc8+ Kf7 10. Qxd7+ Kg6 11. Qxf5+ Kh6 12. Qxf8+ Kh5 13. Qxg8 a4 14. Qxh8 Kg6 15. e6 Kf5 16. Qxh7+ Kf6 17. e7 g4 18. Qe4 Kf7 19. e8=Q+ Kg7 20. Qd7+ Kf6 21. Qd6+ Kf7 22. Qxg4 Ke8 23. h4 Kf7 24. h5 Ke8 25. h6 Kf7 26. h7 Ke8 27. Rh3 Kf7 28. Rf3+ Ke8 29. Re3+ Kf7 30. h8=N#',
            [
                {
                    color: 'w',
                    onMoveNumber: 58,
                },
            ],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' })
        expect(knightCornerMate(game.moves)).toStrictEqual(expected)
    })
})
