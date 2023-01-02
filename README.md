## Rosen Score

https://rosen-score.vercel.app/

This is entirely a frontend application (HTML/JS/CSS), so you can run it pretty easily on your own computer.

Your browser makes the request directly to the Lichess API to get the games. Then the games are analyzed with javascript (again, in your own browser). Each move from every game is played through and analyzed for specific positions or other criteria.

### Setup

```bash
git clone https://github.com/fitztrev/rosen-score.git
cd rosen-score
npm install
npm run dev
```

```bash
## Run the test suite
npm run test
## or
npm run watch

## Check code coverage
npm run coverage
open coverage/index.html
```

### Frameworks/Libraries Used

-   [chess.js](https://github.com/jhlywa/chess.js) - JS chess library to handle chess logic
-   Vue.js - Framework for building the app
-   Tailwind - CSS framework for the UI

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
