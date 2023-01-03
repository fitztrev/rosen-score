import { expect, test } from 'vitest'
import { connectEightOnRank } from '../js/goals/piece-structures'

test('test no connect 8', () => {
    let fen = '1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1'
    expect(connectEightOnRank(fen, 4)).toStrictEqual([])
    expect(connectEightOnRank(fen, 5)).toStrictEqual([])
    expect(connectEightOnRank(fen, 6)).toStrictEqual([])
    expect(connectEightOnRank(fen, 7)).toStrictEqual([])
})

test('test connect 8 on 4th for white', () => {
    let fen = 'rnbqkbnr/pppppppp/8/8/PPPPPPPP/8/8/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank(fen, 4)).toStrictEqual([{ color: 'w' }])
})

test('test connect 8 on 5th for white', () => {
    let fen = 'rnbqkbnr/pppppppp/8/PPPPPPPP/8/8/8/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank(fen, 5)).toStrictEqual([{ color: 'w' }])
})

test('test connect 8 on 6th for white', () => {
    let fen = 'rnbqkbnr/pppppppp/PPPPPPPP/8/8/8/8/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank(fen, 6)).toStrictEqual([{ color: 'w' }])
})

test('test connect 8 on 7th for white', () => {
    let fen = 'rnbqkbnr/PPPPPPPP/8/8/8/8/8/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank(fen, 7)).toStrictEqual([{ color: 'w' }])
})

test('test connect 8 on 4th for black', () => {
    let fen = 'rnbqkbnr/8/8/pppppppp/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank(fen, 4)).toStrictEqual([{ color: 'b' }])
})

test('test connect 8 on 5th for black', () => {
    let fen = 'rnbqkbnr/8/8/8/pppppppp/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank(fen, 5)).toStrictEqual([{ color: 'b' }])
})

test('test connect 8 on 6th for black', () => {
    let fen = 'rnbqkbnr/8/8/8/8/pppppppp/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank(fen, 6)).toStrictEqual([{ color: 'b' }])
})

test('test connect 8 on 7th for black', () => {
    let fen = 'rnbqkbnr/8/8/8/8/8/pppppppp/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank(fen, 7)).toStrictEqual([{ color: 'b' }])
})
