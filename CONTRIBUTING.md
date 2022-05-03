## Want to contribute?

Looking for contributors who can...

1. Add possible trophies for consideration (but it will depend on what the games look like):
    1. "Windmill" trophy
    1. "Double-Check Checkmate" trophy
    1. "Setup for the next game" trophy - 1st rank is restored late in the game?
    1. In the final position, you have N number of mate-in-one's available?
    1. Your opponent had N mate-in-one's throughout the game but you end up winning?
    1. Use a pinned piece to help deliver mate?
    1. Double pawn diamond

1. Improve development process
    - I keep a local copy of all of Eric's games as well as other notable players (Chess-Network, etc)
    - When a new trophy is added, I test it by running the app against this local copy instead of fetching from Lichess API
    - How can I make this easier instead of changing the `url` of where it fetches from?

1. Incorrect Trophies
    1. "Stalemate Tricks"
        - https://lichess.org/ifDX76Su#128 - awarded, but should not be
    1. "Lefong Trap"
        - https://lichess.org/juNVZaHK awarded, but should not be
            - white bishop was protected
    1. "Oh no my queen"
        - Some are blunders where the person just gets lucky afterwards

1. Add an "update results" button after the report has been run
    - If someone is speedrunning, let them download only the new games and add to existing report instead of re-running the entire report

1. Option to only download games from last N days (to easily check for newly received trophies)

1. Make it quicker and easier to run on popular players (Magnus, Naroditsky, Agadmator, etc). Cache the results.

1. Find YouTube examples for trophies that are missing a YouTube link
    - "Headache" opening, and others

1. Shareable links
    - Generate a shareable link so others can see results and games

1. Upgrade to latest chess.js (0.13)
    - Tests fail after https://github.com/jhlywa/chess.js/pull/318

1. Setup Github workflows
    - Run tests
    - Run prettier

1. Improve test coverage
    - Add tests for `moveChecks` or anything else missing tests

1. Some way to sort trophies by (1) date, (2) opponent rating?

Send me a message if you're interested in working on any of these. I can answer any questions about the code, if needed, to help get you started.
