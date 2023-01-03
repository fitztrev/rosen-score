<template>
    <div
        v-cloak
        class="container mx-auto my-8 w-11/12"
        :class="{
            'is-download-complete': false,
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
        >
            <form @submit.prevent="startDownload">
                <div class="flex flex-row mb-4">
                    <div class="basis-1/4 text-2xl md:text-5xl text-center font-bold italic">1 <ArrowIcon /></div>
                    <div class="basis-3/4">
                        Select which site:

                        <div class="text-sky-900 mt-1">
                            <label class="cursor-pointer">
                                <input type="radio" name="site" value="lichess" v-model="form.type" />
                                Lichess
                            </label>
                            <label class="cursor-pointer ml-4">
                                <input type="radio" name="site" value="chesscom" v-model="form.type" />
                                Chess.com
                            </label>
                        </div>
                    </div>
                </div>

                <div class="flex flex-row mb-4">
                    <div class="basis-1/4 text-2xl md:text-5xl text-center font-bold italic">2 <ArrowIcon /></div>
                    <div class="basis-3/4">
                        Enter username:

                        <input
                            type="text"
                            class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Username here"
                            spellcheck="false"
                            data-lpignore="true"
                            v-model="form.value"
                        />

                        <div class="text-sm">
                            Or
                            <span
                                class="dotted-underline text-sky-900 cursor-pointer"
                                @click.prevent="formFill(form.type === 'lichess' ? 'EricRosen' : 'IMRosen')"
                            >
                                click here to see Eric Rosen's
                            </span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-row mb-4">
                    <div class="basis-1/4 text-2xl md:text-5xl text-center font-bold italic">3 <ArrowIcon /></div>
                    <div class="basis-3/4">
                        <!-- <lichess-login v-on:set-lichess-oauth-token="setLichessOauthToken"></lichess-login> -->
                    </div>
                </div>

                <div class="flex flex-row">
                    <div class="basis-1/4 text-2xl md:text-5xl text-center font-bold italic">4 <ArrowIcon /></div>
                    <div class="basis-3/4">
                        <div class="text-sm mt-1 mb-2">
                            Check games since
                            <select
                                v-model.number="form.filters.sinceHoursAgo"
                                class="bg-transparent border-b border-dotted border-sky-900 focus:outline-0 hover:border-dashed text-sky-900 md:w-28"
                            >
                                <option :value="6">6 hours ago</option>
                                <option :value="24">24 hours ago</option>
                                <option :value="24 * 7">last week</option>
                                <option :value="24 * 31">last month</option>
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

                        <div v-if="errorMsg" class="mt-2 font-bold text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" class="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                            {{ errorMsg }}
                        </div>
                    </div>
                </div>
            </form>

            <RecentUpdates @form-fill="formFill" />
        </div>

        <!-- <download-progress
            v-if="isDownloading && reportObject.data"
            :title="reportObject.data.username || reportObject.data.fullName || reportObject.data.name"
            :positions="counts.totalMoves"
            :downloaded="counts.downloaded"
            :total="counts.totalGames"
            :hideProgressBar="usingCachedData || filter.sinceHoursAgo"
            @cancel-download="cancelFetch"
        ></download-progress> -->

        <!-- <div v-if="reportObject.data" class="mt-8 bg-sky-800 p-4 text-center rounded-lg">
            <h2 class="text-2xl">
                <template v-if="reportObject.type === 'user'">
                    <lichess-username
                        :title="reportObject.data.title"
                        :name="reportObject.data.username"
                    ></lichess-username>
                </template>
                <template v-else>
                    {{ reportObject.data.fullName || reportObject.data.name }}
                </template>
                has
                <strong class="font-bold">{{ trophyCount.toLocaleString() }}</strong>
                Rosen
                <template v-if="trophyCount === 1"> Trophy </template>
                <template v-else> Trophies </template>
            </h2>

            <div class="mb-1">
                and has completed
                <strong> {{ totalAccomplishmentsCompletedPercentage }}% </strong>
                of the goals ({{ totalAccomplishmentsCompleted }}
                out of
                {{ trophyTypeCount }})
            </div>

            <div class="mb-1" v-if="sinceDateFormatted">since {{ sinceDateFormatted }}</div>

            <trophy-collection :count="trophyCount" size="large"></trophy-collection>

            <div class="text-sm mt-2">
                <template v-if="usingCachedData && isDownloadComplete">
                    <strong>{{ counts.totalGames.toLocaleString() }}</strong>
                    games analyzed
                </template>

                <template v-if="!usingCachedData">
                    <strong>{{ counts.totalMoves.toLocaleString() }}</strong>
                    positions and
                    <strong>{{ counts.downloaded.toLocaleString() }}</strong>
                    games analyzed
                </template>
            </div>
        </div> -->

        <div class="md:flex md:flex-row md:space-x-4">
            <div class="basis-1/2">
                <h2 class="heading">Make Eric Proud</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Oh No My Queen"
                        desc="Sacrifice your Queen for mate"
                        :games="trophiesByType['ohNoMyQueen']"
                        gameLink="https://lichess.org/heNcmap1#39"
                        youtubeLink="https://youtu.be/x24BFszZ5Zw?t=189"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Stalemate Tricks"
                        desc="Stalemate from a losing position"
                        :games="trophiesByType['stalemateTricks']"
                        gameLink="https://lichess.org/LahQPSJt#134"
                        youtubeLink="https://www.youtube.com/watch?v=aNDNwB2nruA"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Rosen Trap"
                        desc="King goes to the corner instead of capturing the queen"
                        :games="trophiesByType['rosenTrap']"
                        gameLink="https://lichess.org/fBcFhVs4#90"
                        youtubeLink="https://youtu.be/ixAw0ED-Sfs"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Castle Fork"
                        desc="Castle with check and then your king captures a piece"
                        :games="trophiesByType['castleFork']"
                        gameLink="https://lichess.org/xEjSVeYp#41"
                        youtubeLink="https://www.youtube.com/watch?v=_nvoEbgzsb0"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">Pawn Structures</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Connect 5"
                        desc="Connect 5 of your pawns diagonally"
                        :games="trophiesByType['connectFive']"
                        gameLink="https://lichess.org/FL2vDAZL#37"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Pawn Diamond"
                        desc="Does your pawn diamond last forever?"
                        :games="trophiesByType['pawnDiamond']"
                        gameLink="https://lichess.org/d43FgnVj/black#32"
                        youtubeLink="https://youtu.be/J3TSlTZpBfc?t=456"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Connect 6"
                        desc="Connect 6 of your pawns diagonally"
                        :games="trophiesByType['connectSix']"
                        gameLink="https://lichess.org/CXvrZTzL#73"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Double Pawn Diamond"
                        :games="trophiesByType['doublePawnDiamond']"
                        gameLink="https://lichess.org/V0NGitnD/black#66"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Pawn X"
                        desc="X-formation with pawns"
                        :games="trophiesByType['pawnX']"
                        gameLink="https://lichess.org/2gQ8HOw1#65"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Solid Pawn Diamond"
                        desc="A 5 carat pawn diamond"
                        :games="trophiesByType['pawnDiamondSolid']"
                        gameLink="https://lichess.org/Ak0Bhmx8/black#46"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Pawn Cube"
                        desc="Is your pawn cube indestructible?"
                        :games="trophiesByType['pawnCube']"
                        gameLink="https://lichess.org/lhkF3hJB/black#22"
                        youtubeLink="https://www.youtube.com/watch?v=Q7fQQB1bgxQ"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Center Pawn Cube"
                        desc="Pawn cube in the exact center of the board"
                        :games="trophiesByType['pawnCubeCenter']"
                        gameLink="https://lichess.org/EXwOWSu5/black#48"
                        youtubeLink="https://youtu.be/x8t-MlIWE3w?t=573"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Quadrupled Pawns"
                        desc="4 pawns on the same file"
                        :games="trophiesByType['quadrupledPawns']"
                        gameLink="https://lichess.org/aqADXuJT#85"
                        youtubeLink="https://youtu.be/3jyX_8JX9xg?t=9581"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Pawn Trapezoid"
                        desc="Make a pawn trapezoid with the base on your 4th or 5th rank"
                        :games="trophiesByType['pawnTrapezoid']"
                        gameLink="https://lichess.org/38zR9IeJ#57"
                        youtubeLink="https://youtu.be/Nuv_7hc7NSA?t=729"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Connect 8 on 4th Rank"
                        :games="trophiesByType['connectEightOnRank4']"
                        gameLink="https://lichess.org/ZRXFIlZI#87"
                        youtubeLink="https://youtu.be/AuIElYfxrEk?t=537"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Connect 8 on 5th Rank"
                        :games="trophiesByType['connectEightOnRank5']"
                        gameLink="https://lichess.org/ZRXFIlZI#109"
                        youtubeLink="https://youtu.be/AuIElYfxrEk?t=594"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Connect 8 on 6th Rank"
                        :games="trophiesByType['connectEightOnRank6']"
                        gameLink="https://lichess.org/ZRXFIlZI#129"
                        youtubeLink="https://youtu.be/AuIElYfxrEk?t=612"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Connect 8 on 7th Rank"
                        :games="trophiesByType['connectEightOnRank7']"
                        gameLink="https://lichess.org/ZRXFIlZI#149"
                        youtubeLink="https://youtu.be/AuIElYfxrEk?t=687"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="6 Pawns on the Same File"
                        :games="trophiesByType['sixPawnsInTheSameFile']"
                        gameLink="https://lichess.org/JCD2jmRs#91"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">Piece Structures</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Knight Cube"
                        :games="trophiesByType['knightCube']"
                        gameLink="https://lichess.org/KFZm4x4A/black#176"
                        youtubeLink="https://www.youtube.com/watch?v=FqAako5iZN4"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Knight Rectangle"
                        :games="trophiesByType['knightRectangle']"
                        gameLink="https://lichess.org/zqOlQeBs#207"
                        youtubeLink="https://youtu.be/m_ZKrW0FVZM?t=5587"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">Alphabet Openings</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Egg"
                        desc="Win after spelling &ldquo;egg&rdquo; with pawn moves in the opening"
                        :games="trophiesByType['alphabet:egg']"
                        gameLink="https://lichess.org/1SHm5hr6/black"
                        youtubeLink="https://www.youtube.com/watch?v=J6G3cP991Yc"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Double Egg (EggEgg)"
                        desc="Win after spelling &ldquo;eggegg&rdquo; with pawn moves in the opening"
                        :games="trophiesByType['alphabet:eggegg']"
                        gameLink="https://lichess.org/f2zcFx6P/black"
                        youtubeLink="https://www.youtube.com/watch?v=J6G3cP991Yc"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Bad Egg"
                        desc="Win after spelling &ldquo;badegg&rdquo; with pawn moves in the opening"
                        :games="trophiesByType['alphabet:badegg']"
                        gameLink="https://lichess.org/mu679bhr/black"
                        youtubeLink="https://youtu.be/jH3pPDnoqnU?t=1472"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="BeachCaf&eacute;"
                        desc="Win after spelling &ldquo;beachcafe&rdquo; with pawn moves in the opening"
                        :games="trophiesByType['alphabet:beachcafe']"
                        gameLink="https://lichess.org/p5Ldb6wA"
                        youtubeLink="https://www.youtube.com/watch?v=kGYOzdBsjcg"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Beef"
                        desc="Win after spelling &ldquo;beef&rdquo; with pawn moves in the opening"
                        :games="trophiesByType['alphabet:beef']"
                        gameLink="https://lichess.org/dUkHbvOR"
                        youtubeLink="https://youtu.be/jH3pPDnoqnU?t=1583"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Cabbage"
                        desc="Win after spelling &ldquo;cabbage&rdquo; with pawn moves in the opening"
                        :games="trophiesByType['alphabet:cabbage']"
                        gameLink="https://lichess.org/LMpwnmLz"
                        youtubeLink="https://www.youtube.com/watch?v=GDhtMqBk9M4"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Chad"
                        desc="Win after spelling &ldquo;chad&rdquo; with pawn moves in the opening"
                        :games="trophiesByType['alphabet:chad']"
                        gameLink="https://lichess.org/AaNGZKcj/black"
                        youtubeLink="https://youtu.be/jH3pPDnoqnU?t=1305"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Headache"
                        desc="Win after spelling &ldquo;headache&rdquo; with pawn moves in the opening"
                        :games="trophiesByType['alphabet:headache']"
                        gameLink="https://lichess.org/SdbD4znE"
                    ></accomplishment-score>
                </div>
            </div>
            <div class="basis-1/2">
                <h2 class="heading">Checkmates</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Checkmate with a Pawn"
                        desc="A pawn delivers mate"
                        :games="trophiesByType['pawnCheckmate']"
                        gameLink="https://lichess.org/52RAfF6v#99"
                        youtubeLink="https://www.youtube.com/watch?v=mx9SCz4yDdE"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Checkmate with King"
                        desc="Move your king with a discovery or by castling"
                        :games="trophiesByType['checkmateWithKing']"
                        gameLink="https://lichess.org/JCR11y6i/black#148"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Smothered Mate"
                        :games="trophiesByType['smotheredMate']"
                        gameLink="https://lichess.org/YOdmkxyk#59"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Smothered Pork Checkmate"
                        desc="Smother + Pin + Fork"
                        :games="trophiesByType['smotheredPorkMate']"
                        gameLink="https://lichess.org/39vtGApM#47"
                        youtubeLink="https://www.youtube.com/watch?v=OAnC3gt_DqE"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="En Passant Checkmate"
                        desc="Checkmate by capturing en passant"
                        :games="trophiesByType['enPassantCheckmate']"
                        gameLink="https://lichess.org/LY5WQjXL/black#72"
                        youtubeLink="https://youtu.be/6zT83p6pMHg?t=390"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="g5#"
                        desc="Pawn checkmate on g5"
                        :games="trophiesByType['g5mate']"
                        gameLink="https://lichess.org/UbOofpwX/black#74"
                        youtubeLink="https://youtu.be/3l6BeM45ay8?t=898"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Double-Check Checkmate"
                        desc="2 pieces are attacking the king and it's checkmate"
                        :games="trophiesByType['doubleCheckCheckmate']"
                        gameLink="https://lichess.org/OtlF3AfG#27"
                        youtubeLink="https://youtu.be/8ly5yA6tiEY?t=1082"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Block a Check with Checkmate"
                        desc="Call an ambulance... but not for me"
                        :games="trophiesByType['blockCheckWithCheckmate']"
                        gameLink="https://lichess.org/DrC87aK3#81"
                        youtubeLink="https://youtu.be/kDGY77nkZHc?t=276"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="O-O#"
                        desc="Castle kingside with mate"
                        :games="trophiesByType['castleKingsideWithCheckmate']"
                        gameLink="https://lichess.org/BJvbtS9B#49"
                        youtubeLink="https://youtu.be/UxZc7ZF2uOY?t=207"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="O-O-O#"
                        desc="Castle queenside with mate"
                        :games="trophiesByType['castleQueensideWithCheckmate']"
                        gameLink="https://lichess.org/7fmGBmKz/black#28"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Promote to Bishop Checkmate"
                        :games="trophiesByType['promoteToBishopCheckmate']"
                        gameLink="https://lichess.org/9jkxqDKV#95"
                        youtubeLink="https://youtu.be/vSPxtspv57Q?t=11974"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Promote to Knight Checkmate"
                        :games="trophiesByType['promoteToKnightCheckmate']"
                        gameLink="https://lichess.org/USOysGtc#77"
                        youtubeLink="https://youtu.be/RUJk3N6yF4g?t=3055"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Bishop + Knight Checkmate"
                        :games="trophiesByType['bishopAndKnightMate']"
                        gameLink="https://lichess.org/PDfvROnh#205"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Knight-to-the-Corner Checkmate"
                        desc="Knight moves to a corner of the board with checkmate"
                        :games="trophiesByType['knightCornerMate']"
                        gameLink="https://lichess.org/s01MVu7c/black#82"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="2-Bishop Checkmate"
                        desc="Checkmate when you only have 2 bishops"
                        :games="trophiesByType['twoBishopMate']"
                        gameLink="https://lichess.org/FuPe9gyS/black#128"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="4-Knight Checkmate"
                        :games="trophiesByType['fourKnightMate']"
                        gameLink="https://lichess.org/KFZm4x4A/black#180"
                        youtubeLink="https://www.youtube.com/watch?v=FqAako5iZN4"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="4-Knight Cube Checkmate"
                        desc="You have 4 knights and checkmate from a cube"
                        :games="trophiesByType['fourKnightCubeMate']"
                        gameLink="https://lichess.org/Rggdy0rY/black#152"
                        youtubeLink="https://youtu.be/FqAako5iZN4?t=50"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="6-Knight Rectangle Checkmate"
                        :games="trophiesByType['sixKnightRectangleMate']"
                        gameLink="https://lichess.org/zqOlQeBs#207"
                        youtubeLink="https://youtu.be/m_ZKrW0FVZM?t=5611"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Avoid-the-Flag Checkmate"
                        desc="Make 20+ moves with 1 second left + checkmate"
                        :games="trophiesByType['premovesWithOneSecondLeft']"
                        gameLink="https://lichess.org/Wi5bzNTB#110"
                        youtubeLink="https://www.youtube.com/watch?v=KZ6ANZK44no"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Checkmate in 2 Moves"
                        desc="Deliver checkmate in 2 moves"
                        :games="trophiesByType['quickCheckmate:2']"
                        gameLink="https://lichess.org/Fnb8yHd2/black"
                        youtubeLink="https://www.youtube.com/watch?v=broDeIZMGto"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Checkmate in 3 Moves"
                        desc="Deliver checkmate in 3 moves"
                        :games="trophiesByType['quickCheckmate:3']"
                        gameLink="https://lichess.org/BIklhPjL"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Checkmate in 4 Moves"
                        desc="Deliver checkmate in 4 moves"
                        :games="trophiesByType['quickCheckmate:4']"
                        gameLink="https://lichess.org/u0SKphmW/black"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">There's a Funny Line</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Castle after Move 40"
                        desc="It's never too late to castle"
                        :games="trophiesByType['castleAfterMove40']"
                        gameLink="https://lichess.org/o2rO7Vcj#95"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Promote a Pawn within 8 Moves"
                        :games="trophiesByType['promotePawnBeforeMoveNumber']"
                        gameLink="https://lichess.org/jBC2lZJt#13"
                        youtubeLink="https://youtu.be/F-UG_xAJmPo?t=47"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="No Captures before Move 30"
                        desc="All the pieces survive till move 30"
                        :games="trophiesByType['noCapturesBeforeMove:30']"
                        gameLink="https://lichess.org/iZCR89Dt#65"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="10+ Consecutive Captures on the Same Square"
                        desc="&ldquo;We have captures, captures, captures, captures, captures...&rdquo; &#8288;&#8211;&#8288;Agadmator"
                        :games="trophiesByType['consecutiveCaptures:sameSquare']"
                        gameLink="https://lichess.org/UIMR4eJL/black#56"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="12 Pawn Move Opening Win"
                        desc="Win a game after 12+ consecutive pawn moves in the opening"
                        :games="trophiesByType['pawnStormOpening']"
                        gameLink="https://lichess.org/eplysicB"
                        youtubeLink="https://www.youtube.com/watch?v=jr-r-0UU-WQ"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Royal Family Fork"
                        desc="Knight forks K+Q+R and 1 other piece"
                        :games="trophiesByType['megaFork']"
                        gameLink="https://lichess.org/VNAD1RDx#47"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">Adoption Matches</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Adoption"
                        desc="Win 10 consecutive games against the same opponent"
                        :units="['Match', 'Matches']"
                        :games="trophiesByType['adoptionMatch:10']"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Double Adoption"
                        desc="Win 20 consecutive games against the same opponent"
                        :units="['Match', 'Matches']"
                        :games="trophiesByType['adoptionMatch:20']"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">I feel so dirty</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Clutch Pawn"
                        desc="Win with 1 pawn while down 10+ points in material"
                        :games="trophiesByType['clutchPawn']"
                        gameLink="https://lichess.org/tgMQgOSk#149"
                        youtubeLink="https://youtu.be/ihBnAuO7AtM?t=459"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Win with Insufficient Material"
                        desc="Flag your opponent with only a knight or bishop"
                        :games="trophiesByType['winInsufficientMaterial']"
                        gameLink="https://lichess.org/nYz9xUgc#141"
                        youtubeLink="https://www.youtube.com/watch?v=vBf4rA4j8_w&t=15468s"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewTrophy"
                        title="Lefong"
                        desc="Capture a premoved fianchettoed bishop"
                        :games="trophiesByType['lefongTrap']"
                        gameLink="https://lichess.org/ix4lZu8Q/black#6"
                        youtubeLink="https://youtu.be/vBf4rA4j8_w?t=2671"
                    ></accomplishment-score>
                </div>
            </div>
        </div>

        <div class="text-sm text-center text-slate-400 mt-8">
            Not affiliated with Eric Rosen, Lichess, or Chess.com.
            <br />
            Find a bug? Have a comment? Fill out
            <a href="https://forms.gle/N1EnqmygRqo3sAMs5" target="_blank" class="dotted-underline">this form</a>.
        </div>

        <!-- <div class="text-sm text-center text-slate-400 mt-8" v-if="isLocalEnv">
            <a href="" @click.prevent="getCacheUpdateCommand">getCacheUpdateCommand</a>
        </div> -->
    </div>
</template>

<script lang="ts">
import { Chess as ChessJS } from 'chess.js'

// const controller = new AbortController()
// const { signal } = controller

// import ericCachedGames from '../cache/eric.json'
// import ericLastUpdated from '../cache/eric-last-updated.json'
// import tournamentCachedGames from '../cache/swiss-48jrx3m6.json'

// const wait = (timeToDelay: number) => new Promise((resolve) => setTimeout(resolve, timeToDelay))

import { games, player, Game, Profile } from 'chess-fetcher'

import AccomplishmentScore from './components/AccomplishmentScore.vue'
import ArrowIcon from './components/ArrowIcon.vue'
import ChangelogDate from './components/ChangelogDate.vue'
import DownloadProgress from './components/DownloadProgress.vue'
import LichessLogin from './components/LichessLogin.vue'
import LichessUsername from './components/LichessUsername.vue'
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
    pawnTrapezoid,
    sixPawnsInTheSameFile,
    connectEightOnRank,
    connectDiagonally,
} from './goals/piece-structures'
import { royalFamilyFork } from './goals/royal-family-fork'
import { stalemateTricks, bishopAndKnightMate, twoBishopMate, fourKnightMate, fourKnightCubeMate, sixKnightRectangleMate } from './goals/game-checks'
import { winInsufficientMaterial, clutchPawn } from './goals/dirty-wins'
import { noCapturesBeforeMoveNumber } from './goals/first-capture'
import {
    castleAfterMove40,
    pawnCheckmate,
    g5mate,
    knightCornerMate,
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
import { avoidTheFlagCheckmate } from './goals/avoid-the-flag-checkmate'
import { consecutiveCapturesSameSquare } from './goals/consecutive-captures'
import { ohNoMyQueen } from './goals/oh-no-my-queen'
import { lefongTrap } from './goals/lefong-trap'
import { rosenTrap } from './goals/rosen-trap'
import { alphabetOpening } from './goals/alphabet-openings'
import { TrophyCheckResult } from './types/types'

export default {
    components: {
        AccomplishmentScore,
        ArrowIcon,
        ChangelogDate,
        DownloadProgress,
        LichessLogin,
        LichessUsername,
        RecentUpdates,
        TrophyCollection,
    },
    data() {
        return {
            form: {
                type: 'lichess',
                value: 'EricRosen',
                filters: {
                    sinceHoursAgo: 0,
                },
            },

            // lichessOauthToken: null,

            // isDownloading: false,
            // isDownloadComplete: false,
            errorMsg: '',

            trophyTypeCount: 0,
            trophiesByType: <{ [key: string]: object }>{},

            // counts: {
            //     totalGames: 0,
            //     downloaded: 0,
            //     totalMoves: 0,
            // },
        }
    },

    computed: {
        // sinceTimestamp: function () {
        //     if (this.form.filters.sinceHoursAgo) {
        //         let now = new Date().getTime()
        //         return now - this.form.filters.sinceHoursAgo * 60 * 60 * 1000
        //     }
        // },
        // sinceDateFormatted: function () {
        //     if (this.sinceTimestamp) {
        //         return formatSinceDate(this.sinceTimestamp)
        //     }
        // },
        // totalAccomplishmentsCompleted: function () {
        //     return Object.keys(this.trophiesByType).length
        // },
        // totalAccomplishmentsCompletedPercentage: function () {
        //     return Math.round((this.totalAccomplishmentsCompleted / this.trophyTypeCount) * 100)
        // },
        // trophyCount: function () {
        //     return Object.values(this.trophiesByType)
        //         .map((o) => Object.values(o))
        //         .flat().length
        // },
        // lichessOauthTokenString: function () {
        //     if (this.lichessOauthToken) {
        //         return this.lichessOauthToken.token.value
        //     } else {
        //         return ''
        //     }
        // },
        // usingCachedData: function () {
        //     return this.reportObject.data.username === 'EricRosen' && this.form.filters.sinceHoursAgo === 0
        // },
        // isLocalEnv: function () {
        //     return window.location.href.includes('localhost')
        // },
    },

    // watch: {
    //     filter: {
    //         handler: function (value) {
    //             window.sessionStorage.setItem('savedFilter', JSON.stringify(value))
    //         },
    //         deep: true,
    //     },
    // },

    // mounted: function () {
    //     this.formInputValue = window.sessionStorage.getItem('savedFormInputValue') || ''
    //     this.form.filters = {
    //         sinceHoursAgo: 0,
    //         ...JSON.parse(window.sessionStorage.getItem('savedFilter')),
    //     }
    // },

    methods: {
        onRegisterNewTrophy: function () {
            this.trophyTypeCount++
        },

        formFill: function (value: string) {
            this.form.value = value
        },

        // formInputValueEntered: function () {
        //     this.formInputValue = cleanupLichessUsername(this.formInputValue)

        //     /*
        //      * Save the username form value to the session because
        //      * if they "Login to Lichess" it will be gone when the
        //      * page reloads.
        //      */
        //     window.sessionStorage.setItem('savedFormInputValue', this.formInputValue)
        // },

        // setLichessOauthToken: function (data) {
        //     this.lichessOauthToken = data
        // },

        startDownload: function () {
            if (!this.form.value) {
                this.errorMsg = 'Enter a username or arena URL in Step #1'
                return
            }

            let url = ''
            if (this.form.type === 'lichess') {
                url = `https://lichess.org/@/${this.form.value}`
            } else if (this.form.type === 'chesscom') {
                url = `https://www.chess.com/member/${this.form.value}`
            }

            player(url).then((player: Profile) => {
                console.log(player)
                window.document.title += ` - ${player.title} ${player.username}`
            })

            games(url, this.checkGameForTrophies, {
                max: 1000,
                pgnInJson: true,
                clocks: true,
            })
        },

        checkForTrophy(game: Game, name: string, result: TrophyCheckResult, onMoveNumber?: number) {
            for (const color of result) {
                console.log(name, color, game, onMoveNumber)
            }
        },

        checkGameForTrophies: function (game: Game) {
            // console.log(game)

            // only standard chess starting position games
            if (!game.isStandard) {
                return
            }

            // ignore games against stockfish, anonymous users, and bots
            if (
                typeof game.players.white.username === 'undefined' ||
                typeof game.players.black.username === 'undefined' ||
                game.players.white.title === 'BOT' ||
                game.players.black.title === 'BOT'
            ) {
                return
            }

            if (game.moves.length === 0) {
                return
            }

            this.checkForTrophy(game, 'castleAfterMove40', castleAfterMove40(game.moves))
            this.checkForTrophy(game, 'pawnCheckmate', pawnCheckmate(game.moves))
            this.checkForTrophy(game, 'g5mate', g5mate(game.moves))

            this.checkForTrophy(game, 'knightCornerMate', knightCornerMate(game.moves))
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
            this.checkForTrophy(game, 'avoidTheFlagCheckmate', avoidTheFlagCheckmate(game, game.moves))
            this.checkForTrophy(game, 'consecutiveCapturesSameSquare', consecutiveCapturesSameSquare(game.moves, 10))
            this.checkForTrophy(game, 'ohNoMyQueen', ohNoMyQueen(game.moves))
            this.checkForTrophy(game, 'lefongTrap', lefongTrap(game.moves))
            this.checkForTrophy(game, 'pawnStormOpening', pawnStormOpening(game, game.moves))

            this.checkForTrophy(game, 'checkmateAtMoveNumber:2', checkmateAtMoveNumber(game.moves, 2))
            this.checkForTrophy(game, 'checkmateAtMoveNumber:3', checkmateAtMoveNumber(game.moves, 3))
            this.checkForTrophy(game, 'checkmateAtMoveNumber:4', checkmateAtMoveNumber(game.moves, 4))

            adoptionMatch.processGame(game)
            this.checkForTrophy(game, 'adoptionMatch:10', adoptionMatch.checkForAdoption(game, 10))
            this.checkForTrophy(game, 'adoptionMatch:20', adoptionMatch.checkForAdoption(game, 20))

            for (const word of ['badegg', 'beachcafe', 'beef', 'cabbage', 'chad', 'egg', 'eggegg', 'headache']) {
                this.checkForTrophy(game, `alphabet:${word}`, alphabetOpening(word, game.moves))
            }

            let chessJs = new ChessJS()

            for (const moveNum in game.moves) {
                const moveNumber = parseInt(moveNum)
                chessJs.move(game.moves[moveNumber].notation.notation)
                const fen = chessJs.fen()

                this.checkForTrophy(game, 'quadrupledPawns', quadrupledPawns(fen), moveNumber)
                this.checkForTrophy(game, 'pawnCube', pawnCube(fen), moveNumber)
                this.checkForTrophy(game, 'pawnCubeCenter', pawnCubeCenter(fen), moveNumber)
                this.checkForTrophy(game, 'pawnX', pawnX(fen), moveNumber)
                this.checkForTrophy(game, 'pawnDiamond', pawnDiamond(fen), moveNumber)
                this.checkForTrophy(game, 'pawnDiamondSolid', pawnDiamondSolid(fen), moveNumber)
                this.checkForTrophy(game, 'doublePawnDiamond', doublePawnDiamond(fen), moveNumber)
                this.checkForTrophy(game, 'knightCube', knightCube(fen), moveNumber)
                this.checkForTrophy(game, 'knightRectangle', knightRectangle(fen), moveNumber)
                this.checkForTrophy(game, 'connectEightOnRank:4', connectEightOnRank(fen, 4), moveNumber)
                this.checkForTrophy(game, 'connectEightOnRank:5', connectEightOnRank(fen, 5), moveNumber)
                this.checkForTrophy(game, 'connectEightOnRank:6', connectEightOnRank(fen, 6), moveNumber)
                this.checkForTrophy(game, 'connectEightOnRank:7', connectEightOnRank(fen, 7), moveNumber)
                this.checkForTrophy(game, 'connectDiagonally:5', connectDiagonally(fen, 5), moveNumber)
                this.checkForTrophy(game, 'connectDiagonally:6', connectDiagonally(fen, 6), moveNumber)
                this.checkForTrophy(game, 'pawnTrapezoid', pawnTrapezoid(fen), moveNumber)
                this.checkForTrophy(game, 'sixPawnsInTheSameFile', sixPawnsInTheSameFile(fen), moveNumber)
            }

            const fen = chessJs.fen()

            this.checkForTrophy(game, 'stalemateTricks', stalemateTricks(game, fen))
            this.checkForTrophy(game, 'bishopAndKnightMate', bishopAndKnightMate(game, fen))
            this.checkForTrophy(game, 'twoBishopMate', twoBishopMate(game, fen))
            this.checkForTrophy(game, 'fourKnightMate', fourKnightMate(game, fen))
            this.checkForTrophy(game, 'fourKnightCubeMate', fourKnightCubeMate(game, fen))
            this.checkForTrophy(game, 'sixKnightRectangleMate', sixKnightRectangleMate(game, fen))

            this.checkForTrophy(game, 'winInsufficientMaterial', winInsufficientMaterial(game, fen))
            this.checkForTrophy(game, 'clutchPawn', clutchPawn(game, fen))
            this.checkForTrophy(game, 'doubleCheckCheckmate', doubleCheckCheckmate(game, fen))
        },
    },
}
</script>
