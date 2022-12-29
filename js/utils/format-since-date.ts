export default function (timestamp: number) {
    let dateInstance = new Date(timestamp)

    let date = dateInstance.toLocaleDateString(undefined, {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
    })

    let time = dateInstance
        .toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
        })
        .replace('\u202f', ' ')

    return date + ' at ' + time
}
