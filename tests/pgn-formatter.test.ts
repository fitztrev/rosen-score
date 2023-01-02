import { describe, expect, test } from 'vitest'
import { pgnFormatter } from '../js/utils/pgn-formatter'

describe('remove move # from pgn', () => {
    test.each([
        ['d4 d5 c4', 'd4 d5 c4'],
        ['1.d4 d5 2.c4', 'd4 d5 c4'],
        ['1. d4 d5 2. c4', 'd4 d5 c4'],
        [
            '1. d4 Nf6 2. c4 g6 3. Nc3 Bg7 4. e4 d6 5. Nf3 O-O 6. h3 c5 7. d5 b5 8. cxb5 a6 9. a4 axb5 10. Bxb5 Ba6 11. Qe2 Nxe4 12. Qxe4 Bxc3+ 13. bxc3 Bxb5 14. h4 Nd7 15. h5 Nf6 16. Qh4 Qd7 17. c4',
            'd4 Nf6 c4 g6 Nc3 Bg7 e4 d6 Nf3 O-O h3 c5 d5 b5 cxb5 a6 a4 axb5 Bxb5 Ba6 Qe2 Nxe4 Qxe4 Bxc3+ bxc3 Bxb5 h4 Nd7 h5 Nf6 Qh4 Qd7 c4',
        ],
        [
            '1. d4 Nf6 2. c4 d6 3. Nc3 Nbd7 4. e4 e5 5. d5 Be7 6. f3 O-O 7. Be3 Ne8 8. Qd2 Nc5 9. Nge2 f5 10. b4 Na6 11. a3 f4 12. Bf2 Nb8 13. Nc1 Nd7 14. Nb3 Ndf6 15. c5 b6 16. cxb6 cxb6 17. Rc1 Bb7 18. Bd3 g5 19. Qe2 a6 20. Na4 Nd7 21. O-O g4 22. fxg4 Bh4 23. Rc2 Bxf2+ 24. Qxf2 Rc8 25. Rfc1 Rxc2 26. Rxc2 Rf7 27. Be2 Rg7 28. Bf3 h6 29. h3 Kh7 30. Nd2 b5 31. Nb2 Ndf6 32. Nb1 Rc7 33. Qb6 Qc8 34. Rxc7+ Qxc7 35. Qxc7+ Nxc7 36. g3 fxg3 37. Nd2 Bc8 38. Kg2 Bd7 39. Kxg3 Na8 40. Nf1 Nb6 41. Ne3 Kg6 42. Ned1 Be8 43. Nc3 Kg7 44. Bd1 Kg6 45. Be2 h5 46. Kh4 hxg4 47. Bxg4 Kh6 48. Bf3 Bg6 49. Kg3 Bh7 50. Kh4 Bg6 51. Kg3 Bh7 52. h4 Bg6 53. Kf2 Bh7 54. Ke3 Bg6 55. a4 Be8 56. axb5 axb5 57. Be2 Bd7 58. Bxb5 Bxb5 59. Nxb5 Nfxd5+ 60. exd5 Nxd5+ 61. Ke4 Nxb4 62. Nxd6 Kh5 63. Nf5 Nc6 64. Nc4 Ne7 65. Nxe7 Kxh4 66. Ne3 Kg5 67. N3d5 Kg4 68. Nf6+ Kg5 69. Nfg8 Kg4 70. Ng6 Kg5 71. Nf8 Kg4 72. Ne6 Kg3 73. Nf6 Kf2 74. Nd5 Ke2 75. Ne3 Kd2 76. Kf3 e4+ 77. Kf2 Kd3 78. Nc7 Kd2 79. Ncd5 Kd3 80. Ke1 Kd4 81. Kd2 Kc5 82. Kc3 Kb5 83. Kd4 Kc6 84. Nf4 Kd6 85. Ne2 Kc6 86. Ke5 Kc5 87. Ke6 Kc6 88. Ke7 Kb6 89. Kd7 Kc5 90. Kc7 Kb5 91. Kd6 Kb6 92. Nd4 Kb7 93. Ne6 Kb6 94. Nc7 Kb7 95. Ncd5 Kc8 96. Ke7 Kb8 97. Kd8 Kb7 98. Kd7 Kb8 99. Nb6 Kb7 100. Nbc4 Ka7 101. Kc7 Ka6 102. Kc6 Ka7 103. Nd6 Ka6 104. Nb7 Ka7 105. Nc5 Kb8 106. Kd7 Ka8 107. Kc7 Ka7 108. Nd5 e3 109. Nb6 e2 110. Nc8+ Ka8 111. Nd7 e1=Q 112. Ndb6#',
            'd4 Nf6 c4 d6 Nc3 Nbd7 e4 e5 d5 Be7 f3 O-O Be3 Ne8 Qd2 Nc5 Nge2 f5 b4 Na6 a3 f4 Bf2 Nb8 Nc1 Nd7 Nb3 Ndf6 c5 b6 cxb6 cxb6 Rc1 Bb7 Bd3 g5 Qe2 a6 Na4 Nd7 O-O g4 fxg4 Bh4 Rc2 Bxf2+ Qxf2 Rc8 Rfc1 Rxc2 Rxc2 Rf7 Be2 Rg7 Bf3 h6 h3 Kh7 Nd2 b5 Nb2 Ndf6 Nb1 Rc7 Qb6 Qc8 Rxc7+ Qxc7 Qxc7+ Nxc7 g3 fxg3 Nd2 Bc8 Kg2 Bd7 Kxg3 Na8 Nf1 Nb6 Ne3 Kg6 Ned1 Be8 Nc3 Kg7 Bd1 Kg6 Be2 h5 Kh4 hxg4 Bxg4 Kh6 Bf3 Bg6 Kg3 Bh7 Kh4 Bg6 Kg3 Bh7 h4 Bg6 Kf2 Bh7 Ke3 Bg6 a4 Be8 axb5 axb5 Be2 Bd7 Bxb5 Bxb5 Nxb5 Nfxd5+ exd5 Nxd5+ Ke4 Nxb4 Nxd6 Kh5 Nf5 Nc6 Nc4 Ne7 Nxe7 Kxh4 Ne3 Kg5 N3d5 Kg4 Nf6+ Kg5 Nfg8 Kg4 Ng6 Kg5 Nf8 Kg4 Ne6 Kg3 Nf6 Kf2 Nd5 Ke2 Ne3 Kd2 Kf3 e4+ Kf2 Kd3 Nc7 Kd2 Ncd5 Kd3 Ke1 Kd4 Kd2 Kc5 Kc3 Kb5 Kd4 Kc6 Nf4 Kd6 Ne2 Kc6 Ke5 Kc5 Ke6 Kc6 Ke7 Kb6 Kd7 Kc5 Kc7 Kb5 Kd6 Kb6 Nd4 Kb7 Ne6 Kb6 Nc7 Kb7 Ncd5 Kc8 Ke7 Kb8 Kd8 Kb7 Kd7 Kb8 Nb6 Kb7 Nbc4 Ka7 Kc7 Ka6 Kc6 Ka7 Nd6 Ka6 Nb7 Ka7 Nc5 Kb8 Kd7 Ka8 Kc7 Ka7 Nd5 e3 Nb6 e2 Nc8+ Ka8 Nd7 e1=Q Ndb6#',
        ],
    ])('test PGN: %p', (input, output) => {
        expect(pgnFormatter(input)).toEqual(output)
    })
})
