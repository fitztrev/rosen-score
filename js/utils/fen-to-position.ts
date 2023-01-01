export function fenToPosition(fen: string): string {
    return fen
        .split(' ')[0]
        .replace(/\//g, '')
        .replace(/[1-8]/g, (m) => '.'.repeat(parseInt(m)))
}
