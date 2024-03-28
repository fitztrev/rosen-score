import { TrophyCheckResult } from '../types/types'
import { fenToPosition, positionToFiles } from '../utils/fen-to-position'

export function quadrupledPawns(fen: string): TrophyCheckResult {
    const position = fenToPosition(fen)
    let result: TrophyCheckResult = []

    for (let file of positionToFiles(position)) {
        if ((file.match(/P/g) || []).length >= 4) {
            result.push({
                color: 'w',
            })
        } else if ((file.match(/p/g) || []).length >= 4) {
            result.push({
                color: 'b',
            })
        }
    }

    return result
}

export function sixPawnsInTheSameFile(fen: string): TrophyCheckResult {
    const position = fenToPosition(fen)
    if (position.match(/p([A-Za-z\.]{7})p([A-Za-z\.]{7})p([A-Za-z\.]{7})p([A-Za-z\.]{7})p([A-Za-z\.]{7})p/i)) {
        return [
            {
                color: 'w',
            },
            {
                color: 'b',
            },
        ]
    }

    return []
}

export function pawnCube(fen: string): TrophyCheckResult {
    const position = fenToPosition(fen)
    let result: TrophyCheckResult = []
    let match

    match = position.match(/PP([A-Za-z\.]{6})PP/)
    if (match && match.index! % 8 < 7) {
        result.push({
            color: 'w',
        })
    }

    match = position.match(/pp([A-Za-z\.]{6})pp/)
    if (match && match.index! % 8 < 7) {
        result.push({
            color: 'b',
        })
    }

    return result
}

export function pawnCubeCenter(fen: string): TrophyCheckResult {
    const position = fenToPosition(fen)
    let result: TrophyCheckResult = []

    if (position.match(/^([A-Za-z\.]{27})PP([A-Za-z\.]{6})PP/)) {
        result.push({
            color: 'w',
        })
    } else if (position.match(/^([A-Za-z\.]{27})pp([A-Za-z\.]{6})pp/)) {
        result.push({
            color: 'b',
        })
    }

    return result
}

export function pawnX(fen: string): TrophyCheckResult {
    const position = fenToPosition(fen)
    let result: TrophyCheckResult = []
    let match

    match = position.match(/P([A-Za-z\.]{1})P([A-Za-z\.]{6})P([A-Za-z\.]{6})P([A-Za-z\.]{1})P/)
    if (match && match.index! % 8 < 6) {
        result.push({
            color: 'w',
        })
    }

    match = position.match(/p([A-Za-z\.]{1})p([A-Za-z\.]{6})p([A-Za-z\.]{6})p([A-Za-z\.]{1})p/)
    if (match && match.index! % 8 < 6) {
        result.push({
            color: 'b',
        })
    }

    return result
}

export function knightCube(fen: string): TrophyCheckResult {
    const position = fenToPosition(fen)
    let result: TrophyCheckResult = []
    let match

    match = position.match(/NN([A-Za-z\.]{6})NN/)
    if (match && match.index! % 8 < 7) {
        result.push({
            color: 'w',
        })
    }

    match = position.match(/nn([A-Za-z\.]{6})nn/)
    if (match && match.index! % 8 < 7) {
        result.push({
            color: 'b',
        })
    }

    return result
}

export function knightRectangle(fen: string): TrophyCheckResult {
    const position = fenToPosition(fen)
    let result: TrophyCheckResult = []
    let match

    // check for 3x2 rectangle
    match = position.match(/NNN([A-Za-z\.]{5})NNN/)
    if (match && match.index! % 8 < 6) {
        result.push({
            color: 'w',
        })
    }

    match = position.match(/nnn([A-Za-z\.]{5})nnn/)
    if (match && match.index! % 8 < 6) {
        result.push({
            color: 'b',
        })
    }

    // check for 2x3 rectangle
    match = position.match(/NN([A-Za-z\.]{6})NN([A-Za-z\.]{6})NN/)
    if (match && match.index! % 8 < 7) {
        result.push({
            color: 'w',
        })
    }

    match = position.match(/nn([A-Za-z\.]{6})nn([A-Za-z\.]{6})nn/)
    if (match && match.index! % 8 < 7) {
        result.push({
            color: 'b',
        })
    }

    return result
}

export function pawnDiamond(fen: string): TrophyCheckResult {
    const position = fenToPosition(fen)
    let result: TrophyCheckResult = []
    let match

    match = position.match(/P([A-Za-z\.]{6})P([A-Za-z\.]{1})P([A-Za-z\.]{6})P/)
    if (match && match.index! % 8 !== 0 && match.index! % 8 !== 7) {
        result.push({
            color: 'w',
        })
    }

    match = position.match(/p([A-Za-z\.]{6})p([A-Za-z\.]{1})p([A-Za-z\.]{6})p/)
    if (match && match.index! % 8 !== 0 && match.index! % 8 !== 7) {
        result.push({
            color: 'b',
        })
    }

    return result
}

export function pawnDiamondSolid(fen: string): TrophyCheckResult {
    const position = fenToPosition(fen)
    let result: TrophyCheckResult = []
    let match

    match = position.match(/P([A-Za-z\.]{6})PPP([A-Za-z\.]{6})P/)
    if (match && match.index! % 8 !== 0 && match.index! % 8 !== 7) {
        result.push({
            color: 'w',
        })
    }

    match = position.match(/p([A-Za-z\.]{6})ppp([A-Za-z\.]{6})p/)
    if (match && match.index! % 8 !== 0 && match.index! % 8 !== 7) {
        result.push({
            color: 'b',
        })
    }

    return result
}

export function doublePawnDiamond(fen: string): TrophyCheckResult {
    const position = fenToPosition(fen)
    let result: TrophyCheckResult = []
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
            result.push({
                color: color === 'P' ? 'w' : 'b',
            })
        }
    }

    return result
}

export function connectEightOnRank(fen: string, rank: number): TrophyCheckResult {
    const position = fenToPosition(fen)
    let result: TrophyCheckResult = []

    const startingSquareForWhite = 64 - 8 * rank
    const startingSquareForBlack = 8 * (rank - 1)

    if (position.substring(startingSquareForWhite, startingSquareForWhite + 8) === 'PPPPPPPP') {
        result.push({
            color: 'w',
        })
    } else if (position.substring(startingSquareForBlack, startingSquareForBlack + 8) === 'pppppppp') {
        result.push({
            color: 'b',
        })
    }

    return result
}

function _convertPositionToDiagonalStringA1toH8(position: string) {
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
}

function _convertPositionToDiagonalStringH1toA8(position: string) {
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
}

export function connectDiagonally(fen: string, times: number): TrophyCheckResult {
    const position = fenToPosition(fen)
    let result: TrophyCheckResult = []

    if (
        _convertPositionToDiagonalStringA1toH8(position).includes('P'.repeat(times)) ||
        _convertPositionToDiagonalStringH1toA8(position).includes('P'.repeat(times))
    ) {
        result.push({
            color: 'w',
        })
    } else if (
        _convertPositionToDiagonalStringA1toH8(position).includes('p'.repeat(times)) ||
        _convertPositionToDiagonalStringH1toA8(position).includes('p'.repeat(times))
    ) {
        result.push({
            color: 'b',
        })
    }

    return result
}

export function pawnTrapezoid(fen: string): TrophyCheckResult {
    const position = fenToPosition(fen)

    let result: TrophyCheckResult = []
    let match

    match = position.substring(0, 40).match(/PP([A-Za-z\.]{5})P([A-Za-z\.]{2})P([A-Za-z\.]{3})P([A-Za-z\.]{4})P/)
    if (match && match.index! % 8 >= 2 && match.index! % 8 <= 4) {
        result.push({
            color: 'w',
        })
    }

    match = position.substring(24, 64).match(/p([A-Za-z\.]{4})p([A-Za-z\.]{3})p([A-Za-z\.]{2})p([A-Za-z\.]{5})pp/)
    if (match && match.index! % 8 <= 2) {
        result.push({
            color: 'b',
        })
    }

    return result
}
