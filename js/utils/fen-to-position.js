module.exports = function (chessJsInstance) {
    return chessJsInstance
        .board()
        .flat()
        .map(function (value) {
            if (value) {
                return value.color === 'w' ? value.type.toUpperCase() : value.type
            }
            return '.'
        })
        .join('')
}
