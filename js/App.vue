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
            v-if="!isDownloading && !reportObject.data"
        >
            <form @submit.prevent="startDownload">
                <div class="flex flex-row mb-4">
                    <div class="basis-1/4 text-2xl md:text-5xl text-center font-bold italic">
                        1
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="inline h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                    <div class="basis-3/4">
                        Enter Lichess.org username or arena URL:

                        <input
                            type="text"
                            class="block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Lichess username or arena URL here"
                            spellcheck="false"
                            v-model="formInputValue"
                            @change="formInputValueEntered"
                        />

                        <div class="text-sm">
                            Or
                            <span
                                class="dotted-underline text-sky-900 cursor-pointer"
                                @click.prevent="formFill('EricRosen')"
                            >
                                click here to see EricRosen's
                            </span>
                        </div>
                    </div>
                </div>

                <div class="flex flex-row mb-4">
                    <div class="basis-1/4 text-2xl md:text-5xl text-center font-bold italic">
                        2
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="inline h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                    <div class="basis-3/4">
                        <lichess-login v-on:set-lichess-oauth-token="setLichessOauthToken"></lichess-login>
                    </div>
                </div>

                <div class="flex flex-row">
                    <div class="basis-1/4 text-2xl md:text-5xl text-center font-bold italic">
                        3
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="inline h-8 w-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </div>
                    <div class="basis-3/4">
                        <div class="text-sm mt-1 mb-2" v-if="!formInputValue.includes('lichess.org')">
                            Check games since
                            <select
                                v-model.number="filter.sinceHoursAgo"
                                class="bg-transparent border-b border-dotted border-sky-900 focus:outline-0 hover:border-dashed text-sky-900 md:w-28"
                            >
                                <option :value="6">6 hours ago</option>
                                <option :value="24">yesterday</option>
                                <option :value="24 * 7">last week</option>
                                <option :value="24 * 31">last month</option>
                                <option :value="0">forever</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            class="px-6 py-2.5 bg-green-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-600 hover:shadow-lg focus:bg-green-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-700 active:shadow-lg transition duration-150 ease-in-out"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="inline h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
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
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                class="inline h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
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

            <div class="border-t border-gray-300 mt-4 text-bold font-bold pt-2">Recent Updates</div>
            <ul class="text-sm">
                <li>
                    <changelog-date :year="2022" :month="11" :day="3"></changelog-date>
                    - Added
                    <a
                        href="https://lichess.org/2gQ8HOw1#65"
                        target="_blank"
                        class="dotted-underline text-sky-900 cursor-pointer"
                        >"Pawn X" trophy</a
                    >
                </li>
                <li>
                    <changelog-date :year="2022" :month="10" :day="2"></changelog-date>
                    - Added
                    <a
                        href="https://lichess.org/V0NGitnD/black#66"
                        target="_blank"
                        class="dotted-underline text-sky-900 cursor-pointer"
                        >"Double Pawn Diamond" trophy</a
                    >
                </li>
                <li>
                    <changelog-date :year="2022" :month="8" :day="21"></changelog-date>
                    - Eric gets
                    <a
                        href="https://www.youtube.com/watch?v=mx9SCz4yDdE"
                        target="_blank"
                        class="dotted-underline text-sky-900 cursor-pointer"
                        >his 1,000th Rosen Trophy</a
                    >
                </li>
                <li>
                    <changelog-date :year="2022" :month="7" :day="25"></changelog-date>
                    - Added
                    <a
                        href="https://lichess.org/FuPe9gyS/black#128"
                        target="_blank"
                        class="dotted-underline text-sky-900 cursor-pointer"
                        >"2-Bishop Checkmate" trophy</a
                    >
                </li>
                <li>
                    <changelog-date :year="2022" :month="5" :day="20"></changelog-date>
                    - Added
                    <a
                        href="https://lichess.org/Ak0Bhmx8/black#46"
                        target="_blank"
                        class="dotted-underline text-sky-900 cursor-pointer"
                        >"Solid Pawn Diamond" trophy</a
                    >
                </li>
                <li>
                    <changelog-date :year="2022" :month="5" :day="8"></changelog-date>
                    - Added
                    <a
                        href="https://lichess.org/OtlF3AfG#27"
                        target="_blank"
                        class="dotted-underline text-sky-900 cursor-pointer"
                        >"Double-Check Checkmate" trophy</a
                    >
                </li>
                <li>
                    <changelog-date :year="2022" :month="5" :day="5"></changelog-date>
                    - Added
                    <a
                        href="https://twitter.com/lichess/status/1521874769288876033"
                        target="_blank"
                        class="dotted-underline text-sky-900 cursor-pointer"
                        >Adoption Match trophies</a
                    >
                </li>
                <li>
                    <changelog-date :year="2022" :month="4" :day="15"></changelog-date>
                    - See who got trophies in an arena by
                    <span
                        class="dotted-underline text-sky-900 cursor-pointer"
                        @click.prevent="formFill('https://lichess.org/swiss/48jrx3m6')"
                    >
                        entering a tournament URL
                    </span>
                </li>
            </ul>
        </div>

        <download-progress
            v-if="isDownloading && reportObject.data"
            :title="reportObject.data.username || reportObject.data.fullName || reportObject.data.name"
            :positions="counts.totalMoves"
            :downloaded="counts.downloaded"
            :total="counts.totalGames"
            :hideProgressBar="usingCachedData || filter.sinceHoursAgo"
            @cancel-download="cancelFetch"
        ></download-progress>

        <div v-if="reportObject.data" class="mt-8 bg-sky-800 p-4 text-center rounded-lg">
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
                {{ totalAccomplishmentsPossible }})
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
        </div>

        <div class="md:flex md:flex-row md:space-x-4">
            <div class="basis-1/2">
                <h2 class="heading">Make Eric Proud</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Oh No My Queen"
                        desc="Sacrifice your Queen for mate"
                        :games="pointsByAccomplishment['ohNoMyQueen']"
                        gameLink="https://lichess.org/heNcmap1#39"
                        youtubeLink="https://youtu.be/x24BFszZ5Zw?t=189"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Stalemate Tricks"
                        desc="Stalemate from a losing position"
                        :games="pointsByAccomplishment['stalemateTricks']"
                        gameLink="https://lichess.org/LahQPSJt#134"
                        youtubeLink="https://www.youtube.com/watch?v=aNDNwB2nruA"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Rosen Trap"
                        desc="King goes to the corner instead of capturing the queen"
                        :games="pointsByAccomplishment['rosenTrap']"
                        gameLink="https://lichess.org/fBcFhVs4#90"
                        youtubeLink="https://youtu.be/ixAw0ED-Sfs"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Castle Fork"
                        desc="Castle with check and then your king captures a piece"
                        :games="pointsByAccomplishment['castleFork']"
                        gameLink="https://lichess.org/xEjSVeYp#41"
                        youtubeLink="https://www.youtube.com/watch?v=_nvoEbgzsb0"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">Pawn Structures</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Connect 5"
                        desc="Connect 5 of your pawns diagonally"
                        :games="pointsByAccomplishment['connectFive']"
                        gameLink="https://lichess.org/FL2vDAZL#37"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Pawn Diamond"
                        desc="Does your pawn diamond last forever?"
                        :games="pointsByAccomplishment['pawnDiamond']"
                        gameLink="https://lichess.org/d43FgnVj/black#32"
                        youtubeLink="https://youtu.be/J3TSlTZpBfc?t=456"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Connect 6"
                        desc="Connect 6 of your pawns diagonally"
                        :games="pointsByAccomplishment['connectSix']"
                        gameLink="https://lichess.org/CXvrZTzL#73"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Double Pawn Diamond"
                        :games="pointsByAccomplishment['doublePawnDiamond']"
                        gameLink="https://lichess.org/V0NGitnD/black#66"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Pawn X"
                        desc="X-formation with pawns"
                        :games="pointsByAccomplishment['pawnX']"
                        gameLink="https://lichess.org/2gQ8HOw1#65"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Solid Pawn Diamond"
                        desc="A 5 carat pawn diamond"
                        :games="pointsByAccomplishment['pawnDiamondSolid']"
                        gameLink="https://lichess.org/Ak0Bhmx8/black#46"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Pawn Cube"
                        desc="Is your pawn cube indestructible?"
                        :games="pointsByAccomplishment['pawnCube']"
                        gameLink="https://lichess.org/lhkF3hJB/black#22"
                        youtubeLink="https://www.youtube.com/watch?v=Q7fQQB1bgxQ"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Center Pawn Cube"
                        desc="Pawn cube in the exact center of the board"
                        :games="pointsByAccomplishment['pawnCubeCenter']"
                        gameLink="https://lichess.org/EXwOWSu5/black#48"
                        youtubeLink="https://youtu.be/x8t-MlIWE3w?t=573"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Quadrupled Pawns"
                        desc="4 pawns on the same file"
                        :games="pointsByAccomplishment['quadrupledPawns']"
                        gameLink="https://lichess.org/aqADXuJT#85"
                        youtubeLink="https://youtu.be/3jyX_8JX9xg?t=9581"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Pawn Trapezoid"
                        desc="Make a pawn trapezoid with the base on your 4th or 5th rank"
                        :games="pointsByAccomplishment['pawnTrapezoid']"
                        gameLink="https://lichess.org/38zR9IeJ#57"
                        youtubeLink="https://youtu.be/Nuv_7hc7NSA?t=729"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Connect 8 on 4th Rank"
                        :games="pointsByAccomplishment['connectEightOnRank4']"
                        gameLink="https://lichess.org/ZRXFIlZI#87"
                        youtubeLink="https://youtu.be/AuIElYfxrEk?t=537"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Connect 8 on 5th Rank"
                        :games="pointsByAccomplishment['connectEightOnRank5']"
                        gameLink="https://lichess.org/ZRXFIlZI#109"
                        youtubeLink="https://youtu.be/AuIElYfxrEk?t=594"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Connect 8 on 6th Rank"
                        :games="pointsByAccomplishment['connectEightOnRank6']"
                        gameLink="https://lichess.org/ZRXFIlZI#129"
                        youtubeLink="https://youtu.be/AuIElYfxrEk?t=612"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Connect 8 on 7th Rank"
                        :games="pointsByAccomplishment['connectEightOnRank7']"
                        gameLink="https://lichess.org/ZRXFIlZI#149"
                        youtubeLink="https://youtu.be/AuIElYfxrEk?t=687"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="6 Pawns on the Same File"
                        :games="pointsByAccomplishment['sixPawnsInTheSameFile']"
                        gameLink="https://lichess.org/JCD2jmRs#91"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">Piece Structures</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Knight Cube"
                        :games="pointsByAccomplishment['knightCube']"
                        gameLink="https://lichess.org/KFZm4x4A/black#176"
                        youtubeLink="https://www.youtube.com/watch?v=FqAako5iZN4"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Knight Rectangle"
                        :games="pointsByAccomplishment['knightRectangle']"
                        gameLink="https://lichess.org/zqOlQeBs#207"
                        youtubeLink="https://youtu.be/m_ZKrW0FVZM?t=5587"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">Alphabet Openings</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Egg"
                        desc="Win after spelling &ldquo;egg&rdquo; with pawn moves in the opening"
                        :games="pointsByAccomplishment['alphabet:egg']"
                        gameLink="https://lichess.org/1SHm5hr6/black"
                        youtubeLink="https://www.youtube.com/watch?v=J6G3cP991Yc"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Double Egg (EggEgg)"
                        desc="Win after spelling &ldquo;eggegg&rdquo; with pawn moves in the opening"
                        :games="pointsByAccomplishment['alphabet:eggegg']"
                        gameLink="https://lichess.org/f2zcFx6P/black"
                        youtubeLink="https://www.youtube.com/watch?v=J6G3cP991Yc"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Bad Egg"
                        desc="Win after spelling &ldquo;badegg&rdquo; with pawn moves in the opening"
                        :games="pointsByAccomplishment['alphabet:badegg']"
                        gameLink="https://lichess.org/mu679bhr/black"
                        youtubeLink="https://youtu.be/jH3pPDnoqnU?t=1472"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="BeachCaf&eacute;"
                        desc="Win after spelling &ldquo;beachcafe&rdquo; with pawn moves in the opening"
                        :games="pointsByAccomplishment['alphabet:beachcafe']"
                        gameLink="https://lichess.org/p5Ldb6wA"
                        youtubeLink="https://www.youtube.com/watch?v=kGYOzdBsjcg"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Beef"
                        desc="Win after spelling &ldquo;beef&rdquo; with pawn moves in the opening"
                        :games="pointsByAccomplishment['alphabet:beef']"
                        gameLink="https://lichess.org/dUkHbvOR"
                        youtubeLink="https://youtu.be/jH3pPDnoqnU?t=1583"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Cabbage"
                        desc="Win after spelling &ldquo;cabbage&rdquo; with pawn moves in the opening"
                        :games="pointsByAccomplishment['alphabet:cabbage']"
                        gameLink="https://lichess.org/LMpwnmLz"
                        youtubeLink="https://www.youtube.com/watch?v=GDhtMqBk9M4"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Chad"
                        desc="Win after spelling &ldquo;chad&rdquo; with pawn moves in the opening"
                        :games="pointsByAccomplishment['alphabet:chad']"
                        gameLink="https://lichess.org/AaNGZKcj/black"
                        youtubeLink="https://youtu.be/jH3pPDnoqnU?t=1305"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Headache"
                        desc="Win after spelling &ldquo;headache&rdquo; with pawn moves in the opening"
                        :games="pointsByAccomplishment['alphabet:headache']"
                        gameLink="https://lichess.org/SdbD4znE"
                    ></accomplishment-score>
                </div>
            </div>
            <div class="basis-1/2">
                <h2 class="heading">Checkmates</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Checkmate with a Pawn"
                        desc="A pawn delivers mate"
                        :games="pointsByAccomplishment['pawnCheckmate']"
                        gameLink="https://lichess.org/52RAfF6v#99"
                        youtubeLink="https://www.youtube.com/watch?v=mx9SCz4yDdE"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Checkmate with King"
                        desc="Move your king with a discovery or by castling"
                        :games="pointsByAccomplishment['checkmateWithKing']"
                        gameLink="https://lichess.org/JCR11y6i/black#148"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Smothered Mate"
                        :games="pointsByAccomplishment['smotheredMate']"
                        gameLink="https://lichess.org/YOdmkxyk#59"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Smothered Pork Checkmate"
                        desc="Smother + Pin + Fork"
                        :games="pointsByAccomplishment['smotheredPorkMate']"
                        gameLink="https://lichess.org/39vtGApM#47"
                        youtubeLink="https://www.youtube.com/watch?v=OAnC3gt_DqE"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="En Passant Checkmate"
                        desc="Checkmate by capturing en passant"
                        :games="pointsByAccomplishment['enPassantCheckmate']"
                        gameLink="https://lichess.org/LY5WQjXL/black#72"
                        youtubeLink="https://youtu.be/6zT83p6pMHg?t=390"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="g5#"
                        desc="Pawn checkmate on g5"
                        :games="pointsByAccomplishment['g5mate']"
                        gameLink="https://lichess.org/UbOofpwX/black#74"
                        youtubeLink="https://youtu.be/3l6BeM45ay8?t=898"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Double-Check Checkmate"
                        desc="2 pieces are attacking the king and it's checkmate"
                        :games="pointsByAccomplishment['doubleCheckCheckmate']"
                        gameLink="https://lichess.org/OtlF3AfG#27"
                        youtubeLink="https://youtu.be/8ly5yA6tiEY?t=1082"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Block a Check with Checkmate"
                        desc="Call an ambulance... but not for me"
                        :games="pointsByAccomplishment['blockCheckWithCheckmate']"
                        gameLink="https://lichess.org/DrC87aK3#81"
                        youtubeLink="https://youtu.be/kDGY77nkZHc?t=276"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="O-O#"
                        desc="Castle kingside with mate"
                        :games="pointsByAccomplishment['castleKingsideWithCheckmate']"
                        gameLink="https://lichess.org/BJvbtS9B#49"
                        youtubeLink="https://youtu.be/UxZc7ZF2uOY?t=207"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="O-O-O#"
                        desc="Castle queenside with mate"
                        :games="pointsByAccomplishment['castleQueensideWithCheckmate']"
                        gameLink="https://lichess.org/7fmGBmKz/black#28"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Promote to Bishop Checkmate"
                        :games="pointsByAccomplishment['promoteToBishopCheckmate']"
                        gameLink="https://lichess.org/9jkxqDKV#95"
                        youtubeLink="https://youtu.be/vSPxtspv57Q?t=11974"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Promote to Knight Checkmate"
                        :games="pointsByAccomplishment['promoteToKnightCheckmate']"
                        gameLink="https://lichess.org/USOysGtc#77"
                        youtubeLink="https://youtu.be/RUJk3N6yF4g?t=3055"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Bishop + Knight Checkmate"
                        :games="pointsByAccomplishment['bishopAndKnightMate']"
                        gameLink="https://lichess.org/PDfvROnh#205"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="2-Bishop Checkmate"
                        desc="Checkmate when you only have 2 bishops"
                        :games="pointsByAccomplishment['twoBishopMate']"
                        gameLink="https://lichess.org/FuPe9gyS/black#128"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Knight-to-the-Corner Checkmate"
                        desc="Knight moves to a corner of the board with checkmate"
                        :games="pointsByAccomplishment['knightCornerMate']"
                        gameLink="https://lichess.org/s01MVu7c/black#82"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="4-Knight Checkmate"
                        :games="pointsByAccomplishment['fourKnightMate']"
                        gameLink="https://lichess.org/KFZm4x4A/black#180"
                        youtubeLink="https://www.youtube.com/watch?v=FqAako5iZN4"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="4-Knight Cube Checkmate"
                        desc="You have 4 knights and checkmate from a cube"
                        :games="pointsByAccomplishment['fourKnightCubeMate']"
                        gameLink="https://lichess.org/Rggdy0rY/black#152"
                        youtubeLink="https://youtu.be/FqAako5iZN4?t=50"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="6-Knight Rectangle Checkmate"
                        :games="pointsByAccomplishment['sixKnightRectangleMate']"
                        gameLink="https://lichess.org/zqOlQeBs#207"
                        youtubeLink="https://youtu.be/m_ZKrW0FVZM?t=5611"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Avoid-the-Flag Checkmate"
                        desc="Make 20+ moves with 1 second left + checkmate"
                        :games="pointsByAccomplishment['premovesWithOneSecondLeft']"
                        gameLink="https://lichess.org/Wi5bzNTB#110"
                        youtubeLink="https://www.youtube.com/watch?v=KZ6ANZK44no"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Checkmate in 2 Moves"
                        desc="Deliver checkmate in 2 moves"
                        :games="pointsByAccomplishment['quickCheckmate:2']"
                        gameLink="https://lichess.org/Fnb8yHd2/black"
                        youtubeLink="https://www.youtube.com/watch?v=broDeIZMGto"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Checkmate in 3 Moves"
                        desc="Deliver checkmate in 3 moves"
                        :games="pointsByAccomplishment['quickCheckmate:3']"
                        gameLink="https://lichess.org/BIklhPjL"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Checkmate in 4 Moves"
                        desc="Deliver checkmate in 4 moves"
                        :games="pointsByAccomplishment['quickCheckmate:4']"
                        gameLink="https://lichess.org/u0SKphmW/black"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">There's a Funny Line</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Castle after Move 40"
                        desc="It's never too late to castle"
                        :games="pointsByAccomplishment['castleAfterMove40']"
                        gameLink="https://lichess.org/o2rO7Vcj#95"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Promote a Pawn within 8 Moves"
                        :games="pointsByAccomplishment['promotePawnBeforeMoveNumber']"
                        gameLink="https://lichess.org/jBC2lZJt#13"
                        youtubeLink="https://youtu.be/F-UG_xAJmPo?t=47"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="No Captures before Move 30"
                        desc="All the pieces survive till move 30"
                        :games="pointsByAccomplishment['noCapturesBeforeMove:30']"
                        gameLink="https://lichess.org/iZCR89Dt#65"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="10+ Consecutive Captures on the Same Square"
                        desc="&ldquo;We have captures, captures, captures, captures, captures...&rdquo; &#8288;&#8211;&#8288;Agadmator"
                        :games="pointsByAccomplishment['consecutiveCaptures:sameSquare']"
                        gameLink="https://lichess.org/UIMR4eJL/black#56"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="12 Pawn Move Opening Win"
                        desc="Win a game after 12+ consecutive pawn moves in the opening"
                        :games="pointsByAccomplishment['pawnStormOpening']"
                        gameLink="https://lichess.org/eplysicB"
                        youtubeLink="https://www.youtube.com/watch?v=jr-r-0UU-WQ"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Royal Family Fork"
                        desc="Knight forks K+Q+R and 1 other piece"
                        :games="pointsByAccomplishment['megaFork']"
                        gameLink="https://lichess.org/VNAD1RDx#47"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">Adoption Matches</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Adoption"
                        desc="Win 10 consecutive games against the same opponent"
                        :units="['Match', 'Matches']"
                        :games="pointsByAccomplishment['adoptionMatch:10']"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Double Adoption"
                        desc="Win 20 consecutive games against the same opponent"
                        :units="['Match', 'Matches']"
                        :games="pointsByAccomplishment['adoptionMatch:20']"
                    ></accomplishment-score>
                </div>

                <h2 class="heading">I feel so dirty</h2>
                <div class="grid grid-cols-2 gap-2">
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Clutch Pawn"
                        desc="Win with 1 pawn while down 10+ points in material"
                        :games="pointsByAccomplishment['clutchPawn']"
                        gameLink="https://lichess.org/tgMQgOSk#149"
                        youtubeLink="https://youtu.be/ihBnAuO7AtM?t=459"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Win with Insufficient Material"
                        desc="Flag your opponent with only a knight or bishop"
                        :games="pointsByAccomplishment['winInsufficientMaterial']"
                        gameLink="https://lichess.org/nYz9xUgc#141"
                        youtubeLink="https://www.youtube.com/watch?v=vBf4rA4j8_w&t=15468s"
                    ></accomplishment-score>
                    <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Lefong Trap"
                        desc="Capture a premoved fianchettoed bishop"
                        :games="pointsByAccomplishment['lefongTrap']"
                        gameLink="https://lichess.org/ix4lZu8Q/black#6"
                        youtubeLink="https://youtu.be/vBf4rA4j8_w?t=2671"
                    ></accomplishment-score>
                    <!-- <accomplishment-score
                        @register-new-goal="onRegisterNewGoal"
                        title="Queen Fork Uno Reverse"
                        desc="Block a Queen check by hanging a forked piece, then capture the Queen"
                        :games="pointsByAccomplishment['queenForkReverse']"
                        gameLink="https://lichess.org/r4TFHZev#100"
                        youtubeLink="https://youtu.be/6oSCJJlFQUA?t=580"
                    ></accomplishment-score> -->
                </div>
            </div>
        </div>

        <div class="text-sm text-center text-slate-400 mt-8">
            Not affiliated with Eric Rosen. Find a bug? Have a comment? Fill out
            <a href="https://forms.gle/N1EnqmygRqo3sAMs5" target="_blank" class="dotted-underline">this form</a>.
        </div>

        <div class="text-sm text-center text-slate-400 mt-8" v-if="isLocalEnv">
            <a href="" @click.prevent="getCacheUpdateCommand">getCacheUpdateCommand</a>
        </div>
    </div>
</template>

<script>
import readStream from './browser-ndjson-stream-reader.js'
import { Chess as ChessJS } from 'chess.js'

import alphabetOpeningSearch from './utils/alphabet-opening-search.js'
import cleanupLichessUsername from './utils/cleanup-lichess-username.js'
import fenToPosition from './utils/fen-to-position.js'
import formatSinceDate from './utils/format-since-date.js'
import getPiecesOnFiles from './utils/position-to-files.js'
import pgnFormatter from './utils/pgn-formatter.js'
import scoring from './utils/scoring.js'

import adoptionMatch from './goals/adoption-match.js'
import alphabetOpenings from './goals/alphabet-openings.js'
import blockCheckWithCheckmate from './goals/block-check-with-checkmate.js'
import castleFork from './goals/castle-fork.js'
import consecutiveCaptures from './goals/consecutive-captures.js'
import dirtyWins from './goals/dirty-wins.js'
import doubleCheckCheckmate from './goals/double-check-checkmate.js'
import firstCapture from './goals/first-capture.js'
import gameChecks from './goals/game-checks.js'
import lefongTrap from './goals/lefong-trap.js'
import queenForkReverse from './goals/queen-fork-reverse.js'
import megaFork from './goals/mega-fork.js'
import moveChecks from './goals/move-checks.js'
import ohNoMyQueen from './goals/oh-no-my-queen.js'
import pawnStormOpening from './goals/pawn-storm-opening.js'
import pieceStructures from './goals/piece-structures.js'
import premovesWithOneSecondLeft from './goals/premoves-with-one-second-left.js'
import rosenTrap from './goals/rosen-trap.js'
import smotheredMate from './goals/smothered-mate.js'
import smotheredPorkMate from './goals/smothered-pork-mate.js'

const controller = new AbortController()
const { signal } = controller

import ericCachedGames from '../cache/eric.json'
import ericLastUpdated from '../cache/eric-last-updated.json'
import tournamentCachedGames from '../cache/swiss-48jrx3m6.json'

const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay))

import AccomplishmentScore from './components/AccomplishmentScore.vue'
import ChangelogDate from './components/ChangelogDate.vue'
import DownloadProgress from './components/DownloadProgress.vue'
import LichessLogin from './components/LichessLogin.vue'
import LichessUsername from './components/LichessUsername.vue'
import TrophyCollection from './components/TrophyCollection.vue'

export default {
    components: {
        AccomplishmentScore,
        ChangelogDate,
        DownloadProgress,
        LichessLogin,
        LichessUsername,
        TrophyCollection,
    },
    data() {
        return {
            lichessOauthToken: null,

            formInputValue: '',
            filter: {},
            reportObject: {},

            isDownloading: false,
            isDownloadComplete: false,
            errorMsg: '',

            totalAccomplishmentsPossible: 0,
            pointsByAccomplishment: {},

            counts: {
                totalGames: 0,
                downloaded: 0,
                totalMoves: 0,
            },
        }
    },

    computed: {
        sinceTimestamp: function () {
            if (this.filter.sinceHoursAgo) {
                let now = new Date().getTime()
                return now - this.filter.sinceHoursAgo * 60 * 60 * 1000
            }
        },

        sinceDateFormatted: function () {
            if (this.sinceTimestamp) {
                return formatSinceDate(this.sinceTimestamp)
            }
        },

        totalAccomplishmentsCompleted: function () {
            return Object.keys(this.pointsByAccomplishment).length
        },

        totalAccomplishmentsCompletedPercentage: function () {
            return Math.round((this.totalAccomplishmentsCompleted / this.totalAccomplishmentsPossible) * 100)
        },

        trophyCount: function () {
            return Object.values(this.pointsByAccomplishment)
                .map((o) => Object.values(o))
                .flat().length
        },

        lichessOauthTokenString: function () {
            if (this.lichessOauthToken) {
                return this.lichessOauthToken.token.value
            } else {
                return ''
            }
        },

        usingCachedData: function () {
            return this.reportObject.data.username === 'EricRosen' && this.filter.sinceHoursAgo === 0
        },

        isLocalEnv: function () {
            return window.location.href.includes('localhost')
        },
    },

    watch: {
        filter: {
            handler: function (value) {
                window.sessionStorage.setItem('savedFilter', JSON.stringify(value))
            },
            deep: true,
        },
    },

    mounted: function () {
        this.formInputValue = window.sessionStorage.getItem('savedFormInputValue') || ''
        this.filter = {
            sinceHoursAgo: 0,
            ...JSON.parse(window.sessionStorage.getItem('savedFilter')),
        }
    },

    methods: {
        onRegisterNewGoal: function () {
            this.totalAccomplishmentsPossible++
        },

        formFill: function (value) {
            this.formInputValue = value
            this.formInputValueEntered()
        },

        formInputValueEntered: function () {
            this.formInputValue = cleanupLichessUsername(this.formInputValue)

            /*
             * Save the username form value to the session because
             * if they "Login to Lichess" it will be gone when the
             * page reloads.
             */
            window.sessionStorage.setItem('savedFormInputValue', this.formInputValue)
        },

        setLichessOauthToken: function (data) {
            this.lichessOauthToken = data
        },

        fetchJsonEndpoint: function (url) {
            return fetch(url, {
                headers: {
                    Authorization: `Bearer ${this.lichessOauthTokenString}`,
                },
            }).then((response) => response.json())
        },

        startDownload: function () {
            if (!this.formInputValue) {
                this.errorMsg = 'Enter a username or arena URL in Step #1'
                return
            }

            if (this.formInputValue.includes('/tournament/')) {
                // Arena tournament
                this.reportObject.type = 'arena'
                let tournamentId = this.formInputValue.split('/').pop()
                this.fetchJsonEndpoint(`https://lichess.org/api/tournament/${tournamentId}`)
                    .then(
                        function (data) {
                            if (!data.isFinished) {
                                this.errorMsg = 'Tournament not over yet.'
                                return
                            }

                            if (data.stats.games > 50000) {
                                this.errorMsg = 'Marathon tournaments are a little too big.'
                                return
                            }

                            this.counts.totalGames = data.stats.games
                            this.reportObject.data = data

                            window.document.title = `${window.document.title} - ${data.fullName}`

                            let url = `https://lichess.org/api/tournament/${tournamentId}/games?pgnInJson=true&clocks=true`

                            this.fetchGames(url)
                        }.bind(this)
                    )
                    .catch((e) => {
                        this.errorMsg = 'Tournament not found.'
                    })
            } else if (this.formInputValue.includes('/swiss/')) {
                // Swiss tournament
                this.reportObject.type = 'swiss'
                let tournamentId = this.formInputValue.split('/').pop()
                this.fetchJsonEndpoint(`https://lichess.org/api/swiss/${tournamentId}`)
                    .then(
                        async function (data) {
                            if (data.status !== 'finished') {
                                this.errorMsg = 'Tournament not over yet.'
                                return
                            }

                            this.counts.totalGames = data.stats.games
                            this.reportObject.data = data

                            window.document.title = `${window.document.title} - ${data.name}`

                            // The example tournament is cached so we don't
                            // have to request from the Lichess API
                            if (tournamentId === '48jrx3m6') {
                                this.isDownloading = true

                                for (const gameJson of tournamentCachedGames) {
                                    this.processGame(gameJson)
                                    await wait(2)
                                }

                                this.streamComplete()

                                return
                            }

                            let url = `https://lichess.org/api/swiss/${tournamentId}/games?pgnInJson=true&clocks=true`
                            this.fetchGames(url)
                        }.bind(this)
                    )
                    .catch((e) => {
                        this.errorMsg = 'Tournament not found.'
                    })
            } else {
                // User
                this.reportObject.type = 'user'

                this.fetchJsonEndpoint(`https://lichess.org/api/user/${this.formInputValue}`)
                    .then(
                        async function (data) {
                            this.counts.totalGames = data.count.all
                            this.reportObject.data = data

                            window.document.title = `${window.document.title} - ${data.username}`

                            let url = `https://lichess.org/api/games/user/${data.id}?pgnInJson=true&clocks=true`

                            // EricRosen's games are pre-downloaded and filtered to only include matching games
                            if (this.usingCachedData) {
                                this.isDownloading = true

                                for (const gameJson of ericCachedGames) {
                                    this.processGame(gameJson)
                                    await wait(2)
                                }

                                url += '&since=' + ericLastUpdated
                            } else {
                                url += '&since=' + this.sinceTimestamp
                            }

                            // url = new URL('../cache/ericrosen.txt', import.meta.url)

                            this.fetchGames(url)
                        }.bind(this)
                    )
                    .catch((e) => {
                        this.errorMsg = 'Lichess user not found'
                    })
            }
        },

        addTrophyForColor: function (color, label, game, onMoveNumber) {
            if (color === 'w') {
                color = 'white'
            } else if (color === 'b') {
                color = 'black'
            }

            // console.log(`${label}: adding for ${color}`, `https://lichess.org/${game.id}`)

            let logRecord = {}

            let anchorLink
            if (onMoveNumber) {
                onMoveNumber = parseInt(onMoveNumber) + 1
                anchorLink = '#' + onMoveNumber
            } else {
                anchorLink = ''
            }

            if (this.reportObject.type === 'user') {
                if (this.reportObject.data.id !== game.players[color].user.id) {
                    return
                }

                if (this.reportObject.data.id === game.players.white.user.id) {
                    logRecord.opponent = game.players.black.user
                    logRecord.gameLink = `https://lichess.org/${game.id}${anchorLink}`
                } else {
                    logRecord.opponent = game.players.white.user
                    logRecord.gameLink = `https://lichess.org/${game.id}/black${anchorLink}`
                }
            } else {
                logRecord.opponent = game.players[color].user
                logRecord.gameLink = `https://lichess.org/${game.id}/${color}${anchorLink}`
            }

            if (!this.pointsByAccomplishment[label]) {
                this.pointsByAccomplishment[label] = {}
            }

            // console.log(`${label}: adding for ${color}`, logRecord.link, logRecord)

            if (!this.pointsByAccomplishment[label][game.id]) {
                this.pointsByAccomplishment[label][game.id] = logRecord
            }
        },

        checkForAccomplishment: function (color, label, game, onMoveNumber) {
            if (typeof color === 'object') {
                for (const c of color) {
                    this.addTrophyForColor(c, label, game, onMoveNumber)
                }
            } else if (color) {
                this.addTrophyForColor(color, label, game, onMoveNumber)
            }
        },

        cancelFetch: function () {
            controller.abort()

            this.isDownloading = false
        },

        fetchGames: function (url) {
            this.isDownloading = true

            const stream = fetch(url, {
                headers: {
                    Accept: 'application/x-ndjson',
                    Authorization: `Bearer ${this.lichessOauthTokenString}`,
                },
                signal,
            })

            stream.then(readStream(this.processGame)).then(this.streamComplete)
        },

        streamComplete: function () {
            this.isDownloading = false
            this.isDownloadComplete = true
        },

        processGame: function (gameInfoJson) {
            this.counts.downloaded++

            // only standard chess starting position games
            if (gameInfoJson.variant !== 'standard') {
                return
            }

            // ignore games against stockfish or anonymous users
            if (
                typeof gameInfoJson.players.white.user === 'undefined' ||
                typeof gameInfoJson.players.black.user === 'undefined'
            ) {
                return
            }

            // ignore games against bots
            if (gameInfoJson.players.white.user.title === 'BOT' || gameInfoJson.players.black.user.title === 'BOT') {
                return
            }

            let moves = pgnFormatter(gameInfoJson.moves).split(' ').filter(Boolean)

            if (!moves.length) {
                return
            }

            let chessJS = new ChessJS()
            let position

            this.counts.totalMoves += moves.length

            for (const move in moves) {
                let moveInfo = chessJS.move(moves[move])
                position = fenToPosition(chessJS.fen())
                let piecesOnFiles = getPiecesOnFiles(position)

                this.checkForAccomplishment(
                    moveChecks.castleAfterMove40(moveInfo, move),
                    'castleAfterMove40',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(
                    moveChecks.pawnCheckmate(moveInfo, move),
                    'pawnCheckmate',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(moveChecks.g5mate(moveInfo), 'g5mate', gameInfoJson, move)
                this.checkForAccomplishment(
                    moveChecks.knightCornerMate(moveInfo, move),
                    'knightCornerMate',
                    gameInfoJson,
                    move
                )

                this.checkForAccomplishment(
                    moveChecks.enPassantCheckmate(moveInfo, move, true),
                    'enPassantCheckmate',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(
                    moveChecks.castleKingsideWithCheckmate(moveInfo, move),
                    'castleKingsideWithCheckmate',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(
                    moveChecks.castleQueensideWithCheckmate(moveInfo, move),
                    'castleQueensideWithCheckmate',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(
                    moveChecks.checkmateWithKing(moveInfo, move),
                    'checkmateWithKing',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(
                    moveChecks.promoteToBishopCheckmate(moveInfo, move),
                    'promoteToBishopCheckmate',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(
                    moveChecks.promoteToKnightCheckmate(moveInfo, move),
                    'promoteToKnightCheckmate',
                    gameInfoJson,
                    move
                )

                this.checkForAccomplishment(
                    moveChecks.promotePawnBeforeMoveNumber(moveInfo, move, 8),
                    'promotePawnBeforeMoveNumber',
                    gameInfoJson,
                    move
                )

                this.checkForAccomplishment(
                    pieceStructures.quadrupledPawns(piecesOnFiles),
                    'quadrupledPawns',
                    gameInfoJson,
                    move
                )

                this.checkForAccomplishment(pieceStructures.pawnCube(position), 'pawnCube', gameInfoJson, move)
                this.checkForAccomplishment(
                    pieceStructures.pawnCubeCenter(position),
                    'pawnCubeCenter',
                    gameInfoJson,
                    move
                )

                this.checkForAccomplishment(pieceStructures.pawnX(position), 'pawnX', gameInfoJson, move)

                this.checkForAccomplishment(pieceStructures.pawnDiamond(position), 'pawnDiamond', gameInfoJson, move)
                this.checkForAccomplishment(
                    pieceStructures.pawnDiamondSolid(position),
                    'pawnDiamondSolid',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(
                    pieceStructures.doublePawnDiamond(position),
                    'doublePawnDiamond',
                    gameInfoJson,
                    move
                )

                this.checkForAccomplishment(pieceStructures.knightCube(position), 'knightCube', gameInfoJson, move)
                this.checkForAccomplishment(
                    pieceStructures.knightRectangle(position),
                    'knightRectangle',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(
                    pieceStructures.connectEightOnRank4(position),
                    'connectEightOnRank4',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(
                    pieceStructures.connectEightOnRank5(position),
                    'connectEightOnRank5',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(
                    pieceStructures.connectEightOnRank6(position),
                    'connectEightOnRank6',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(
                    pieceStructures.connectEightOnRank7(position),
                    'connectEightOnRank7',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(pieceStructures.connectFive(position), 'connectFive', gameInfoJson, move)
                this.checkForAccomplishment(pieceStructures.connectSix(position), 'connectSix', gameInfoJson, move)
                this.checkForAccomplishment(
                    pieceStructures.pawnTrapezoid(position),
                    'pawnTrapezoid',
                    gameInfoJson,
                    move
                )
                this.checkForAccomplishment(
                    pieceStructures.sixPawnsInTheSameFile(position),
                    'sixPawnsInTheSameFile',
                    gameInfoJson,
                    move
                )

                this.checkForAccomplishment(smotheredMate(chessJS, moveInfo), 'smotheredMate', gameInfoJson, move)
                this.checkForAccomplishment(
                    smotheredPorkMate(chessJS, moveInfo),
                    'smotheredPorkMate',
                    gameInfoJson,
                    move
                )

                this.checkForAccomplishment(megaFork(chessJS, moveInfo, gameInfoJson), 'megaFork', gameInfoJson, move)
            }

            for (let word of ['badegg', 'beachcafe', 'beef', 'cabbage', 'chad', 'egg', 'eggegg', 'headache']) {
                this.checkForAccomplishment(
                    alphabetOpenings.checkWord(word, moves).filter((color) => gameInfoJson.winner === color),
                    `alphabet:${word}`,
                    gameInfoJson
                )
            }

            this.checkForAccomplishment(
                doubleCheckCheckmate(chessJS.fen(), gameInfoJson),
                'doubleCheckCheckmate',
                gameInfoJson,
                moves.length
            )

            this.checkForAccomplishment(
                gameChecks.stalemateTricks(gameInfoJson, position, moves.length % 2 ? 'black' : 'white'),
                'stalemateTricks',
                gameInfoJson,
                moves.length
            )

            this.checkForAccomplishment(
                gameChecks.bishopAndKnightMate(gameInfoJson, position),
                'bishopAndKnightMate',
                gameInfoJson,
                moves.length
            )
            this.checkForAccomplishment(
                gameChecks.twoBishopMate(gameInfoJson, position),
                'twoBishopMate',
                gameInfoJson,
                moves.length
            )

            this.checkForAccomplishment(
                gameChecks.fourKnightMate(gameInfoJson, position),
                'fourKnightMate',
                gameInfoJson,
                moves.length
            )

            this.checkForAccomplishment(
                gameChecks.fourKnightCubeMate(gameInfoJson, position),
                'fourKnightCubeMate',
                gameInfoJson,
                moves.length
            )
            this.checkForAccomplishment(
                gameChecks.sixKnightRectangleMate(gameInfoJson, position),
                'sixKnightRectangleMate',
                gameInfoJson,
                moves.length
            )

            let allMoves = chessJS.history({ verbose: true })

            let firstCaptureAfterMove30 = firstCapture.noCapturesBeforeMoveNumber(allMoves, 30)
            if (firstCaptureAfterMove30) {
                this.addTrophyForColor('white', 'noCapturesBeforeMove:30', gameInfoJson, firstCaptureAfterMove30)
                this.addTrophyForColor('black', 'noCapturesBeforeMove:30', gameInfoJson, firstCaptureAfterMove30)
            }

            this.checkForAccomplishment(rosenTrap(gameInfoJson, allMoves), 'rosenTrap', gameInfoJson, allMoves.length)

            this.checkForAccomplishment(lefongTrap(allMoves), 'lefongTrap', gameInfoJson)

            // let queenForkReverseResult = queenForkReverse(allMoves)
            // if (queenForkReverseResult) {
            //     this.addTrophyForColor(
            //         queenForkReverseResult.color,
            //         'queenForkReverse',
            //         gameInfoJson,
            //         queenForkReverseResult.onMoveNumber
            //     )
            // }

            this.checkForAccomplishment(
                dirtyWins.winInsufficientMaterial(gameInfoJson, position),
                'winInsufficientMaterial',
                gameInfoJson,
                allMoves.length
            )

            this.checkForAccomplishment(
                dirtyWins.clutchPawn(gameInfoJson, position),
                'clutchPawn',
                gameInfoJson,
                allMoves.length
            )

            this.checkForAccomplishment(castleFork(allMoves), 'castleFork', gameInfoJson)

            this.checkForAccomplishment(ohNoMyQueen.checkMoves(allMoves, position), 'ohNoMyQueen', gameInfoJson)

            this.checkForAccomplishment(
                blockCheckWithCheckmate(allMoves, gameInfoJson),
                'blockCheckWithCheckmate',
                gameInfoJson
            )

            this.checkForAccomplishment(
                premovesWithOneSecondLeft(gameInfoJson),
                'premovesWithOneSecondLeft',
                gameInfoJson
            )

            this.checkForAccomplishment(pawnStormOpening(allMoves, gameInfoJson), 'pawnStormOpening', gameInfoJson)

            let consecutiveCapturesResult = consecutiveCaptures.sameSquare(allMoves)
            if (consecutiveCapturesResult.consecutiveCaptures >= 10) {
                this.addTrophyForColor(
                    'white',
                    'consecutiveCaptures:sameSquare',
                    gameInfoJson,
                    consecutiveCapturesResult.onMoveNumber
                )
                this.addTrophyForColor(
                    'black',
                    'consecutiveCaptures:sameSquare',
                    gameInfoJson,
                    consecutiveCapturesResult.onMoveNumber
                )
            }

            adoptionMatch.processGame(gameInfoJson)

            this.checkForAccomplishment(
                adoptionMatch.checkForAdoption(gameInfoJson, 10),
                'adoptionMatch:10',
                gameInfoJson
            )

            this.checkForAccomplishment(
                adoptionMatch.checkForAdoption(gameInfoJson, 20),
                'adoptionMatch:20',
                gameInfoJson
            )

            if (gameInfoJson.status === 'mate') {
                let numberOfMovesForWinningSide = Math.ceil(moves.length / 2)

                if (numberOfMovesForWinningSide === 2) {
                    this.addTrophyForColor(gameInfoJson.winner, 'quickCheckmate:2', gameInfoJson)
                } else if (numberOfMovesForWinningSide === 3) {
                    this.addTrophyForColor(gameInfoJson.winner, 'quickCheckmate:3', gameInfoJson)
                } else if (numberOfMovesForWinningSide === 4) {
                    this.addTrophyForColor(gameInfoJson.winner, 'quickCheckmate:4', gameInfoJson)
                }
            }
        },

        getCacheUpdateCommand: function () {
            let gameIds = adoptionMatch.allAdoptionMatchGameids

            for (const accomplishment in this.pointsByAccomplishment) {
                gameIds.push(Object.keys(this.pointsByAccomplishment[accomplishment]))
            }

            let uniqueGameIds = [...new Set(gameIds.flat().sort())]

            let chunks = []

            var i,
                j,
                chunk = 250
            for (i = 0, j = uniqueGameIds.length; i < j; i += chunk) {
                chunks.push(uniqueGameIds.slice(i, i + chunk))
            }

            let curls = chunks.map(function (chunk) {
                return `curl -X POST -H "Accept: application/x-ndjson" "https://lichess.org/games/export/_ids?pgnInJson=true&clocks=true" -d '${chunk.join(
                    ','
                )}'`
            })

            let cmd = `rm -f cache/eric.txt && (${curls.join(' && ')}) >> cache/eric.txt`

            console.log(cmd)
        },
    },
}
</script>
