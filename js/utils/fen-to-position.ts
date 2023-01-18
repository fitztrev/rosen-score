export function fenToPosition(fen: string): string {
    return fen
        .split(' ')[0]
        .replace(/\//g, '')
        .replace(/[1-8]/g, (m) => '.'.repeat(parseInt(m)))
}

export function positionToFiles(position: string) {
    let files = []

    for (let i = 0; i < position.length; i++) {
        let file = i % 8

        if (!files[file]) {
            files[file] = ''
        }

        files[file] += position[i]
    }

    return files
}
