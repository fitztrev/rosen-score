module.exports = function (timestamp) {
    let dateInstance = new Date(timestamp)

    let date = dateInstance.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    })

    let time = dateInstance.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
    })

    return date + ' at ' + time
}
