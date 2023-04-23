import { describe, expect, test } from 'vitest'
import { avoidTheFlagCheckmate, checkmateWithTenthSecondLeft } from '../js/goals/avoid-the-flag-checkmate'
import { Game } from 'chess-fetcher'

describe('avoid the flag', () => {
    test.each([
        [
            // https://lichess.org/Wi5bzNTB#0
            {
                site: 'lichess',
                type: 'game',
                id: 'Wi5bzNTB',
                links: { white: 'https://lichess.org/Wi5bzNTB', black: 'https://lichess.org/Wi5bzNTB/black' },
                timestamp: 1618054198820,
                isStandard: true,
                players: {
                    white: { username: 'EricRosen', title: 'IM', rating: 2459 },
                    black: { username: 'TimoScKreuzberg', title: null, rating: 2376 },
                },
                timeControl: { initial: 300, increment: 0 },
                result: { winner: 'white', via: 'checkmate', label: '1-0' },
                opening: { name: 'Indian Defense', eco: 'A45' },
                moves: [],
                clocks: [
                    15003, 30003, 14587, 29691, 14427, 29243, 14307, 29139, 14187, 29099, 14059, 27347, 13939, 26475, 12715, 23331, 10859, 22963,
                    10643, 19571, 10203, 17027, 9699, 16507, 9051, 15787, 7499, 15331, 6547, 12107, 5707, 11635, 5635, 11451, 5587, 10643, 4939, 8739,
                    4571, 8267, 3283, 7507, 3083, 7115, 2179, 6875, 1995, 6467, 1891, 6371, 1707, 5859, 1555, 5515, 1435, 5307, 1323, 5259, 1291,
                    4739, 1155, 4691, 1115, 4571, 1019, 4411, 957, 4171, 913, 3883, 822, 3835, 755, 3707, 704, 3467, 666, 3315, 601, 3267, 536, 3243,
                    497, 3163, 444, 3147, 413, 3107, 337, 3107, 313, 3107, 308, 3075, 296, 3075, 214, 3075, 165, 3027, 165, 3019, 138, 3019, 138,
                    3011, 123, 3003, 108, 2995, 98, 2891, 86, 2891, 63, 2875, 63, 2867, 54, 2859, 26, 2803, 26, 2635, 26, 2635, 21, 2635, 21, 2619,
                    17, 2579, 17, 2571, 17, 2571, 17, 2571, 17, 2523, 17, 2467, 17, 2419, 17, 2419, 17, 2331, 17, 2267, 17, 2251, 17, 2227, 17, 2207,
                    17,
                ],
            },
            [
                {
                    color: 'w',
                    onMoveNumber: 116,
                },
            ],
        ],
        [
            // https://lichess.org/3jzOW4US/black#216
            {
                site: 'lichess',
                type: 'game',
                id: '3jzOW4US',
                links: { white: 'https://lichess.org/3jzOW4US', black: 'https://lichess.org/3jzOW4US/black' },
                timestamp: 1603578524453,
                isStandard: true,
                players: { white: { username: 'mkoganov', title: 'NM', rating: 2327 }, black: { username: 'EricRosen', title: 'IM', rating: 2501 } },
                timeControl: { initial: 180, increment: 0 },
                result: { winner: 'black', via: 'checkmate', label: '0-1' },
                opening: { name: 'Zukertort Opening: Ross Gambit', eco: 'A04' },
                moves: [],
                clocks: [
                    18003, 9003, 17859, 9003, 17739, 8915, 17339, 8867, 17283, 8763, 17219, 8339, 17091, 8139, 16939, 8139, 16859, 8091, 16723, 7883,
                    16619, 7699, 16395, 7435, 16235, 7147, 15875, 7059, 15683, 6923, 15267, 6819, 14675, 6491, 14507, 6363, 14235, 5955, 13787, 5859,
                    12995, 5787, 12499, 5595, 12123, 5203, 11803, 5107, 11483, 4923, 11283, 4819, 11187, 4699, 10883, 4619, 10803, 4483, 10507, 3331,
                    10371, 3227, 10283, 3187, 10067, 2843, 9915, 2763, 9739, 2531, 9499, 2395, 9355, 2395, 9163, 2331, 8907, 2275, 8691, 2195, 8515,
                    2091, 8403, 1851, 8115, 1611, 7771, 1523, 7603, 1379, 7531, 1379, 7395, 1379, 7307, 1379, 7099, 1315, 6595, 1211, 6531, 1131,
                    6443, 1043, 6179, 961, 6075, 924, 5923, 924, 5611, 924, 5515, 924, 5355, 924, 5227, 886, 5139, 881, 5019, 881, 4955, 881, 4907,
                    841, 4787, 811, 4635, 811, 4547, 756, 4499, 700, 4195, 700, 4115, 649, 3963, 538, 3595, 391, 3523, 283, 3443, 283, 3387, 283,
                    3187, 283, 3091, 211, 2979, 171, 2907, 140, 2859, 140, 2619, 102, 2451, 102, 2339, 102, 2235, 102, 2043, 102, 2019, 102, 1835,
                    102, 1763, 102, 1667, 102, 1603, 102, 1515, 102, 1435, 102, 1379, 102, 1307, 102, 1195, 102, 1131, 102, 1067, 102, 1003, 102, 958,
                    102, 930, 102, 862, 102, 836, 102, 773, 102, 729, 102, 663, 102, 639, 102, 602, 102, 581, 102, 475, 102,
                ],
            },
            [
                {
                    color: 'b',
                    onMoveNumber: 175,
                },
            ],
        ],
        [
            // https://lichess.org/RqthWYYq/black#156
            {
                site: 'lichess',
                type: 'game',
                id: 'RqthWYYq',
                links: { white: 'https://lichess.org/RqthWYYq', black: 'https://lichess.org/RqthWYYq/black' },
                timestamp: 1666480208854,
                isStandard: true,
                players: { white: { username: 'kekic76', title: 'CM', rating: 2400 }, black: { username: 'EricRosen', title: 'IM', rating: 2554 } },
                timeControl: { initial: 300, increment: 0 },
                result: { winner: 'black', via: 'checkmate', label: '0-1' },
                opening: { name: "Queen's Pawn Game: London System", eco: 'D02' },
                moves: [],
                clocks: [
                    30003, 15003, 29915, 14907, 29723, 14819, 29659, 14651, 29475, 14563, 29067, 14003, 28867, 13875, 28675, 13827, 27931, 11883,
                    27795, 11571, 27795, 10715, 27611, 10515, 27435, 10435, 27211, 10299, 27123, 10139, 27043, 10051, 26971, 9907, 26163, 9651, 25987,
                    9579, 23883, 9435, 22795, 9371, 22715, 9371, 22627, 9179, 22003, 8075, 20915, 7875, 20675, 7699, 20267, 7603, 20075, 7515, 20003,
                    6323, 19523, 5603, 17667, 5251, 17347, 4715, 17347, 4443, 14171, 4331, 13387, 3875, 13259, 3827, 11515, 3099, 10659, 3011, 9699,
                    2579, 8699, 2443, 8611, 972, 8467, 972, 7635, 893, 7619, 807, 7435, 751, 7067, 651, 4499, 651, 4339, 651, 3923, 651, 3803, 651,
                    3659, 530, 3011, 427, 2955, 355, 2683, 212, 2427, 212, 2387, 108, 1779, 108, 1675, 108, 1523, 108, 1419, 108, 1323, 108, 1267,
                    108, 1155, 108, 1075, 108, 1067, 108, 1043, 108, 948, 108, 879, 108, 802, 108, 783, 108, 677, 108, 672, 99, 668, 92, 556, 92, 540,
                    85, 516, 85, 406, 85, 370, 85,
                ],
            },
            [
                {
                    color: 'b',
                    onMoveNumber: 115,
                },
            ],
        ],
    ])('test game', (game, expected) => {
        expect(avoidTheFlagCheckmate(game as Game)).toStrictEqual(expected)

        game.timeControl.increment = 2
        expect(avoidTheFlagCheckmate(game as Game)).toStrictEqual([])
    })
})

describe('not avoid the flag', () => {
    test.each([
        // https://lichess.org/gm2mYaWJ
        // 20 moves in 1.44 seconds
        {
            site: 'lichess',
            type: 'game',
            id: 'gm2mYaWJ',
            links: { white: 'https://lichess.org/gm2mYaWJ', black: 'https://lichess.org/gm2mYaWJ/black' },
            timestamp: 1671766907426,
            isStandard: true,
            players: { white: { username: 'EricRosen', title: 'IM', rating: 2245 }, black: { username: 'GRXbullet', title: null, rating: 2335 } },
            timeControl: { initial: 15, increment: 0 },
            result: { winner: 'white', via: 'checkmate', label: '1-0' },
            opening: { name: "Queen's Pawn Game", eco: 'D00' },
            moves: [],
            clocks: [
                1499, 1499, 1499, 1499, 1475, 1499, 1411, 1491, 1387, 1491, 1379, 1491, 1307, 1475, 1299, 1451, 1299, 1443, 1259, 1443, 1235, 1427,
                1203, 1371, 1203, 1371, 1179, 1371, 1131, 1291, 1107, 1259, 1075, 1259, 1035, 1091, 1035, 1091, 1011, 935, 1011, 935, 892, 935, 828,
                871, 828, 871, 769, 851, 730, 848, 696, 848, 664, 848, 537, 848, 497, 775, 465, 775, 438, 610, 438, 610, 341, 536, 341, 510, 304, 510,
                215, 510, 188, 392, 188, 354, 152, 354, 152, 347, 144, 341, 144, 332, 141, 328, 132, 328, 120, 328, 115, 197, 115, 197, 100, 197, 93,
                197, 83, 197, 77, 190, 75, 183, 70, 181, 66, 181, 53, 181, 36, 181, 25, 174, 25, 120, 25, 117, 7, 60, 7,
            ],
        },
    ])('test game', (game) => {
        expect(avoidTheFlagCheckmate(game as Game)).toStrictEqual([])

        game.timeControl.increment = 2
        expect(avoidTheFlagCheckmate(game as Game)).toStrictEqual([])
    })
})

describe('checkmate with tenth of a second remaining', () => {
    test.each([
        [
            // https://lichess.org/FzHWLzIf/black#86
            {
                site: 'lichess',
                type: 'game',
                id: 'FzHWLzIf',
                links: { white: 'https://lichess.org/FzHWLzIf', black: 'https://lichess.org/FzHWLzIf/black' },
                timestamp: 1674192442219,
                isStandard: true,
                players: { white: { username: 'Makima45', title: null, rating: 2100 }, black: { username: 'EricRosen', title: 'IM', rating: 2715 } },
                timeControl: { initial: 60, increment: 0 },
                result: { winner: 'black', via: 'checkmate', label: '0-1' },
                opening: { name: 'Latvian Gambit: Clam Gambit', eco: 'C44' },
                moves: [],
                clocks: [
                    6003, 3003, 6003, 2939, 5947, 2883, 5779, 2827, 5747, 2787, 5691, 2747, 5643, 2747, 5579, 2611, 5507, 2523, 5387, 2483, 5283,
                    2443, 5187, 1779, 5059, 1595, 4515, 1491, 4483, 1371, 4379, 1283, 4267, 1243, 4083, 1027, 3971, 993, 3915, 955, 3723, 853, 3387,
                    679, 3347, 498, 3123, 471, 2987, 419, 2915, 419, 2771, 312, 2603, 229, 2555, 145, 2427, 87, 2347, 87, 2267, 87, 2203, 87, 2139,
                    24, 2051, 24, 1875, 24, 1835, 24, 1811, 24, 1739, 24, 1659, 24, 1531, 24, 1459, 24, 1266, 3,
                ],
            },
            [
                {
                    color: 'b',
                    onMoveNumber: 86,
                },
            ],
        ],
        [
            // https://lichess.org/g9MdhRYy/black#126
            {
                site: 'lichess',
                type: 'game',
                id: 'g9MdhRYy',
                links: { white: 'https://lichess.org/g9MdhRYy', black: 'https://lichess.org/g9MdhRYy/black' },
                timestamp: 1653008084704,
                isStandard: true,
                players: { white: { username: 'MrQuick', title: null, rating: 1908 }, black: { username: 'EricRosen', title: 'IM', rating: 2663 } },
                timeControl: { initial: 60, increment: 0 },
                result: { winner: 'black', via: 'checkmate', label: '0-1' },
                opening: { name: "Queen's Gambit Declined: Modern Variation, Normal Line", eco: 'D55' },
                moves: [],
                clocks: [
                    6003, 3003, 5907, 2923, 5811, 2891, 5675, 2827, 5595, 2675, 5515, 2643, 5363, 2587, 5179, 2563, 5107, 2467, 5003, 2339, 4859,
                    2275, 4691, 2187, 4691, 2043, 4539, 1963, 4363, 1899, 4179, 1747, 4011, 1523, 3835, 1475, 3707, 1435, 3539, 1347, 3539, 1307,
                    3395, 1259, 3219, 1115, 2979, 1011, 2819, 926, 2603, 855, 2427, 855, 2315, 855, 2195, 839, 2051, 799, 1851, 722, 1819, 722, 1739,
                    648, 1739, 612, 1651, 581, 1579, 532, 1579, 494, 1547, 441, 1523, 441, 1395, 441, 1355, 441, 1323, 379, 1283, 361, 1235, 340,
                    1171, 282, 1155, 270, 1115, 232, 1099, 179, 1091, 178, 1035, 178, 951, 164, 936, 164, 898, 157, 850, 157, 825, 134, 748, 78, 748,
                    77, 673, 77, 626, 54, 585, 54, 449, 54, 300, 54, 265, 10,
                ],
            },
            [
                {
                    color: 'b',
                    onMoveNumber: 126,
                },
            ],
        ],
        [
            // https://lichess.org/KlsfvpGX/black#138
            {
                site: 'lichess',
                type: 'game',
                id: 'KlsfvpGX',
                links: { white: 'https://lichess.org/KlsfvpGX', black: 'https://lichess.org/KlsfvpGX/black' },
                timestamp: 1671766621476,
                isStandard: true,
                players: {
                    white: { username: 'GRXbullet', title: null, rating: 2338 },
                    black: { username: 'EricRosen', title: 'IM', rating: 2241 },
                },
                timeControl: { initial: 15, increment: 0 },
                result: { winner: 'black', via: 'checkmate', label: '0-1' },
                opening: { name: "King's Indian Attack: Symmetrical Defense", eco: 'A05' },
                moves: [],
                clocks: [
                    1499, 1499, 1499, 1499, 1499, 1491, 1467, 1491, 1467, 1483, 1459, 1483, 1451, 1467, 1435, 1467, 1427, 1459, 1331, 1459, 1291,
                    1419, 1259, 1403, 1211, 1331, 1211, 1307, 1211, 1283, 1211, 1251, 1163, 1251, 1163, 1203, 1163, 1131, 1163, 1075, 1163, 1067,
                    1107, 971, 1107, 951, 1107, 933, 1027, 920, 1027, 863, 980, 863, 954, 854, 941, 824, 915, 778, 879, 778, 863, 770, 823, 770, 821,
                    681, 758, 642, 677, 642, 647, 548, 604, 497, 508, 497, 504, 475, 504, 449, 504, 412, 495, 365, 495, 351, 495, 316, 451, 316, 378,
                    316, 378, 260, 378, 222, 378, 202, 340, 202, 340, 190, 335, 185, 322, 185, 270, 185, 270, 175, 270, 163, 270, 154, 270, 103, 224,
                    103, 203, 75, 203, 44, 203, 41, 198, 32, 198, 26, 153, 26, 153, 14, 141, 5, 138, 3,
                ],
            },
            [
                {
                    color: 'b',
                    onMoveNumber: 138,
                },
            ],
        ],
        [
            // https://lichess.org/gm2mYaWJ#123
            {
                site: 'lichess',
                type: 'game',
                id: 'gm2mYaWJ',
                links: { white: 'https://lichess.org/gm2mYaWJ', black: 'https://lichess.org/gm2mYaWJ/black' },
                timestamp: 1671766907426,
                isStandard: true,
                players: { white: { username: 'EricRosen', title: 'IM', rating: 2245 }, black: { username: 'GRXbullet', title: null, rating: 2335 } },
                timeControl: { initial: 15, increment: 0 },
                result: { winner: 'white', via: 'checkmate', label: '1-0' },
                opening: { name: "Queen's Pawn Game", eco: 'D00' },
                moves: [],
                clocks: [
                    1499, 1499, 1499, 1499, 1475, 1499, 1411, 1491, 1387, 1491, 1379, 1491, 1307, 1475, 1299, 1451, 1299, 1443, 1259, 1443, 1235,
                    1427, 1203, 1371, 1203, 1371, 1179, 1371, 1131, 1291, 1107, 1259, 1075, 1259, 1035, 1091, 1035, 1091, 1011, 935, 1011, 935, 892,
                    935, 828, 871, 828, 871, 769, 851, 730, 848, 696, 848, 664, 848, 537, 848, 497, 775, 465, 775, 438, 610, 438, 610, 341, 536, 341,
                    510, 304, 510, 215, 510, 188, 392, 188, 354, 152, 354, 152, 347, 144, 341, 144, 332, 141, 328, 132, 328, 120, 328, 115, 197, 115,
                    197, 100, 197, 93, 197, 83, 197, 77, 190, 75, 183, 70, 181, 66, 181, 53, 181, 36, 181, 25, 174, 25, 120, 25, 117, 7, 60, 7,
                ],
            },
            [{ color: 'w', onMoveNumber: 123 }],
        ],
        [
            // https://www.chess.com/analysis/game/live/3426900930?tab=analysis&flip=false&move=0161
            {
                site: 'chess.com',
                type: 'game',
                id: '3426900930',
                links: {
                    white: 'https://www.chess.com/analysis/game/live/3426900930?tab=analysis&flip=false&move=0',
                    black: 'https://www.chess.com/analysis/game/live/3426900930?tab=analysis&flip=true&move=0',
                },
                timestamp: 1549128609000,
                isStandard: true,
                players: { white: { username: 'Hikaru', title: null }, black: { username: 'Firouzja2003', title: null } },
                timeControl: { initial: 180, increment: 0 },
                result: { winner: 'white', via: 'checkmate', label: '1-0' },
                moves: [],
                clocks: [
                    17990, 17990, 17360, 17920, 17250, 17910, 17140, 17820, 17030, 17760, 16920, 17660, 16740, 17520, 16580, 17400, 16470, 17330,
                    16320, 17240, 16150, 16870, 15800, 16680, 15170, 16520, 14880, 15950, 14470, 15680, 12930, 14650, 11760, 14450, 11220, 14260,
                    11200, 14080, 10300, 13530, 8600, 13120, 6320, 10740, 6220, 10140, 6210, 10040, 6140, 7800, 6010, 7720, 5490, 7620, 4940, 7440,
                    4560, 7180, 4290, 6920, 4160, 6750, 3800, 6430, 3750, 6340, 3430, 5650, 3350, 5540, 2990, 3330, 2890, 3320, 2880, 3310, 2740,
                    3300, 2650, 3290, 2500, 3120, 2330, 3030, 2290, 2990, 2070, 2900, 1900, 2680, 1860, 2590, 1640, 2280, 1580, 2230, 1460, 2040,
                    1390, 1810, 1000, 1800, 940, 1620, 870, 1520, 860, 1510, 840, 1430, 830, 1370, 820, 1360, 790, 1230, 780, 1220, 770, 1210, 760,
                    1170, 720, 1160, 710, 1080, 700, 1070, 650, 1060, 640, 1020, 630, 1010, 520, 890, 490, 790, 450, 750, 410, 740, 330, 680, 260,
                    670, 250, 660, 230, 650, 180, 570, 100, 490, 90, 420, 80, 370, 70, 360, 20, 300, 10,
                ],
                opening: { name: '', eco: '' },
            },
            [{ color: 'w', onMoveNumber: 163 }],
        ],
    ])('test game', (game, expected) => {
        expect(checkmateWithTenthSecondLeft(game as Game)).toStrictEqual(expected)

        game.timeControl.increment = 2
        expect(avoidTheFlagCheckmate(game as Game)).toStrictEqual([])
    })
})
