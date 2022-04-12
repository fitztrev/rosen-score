/*
 * Modified from https://stackoverflow.com/a/46794337
 */

module.exports = {
    byPlayerAccomplishmentWithGames: function (playerScores) {
        var helper = {}
        var result = playerScores.reduce(function (r, o) {
            var key = o.player + '-' + o.accomplishment

            if (!helper[key]) {
                helper[key] = Object.assign({}, o) // create a copy of o

                delete helper[key].game
                helper[key].games = [o.game]

                r.push(helper[key])
            } else {
                helper[key].points += o.points

                helper[key].games.push(o.game)
            }

            return r
        }, [])

        return result
    },

    byPlayerAccomplishment: function (playerScores) {
        var helper = {}
        var result = playerScores.reduce(function (r, o) {
            var key = o.player + '-' + o.accomplishment

            if (!helper[key]) {
                helper[key] = Object.assign({}, o) // create a copy of o
                r.push(helper[key])
            } else {
                helper[key].points += o.points
            }

            return r
        }, [])

        return result
    },

    byPlayer: function (playerScores) {
        var result = []

        playerScores.reduce(function (res, value) {
            if (!res[value.player]) {
                res[value.player] = { player: value.player, points: 0 }

                result.push(res[value.player])
            }
            res[value.player].points += value.points

            return res
        }, {})

        return result
    },
}
