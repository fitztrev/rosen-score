<template>
    <div
        v-cloak
        class="container mx-auto my-8 w-11/12"
        :class="{
            'is-download-complete': isDownloadComplete,
        }"
    >
        <div class="text-center">
            <h1 class="text-6xl md:text-8xl mb-4">
                <a href="/">Rosen Score</a>
            </h1>
            <p class="md:text-2xl">How many of these chess accomplishments have you completed?</p>
        </div>

        <div
            class="my-8 bg-indigo-100 border border-indigo-200 drop-shadow-2xl mx-auto p-4 rounded-lg shadow-indigo-500/50 shadow-lg text-sky-600 md:w-1/2"
            v-if="!isDownloading && !isDownloadComplete"
        >
            <form @submit.prevent="startDownload">
                <div class="flex flex-row mb-4">
                    <div class="basis-1/4 text-2xl md:text-5xl text-center font-bold italic">
                        1
                        <ArrowIcon />
                    </div>
                    <div class="basis-3/4">
                        <div>
                            Select which site:

                            <div class="text-sky-900">
                                <label class="cursor-pointer">
                                    <input type="radio" name="site" value="lichess" v-model="inputs.type" />
                                    Lichess
                                </label>
                                <label class="cursor-pointer ml-4">
                                    <input type="radio" name="site" value="chesscom" v-model="inputs.type" />
                                    Chess.com
                                </label>
                            </div>
                        </div>
                        <div class="mt-2">
                            Enter username:

                            <input
                                type="text"
                                class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="Username here"
                                spellcheck="false"
                                data-lpignore="true"
                                v-model="inputs.value"
                            />

                            <div class="text-sm">
                                Or
                                <span class="dotted-underline text-sky-900 cursor-pointer" @click.prevent="formFill('lichess', 'EricRosen')">
                                    click here to see EricRosen's on Lichess
                                </span>
                                or
                                <span class="dotted-underline text-sky-900 cursor-pointer" @click.prevent="formFill('chesscom', 'IMRosen')">
                                    his Chess.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-row mb-4">
                    <div class="basis-1/4 text-2xl md:text-5xl text-center font-bold italic">
                        2
                        <ArrowIcon />
                    </div>
                    <div class="basis-3/4">
                        <lichess-login v-on:set-lichess-oauth-token="setLichessOauthToken"></lichess-login>
                    </div>
                </div>

                <div class="flex flex-row">
                    <div class="basis-1/4 text-2xl md:text-5xl text-center font-bold italic">
                        3
                        <ArrowIcon />
                    </div>
                    <div class="basis-3/4">
                        <div class="text-sm mt-1 mb-2">
                            Check games since
                            <select
                                v-model.number="inputs.filters.sinceHoursAgo"
                                class="bg-transparent border-b border-dotted border-sky-900 focus:outline-0 hover:border-dashed text-sky-900 md:w-28"
                            >
                                <option :value="6">6 hours ago</option>
                                <option :value="24">24 hours ago</option>
                                <option :value="24 * 7">last week</option>
                                <option :value="24 * 31">last month</option>
                                <option :value="24 * 31 * 3">last 3 months</option>
                                <option :value="24 * 31 * 6">last 6 months</option>
                                <option :value="24 * 365">last 12 months</option>
                                <option :value="0">forever</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            class="px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" class="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                            Click here to analyze
                        </button>

                        <div v-if="errors.form" class="mt-2 font-bold text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            {{ errors.form }}
                        </div>
                    </div>
                </div>
            </form>

            <!-- <RecentUpdates @form-fill="formFill" /> -->
        </div>

        <download-progress
            v-if="isDownloading && !isDownloadComplete"
            :title="player.username"
            :positions="counts.totalMoves"
            :downloaded="counts.downloaded"
            :total="counts.totalGames"
            :hideProgressBar="inputs.filters.sinceHoursAgo"
            @cancel-download="cancelDownload"
        ></download-progress>

        <div v-if="errors.api.message" class="text-center bg-orange-800 p-3">
            There was an error from the {{ inputs.type === 'lichess' ? 'Lichess' : 'Chess.com' }} API:
            <strong>{{ errors.api }}</strong>

            <p>Try only running 1 Rosen Score report at a time. You may have to wait before trying again.</p>
        </div>

        <div v-if="player.username" class="mt-8 bg-sky-800 p-4 text-center rounded-lg">
            <h2 class="text-2xl">
                <username-formatter :title="player.title" :username="player.username"></username-formatter>
                has
                <strong class="font-bold">{{ trophyCount.toLocaleString() }}</strong>
                Rosen
                <template v-if="trophyCount === 1"> Trophy </template>
                <template v-else> Trophies </template>
            </h2>

            <div class="mb-1">
                on
                <strong>{{ inputs.type === 'lichess' ? 'Lichess' : 'Chess.com' }}</strong>
                and has completed
                <strong> {{ totalAccomplishmentsCompletedPercentage }}%</strong>
                of the goals ({{ totalAccomplishmentsCompleted }}
                out of
                {{ trophyTypeCount }})
            </div>

            <div class="mb-1" v-if="sinceDateFormatted">since {{ sinceDateFormatted }}</div>

            <trophy-collection :count="trophyCount" size="large"></trophy-collection>

            <div class="text-sm mt-2">
                <strong>{{ counts.totalMoves.toLocaleString() }}</strong>
                positions and
                <strong>{{ counts.downloaded.toLocaleString() }}</strong>
                games analyzed
            </div>
        </div>

        <div class="md:flex md:flex-row md:space-x-4">
            <div class="basis-1/2">
                <h2 class="heading">Make Eric Proud</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Oh No My Queen"
                        desc="Sacrifice your Queen for mate"
                        :trophies="playerTrophiesByType['ohNoMyQueen'] || {}"
                        gameLink="https://lichess.org/heNcmap1#39"
                        youtubeLink="https://youtu.be/x24BFszZ5Zw?t=189"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Stalemate Tricks"
                        desc="Stalemate from a losing position"
                        :trophies="playerTrophiesByType['stalemateTricks'] || {}"
                        gameLink="https://lichess.org/LahQPSJt#134"
                        youtubeLink="https://www.youtube.com/watch?v=aNDNwB2nruA"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Rosen Trap"
                        desc="King goes to the corner instead of capturing the queen"
                        :trophies="playerTrophiesByType['rosenTrap'] || {}"
                        gameLink="https://lichess.org/fBcFhVs4#90"
                        youtubeLink="https://youtu.be/ixAw0ED-Sfs"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Castle Fork"
                        desc="Castle with check and then your king captures a piece"
                        :trophies="playerTrophiesByType['castleFork'] || {}"
                        gameLink="https://lichess.org/xEjSVeYp#41"
                        youtubeLink="https://www.youtube.com/watch?v=_nvoEbgzsb0"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">Pawn Structures</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Connect 5"
                        desc="Connect 5 of your pawns diagonally"
                        :trophies="playerTrophiesByType['connectDiagonally:5'] || {}"
                        gameLink="https://lichess.org/FL2vDAZL#37"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Pawn Diamond"
                        desc="Does your pawn diamond last forever?"
                        :trophies="playerTrophiesByType['pawnDiamond'] || {}"
                        gameLink="https://lichess.org/d43FgnVj/black#32"
                        youtubeLink="https://youtu.be/J3TSlTZpBfc?t=456"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Connect 6"
                        desc="Connect 6 of your pawns diagonally"
                        :trophies="playerTrophiesByType['connectDiagonally:6'] || {}"
                        gameLink="https://lichess.org/CXvrZTzL#73"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Double Pawn Diamond"
                        :trophies="playerTrophiesByType['doublePawnDiamond'] || {}"
                        gameLink="https://lichess.org/V0NGitnD/black#66"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Pawn X"
                        desc="X-formation with pawns"
                        :trophies="playerTrophiesByType['pawnX'] || {}"
                        gameLink="https://lichess.org/2gQ8HOw1#65"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Solid Pawn Diamond"
                        desc="A 5 carat pawn diamond"
                        :trophies="playerTrophiesByType['pawnDiamondSolid'] || {}"
                        gameLink="https://lichess.org/Ak0Bhmx8/black#46"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Pawn Cube"
                        desc="Is your pawn cube indestructible?"
                        :trophies="playerTrophiesByType['pawnCube'] || {}"
                        gameLink="https://lichess.org/lhkF3hJB/black#22"
                        youtubeLink="https://www.youtube.com/watch?v=Q7fQQB1bgxQ"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Center Pawn Cube"
                        desc="Pawn cube in the exact center of the board"
                        :trophies="playerTrophiesByType['pawnCubeCenter'] || {}"
                        gameLink="https://lichess.org/EXwOWSu5/black#48"
                        youtubeLink="https://youtu.be/x8t-MlIWE3w?t=573"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Quadrupled Pawns"
                        desc="4 pawns on the same file"
                        :trophies="playerTrophiesByType['quadrupledPawns'] || {}"
                        gameLink="https://lichess.org/aqADXuJT#85"
                        youtubeLink="https://youtu.be/3jyX_8JX9xg?t=9581"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Connect 8 on 4th Rank"
                        :trophies="playerTrophiesByType['connectEightOnRank:4'] || {}"
                        gameLink="https://lichess.org/ZRXFIlZI#87"
                        youtubeLink="https://youtu.be/AuIElYfxrEk?t=537"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Connect 8 on 5th Rank"
                        :trophies="playerTrophiesByType['connectEightOnRank:5'] || {}"
                        gameLink="https://lichess.org/ZRXFIlZI#109"
                        youtubeLink="https://youtu.be/AuIElYfxrEk?t=594"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Connect 8 on 6th Rank"
                        :trophies="playerTrophiesByType['connectEightOnRank:6'] || {}"
                        gameLink="https://lichess.org/ZRXFIlZI#129"
                        youtubeLink="https://youtu.be/AuIElYfxrEk?t=612"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Connect 8 on 7th Rank"
                        :trophies="playerTrophiesByType['connectEightOnRank:7'] || {}"
                        gameLink="https://lichess.org/ZRXFIlZI#149"
                        youtubeLink="https://youtu.be/AuIElYfxrEk?t=687"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="6 Pawns on the Same File"
                        :trophies="playerTrophiesByType['sixPawnsInTheSameFile'] || {}"
                        gameLink="https://lichess.org/JCD2jmRs#91"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">Piece Structures</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Knight Cube"
                        :trophies="playerTrophiesByType['knightCube'] || {}"
                        gameLink="https://lichess.org/KFZm4x4A/black#176"
                        youtubeLink="https://www.youtube.com/watch?v=FqAako5iZN4"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Knight Rectangle"
                        :trophies="playerTrophiesByType['knightRectangle'] || {}"
                        gameLink="https://lichess.org/zqOlQeBs#207"
                        youtubeLink="https://youtu.be/m_ZKrW0FVZM?t=5587"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">Alphabet Openings</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Egg"
                        desc="Win after spelling &ldquo;egg&rdquo; with pawn moves in the opening"
                        :trophies="playerTrophiesByType['alphabet:egg'] || {}"
                        gameLink="https://lichess.org/1SHm5hr6/black"
                        youtubeLink="https://www.youtube.com/watch?v=J6G3cP991Yc"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Double Egg (EggEgg)"
                        desc="Win after spelling &ldquo;eggegg&rdquo; with pawn moves in the opening"
                        :trophies="playerTrophiesByType['alphabet:eggegg'] || {}"
                        gameLink="https://lichess.org/f2zcFx6P/black"
                        youtubeLink="https://www.youtube.com/watch?v=J6G3cP991Yc"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Bad Egg"
                        desc="Win after spelling &ldquo;badegg&rdquo; with pawn moves in the opening"
                        :trophies="playerTrophiesByType['alphabet:badegg'] || {}"
                        gameLink="https://lichess.org/mu679bhr/black"
                        youtubeLink="https://youtu.be/jH3pPDnoqnU?t=1472"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="BeachCaf&eacute;"
                        desc="Win after spelling &ldquo;beachcafe&rdquo; with pawn moves in the opening"
                        :trophies="playerTrophiesByType['alphabet:beachcafe'] || {}"
                        gameLink="https://lichess.org/p5Ldb6wA"
                        youtubeLink="https://www.youtube.com/watch?v=kGYOzdBsjcg"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Beef"
                        desc="Win after spelling &ldquo;beef&rdquo; with pawn moves in the opening"
                        :trophies="playerTrophiesByType['alphabet:beef'] || {}"
                        gameLink="https://lichess.org/dUkHbvOR"
                        youtubeLink="https://youtu.be/jH3pPDnoqnU?t=1583"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Cabbage"
                        desc="Win after spelling &ldquo;cabbage&rdquo; with pawn moves in the opening"
                        :trophies="playerTrophiesByType['alphabet:cabbage'] || {}"
                        gameLink="https://lichess.org/LMpwnmLz"
                        youtubeLink="https://www.youtube.com/watch?v=GDhtMqBk9M4"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Chad"
                        desc="Win after spelling &ldquo;chad&rdquo; with pawn moves in the opening"
                        :trophies="playerTrophiesByType['alphabet:chad'] || {}"
                        gameLink="https://lichess.org/AaNGZKcj/black"
                        youtubeLink="https://youtu.be/jH3pPDnoqnU?t=1305"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Headache"
                        desc="Win after spelling &ldquo;headache&rdquo; with pawn moves in the opening"
                        :trophies="playerTrophiesByType['alphabet:headache'] || {}"
                        gameLink="https://lichess.org/SdbD4znE"
                    ></accomplishment-score>
                </div>
            </div>
            <div class="basis-1/2">
                <h2 class="heading">Checkmates</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Checkmate with a Pawn"
                        desc="A pawn delivers mate"
                        :trophies="playerTrophiesByType['pawnCheckmate'] || {}"
                        gameLink="https://lichess.org/52RAfF6v#99"
                        youtubeLink="https://www.youtube.com/watch?v=mx9SCz4yDdE"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Checkmate with King"
                        desc="Move your king with a discovery or by castling"
                        :trophies="playerTrophiesByType['checkmateWithKing'] || {}"
                        gameLink="https://lichess.org/JCR11y6i/black#148"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Smothered Mate"
                        :trophies="playerTrophiesByType['smotheredMate'] || {}"
                        gameLink="https://lichess.org/YOdmkxyk#59"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Smothered Pork Checkmate"
                        desc="Smother + Pin + Fork"
                        :trophies="playerTrophiesByType['smotheredPorkMate'] || {}"
                        gameLink="https://lichess.org/39vtGApM#47"
                        youtubeLink="https://www.youtube.com/watch?v=OAnC3gt_DqE"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="En Passant Checkmate"
                        desc="Checkmate by capturing en passant"
                        :trophies="playerTrophiesByType['enPassantCheckmate'] || {}"
                        gameLink="https://lichess.org/LY5WQjXL/black#72"
                        youtubeLink="https://youtu.be/6zT83p6pMHg?t=390"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="g5#"
                        desc="Pawn checkmate on g5"
                        :trophies="playerTrophiesByType['g5mate'] || {}"
                        gameLink="https://lichess.org/UbOofpwX/black#74"
                        youtubeLink="https://youtu.be/3l6BeM45ay8?t=898"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Double-Check Checkmate"
                        desc="2 pieces are attacking the king and it's checkmate"
                        :trophies="playerTrophiesByType['doubleCheckCheckmate'] || {}"
                        gameLink="https://lichess.org/OtlF3AfG#27"
                        youtubeLink="https://youtu.be/8ly5yA6tiEY?t=1082"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Block a Check with Checkmate"
                        desc="Call an ambulance... but not for me"
                        :trophies="playerTrophiesByType['blockCheckWithCheckmate'] || {}"
                        gameLink="https://lichess.org/DrC87aK3#81"
                        youtubeLink="https://youtu.be/kDGY77nkZHc?t=276"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="O-O#"
                        desc="Castle kingside with mate"
                        :trophies="playerTrophiesByType['castleKingsideWithCheckmate'] || {}"
                        gameLink="https://lichess.org/BJvbtS9B#49"
                        youtubeLink="https://youtu.be/UxZc7ZF2uOY?t=207"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="O-O-O#"
                        desc="Castle queenside with mate"
                        :trophies="playerTrophiesByType['castleQueensideWithCheckmate'] || {}"
                        gameLink="https://lichess.org/7fmGBmKz/black#28"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Promote to Bishop Checkmate"
                        :trophies="playerTrophiesByType['promoteToBishopCheckmate'] || {}"
                        gameLink="https://lichess.org/9jkxqDKV#95"
                        youtubeLink="https://youtu.be/vSPxtspv57Q?t=11974"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Promote to Knight Checkmate"
                        :trophies="playerTrophiesByType['promoteToKnightCheckmate'] || {}"
                        gameLink="https://lichess.org/USOysGtc#77"
                        youtubeLink="https://youtu.be/RUJk3N6yF4g?t=3055"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Bishop + Knight Checkmate"
                        :trophies="playerTrophiesByType['bishopAndKnightMate'] || {}"
                        gameLink="https://lichess.org/PDfvROnh#205"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="2-Bishop Checkmate"
                        desc="Checkmate when you only have 2 bishops"
                        :trophies="playerTrophiesByType['twoBishopMate'] || {}"
                        gameLink="https://lichess.org/FuPe9gyS/black#128"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="4-Knight Checkmate"
                        :trophies="playerTrophiesByType['fourKnightMate'] || {}"
                        gameLink="https://lichess.org/KFZm4x4A/black#180"
                        youtubeLink="https://www.youtube.com/watch?v=FqAako5iZN4"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="4-Knight Cube Checkmate"
                        desc="You have 4 knights and checkmate from a cube"
                        :trophies="playerTrophiesByType['fourKnightCubeMate'] || {}"
                        gameLink="https://lichess.org/Rggdy0rY/black#152"
                        youtubeLink="https://youtu.be/FqAako5iZN4?t=50"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="6-Knight Rectangle Checkmate"
                        :trophies="playerTrophiesByType['sixKnightRectangleMate'] || {}"
                        gameLink="https://lichess.org/zqOlQeBs#207"
                        youtubeLink="https://youtu.be/m_ZKrW0FVZM?t=5611"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Checkmate in 2 Moves"
                        desc="Deliver checkmate in 2 moves"
                        :trophies="playerTrophiesByType['checkmateAtMoveNumber:2'] || {}"
                        gameLink="https://lichess.org/Fnb8yHd2/black"
                        youtubeLink="https://www.youtube.com/watch?v=broDeIZMGto"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Checkmate in 3 Moves"
                        desc="Deliver checkmate in 3 moves"
                        :trophies="playerTrophiesByType['checkmateAtMoveNumber:3'] || {}"
                        gameLink="https://lichess.org/BIklhPjL"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Checkmate in 4 Moves"
                        desc="Deliver checkmate in 4 moves"
                        :trophies="playerTrophiesByType['checkmateAtMoveNumber:4'] || {}"
                        gameLink="https://lichess.org/u0SKphmW/black"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">There's a Funny Line</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Castle after Move 40"
                        desc="It's never too late to castle"
                        :trophies="playerTrophiesByType['castleAfterMove40'] || {}"
                        gameLink="https://lichess.org/o2rO7Vcj#95"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Promote a Pawn within 8 Moves"
                        :trophies="playerTrophiesByType['promotePawnBeforeMoveNumber'] || {}"
                        gameLink="https://lichess.org/jBC2lZJt#13"
                        youtubeLink="https://youtu.be/F-UG_xAJmPo?t=47"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="No Captures before Move 30"
                        desc="All the pieces survive till move 30"
                        :trophies="playerTrophiesByType['noCapturesBeforeMoveNumber'] || {}"
                        gameLink="https://lichess.org/iZCR89Dt#65"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="10+ Consecutive Captures on the Same Square"
                        :trophies="playerTrophiesByType['consecutiveCapturesSameSquare'] || {}"
                        gameLink="https://lichess.org/UIMR4eJL/black#56"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="12 Pawn Move Opening Win"
                        desc="Win a game after 12+ consecutive pawn moves in the opening"
                        :trophies="playerTrophiesByType['pawnStormOpening'] || {}"
                        gameLink="https://lichess.org/eplysicB"
                        youtubeLink="https://www.youtube.com/watch?v=jr-r-0UU-WQ"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Royal Family Fork"
                        desc="Knight forks K+Q+R and 1 other piece"
                        :trophies="playerTrophiesByType['royalFamilyFork'] || {}"
                        gameLink="https://lichess.org/VNAD1RDx#47"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">Speed</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Checkmate with 0.1 seconds"
                        desc="Checkmate with &#8530; second left (non-increment games)"
                        :trophies="playerTrophiesByType['checkmateWithTenthSecondLeft'] || {}"
                        gameLink="https://lichess.org/g9MdhRYy/black#126"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Avoid-the-Flag Checkmate"
                        desc="Make 20+ moves with 1 second left + checkmate (Lichess only)"
                        :trophies="playerTrophiesByType['avoidTheFlagCheckmate'] || {}"
                        gameLink="https://lichess.org/Wi5bzNTB#110"
                        youtubeLink="https://www.youtube.com/watch?v=KZ6ANZK44no"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">Adoption Matches</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Adoption"
                        desc="Win 10 consecutive games against the same opponent"
                        :units="['Match', 'Matches']"
                        :trophies="playerTrophiesByType['adoptionMatch:10'] || {}"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Double Adoption"
                        desc="Win 20 consecutive games against the same opponent"
                        :units="['Match', 'Matches']"
                        :trophies="playerTrophiesByType['adoptionMatch:20'] || {}"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">I feel so dirty</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Clutch Pawn"
                        desc="Win with 1 pawn while down 10+ points in material"
                        :trophies="playerTrophiesByType['clutchPawn'] || {}"
                        gameLink="https://lichess.org/tgMQgOSk#149"
                        youtubeLink="https://youtu.be/ihBnAuO7AtM?t=459"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Win with Insufficient Material"
                        desc="Flag your opponent with only a knight or bishop (Lichess only)"
                        :trophies="playerTrophiesByType['winInsufficientMaterial'] || {}"
                        gameLink="https://lichess.org/nYz9xUgc#141"
                        youtubeLink="https://www.youtube.com/watch?v=vBf4rA4j8_w&t=15468s"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Flag Opponent Who Had Mate in 1"
                        desc="Young children, close your eyes"
                        :trophies="playerTrophiesByType['flagOpponentWhoHadMateInOne'] || {}"
                        gameLink="https://lichess.org/VwNKF7ie#121"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-trophy="onRegisterNewTrophy"
                        title="Lefong"
                        desc="Capture a premoved fianchettoed bishop"
                        :trophies="playerTrophiesByType['lefongTrap'] || {}"
                        gameLink="https://lichess.org/ix4lZu8Q/black#6"
                        youtubeLink="https://youtu.be/vBf4rA4j8_w?t=2671"
                    ></accomplishment-score>
                </div>
            </div>
        </div>

        <div class="mt-8 text-center text-sm">
            <div class="text-slate-200 mb-2" v-if="isDownloadComplete && trophyCount > 0">
                Download results as
                <a href="#" @click.prevent="exportAsCsv" class="dotted-underline">CSV</a>
                or
                <a href="#" @click.prevent="exportAsJson" class="dotted-underline">JSON</a>
            </div>
            <div class="text-slate-400">
                Not affiliated with Eric Rosen.
                <br />
                Find a bug? Have a comment? Fill out
                <a href="https://forms.gle/N1EnqmygRqo3sAMs5" target="_blank" class="dotted-underline">this form</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Chess as ChessJS } from 'chess.js'

import { games, player, Game, Profile, addLichessOauthToken, cancelFetch } from 'chess-fetcher'

import AccomplishmentScore from './components/AccomplishmentScore.vue'
import ArrowIcon from './components/ArrowIcon.vue'
import ChangelogDate from './components/ChangelogDate.vue'
import DownloadProgress from './components/DownloadProgress.vue'
import LichessLogin from './components/LichessLogin.vue'
import UsernameFormatter from './components/UsernameFormatter.vue'
import RecentUpdates from './components/RecentUpdates.vue'
import TrophyCollection from './components/TrophyCollection.vue'
import { smotheredMate, smotheredPorkMate } from './goals/smothered-mate'
import adoptionMatch from './goals/adoption-match'
import { blockCheckWithCheckmate } from './goals/block-check-with-checkmate'
import { checkmateAtMoveNumber } from './goals/checkmate-at-move-number'
import { doubleCheckCheckmate } from './goals/double-check-checkmate'
import {
    quadrupledPawns,
    pawnCube,
    pawnCubeCenter,
    pawnX,
    pawnDiamond,
    pawnDiamondSolid,
    doublePawnDiamond,
    knightCube,
    knightRectangle,
    sixPawnsInTheSameFile,
    connectEightOnRank,
    connectDiagonally,
} from './goals/piece-structures'
import { royalFamilyFork } from './goals/royal-family-fork'
import { stalemateTricks, bishopAndKnightMate, twoBishopMate, fourKnightMate, fourKnightCubeMate, sixKnightRectangleMate } from './goals/game-checks'
import { winInsufficientMaterial, clutchPawn, flagOpponentWhoHadMateInOne } from './goals/dirty-wins'
import { noCapturesBeforeMoveNumber } from './goals/first-capture'
import {
    castleAfterMove40,
    pawnCheckmate,
    g5mate,
    enPassantCheckmate,
    castleKingsideWithCheckmate,
    castleQueensideWithCheckmate,
    checkmateWithKing,
    promoteToBishopCheckmate,
    promoteToKnightCheckmate,
    promotePawnBeforeMoveNumber,
} from './goals/move-checks'
import { pawnStormOpening } from './goals/pawn-storm-opening'
import { castleFork } from './goals/castle-fork'
import { avoidTheFlagCheckmate, checkmateWithTenthSecondLeft } from './goals/avoid-the-flag-checkmate'
import { consecutiveCapturesSameSquare } from './goals/consecutive-captures'
import { ohNoMyQueen } from './goals/oh-no-my-queen'
import { lefongTrap } from './goals/lefong-trap'
import { rosenTrap } from './goals/rosen-trap'
import { alphabetOpening } from './goals/alphabet-openings'
import { PlayerTrophiesByType, TrophyCacheFile, TrophyCheckResult } from './types/types'
import { formatSinceDate } from './utils/format-since-date'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export default {
    components: {
        AccomplishmentScore,
        ArrowIcon,
        ChangelogDate,
        DownloadProgress,
        LichessLogin,
        UsernameFormatter,
        RecentUpdates,
        TrophyCollection,
    },
    data() {
        return {
            inputs: {
                type: 'lichess',
                value: '',
                filters: {
                    sinceHoursAgo: 0,
                },
            },

            player: <Profile>{},

            errors: {
                form: '',
                api: <DOMException>{},
            },

            trophyTypeCount: 0,
            playerTrophiesByType: <PlayerTrophiesByType>{},

            isDownloading: false,
            isDownloadComplete: false,
            counts: {
                totalGames: 0,
                downloaded: 0,
                totalMoves: 0,
            },

            usingCacheBeforeTimestamp: 0,
        }
    },

    computed: {
        username(): string {
            return this.inputs.value.trim().toLowerCase()
        },
        sinceDateFormatted(): string {
            if (this.inputs.filters.sinceHoursAgo) {
                let now = new Date().getTime()
                return formatSinceDate(now - this.inputs.filters.sinceHoursAgo * 60 * 60 * 1000)
            }

            return ''
        },
        totalAccomplishmentsCompleted(): number {
            return Object.keys(this.playerTrophiesByType).length
        },
        totalAccomplishmentsCompletedPercentage(): number {
            return Math.round((this.totalAccomplishmentsCompleted / this.trophyTypeCount) * 100)
        },
        trophyCount(): number {
            return Object.values(this.playerTrophiesByType)
                .map((o) => Object.values(o))
                .flat().length
        },
    },

    watch: {
        inputs: {
            handler(value) {
                window.localStorage.setItem('savedForm', JSON.stringify(value))
            },
            deep: true,
        },
    },

    mounted() {
        let savedForm = JSON.parse(window.localStorage.getItem('savedForm') || '{}')

        if (savedForm.type) {
            this.inputs.type = savedForm.type
        }

        if (savedForm.value) {
            this.inputs.value = savedForm.value
        }

        if (savedForm.filters) {
            this.inputs.filters = savedForm.filters
        }
    },

    methods: {
        onRegisterNewTrophy(): void {
            this.trophyTypeCount++
        },

        formFill(type: string, value: string): void {
            this.inputs.type = type
            this.inputs.value = value
            this.inputs.filters.sinceHoursAgo = 0
        },

        setLichessOauthToken(token: string): void {
            addLichessOauthToken(token)
        },

        cancelDownload(): void {
            cancelFetch()

            this.isDownloading = false
            this.isDownloadComplete = true
        },

        async startDownload(): Promise<void> {
            if (!this.username) {
                this.errors.form = 'Enter a username in Step #1'
                return
            }

            // Auto correct Eric's usernames in case someone is trying to toggle between his Lichess and Chess.com
            // but forgets to change the username
            if (this.username === 'ericrosen' && this.inputs.type === 'chesscom') {
                this.inputs.value = 'IMRosen'
            } else if (this.username === 'imrosen' && this.inputs.type === 'lichess') {
                this.inputs.value = 'EricRosen'
            }

            this.isDownloading = true

            let url = ''
            if (this.inputs.type === 'lichess') {
                url = `https://lichess.org/@/${this.username}`
            } else if (this.inputs.type === 'chesscom') {
                url = `https://www.chess.com/member/${this.username}`
            }

            player(url)
                .then(async (player: Profile) => {
                    this.player = player
                    window.document.title += ` - ${player.title} ${player.username}`

                    const playerGameCount: number = player.counts?.all || 0

                    if (player.site === 'chess.com') {
                        // Chess.com doesn't provide a reliable way to get the actual game count via the API.
                        // Actual game count is higher than reported, so I'll add 20%
                        this.counts.totalGames = Math.ceil(playerGameCount * 1.2)
                    } else {
                        this.counts.totalGames = playerGameCount
                    }

                    if (!this.inputs.filters.sinceHoursAgo) {
                        await this.getCachedGames(url)
                    }

                    let sinceTimestamp = this.inputs.filters.sinceHoursAgo
                        ? new Date().getTime() - this.inputs.filters.sinceHoursAgo * 60 * 60 * 1000
                        : 0

                    if (this.usingCacheBeforeTimestamp) {
                        sinceTimestamp = this.usingCacheBeforeTimestamp
                    }

                    games(url, this.checkGameForTrophies, {
                        since: sinceTimestamp,
                        pgnInJson: true,
                        clocks: true,
                    })
                        .then(() => {
                            this.isDownloadComplete = true
                        })
                        .catch((e: DOMException) => {
                            // If the user cancels the download, don't show an error message
                            if (e.message.includes('aborted')) {
                                return
                            }

                            this.errors.api = e
                        })
                })
                .catch((e: DOMException) => {
                    this.errors.api = e
                })
        },

        async getCachedGames(url: string) {
            const caches = new Map<string, string>()

            // caches.set('https://lichess.org/@/german11', '/cache/lichess/german11.json')
            caches.set('https://lichess.org/@/chess-network', '/cache/lichess/chess-network.json')
            caches.set('https://lichess.org/@/drnykterstein', '/cache/lichess/drnykterstein.json')
            caches.set('https://lichess.org/@/ericrosen', '/cache/lichess/ericrosen.json')
            caches.set('https://lichess.org/@/massterofmayhem', '/cache/lichess/massterofmayhem.json')
            caches.set('https://lichess.org/@/penguingim1', '/cache/lichess/penguingim1.json')
            caches.set('https://lichess.org/@/saltyclown', '/cache/lichess/saltyclown.json')

            caches.set('https://www.chess.com/member/alexandrabotez', '/cache/chesscom/alexandrabotez.json')
            caches.set('https://www.chess.com/member/chessbrah', '/cache/chesscom/chessbrah.json')
            caches.set('https://www.chess.com/member/danielnaroditsky', '/cache/chesscom/danielnaroditsky.json')
            caches.set('https://www.chess.com/member/gothamchess', '/cache/chesscom/gothamchess.json')
            caches.set('https://www.chess.com/member/hannahsayce', '/cache/chesscom/hannahsayce.json')
            caches.set('https://www.chess.com/member/hikaru', '/cache/chesscom/hikaru.json')
            caches.set('https://www.chess.com/member/imrosen', '/cache/chesscom/imrosen.json')
            caches.set('https://www.chess.com/member/knvb', '/cache/chesscom/knvb.json')
            caches.set('https://www.chess.com/member/magnuscarlsen', '/cache/chesscom/magnuscarlsen.json')
            caches.set('https://www.chess.com/member/saltyclown', '/cache/chesscom/saltyclown.json')

            if (!caches.has(url)) {
                return
            }

            await fetch(caches.get(url)!)
                .then((response) => response.json())
                .then((result: TrophyCacheFile) => {
                    this.usingCacheBeforeTimestamp = result.cache_updated_at
                    this.counts.downloaded = result.games_analyzed
                    this.counts.totalMoves = result.moves_analyzed
                    this.playerTrophiesByType = result.trophies
                })
        },

        exportAsJson(): void {
            let contents: TrophyCacheFile = {
                cache_updated_at: Date.now(),
                games_analyzed: this.counts.downloaded,
                moves_analyzed: this.counts.totalMoves,
                trophies: this.playerTrophiesByType,
            }

            this.downloadFile(`${this.username}.json`, JSON.stringify(contents, null, 2), 'application/json')
        },

        exportAsCsv(): void {
            let rows: {
                trophy: string
                date: string
                opponent: string
                link: string
            }[] = []

            for (const [trophyName, accomplishment] of Object.entries(this.playerTrophiesByType)) {
                for (const trophy of Object.values(accomplishment)) {
                    rows.push({
                        trophy: trophyName,
                        date: trophy.date,
                        opponent: (trophy.opponent.title + ' ' + trophy.opponent.username).trim(),
                        link: trophy.link,
                    })
                }
            }

            const header = Object.keys(rows[0]).join(',')
            const values = rows.map((o) => Object.values(o).join(',')).join('\n')
            const csv = header + '\n' + values

            this.downloadFile(`${this.username}.csv`, csv, 'text/csv')
        },

        downloadFile(filename: string, contents: string, contentType: string): void {
            let element = document.createElement('a')
            element.setAttribute('href', 'data:' + contentType + ';charset=utf-8,' + encodeURIComponent(contents))
            element.setAttribute('download', filename)

            element.style.display = 'none'
            document.body.appendChild(element)
            element.click()
            document.body.removeChild(element)
        },

        checkForTrophy(game: Game, name: string, results: TrophyCheckResult, onMoveNumber?: number): void {
            for (const result of results) {
                if (
                    (result.color === 'w' && game.players.white.username.toLowerCase() === this.username) ||
                    (result.color === 'b' && game.players.black.username.toLowerCase() === this.username)
                ) {
                    this.addTrophyForPlayer(name, game, result.onMoveNumber || onMoveNumber || 0)
                }
            }
        },

        addTrophyForPlayer(trophyName: string, game: Game, onMoveNumber?: number): void {
            this.playerTrophiesByType[trophyName] = this.playerTrophiesByType[trophyName] || {}

            // if the player was already awarded this trophy for this game, don't add it again
            if (this.playerTrophiesByType[trophyName][game.id]) {
                return
            }

            let opponent
            let link

            if (game.players.white.username.toLowerCase() === this.username) {
                opponent = game.players.black
                link = game.links.white
            } else {
                opponent = game.players.white
                link = game.links.black
            }

            if (game.site === 'lichess' && onMoveNumber) {
                link += `#${onMoveNumber}`
            } else if (onMoveNumber) {
                link += onMoveNumber - 1
            }

            this.playerTrophiesByType[trophyName][game.id] = {
                date: new Date(game.timestamp).toISOString().split('T')[0], // YYYY-MM-DD format
                opponent: {
                    username: opponent.username,
                    title: opponent.title || '',
                },
                link,
            }
        },

        async checkGameForTrophies(game: Game): Promise<void> {
            // Add a 0ms setTimeout to stop the process from blocking the page
            // Without this, the page may become unresponsive as games are processed
            await wait(0)

            this.counts.downloaded++

            // only standard chess starting position games
            if (!game.isStandard) {
                return
            }

            // ignore games against stockfish, anonymous users, and bots
            if (
                this.player.title !== 'BOT' &&
                (typeof game.players.white.username === 'undefined' ||
                    typeof game.players.black.username === 'undefined' ||
                    game.players.white.title === 'BOT' ||
                    game.players.black.title === 'BOT')
            ) {
                return
            }

            if (game.moves.length === 0) {
                return
            }

            this.checkForTrophy(game, 'castleAfterMove40', castleAfterMove40(game.moves))
            this.checkForTrophy(game, 'pawnCheckmate', pawnCheckmate(game.moves))
            this.checkForTrophy(game, 'g5mate', g5mate(game.moves))

            this.checkForTrophy(game, 'enPassantCheckmate', enPassantCheckmate(game.moves))

            this.checkForTrophy(game, 'castleKingsideWithCheckmate', castleKingsideWithCheckmate(game.moves))
            this.checkForTrophy(game, 'castleQueensideWithCheckmate', castleQueensideWithCheckmate(game.moves))
            this.checkForTrophy(game, 'checkmateWithKing', checkmateWithKing(game.moves))
            this.checkForTrophy(game, 'promoteToBishopCheckmate', promoteToBishopCheckmate(game.moves))
            this.checkForTrophy(game, 'promoteToKnightCheckmate', promoteToKnightCheckmate(game.moves))
            this.checkForTrophy(game, 'promotePawnBeforeMoveNumber', promotePawnBeforeMoveNumber(game.moves, 8))

            this.checkForTrophy(game, 'smotheredMate', smotheredMate(game.moves))
            this.checkForTrophy(game, 'smotheredPorkMate', smotheredPorkMate(game.moves))

            this.checkForTrophy(game, 'blockCheckWithCheckmate', blockCheckWithCheckmate(game.moves))
            this.checkForTrophy(game, 'royalFamilyFork', royalFamilyFork(game.moves))
            this.checkForTrophy(game, 'noCapturesBeforeMoveNumber', noCapturesBeforeMoveNumber(game.moves, 30))

            this.checkForTrophy(game, 'rosenTrap', rosenTrap(game, game.moves))
            this.checkForTrophy(game, 'castleFork', castleFork(game.moves))

            this.checkForTrophy(game, 'avoidTheFlagCheckmate', avoidTheFlagCheckmate(game))
            this.checkForTrophy(game, 'checkmateWithTenthSecondLeft', checkmateWithTenthSecondLeft(game))

            this.checkForTrophy(game, 'consecutiveCapturesSameSquare', consecutiveCapturesSameSquare(game.moves, 10))
            this.checkForTrophy(game, 'ohNoMyQueen', ohNoMyQueen(game.moves))
            this.checkForTrophy(game, 'lefongTrap', lefongTrap(game.moves))
            this.checkForTrophy(game, 'flagOpponentWhoHadMateInOne', flagOpponentWhoHadMateInOne(game, game.moves), game.moves.length)
            this.checkForTrophy(game, 'pawnStormOpening', pawnStormOpening(game, game.moves))

            this.checkForTrophy(game, 'checkmateAtMoveNumber:2', checkmateAtMoveNumber(game.moves, 2))
            this.checkForTrophy(game, 'checkmateAtMoveNumber:3', checkmateAtMoveNumber(game.moves, 3))
            this.checkForTrophy(game, 'checkmateAtMoveNumber:4', checkmateAtMoveNumber(game.moves, 4))

            adoptionMatch.processGame(game)
            this.checkForTrophy(game, 'adoptionMatch:10', adoptionMatch.checkForAdoption(game, 10))
            this.checkForTrophy(game, 'adoptionMatch:20', adoptionMatch.checkForAdoption(game, 20))

            for (const word of ['badegg', 'beachcafe', 'beef', 'cabbage', 'chad', 'egg', 'eggegg', 'headache']) {
                this.checkForTrophy(game, `alphabet:${word}`, alphabetOpening(game, word, game.moves))
            }

            let chessJs = new ChessJS()

            for (const moveNum in game.moves) {
                this.counts.totalMoves++

                const moveNumber = parseInt(moveNum)
                chessJs.move(game.moves[moveNumber].notation.notation)
                const fen = chessJs.fen()

                this.checkForTrophy(game, 'quadrupledPawns', quadrupledPawns(fen), moveNumber + 1)
                this.checkForTrophy(game, 'pawnCube', pawnCube(fen), moveNumber + 1)
                this.checkForTrophy(game, 'pawnCubeCenter', pawnCubeCenter(fen), moveNumber + 1)
                this.checkForTrophy(game, 'pawnX', pawnX(fen), moveNumber + 1)
                this.checkForTrophy(game, 'pawnDiamond', pawnDiamond(fen), moveNumber + 1)
                this.checkForTrophy(game, 'pawnDiamondSolid', pawnDiamondSolid(fen), moveNumber + 1)
                this.checkForTrophy(game, 'doublePawnDiamond', doublePawnDiamond(fen), moveNumber + 1)
                this.checkForTrophy(game, 'knightCube', knightCube(fen), moveNumber + 1)
                this.checkForTrophy(game, 'knightRectangle', knightRectangle(fen), moveNumber + 1)
                this.checkForTrophy(game, 'connectEightOnRank:4', connectEightOnRank(fen, 4), moveNumber + 1)
                this.checkForTrophy(game, 'connectEightOnRank:5', connectEightOnRank(fen, 5), moveNumber + 1)
                this.checkForTrophy(game, 'connectEightOnRank:6', connectEightOnRank(fen, 6), moveNumber + 1)
                this.checkForTrophy(game, 'connectEightOnRank:7', connectEightOnRank(fen, 7), moveNumber + 1)
                this.checkForTrophy(game, 'connectDiagonally:5', connectDiagonally(fen, 5), moveNumber + 1)
                this.checkForTrophy(game, 'connectDiagonally:6', connectDiagonally(fen, 6), moveNumber + 1)
                this.checkForTrophy(game, 'sixPawnsInTheSameFile', sixPawnsInTheSameFile(fen), moveNumber + 1)
            }

            const fen = chessJs.fen()

            this.checkForTrophy(game, 'stalemateTricks', stalemateTricks(game, fen), game.moves.length)
            this.checkForTrophy(game, 'bishopAndKnightMate', bishopAndKnightMate(game, fen), game.moves.length)
            this.checkForTrophy(game, 'twoBishopMate', twoBishopMate(game, fen), game.moves.length)
            this.checkForTrophy(game, 'fourKnightMate', fourKnightMate(game, fen), game.moves.length)
            this.checkForTrophy(game, 'fourKnightCubeMate', fourKnightCubeMate(game, fen), game.moves.length)
            this.checkForTrophy(game, 'sixKnightRectangleMate', sixKnightRectangleMate(game, fen), game.moves.length)

            this.checkForTrophy(game, 'winInsufficientMaterial', winInsufficientMaterial(game, fen), game.moves.length)
            this.checkForTrophy(game, 'clutchPawn', clutchPawn(game, fen), game.moves.length)
            this.checkForTrophy(game, 'doubleCheckCheckmate', doubleCheckCheckmate(game, fen), game.moves.length)
        },
    },
}
</script>
