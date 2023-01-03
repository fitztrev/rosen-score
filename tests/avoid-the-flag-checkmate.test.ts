import { describe, expect, test } from 'vitest'
import { parse } from '@mliebelt/pgn-parser'
import { avoidTheFlagCheckmate } from '../js/goals/avoid-the-flag-checkmate'

describe('avoid the flag', () => {
    test.each([
        [
            // https://lichess.org/Wi5bzNTB#0
            '[Event "2021 Spring Marathon"]\n[Site "https://lichess.org/Wi5bzNTB"]\n[Date "2021.04.10"]\n[White "EricRosen"]\n[Black "TimoScKreuzberg"]\n[Result "1-0"]\n[UTCDate "2021.04.10"]\n[UTCTime "11:29:58"]\n[WhiteElo "2459"]\n[BlackElo "2376"]\n[WhiteRatingDiff "+4"]\n[BlackRatingDiff "-4"]\n[WhiteTitle "IM"]\n[Variant "Standard"]\n[TimeControl "300+0"]\n[ECO "A45"]\n[Opening "Indian Defense"]\n[Termination "Normal"]\n\n1. d4 { [%eval 0.19] [%clk 0:02:30] } 1... Nf6 { [%eval 0.0] [%clk 0:05:00] } 2. Bf4 { [%eval 0.0] [%clk 0:02:26] } 2... g6 { [%eval 0.0] [%clk 0:04:57] } 3. Nc3 { [%eval 0.0] [%clk 0:02:24] } 3... d5 { [%eval 0.0] [%clk 0:04:52] } 4. e3 { [%eval 0.25] [%clk 0:02:23] } 4... Bg7 { [%eval -0.24] [%clk 0:04:51] } 5. h4 { [%eval 0.5] [%clk 0:02:22] } 5... O-O { [%eval 0.66] [%clk 0:04:51] } 6. h5 { [%eval 2.04] [%clk 0:02:21] } 6... Bg4 { [%eval 1.65] [%clk 0:04:33] } 7. f3 { [%eval 1.63] [%clk 0:02:19] } 7... Be6 { [%eval 1.63] [%clk 0:04:25] } 8. g4 { [%eval 1.94] [%clk 0:02:07] } 8... c5 { [%eval 1.03] [%clk 0:03:53] } 9. Nh3 { [%eval 1.22] [%clk 0:01:49] } 9... cxd4 { [%eval 1.33] [%clk 0:03:50] } 10. exd4 { [%eval 1.69] [%clk 0:01:46] } 10... Qa5 { [%eval 1.74] [%clk 0:03:16] } 11. Ng5 { [%eval 1.46] [%clk 0:01:42] } 11... Nc6 { [%eval 1.71] [%clk 0:02:50] } 12. hxg6 { [%eval 1.9] [%clk 0:01:37] } 12... hxg6 { [%eval 1.8] [%clk 0:02:45] } 13. Qd2 { [%eval 3.57] [%clk 0:01:31] } 13... Rfc8 { [%eval 0.0] [%clk 0:02:38] } 14. a3 { [%eval -0.06] [%clk 0:01:15] } 14... Nxd4 { [%eval 0.0] [%clk 0:02:33] } 15. Qxd4 { [%eval 2.44] [%clk 0:01:05] } 15... Nxg4 { [%eval -0.86] [%clk 0:02:01] } 16. Qxg7+ { [%eval -1.37] [%clk 0:00:57] } 16... Kxg7 { [%eval -2.0] [%clk 0:01:56] } 17. Nxe6+ { [%eval 0.0] [%clk 0:00:56] } 17... fxe6 { [%eval 0.0] [%clk 0:01:55] } 18. fxg4 { [%eval 4.88] [%clk 0:00:56] } 18... d4 { [%eval 4.42] [%clk 0:01:46] } 19. b4 { [%eval 4.26] [%clk 0:00:49] } 19... Qb6 { [%eval 3.67] [%clk 0:01:27] } 20. Ne4 { [%eval 8.45] [%clk 0:00:46] } 20... Qc6 { [%eval 2.74] [%clk 0:01:23] } 21. Bd3 { [%eval 3.14] [%clk 0:00:33] } 21... Qd5 { [%eval 3.25] [%clk 0:01:15] } 22. Bh6+ { [%eval 3.57] [%clk 0:00:31] } 22... Kg8 { [%eval 1.47] [%clk 0:01:11] } 23. Rd1 { [%eval 2.51] [%clk 0:00:22] } 23... Rf8 { [%eval 1.94] [%clk 0:01:09] } 24. Rd2 { [%eval 3.09] [%clk 0:00:20] } 24... Rf7 { [%eval 3.13] [%clk 0:01:05] } 25. Rdh2 { [%eval 3.01] [%clk 0:00:19] } 25... Rh7 { [%eval 3.39] [%clk 0:01:04] } 26. Ng5 { [%eval 4.03] [%clk 0:00:17] } 26... Qe5+ { [%eval 0.57] [%clk 0:00:59] } 27. Ne4 { [%eval 0.6] [%clk 0:00:16] } 27... Rf8 { [%eval -4.37] [%clk 0:00:55] } 28. Bf4 { [%eval 0.04] [%clk 0:00:14] } 28... Rxh2 { [%eval 0.16] [%clk 0:00:53] } 29. Bxe5 { [%eval 0.14] [%clk 0:00:13] } 29... Rxh1+ { [%eval 0.0] [%clk 0:00:53] } 30. Kd2 { [%eval 0.82] [%clk 0:00:13] } 30... Rg1 { [%eval 0.0] [%clk 0:00:47] } 31. g5 { [%eval -0.19] [%clk 0:00:12] } 31... Rg2+ { [%eval -0.34] [%clk 0:00:47] } 32. Kc1 { [%eval -0.16] [%clk 0:00:11] } 32... Rf5 { [%eval -0.38] [%clk 0:00:46] } 33. Bxd4 { [%eval 3.01] [%clk 0:00:10] } 33... Rg4 { [%eval 3.4] [%clk 0:00:44] } 34. Bxa7 { [%eval 3.89] [%clk 0:00:10] } 34... Re5 { [%eval 3.85] [%clk 0:00:42] } 35. Nc5 { [%eval 4.09] [%clk 0:00:09] } 35... Re1+ { [%eval 3.87] [%clk 0:00:39] } 36. Kb2 { [%eval 5.3] [%clk 0:00:08] } 36... Re5 { [%eval 4.29] [%clk 0:00:38] } 37. Bb8 { [%eval 5.14] [%clk 0:00:08] } 37... Rd5 { [%eval 5.19] [%clk 0:00:37] } 38. Nxb7 { [%eval 6.92] [%clk 0:00:07] } 38... Rg2 { [%eval 5.8] [%clk 0:00:35] } 39. Nc5 { [%eval 6.63] [%clk 0:00:07] } 39... Rd8 { [%eval 6.58] [%clk 0:00:33] } 40. Bc7 { [%eval 9.11] [%clk 0:00:06] } 40... Rxg5 { [%eval 9.12] [%clk 0:00:33] } 41. Bxd8 { [%eval 9.28] [%clk 0:00:05] } 41... Rd5 { [%eval 9.07] [%clk 0:00:32] } 42. Bxe7 { [%eval 9.86] [%clk 0:00:05] } 42... Kf7 { [%eval 9.64] [%clk 0:00:32] } 43. Bh4 { [%eval 66.53] [%clk 0:00:04] } 43... Rf5 { [%eval 7.41] [%clk 0:00:31] } 44. Bf2 { [%eval 9.96] [%clk 0:00:04] } 44... Rf4 { [%eval 9.79] [%clk 0:00:31] } 45. Be3 { [%eval 9.72] [%clk 0:00:03] } 45... Rf3 { [%eval 9.77] [%clk 0:00:31] } 46. Bd2 { [%eval 9.57] [%clk 0:00:03] } 46... Ke7 { [%eval 9.3] [%clk 0:00:31] } 47. Bc3 { [%eval 9.43] [%clk 0:00:03] } 47... g5 { [%eval 9.41] [%clk 0:00:31] } 48. Ne4 { [%eval 9.68] [%clk 0:00:03] } 48... g4 { [%eval 9.04] [%clk 0:00:31] } 49. Nd2 { [%eval 24.32] [%clk 0:00:02] } 49... Kd7 { [%eval 51.88] [%clk 0:00:31] } 50. Nxf3 { [%eval 23.08] [%clk 0:00:02] } 50... gxf3 { [%eval 13.91] [%clk 0:00:30] } 51. Bf1 { [%eval 57.87] [%clk 0:00:02] } 51... f2 { [%eval 61.25] [%clk 0:00:30] } 52. Bd2 { [%eval 29.44] [%clk 0:00:01] } 52... e5 { [%eval 76.82] [%clk 0:00:30] } 53. Be3 { [%eval 76.77] [%clk 0:00:01] } 53... Kd6 { [%eval #15] [%clk 0:00:30] } 54. Bxf2 { [%eval 68.4] [%clk 0:00:01] } 54... Kd5 { [%eval #19] [%clk 0:00:30] } 55. Be2 { [%eval #13] [%clk 0:00:01] } 55... Ke4 { [%eval 145.89] [%clk 0:00:30] } 56. Bd1 { [%eval #11] [%clk 0:00:01] } 56... Kf5 { [%eval 80.24] [%clk 0:00:29] } 57. c4 { [%eval 71.8] [%clk 0:00:01] } 57... Ke6 { [%eval #13] [%clk 0:00:29] } 58. b5 { [%eval #13] [%clk 0:00:01] } 58... e4 { [%eval #9] [%clk 0:00:29] } 59. b6 { [%eval #8] [%clk 0:00:01] } 59... e3 { [%eval #10] [%clk 0:00:29] } 60. b7 { [%eval #15] [%clk 0:00:01] } 60... exf2 { [%eval #10] [%clk 0:00:29] } 61. Be2 { [%eval #9] [%clk 0:00:00] } 61... f1=Q { [%eval #8] [%clk 0:00:28] } 62. Bxf1 { [%eval #8] [%clk 0:00:00] } 62... Kf7 { [%eval #8] [%clk 0:00:26] } 63. Kc3 { [%eval #7] [%clk 0:00:00] } 63... Kf6 { [%eval #8] [%clk 0:00:26] } 64. a4 { [%eval #8] [%clk 0:00:00] } 64... Kg6 { [%eval #7] [%clk 0:00:26] } 65. a5 { [%eval #7] [%clk 0:00:00] } 65... Kf6 { [%eval #6] [%clk 0:00:26] } 66. a6 { [%eval #6] [%clk 0:00:00] } 66... Kf5 { [%eval #5] [%clk 0:00:26] } 67. a7 { [%eval #5] [%clk 0:00:00] } 67... Kg4 { [%eval #4] [%clk 0:00:26] } 68. b8=Q { [%eval #3] [%clk 0:00:00] } 68... Kf3 { [%eval #3] [%clk 0:00:26] } 69. Qb6 { [%eval #3] [%clk 0:00:00] } 69... Kg3 { [%eval #2] [%clk 0:00:26] } 70. a8=Q { [%eval #2] [%clk 0:00:00] } 70... Kg4 { [%eval #3] [%clk 0:00:25] } 71. Qab8 { [%eval #3] [%clk 0:00:00] } 71... Kf3 { [%eval #2] [%clk 0:00:25] } 72. Qc6+ { [%eval #2] [%clk 0:00:00] } 72... Kf2 { [%eval #2] [%clk 0:00:24] } 73. Qd8 { [%eval #2] [%clk 0:00:00] } 73... Ke1 { [%eval #3] [%clk 0:00:24] } 74. Qcd7 { [%eval #2] [%clk 0:00:00] } 74... Kf2 { [%eval #2] [%clk 0:00:23] } 75. Q8e8 { [%eval #2] [%clk 0:00:00] } 75... Kg1 { [%eval #3] [%clk 0:00:23] } 76. Qde7 { [%eval #2] [%clk 0:00:00] } 76... Kh2 { [%eval #2] [%clk 0:00:23] } 77. Q8f8 { [%eval #2] [%clk 0:00:00] } 77... Kg1 { [%eval #1] [%clk 0:00:22] } 78. Qeg7+ { [%eval #1] [%clk 0:00:00] } 78... Kh2 { [%clk 0:00:22] } 79. Qfh8# { [%clk 0:00:00] } 1-0\n\n\n',
            [
                {
                    color: 'w',
                    onMoveNumber: 156,
                },
            ],
        ],
    ])('test pgn: %p', (pgn, expected) => {
        let game = parse(pgn, { startRule: 'game' })
        expect(avoidTheFlagCheckmate({ timeControl: { initial: 60, increment: 0 } }, game.moves)).toStrictEqual(expected)
        expect(avoidTheFlagCheckmate({ timeControl: { initial: 180, increment: 2 } }, game.moves)).toStrictEqual([])
    })
})
