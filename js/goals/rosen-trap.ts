import { Game, PgnMove } from 'chess-fetcher'
import { Chess, Move } from 'chess.js'
import { TrophyCheckResult } from '../types/types'

export function rosenTrap(game: Game, moves: PgnMove[]): TrophyCheckResult {
    if (game.result.via !== 'stalemate') {
        return []
    }

    for (const moveNum in moves) {
        let moveNumber = parseInt(moveNum)

        let destinationSquare = moves[moveNumber].notation.col + moves[moveNumber].notation.row

        // to have a "Rosen Trap" moment, it requires at least 1 followup move
        if (moves[moveNumber + 1] !== undefined) {
            // if playerA captures a piece with check on one of the "stalemate squares"
            // AND playerB moves king to corner
            // AND game is a stalemate
            // AND playerB *could* have captured the queen with king
            if (
                moves[moveNumber].notation.fig === 'Q' &&
                moves[moveNumber].notation.strike === 'x' &&
                moves[moveNumber].notation.notation.endsWith('+') &&
                ['b3', 'b6', 'c2', 'c7', 'f2', 'f7', 'g3', 'g6'].includes(destinationSquare)
            ) {
                if (['Ka1', 'Ka8', 'Kh1', 'Kh8'].includes(moves[moveNumber + 1].notation.notation) && moves[moveNumber + 3] === undefined) {
                    let movesUntilKingGoesToCorner = moves
                        .slice(0, moveNumber + 1)
                        .map((move) => move.notation.notation)
                        .join(' ')

                    let chessJs = new Chess()
                    chessJs.loadPgn(movesUntilKingGoesToCorner)
                    const chessJsMoves = chessJs.moves({ verbose: true }) as Move[]

                    for (const kingMove of chessJsMoves) {
                        // if king could move to the square the queen captured on...
                        if (kingMove.to === destinationSquare) {
                            return [
                                {
                                    color: kingMove.color,
                                    onMoveNumber: moveNumber + 3,
                                },
                            ]
                        }
                    }
                }
            }
        }
    }

    return []
}
