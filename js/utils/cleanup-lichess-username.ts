export default function (username: string) {
    if (!username.match(/swiss|tournament/)) {
        return username.split('/').pop()?.trim()
    }
    return username.trim()
}
