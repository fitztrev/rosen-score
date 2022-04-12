module.exports = function (gameInfoJson) {
    if (gameInfoJson.status !== 'mate') {
        return
    }

    if (!gameInfoJson.clock || gameInfoJson.clock.increment !== 0) {
        return
    }

    let clockTimes = gameInfoJson.pgn.match(/\[%clk [\d]+:[\d]+:[\d]+\]/g)

    // some older games don't have clock times available in the PGN
    if (!clockTimes) {
        return
    }

    let winnerClockTimes = clockTimes.slice(-40).filter(function (value, index) {
        return index % 2 !== 0
    })

    if (winnerClockTimes.length !== 20) {
        return
    }

    let timeRemainingTwentyMovesAgo = parseInt(winnerClockTimes[0].replace(/\D/g, ''))

    if (timeRemainingTwentyMovesAgo <= 1) {
        return gameInfoJson.winner
    }
}
