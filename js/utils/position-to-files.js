export default function (position) {
    let files = []

    for (let piece in position) {
        let file = piece % 8

        if (!files[file]) {
            files[file] = ''
        }

        files[file] += position[piece]
    }

    return files
}
