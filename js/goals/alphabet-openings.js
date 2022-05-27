export default {
    checkWord: function (word, moves) {
        if (typeof moves === 'string') {
            moves = moves.split(' ')
        }

        let whitePieceMoves = moves
            .filter((_, index) => index % 2 === 0)
            .map((move) => move[0])
            .join('')

        let blackPieceMoves = moves
            .filter((_, index) => index % 2 !== 0)
            .map((move) => move[0])
            .join('')

        let colors = []

        if (whitePieceMoves.indexOf(word) === 0) {
            colors.push('white')
        }

        if (blackPieceMoves.indexOf(word) === 0) {
            colors.push('black')
        }

        return colors
    },
}
