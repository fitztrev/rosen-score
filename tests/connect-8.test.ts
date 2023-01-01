import { expect, test } from 'vitest'
import { connectEightOnRank4, connectEightOnRank5, connectEightOnRank6, connectEightOnRank7 } from '../js/goals/piece-structures'

test('test no connect 8', () => {
    let fen = '1r3rk1/1b2q1bp/1pnppnp1/p1p2p2/P1P4P/1PNP1PPN/1B1QP1B1/2R2RK1 w - - 0 1'
    expect(connectEightOnRank4(fen)).toStrictEqual([])
    expect(connectEightOnRank5(fen)).toStrictEqual([])
    expect(connectEightOnRank6(fen)).toStrictEqual([])
    expect(connectEightOnRank7(fen)).toStrictEqual([])
})

test('test connect 8 on 4th for white', () => {
    let fen = 'rnbqkbnr/pppppppp/8/8/PPPPPPPP/8/8/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank4(fen)).toStrictEqual(['white'])
})

test('test connect 8 on 5th for white', () => {
    let fen = 'rnbqkbnr/pppppppp/8/PPPPPPPP/8/8/8/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank5(fen)).toStrictEqual(['white'])
})

test('test connect 8 on 6th for white', () => {
    let fen = 'rnbqkbnr/pppppppp/PPPPPPPP/8/8/8/8/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank6(fen)).toStrictEqual(['white'])
})

test('test connect 8 on 7th for white', () => {
    let fen = 'rnbqkbnr/PPPPPPPP/8/8/8/8/8/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank7(fen)).toStrictEqual(['white'])
})

test('test connect 8 on 4th for black', () => {
    let fen = 'rnbqkbnr/8/8/pppppppp/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank4(fen)).toStrictEqual(['black'])
})

test('test connect 8 on 5th for black', () => {
    let fen = 'rnbqkbnr/8/8/8/pppppppp/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank5(fen)).toStrictEqual(['black'])
})

test('test connect 8 on 6th for black', () => {
    let fen = 'rnbqkbnr/8/8/8/8/pppppppp/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank6(fen)).toStrictEqual(['black'])
})

test('test connect 8 on 7th for black', () => {
    let fen = 'rnbqkbnr/8/8/8/8/8/pppppppp/RNBQKBNR w KQkq - 0 1'
    expect(connectEightOnRank7(fen)).toStrictEqual(['black'])
})
