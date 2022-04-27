<template>
    <div
        class="px-3 py-2 rounded text-center"
        :class="{
            'bg-green-600': hasGames,
            'bg-yellow-300 text-yellow-800  accomplishment-does-not-have-games': !hasGames,
        }"
    >
        <span @click.prevent="isExpanded = !isExpanded" class="hover:underline cursor-pointer">{{ title }}</span>

        <div v-if="hasGames" @click.prevent="isExpanded = !isExpanded" class="cursor-pointer">
            <trophy-collection :count="gamesArray.length"></trophy-collection>
        </div>

        <template v-if="isExpanded">
            <div
                v-if="hasExpandableContent"
                class="rounded p-2"
                :class="{
                    'bg-green-700': hasGames,
                    'bg-yellow-200': !hasGames,
                }"
            >
                {{ desc }}

                <a v-if="gameLink" :href="gameLink" target="_blank" class="block underline hover:font-bold">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="inline h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
                        />
                        <path
                            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
                        />
                    </svg>
                    See an example game
                </a>

                <a v-if="youtubeLink" :href="youtubeLink" target="_blank" class="block underline hover:font-bold">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="inline h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Watch example on YouTube
                </a>
            </div>

            <template v-if="hasGames">
                <h4 class="font-bold">
                    {{ gamesArray.length }}
                    <template v-if="gamesArray.length === 1"> Game </template>
                    <template v-else> Games </template>
                </h4>

                <div class="grid grid-cols-2 gap-x-2 text-left">
                    <div v-for="game in gamesArray" class="overflow-hidden">
                        <a :href="game.gameLink" class="hover:underline whitespace-nowrap" target="_blank">
                            <lichess-username
                                :title="game.opponent.title"
                                :name="game.opponent.name"
                            ></lichess-username>
                        </a>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script>
import LichessUsername from './LichessUsername.vue'
import TrophyCollection from './TrophyCollection.vue'

export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        desc: String,
        games: Object,
        gameLink: {
            type: String,
            required: true,
        },
        youtubeLink: String,
    },
    components: {
        LichessUsername,
        TrophyCollection,
    },
    mounted: function () {
        this.$emit('register-new-goal')
    },
    data: function () {
        return {
            isExpanded: false,
        }
    },
    computed: {
        gamesArray: function () {
            return Object.values(this.games || {})
        },
        hasGames: function () {
            return this.gamesArray.length > 0
        },
        hasExpandableContent: function () {
            return Boolean(this.desc || this.gameLink || this.youtubeLink)
        },
    },
}
</script>
