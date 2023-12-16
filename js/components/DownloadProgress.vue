<template>
    <div class="my-8 bg-orange-400 drop-shadow-2xl p-4 rounded-lg text-orange-800 mx-auto">
        <div class="text-lg font-medium text-center">
            Downloading and analyzing
            {{ title }}&rsquo;s games
        </div>

        <template v-if="hideProgressBar">
            <svg class="animate-spin my-2 mx-auto h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </template>
        <template v-else>
            <div class="w-full my-2 h-6 bg-orange-200">
                <div class="h-6 bg-orange-800" :style="`width: ${percentDownloaded}%`"></div>
            </div>

            <div class="flex flex-row">
                <div class="basis-1/4 text-center">
                    <h4 class="text-xl md:text-4xl">
                        {{ positions.toLocaleString() }}
                    </h4>
                    Positions Analyzed
                </div>
                <div class="basis-1/4 text-center">
                    <h4 class="text-xl md:text-4xl">
                        {{ downloaded.toLocaleString() }}
                    </h4>
                    Games Analyzed
                </div>
                <div class="basis-1/4 text-center">
                    <h4 class="text-xl md:text-4xl">
                        {{ total.toLocaleString() }}
                    </h4>
                    Total Games
                </div>
                <div class="basis-1/4 text-center">
                    <h4 class="text-xl md:text-4xl">{{ percentDownloadedDisplay }}%</h4>
                    Complete
                </div>
            </div>

            <div class="text-center mt-4">
                <button
                    @click="cancelDownload"
                    type="button"
                    class="px-6 py-2.5 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="inline h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Stop Download
                </button>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
export default {
    props: ['title', 'positions', 'downloaded', 'total', 'hideProgressBar'],

    computed: {
        percentDownloaded: function () {
            if (this.downloaded && this.total) {
                return Math.min((this.downloaded / this.total) * 100, 100)
            } else {
                return 0
            }
        },
        percentDownloadedDisplay: function () {
            return Math.min(Math.round(this.percentDownloaded), 99)
        },
    },

    methods: {
        cancelDownload: function () {
            this.$emit('cancel-download')
        },
    },
}
</script>
