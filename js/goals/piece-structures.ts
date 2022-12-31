import fenToPosition from '../utils/fen-to-position'
import getPiecesOnFiles from '../utils/position-to-files'

export default {
    quadrupledPawns: function (fen: string) {
        const position = fenToPosition(fen)
        let colors = []

        for (let file of getPiecesOnFiles(position)) {
            if ((file.match(/P/g) || []).length >= 4) {
                colors.push('white')
            } else if ((file.match(/p/g) || []).length >= 4) {
                colors.push('black')
            }
        }

        return colors
    },

    sixPawnsInTheSameFile: function (fen: string) {
        const position = fenToPosition(fen)
        if (position.match(/p([A-Za-z\.]{7})p([A-Za-z\.]{7})p([A-Za-z\.]{7})p([A-Za-z\.]{7})p([A-Za-z\.]{7})p/i)) {
            return ['white', 'black']
        }

        return []
    },

    pawnCube: function (fen: string) {
        const position = fenToPosition(fen)
        let colors = []
        let match

        match = position.match(/PP([A-Za-z\.]{6})PP/)
        if (match && match.index! % 8 < 7) {
            colors.push('white')
        }

        match = position.match(/pp([A-Za-z\.]{6})pp/)
        if (match && match.index! % 8 < 7) {
            colors.push('black')
        }

        return colors
    },

    pawnCubeCenter: function (fen: string) {
        const position = fenToPosition(fen)
        let colors = []

        if (position.match(/^([A-Za-z\.]{27})PP([A-Za-z\.]{6})PP/)) {
            colors.push('white')
        } else if (position.match(/^([A-Za-z\.]{27})pp([A-Za-z\.]{6})pp/)) {
            colors.push('black')
        }

        return colors
    },

    pawnX: function (fen: string) {
        const position = fenToPosition(fen)
        let colors = []
        let match

        match = position.match(/P([A-Za-z\.]{1})P([A-Za-z\.]{6})P([A-Za-z\.]{6})P([A-Za-z\.]{1})P/)
        if (match && match.index! % 8 < 6) {
            colors.push('white')
        }

        match = position.match(/p([A-Za-z\.]{1})p([A-Za-z\.]{6})p([A-Za-z\.]{6})p([A-Za-z\.]{1})p/)
        if (match && match.index! % 8 < 6) {
            colors.push('black')
        }

        return colors
    },

    knightCube: function (fen: string) {
        const position = fenToPosition(fen)
        let colors = []
        let match

        match = position.match(/NN([A-Za-z\.]{6})NN/)
        if (match && match.index! % 8 < 7) {
            colors.push('white')
        }

        match = position.match(/nn([A-Za-z\.]{6})nn/)
        if (match && match.index! % 8 < 7) {
            colors.push('black')
        }

        return colors
    },

    knightRectangle: function (fen: string) {
        const position = fenToPosition(fen)
        let colors = []
        let match

        // check for 3x2 rectangle
        match = position.match(/NNN([A-Za-z\.]{5})NNN/)
        if (match && match.index! % 8 < 6) {
            colors.push('white')
        }

        match = position.match(/nnn([A-Za-z\.]{5})nnn/)
        if (match && match.index! % 8 < 6) {
            colors.push('black')
        }

        // check for 2x3 rectangle
        match = position.match(/NN([A-Za-z\.]{6})NN([A-Za-z\.]{6})NN/)
        if (match && match.index! % 8 < 7) {
            colors.push('white')
        }

        match = position.match(/nn([A-Za-z\.]{6})nn([A-Za-z\.]{6})nn/)
        if (match && match.index! % 8 < 7) {
            colors.push('black')
        }

        return colors
    },

    pawnDiamond: function (fen: string) {
        const position = fenToPosition(fen)
        let colors = []
        let match

        match = position.match(/P([A-Za-z\.]{6})P([A-Za-z\.]{1})P([A-Za-z\.]{6})P/)
        if (match && match.index! % 8 !== 0 && match.index! % 8 !== 7) {
            colors.push('white')
        }

        match = position.match(/p([A-Za-z\.]{6})p([A-Za-z\.]{1})p([A-Za-z\.]{6})p/)
        if (match && match.index! % 8 !== 0 && match.index! % 8 !== 7) {
            colors.push('black')
        }

        return colors
    },

    pawnDiamondSolid: function (fen: string) {
        const position = fenToPosition(fen)
        let colors = []
        let match

        match = position.match(/P([A-Za-z\.]{6})PPP([A-Za-z\.]{6})P/)
        if (match && match.index! % 8 !== 0 && match.index! % 8 !== 7) {
            colors.push('white')
        }

        match = position.match(/p([A-Za-z\.]{6})ppp([A-Za-z\.]{6})p/)
        if (match && match.index! % 8 !== 0 && match.index! % 8 !== 7) {
            colors.push('black')
        }

        return colors
    },

    doublePawnDiamond: function (fen: string) {
        const position = fenToPosition(fen)
        let colors = []
        let matches

        for (let color of ['P', 'p']) {
            const regex = new RegExp(`(?=${color}([A-Za-z\.]{6})${color}([A-Za-z\.]{1})${color}([A-Za-z\.]{6})${color})`, 'g')
            matches = position.matchAll(regex)

            const diamonds = Array.from(matches)

            if (
                diamonds.length === 2 &&
                diamonds[0].index! % 8 !== 0 &&
                diamonds[0].index! % 8 !== 7 &&
                diamonds[1].index! % 8 !== 0 &&
                diamonds[1].index! % 8 !== 7
            ) {
                colors.push(color === 'P' ? 'white' : 'black')
            }
        }

        return colors
    },

    _connectEightOnRank: function (fen: string, rank: number) {
        const position = fenToPosition(fen)
        let colors = []

        if (position.substr(64 - 8 * rank, 8) === 'PPPPPPPP') {
            colors.push('white')
        } else if (position.substr(8 * (rank - 1), 8) === 'pppppppp') {
            colors.push('black')
        }

        return colors
    },

    connectEightOnRank4: function (fen: string) {
        return this._connectEightOnRank(fen, 4)
    },

    connectEightOnRank5: function (fen: string) {
        return this._connectEightOnRank(fen, 5)
    },

    connectEightOnRank6: function (fen: string) {
        return this._connectEightOnRank(fen, 6)
    },

    connectEightOnRank7: function (fen: string) {
        return this._connectEightOnRank(fen, 7)
    },

    _convertPositionToDiagonalStringA1toH8(position: string) {
        return (
            position[0] +
            position[8] +
            position[1] +
            position[16] +
            position[9] +
            position[2] +
            position[24] +
            position[17] +
            position[10] +
            position[3] +
            position[32] +
            position[25] +
            position[18] +
            position[11] +
            position[4] +
            position[40] +
            position[33] +
            position[26] +
            position[19] +
            position[12] +
            position[5] +
            position[48] +
            position[41] +
            position[34] +
            position[27] +
            position[20] +
            position[13] +
            position[6] +
            position[56] +
            position[49] +
            position[42] +
            position[35] +
            position[28] +
            position[21] +
            position[14] +
            position[7] +
            position[57] +
            position[50] +
            position[43] +
            position[36] +
            position[29] +
            position[22] +
            position[15] +
            position[58] +
            position[51] +
            position[44] +
            position[37] +
            position[30] +
            position[23] +
            position[59] +
            position[52] +
            position[45] +
            position[38] +
            position[31] +
            position[60] +
            position[53] +
            position[46] +
            position[39] +
            position[61] +
            position[54] +
            position[47] +
            position[62] +
            position[55] +
            position[63]
        )
    },

    _convertPositionToDiagonalStringH1toA8(position: string) {
        return (
            position[7] +
            position[15] +
            position[6] +
            position[23] +
            position[14] +
            position[5] +
            position[31] +
            position[22] +
            position[13] +
            position[4] +
            position[39] +
            position[30] +
            position[21] +
            position[12] +
            position[3] +
            position[47] +
            position[38] +
            position[29] +
            position[20] +
            position[11] +
            position[2] +
            position[55] +
            position[46] +
            position[37] +
            position[28] +
            position[19] +
            position[10] +
            position[1] +
            position[63] +
            position[54] +
            position[45] +
            position[36] +
            position[27] +
            position[18] +
            position[9] +
            position[0] +
            position[62] +
            position[53] +
            position[44] +
            position[35] +
            position[26] +
            position[17] +
            position[8] +
            position[61] +
            position[52] +
            position[43] +
            position[34] +
            position[25] +
            position[16] +
            position[60] +
            position[51] +
            position[42] +
            position[33] +
            position[24] +
            position[59] +
            position[50] +
            position[41] +
            position[32] +
            position[58] +
            position[49] +
            position[40] +
            position[57] +
            position[48] +
            position[56]
        )
    },

    _connectDiagonally: function (fen: string, times: number) {
        const position = fenToPosition(fen)
        let colors = []

        if (this._convertPositionToDiagonalStringA1toH8(position).includes('P'.repeat(times))) {
            colors.push('white')
        } else if (this._convertPositionToDiagonalStringH1toA8(position).includes('P'.repeat(times))) {
            colors.push('white')
        } else if (this._convertPositionToDiagonalStringA1toH8(position).includes('p'.repeat(times))) {
            colors.push('black')
        } else if (this._convertPositionToDiagonalStringH1toA8(position).includes('p'.repeat(times))) {
            colors.push('black')
        }

        return colors
    },

    connectFour: function (fen: string) {
        return this._connectDiagonally(fen, 4)
    },

    connectFive: function (fen: string) {
        return this._connectDiagonally(fen, 5)
    },

    connectSix: function (fen: string) {
        return this._connectDiagonally(fen, 6)
    },

    pawnTrapezoid: function (fen: string) {
        const position = fenToPosition(fen)

        let colors = []
        let match

        match = position.substr(0, 40).match(/PP([A-Za-z\.]{5})P([A-Za-z\.]{2})P([A-Za-z\.]{3})P([A-Za-z\.]{4})P/)
        if (match && match.index! % 8 >= 2 && match.index! % 8 <= 4) {
            colors.push('white')
        }

        match = position.substr(24, 64).match(/p([A-Za-z\.]{4})p([A-Za-z\.]{3})p([A-Za-z\.]{2})p([A-Za-z\.]{5})pp/)
        if (match && match.index! % 8 <= 2) {
            colors.push('black')
        }

        return colors
    },
}
