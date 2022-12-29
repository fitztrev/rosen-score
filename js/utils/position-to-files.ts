export default function (position: string) {
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
