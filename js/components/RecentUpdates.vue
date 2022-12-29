<template>
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
</template>

<script lang="ts">
import ChangelogDate from './ChangelogDate.vue'

export default {
    components: {
        ChangelogDate,
    },
    emits: ['form-fill'],
    methods: {
        formFill(url: string) {
            this.$emit('form-fill', url)
        },
    },
}
</script>
