export default {
    checkWord: function (word, moves, color) {
        if (typeof moves === 'string') {
            moves = moves.split(' ')
        }

        let whitesMoves = moves
            .filter((_, index) => index % 2 === 0)
            .slice(0, word.length)
            .join('')
        let blacksMoves = moves
            .filter((_, index) => index % 2 !== 0)
            .slice(0, word.length)
            .join('')

        if (
            color === 'white' &&
            whitesMoves.length === word.length * 2 &&
            whitesMoves.replace(/[^a-z]/g, '') === word
        ) {
            return 'white'
        } else if (
            color === 'black' &&
            blacksMoves.length === word.length * 2 &&
            blacksMoves.replace(/[^a-z]/g, '') === word
        ) {
            return 'black'
        }

        return false
    },
}
