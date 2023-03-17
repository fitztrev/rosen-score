import { parse, ParseTree } from '@mliebelt/pgn-parser'
import { Game } from 'chess-fetcher'
import { describe, expect, test } from 'vitest'
import { flagOpponentWhoHadMateInOne } from '../js/goals/dirty-wins'

describe('win on time when opponent has mate in 1', () => {
    test.each([
        [
            // https://lichess.org/kiRU1st3#89
            'd4 c5 d5 e5 Nc3 d6 e4 a6 a4 g6 Nf3 h5 Nd2 Bh6 Nc4 Kf8 a5 Kg7 Bd3 Bxc1 Qxc1 Nh6 Na4 Qe7 h4 Nd7 Qg5 f6 Qg3 Rb8 O-O Kh7 Ra3 g5 Be2 Rg8 Bxh5 Nf8 Nab6 Ng6 hxg5 fxg5 Nxc8 Rbxc8 Ne3 Nf4 Bg4 Rcf8 Re1 Rg7 Nf5 Nxf5 Bxf5+ Kg8 Qg4 Rf6 f3 Rh6 Qg3 c4 Rc3 Qc7 Ree3 Qxa5 Qe1 Qc5 g3 Nh5 Kg2 Nf6 Be6+ Kf8 Qf2 Rgh7 Kf1 Rh1+ Ke2 R7h2 b3 Qd4 Qxh2 Rxh2+ Kf1 Qd1+ Re1 Qd2 Re2 Qxe2+ Kg1',
            'white',
            [{ color: 'w' }],
        ],
    ])('test moves: %p', (moves, winner, expected) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree

        expect(flagOpponentWhoHadMateInOne({ result: { winner, via: 'timeout' } } as Game, game.moves)).toStrictEqual(expected)
    })
})

describe('handle draws', () => {
    test.each([
        [
            // this game ended in a draw
            // https://lichess.org/ZhxuJO1Z/black#148
            'g3 d5 Bg2 Nf6 d3 e6 Nc3 Be7 Bd2 b6 e4 Bb7 e5 Nfd7 f4 a6 Nf3 Nc6 h4 h5 Ng5 Bc5 Ne2 b5 c3 Ne7 d4 Bb6 Bf3 g6 g4 hxg4 Bxg4 Nf5 Bxf5 gxf5 Ng3 Qe7 b4 a5 a3 a4 Qe2 O-O-O Qxb5 f6 Nf3 fxe5 fxe5 Rdg8 Bg5 Qf8 Qxa4 f4 Ne2 Qf5 Kd2 Qe4 Raf1 Qe3+ Kd1 Rf8 Qc2 Ba6 Qd2 Qe4 Nc1 Bb5 Qc2 Qe3 Ne1 Bxd4 cxd4 Qxd4+ Qd2 Ba4+ Nc2 Qe4 Re1 Qf3+ Qe2 Bxc2+ Kxc2 Qxa3 Qd3 Nb6 Qxa3 Kd7 Qa4+ Nxa4 Kb3 Nb6 Nd3 Nc4 Nc5+ Kc6 Rd1 Nd2+ Rxd2 Rb8 Rc2 Rxb4+ Kxb4 Rb8+ Kc3 Kb6 Kd3 Ka7 Nd7 Rb6 Nxb6 Kb7 Rc3 c5 Rc2 c4+ Ke2 f3+ Kxf3 d4 Rxc4 d3 Rd4 d2 Rd3 Kxb6 Rxd2 Kc5 Rd6 Kb4 Rxe6 Kc3 Rd6 Kb3 Ke4 Kc3 e6 Kb3 e7 Kc3 e8=Q Kb3 Qd7 Kc3 Qc7+ Kb2 Rb6+ Ka3',
            [],
        ],
    ])('test moves: %p', (moves, expected) => {
        let game = parse(moves, { startRule: 'game' }) as ParseTree

        expect(flagOpponentWhoHadMateInOne({ result: { outcome: 'draw', via: 'timeout' } } as Game, game.moves)).toStrictEqual(expected)
    })
})
