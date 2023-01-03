<template>
    <div
        class="px-3 py-2 rounded text-center"
        :class="{
            'bg-green-600': hasTrophies,
            'bg-yellow-300 text-yellow-800  accomplishment-does-not-have-games': !hasTrophies,
        }"
    >
        <span @click.prevent="isExpanded = !isExpanded" class="hover:underline cursor-pointer">{{ title }}</span>

        <div v-if="hasTrophies" @click.prevent="isExpanded = !isExpanded" class="cursor-pointer">
            <trophy-collection :count="trophyCount"></trophy-collection>
        </div>

        <template v-if="isExpanded">
            <div
                v-if="hasExpandableContent"
                class="rounded p-2"
                :class="{
                    'bg-green-700': hasTrophies,
                    'bg-yellow-200': !hasTrophies,
                }"
            >
                {{ desc }}

                <a v-if="gameLink" :href="gameLink" target="_blank" class="block underline hover:font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                        <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                    </svg>
                    See an example game
                </a>

                <a v-if="youtubeLink" :href="youtubeLink" target="_blank" class="block underline hover:font-bold">
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    Watch example on YouTube
                </a>
            </div>

            <template v-if="hasTrophies">
                <h4 class="font-bold">
                    {{ trophyCount }}
                    <template v-if="trophyCount === 1"> {{ units[0] }} </template>
                    <template v-else> {{ units[1] }} </template>
                </h4>

                <div class="grid grid-cols-2 gap-x-2 text-left">
                    <div v-for="trophy in trophies" class="overflow-hidden">
                        <a :href="trophy.link" class="hover:underline whitespace-nowrap" target="_blank">
                            <lichess-username :title="trophy.opponent.title || ''" :username="trophy.opponent.username"></lichess-username>
                        </a>
                    </div>
                </div>
            </template>
        </template>
    </div>
</template>

<script lang="ts">
import LichessUsername from './LichessUsername.vue'
import TrophyCollection from './TrophyCollection.vue'

export default {
    props: {
        title: {
            type: String,
            required: true,
        },
        desc: String,
        trophies: {
            type: Object,
            required: true,
        },
        gameLink: String,
        youtubeLink: String,
        units: {
            type: Array,
            default: ['Game', 'Games'],
        },
    },
    components: {
        LichessUsername,
        TrophyCollection,
    },
    mounted() {
        this.$emit('register-new-trophy')
    },
    data() {
        return {
            isExpanded: false,
        }
    },
    computed: {
        trophyCount(): number {
            return Object.keys(this.trophies).length
        },
        hasTrophies(): boolean {
            return this.trophyCount > 0
        },
        hasExpandableContent(): boolean {
            return Boolean(this.desc || this.gameLink || this.youtubeLink)
        },
    },
}
</script>
