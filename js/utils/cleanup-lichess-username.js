module.exports = function (username) {
    if (!username.match(/swiss|tournament/)) {
        username = username.split('/').pop()
    }
    return username.trim()
}
