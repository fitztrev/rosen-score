// remove move numbers from pgn
// ex: `1.d4 d5 2.c4` => `d4 d5 c4`

export function pgnFormatter(pgn: string) {
    return pgn.replace(/(\d+\. ?)/g, '')
}
