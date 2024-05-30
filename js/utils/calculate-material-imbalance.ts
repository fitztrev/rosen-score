export function calculateMaterialImbalance(position: string): number {
    let values: number[] = position.split('').map(function (piece) {
        if (piece === 'p') return -1
        else if (piece === 'n' || piece === 'b') return -3
        else if (piece === 'r') return -5
        else if (piece === 'q') return -9
        else if (piece === 'P') return +1
        else if (piece === 'N' || piece === 'B') return +3
        else if (piece === 'R') return +5
        else if (piece === 'Q') return +9
        else return 0
    })

    return values.reduce((a, b) => a + b, 0)
}
