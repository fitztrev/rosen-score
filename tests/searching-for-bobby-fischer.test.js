import { describe, expect, test } from 'vitest'
import { Chess } from 'chess.js'

import searchingBobbyFischer from '../js/goals/searching-bobby-fischer.js'

describe('test Searching for Bobby Fischer position', () => {
    test.each([
        [
            'b',
            '1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Qxd7+ Qxd7 5. Bc4 cxb2 6. Nc3 bxa1=Q 7. Bxf7+ Qxf7 8. Nf3 Qxc1+ 9. Ke2 Qxh1 10. Nd5 Qxg2 11. Nxc7+ Kd8 12. Nxa8 Qgxf3+ 13. Kd2 Qxf2+ 14. Kc1 Qe3+ 15. Kc2 Qxe4+ 16. Kc3 Qd4+ 17. Kxd4 Qd5+ 18. Kxd5 Be6+ 19. Kxe6 Nc6 20. Nc7 Ne5 21. Kxe5 Kxc7 22. Kf5 Nh6+ 23. Kg5 Ng4 24. Kxg4 g5 25. Kxg5 Bh6+ 26. Kxh6 b5 27. Kg7 Rg8+ 28. Kxg8 Kd7 29. Kxh7 Kc7 30. Kg6 Kd7 31. Kf5 Kc7 32. Ke5 Kd7 33. Kd5 Kc7 34. Kc5 Kd7 35. Kxb5 Kc7 36. Kc5 Kb7 37. Kd5 Kb6 38. Ke5 Kb5 39. Kd5 Kb4 40. Ke5 Ka3 41. Kd5 Kxa2 42. Ke5 Kb2 43. Ke4 Kc3 44. Ke5 Kc4 45. h4 a5 46. h5 a4 47. h6 a3 48. h7 a2 49. h8=Q a1=Q+',
        ],
    ])('test pgn: %p', (color, pgn) => {
        let chessJs = new Chess()
        chessJs.load_pgn(pgn)

        let moves = chessJs.history({ verbose: true })

        expect(searchingBobbyFischer(moves)).toBe(color)
    })
})

describe('test not Searching for Bobby Fischer position', () => {
    test.each([
        // king protects queen
        '1. e4 e5 2. d4 exd4 3. c3 dxc3 4. Qxd7+ Qxd7 5. Bc4 cxb2 6. Nc3 bxa1=Q 7. Bxf7+ Qxf7 8. Nf3 Qxc1+ 9. Ke2 Qxh1 10. Nd5 Qxg2 11. Nxc7+ Kd8 12. Nxa8 Qgxf3+ 13. Kd2 Qxf2+ 14. Kc1 Qe3+ 15. Kc2 Qxe4+ 16. Kc3 Qd4+ 17. Kxd4 Qd5+ 18. Kxd5 Be6+ 19. Kxe6 Nc6 20. Nc7 Ne5 21. Kxe5 Kxc7 22. Kf5 Nh6+ 23. Kg5 Ng4 24. Kxg4 g5 25. Kxg5 Bh6+ 26. Kxh6 b5 27. Kg7 Rg8+ 28. Kxg8 Kd7 29. Kxh7 Kc7 30. Kg6 Kd7 31. Kf5 Kc7 32. Ke5 Kd7 33. Kd5 Kc7 34. Kc5 Kd7 35. Kxb5 Kc7 36. Kc5 Kb7 37. Kd5 Kb6 38. Ke5 Kb5 39. Kd5 Kb4 40. Ke5 Ka3 41. Kd5 Kxa2 42. Ke5 Kb2 43. Ke4 Kc3 44. Ke5 Kc4 45. h4 a5 46. h5 a4 47. h6 a3 48. h7 a2 49. Kf6 Kb5 50. Kg7 Kc6 51. h8=Q a1=Q+',
    ])('test pgn: %p', (pgn) => {
        let chessJs = new Chess()
        chessJs.load_pgn(pgn)

        let moves = chessJs.history({ verbose: true })

        expect(searchingBobbyFischer(moves)).toBeFalsy()
    })
})
