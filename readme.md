## Rosen Score

https://rosen-score.vercel.app/

This is entirely a frontend application (HTML/JS/CSS), so you can run it pretty easily on your own computer.

Your browser makes the request directly to the Lichess API to get the games. Then the games are analyzed with javascript (again, in your own browser). Each move from every game is played through and analyzed for specific positions or other criteria.

### Setup

```bash
git clone https://github.com/fitztrev/rosen-score.git
cd rosen-score
npm install
npm run start
```

```bash
## Run the test suite
npm run test

## Check code coverage
npm run coverage
open coverage/index.html
```

### Frameworks/Libraries Used

-   [chess.js](https://github.com/jhlywa/chess.js) - JS chess library to handle chess logic
-   Vue.js - Framework for building the app
-   Tailwind - CSS framework for the UI
-   Parcel.js - Build tool and local dev server

## Want to contribute?

I put some ideas of things that could be done in [CONTRIBUTING.md](CONTRIBUTING.md).

## Understanding How It Works

### Piece Structures

FENs are converted to a 64-character string representing the position:

```js
// Starting position FEN
let fen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR'

// Convert the FEN to a 64-character string that starts at a8 and ends at h1
let position = fenToPosition(fen)
// rnbqkbnrpppppppp................................PPPPPPPPRNBQKBNR
```

And now you can do regex to look for pawn/piece structures:

```js
// To look for a white pawn cube, it is essentially:
position.match(/PP([A-Za-z\.]{6})PP/) // 2 white pawns, 6 squares, then 2 white pawns
```

## Known Issues

1. Avoid-the-Flag trophy:

    Lichess does not include tenths of seconds. So if a PGN shows 1 second remaining, it might actually be 1.4.

    ```diff
    - 20. Rxd8+ { [%clk 0:00:01] }
    + 20. Rxd8+ { [%clk 0:00:01.4] }
    ```

    [Lichess source that rounds the values](https://github.com/lichess-org/lila/blob/b71a1eccea476562db283df97d6586fe6ca640da/modules/game/src/main/PgnDump.scala#L166-L177)

    One idea that I'd like to possibly PR to Lichess:

    ```
    - /export/{gameId}?clocks=true
    -     => [%clk 0:00:06]
    + /export/{gameId}?clocks=true&withCentiseconds=true
    +     => [%clk 0:00:06.43]
    ```

    Would allow for more premove-type trophies.

1. "Oh No My Queen"

    1. False positives
        - It doesn't use engine evaluation, so if you drop your queen but then 2 moves later luck into a mate, it will award the trophy
    1. It includes forced "oh no my queens" (like back rank or smothers) as well as the nicer "oh no my queens" where the opponent doesn't need to capture -- but if they do, then it leads to mate.

1. Castle Forks
    - These games are technically Castle Forks but the game ended before the king captured the piece.
        - https://lichess.org/CGDXG6IT/black#44
        - https://lichess.org/YBINNkURODmT
