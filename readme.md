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

Run the test suite:

```bash
npm run test
```

### Frameworks/Libraries Used

- [chess.js](https://github.com/jhlywa/chess.js) - JS chess library to handle chess logic
- Vue.js - Framework for building the app
- Tailwind - CSS framework for the UI

## Want to contribute?

Looking for contributors who can...

1. Add possible trophies for consideration (but it will depend on what the games look like):
    1. "Windmill" trophy
    1. "Double-Check Checkmate" trophy
    1. "Setup for the next game" trophy - 1st rank is restored late in the game?
    1. In the final position, you have N number of mate-in-one's available?
    1. Your opponent had N mate-in-one's throughout the game but you end up winning?
    1. Use a pinned piece to help deliver mate?

1. Improve development process
    - I keep a local copy of all of Eric's games as well as other notable players (Chess-Network, etc)
    - When a new trophy is added, I test it by running the app against this local copy instead of fetching from Lichess API
    - How can I make this easier instead of changing the `url` of where it fetches from?

1. Fix false positives
    1. "Stalemate Tricks"
        - https://lichess.org/ifDX76Su#128
    1. "Lefong Trap"
        - https://lichess.org/juNVZaHK (white bishop was protected)
    1. "Oh no my queen"
        - Some are blunders where the person just gets lucky afterwards

1. Add an "update results" button after the report has been run
    - if someone is speedrunning, let them download only the new games and add to existing report instead of re-running the entire report

1. Option to only download games from last N days (to easily check for newly received trophies)

1. Make it quicker and easier to run on popular players (Magnus, Naroditsky, Agadmator, etc). Cache the results.

1. Find YouTube examples for trophies that are missing a YouTube link
    - "Headache" opening, and others

1. Shareable links
    - Generate a shareable link so others can see results and games

1. Upgrade to latest chess.js (0.13)
    - Tests fail after https://github.com/jhlywa/chess.js/pull/318

1. Setup Github workflows
    - run tests
    - run prettier

1. Improve test coverage
    - Add tests for `moveChecks` or anything else missing tests

1. Some way to sort trophies by (1) date, (2) opponent rating?

Send me a message if you're interested in working on any of these. I can answer any questions about the code, if needed, to help get you started.

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
        * It doesn't use engine evaluation, so if you drop your queen but then 2 moves later luck into a mate, it will award the trophy
    1. It includes forced "oh no my queens" (like back rank or smothers) as well as the nicer "oh no my queens" where the opponent doesn't need to capture -- but if they do, then it leads to mate.

1. Castle Forks
	* These games are technically Castle Forks but the game ended before the king captured the piece.
		* https://lichess.org/CGDXG6IT/black#44
		* https://lichess.org/YBINNkURODmT
