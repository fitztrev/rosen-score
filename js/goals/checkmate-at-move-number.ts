export function checkmateAtMoveNumber(moves: PgnMove[], moveNumber: number) {
    const lastMove = moves[moves.length - 1]

    if (lastMove.notation.check === '#' && Math.ceil(moves.length / 2) === moveNumber) {
        return [lastMove.turn]
    }

    console.log(moves.length / 2)

    return []
}
