## Want to contribute?

Looking for contributors who can...

1. Add possible trophies for consideration (but it will depend on what the games look like):

    1. Crazy Rook
    1. "Windmill" trophy
    1. Knight promotion fork
        - Promote to knight, fork K+Q
    1. https://www.youtube.com/watch?v=8zzbuQQD0jM
    1. pawn rectangle https://lichess.org/editor/8/8/8/8/2PPP3/2PPP3/8/8_w_-_-_0_1
    1. dah alphabet opening
    1. 2 knight vs pawn mate
    1. Tactics trophies
        1. double rook sacrifice - Rh8+ Kxh8 Rh1+ Kg8 Rh8+ Kxh8 Qh1+ Kg8 Qh7+ Kf8 Qh8#
        1. Queen takes a piece, queen takes queen, knight fork wins back queen?
    1. Pork / Pork Dork (https://www.youtube.com/watch?v=H1_GSx8jPG8)
    1. En passant is the only legal move? https://chess.stackexchange.com/questions/13239/when-en-passant-is-the-only-legal-move
    1. 8+ pawn moves on the same file?
        - https://chess.stackexchange.com/questions/35460/how-many-times-can-the-same-pawn-move-be-made-in-a-game/35469#35469
    1. 3+ pins?
        - https://chess.stackexchange.com/questions/31871/most-pins-in-a-chess-game/31874#31874
    1. Quick pawn endgame?
        - All pieces captured before move N?
    1. Your opponent had N mate-in-one's throughout the game but you end up winning?
    1. In the final position, you have N number of mate-in-one's available?
    1. Double pawn diamond
    1. Ideas from Chess Compositions:
        1. Pachman mate? https://chess.stackexchange.com/questions/39656/shortest-game-to-elegant-mate
        1. Pure mate? https://chess.stackexchange.com/questions/24485/what-is-a-pure-checkmate/24491#24491
        1. https://chess.stackexchange.com/questions/19207/what-is-the-highest-number-of-pieces-from-one-side-that-can-be-involved-in-a-che?rq=1
    1. Only legal move is checkmate? https://chess.stackexchange.com/a/32287
    1. Avoid adoption - Lost 9 in a row but won/drew the 10th
    1. 2 en-passant captures in a row?
        - https://chess.stackexchange.com/questions/30431/games-with-consecutive-en-passants
    1. https://twitter.com/agadmator/status/1523276457543446528?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Etweet
    1. Win 1+0 with no premoves (your clock goes down by at least 0.1 each turn)?
    1. Win a game in each variant consecutively?
    1. position from Searching for Bobby Fischer https://www.youtube.com/watch?v=W6poPAiBsLc
    1. something to do with both players having less than 1 second and playing N moves? https://www.youtube.com/watch?v=kMj0tBELSd8
    1. Opponent fails to checkmate with Bishop+Knight. Game ends in 50 move rule draw
    1. Traps like the Englund Gambit trap or Tennison Gambit trap where you win the queen
    1. From feedback form:
        1. suggestion: crazy time scramble: both players have less than 1 second and after 30 moves I win by time
        1. "Setup for the next game" trophy - 1st rank is restored late in the game?

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

1. Make it quicker and easier to run on popular players (Magnus, Naroditsky, Agadmator, etc). Cache the results.

1. Find YouTube examples for trophies that are missing a YouTube link
    - "Headache" opening, and others

1. Shareable links
    - Generate a shareable link so others can see results and games

1. Setup Github workflows
    - Run tests
    - Run prettier

1. Improve test coverage
    - Add tests for `moveChecks` or anything else missing tests

1. Some way to sort trophies by (1) date, (2) opponent rating?

Send me a message if you're interested in working on any of these. I can answer any questions about the code, if needed, to help get you started.
