import { describe, expect, test } from 'vitest'
import { Chess } from 'chess.js'

import firstCapture from '../js/goals/first-capture.js'

describe('test first capture on move number', () => {
    test.each([
        [
            // first capture happens on white's 30th move (58th ply)
            '1. a3 a6 2. b3 b6 3. c3 c6 4. d3 d6 5. e3 e6 6. f3 f6 7. g3 g6 8. h3 h6 9. a4 a5 10. b4 b5 11. c4 c5 12. d4 d5 13. e4 e5 14. f4 f5 15. g4 g5 16. h4 h5 17. Ra2 Ra7 18. Rhh2 Rhh7 19. Nc3 Nc6 20. Nf3 Nf6 21. Bg2 Bb7 22. Bb2 Bg7 23. Qc2 Qc7 24. Kf2 Kf7 25. Ke2 Ke7 26. Kf2 Kf7 27. Ke2 Ke7 28. Kf2 Kf7 29. Ke2 Ke7 30. Nxe5 Nxe4',
            58,
            58,
        ],
        [
            // A game ending in checkmate with no captures and fewer than 30 moves
            '1. f4 e5 2. g4 Qh4#',
            -1,
            false,
        ],
        [
            // White captures on move 29
            '1. a3 a6 2. b3 b6 3. c3 c6 4. d3 d6 5. e3 e6 6. f3 f6 7. g3 g6 8. h3 h6 9. a4 a5 10. b4 b5 11. c4 c5 12. d4 d5 13. e4 e5 14. f4 f5 15. g4 g5 16. h4 h5 17. Ra2 Ra7 18. Rhh2 Rhh7 19. Nc3 Nc6 20. Nf3 Nf6 21. Bg2 Bb7 22. Bb2 Bg7 23. Qc2 Qc7 24. Kf2 Kf7 25. Ke2 Ke7 26. Kf2 Kf7 27. Ke2 Ke7 28. Kf2 Kf7 29. Nxe5+ Nxe5 30. dxe5 Nd7 31. e6+ Kxe6',
            56,
            false,
        ],
        [
            // Black captures on move 29
            '1. a3 a6 2. b3 b6 3. c3 c6 4. d3 d6 5. e3 e6 6. f3 f6 7. g3 g6 8. h3 h6 9. a4 a5 10. b4 b5 11. c4 c5 12. d4 d5 13. e4 e5 14. f4 f5 15. g4 g5 16. h4 h5 17. Ra2 Ra7 18. Rhh2 Rhh7 19. Nc3 Nc6 20. Nf3 Nf6 21. Bg2 Bb7 22. Bb2 Bg7 23. Qc2 Qc7 24. Kf2 Kf7 25. Ke2 Ke7 26. Kf2 Kf7 27. Ke2 Ke7 28. Kf2 Kf7 29. Ke2 Nxe4 30. Nxd5 exd4 31. Ne5+ Ke6',
            57,
            false,
        ],
    ])(
        'test moves: %p',
        (moves, captureOnMove, beforeMove30) => {
            expect(true).toBe(true)
            let chessJsInstance = new Chess()
            chessJsInstance.load_pgn(moves)

            let allMoves = chessJsInstance.history({ verbose: true })

            expect(firstCapture.getMoveNumberOfFirstCapture(allMoves)).toBe(captureOnMove)
            expect(firstCapture.noCapturesBeforeMoveNumber(allMoves, 30)).toBe(beforeMove30)
        }
    )
})
