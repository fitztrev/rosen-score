import { Game } from 'chess-fetcher'

export default {
    winner: '',
    loser: '',
    winStreak: 1,

    currentMatchGameIds: <string[]>[],
    allAdoptionMatchGameids: <string[]>[],

    processGame: function (game: Game) {
        if (!game.result.winner) {
            this.reset()
            return
        }

        let winningUsername = game.players[game.result.winner].username
        let losingUsername = game.players[this.oppositeColor(game.result.winner)].username

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

    checkForAdoption: function (game: Game, atCount: number) {
        if (this.winStreak === atCount) {
            this.allAdoptionMatchGameids = [...this.allAdoptionMatchGameids, ...this.currentMatchGameIds]
            return game.result.winner
        }
    },

    reset: function () {
        this.winner = ''
        this.loser = ''
        this.winStreak = 1
        this.currentMatchGameIds = []
    },

    oppositeColor: function (color: string) {
        return color === 'white' ? 'black' : 'white'
    },
}
