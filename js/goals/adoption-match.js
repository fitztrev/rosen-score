export default {
    winner: null,
    loser: null,
    winStreak: 1,

    currentMatchGameIds: [],
    allAdoptionMatchGameids: [],

    processGame: function (game) {
        if (!game.winner) {
            this.reset()
            return
        }

        let winningUsername = game.players[game.winner].user.id
        let losingUsername = game.players[this.oppositeColor(game.winner)].user.id

        if (this.winner === winningUsername && this.loser === losingUsername) {
            this.winStreak++
            this.currentMatchGameIds.push(game.id)
        } else {
            this.winner = winningUsername
            this.loser = losingUsername
            this.winStreak = 1
            this.currentMatchGameIds = [game.id]
        }
    },

    checkForAdoption: function (game, atCount) {
        if (this.winStreak === atCount) {
            this.allAdoptionMatchGameids = [...this.allAdoptionMatchGameids, ...this.currentMatchGameIds]
            return game.winner
        }
    },

    reset: function () {
        this.winner = null
        this.loser = null
        this.winStreak = 1
        this.currentMatchGameIds = []
    },

    oppositeColor: function (color) {
        return color === 'white' ? 'black' : 'white'
    },
}
