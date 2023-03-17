<template>
    <div class="border-t border-gray-300 mt-4 text-bold font-bold pt-2">Recent Updates</div>
    <ul class="text-sm">
        <li>
            <changelog-date :year="2023" :month="3" :day="17"></changelog-date>
            - Added
            <a href="https://lichess.org/VwNKF7ie#121" target="_blank" class="dotted-underline text-sky-900 cursor-pointer"
                >"Flag Opponent Who Had Mate in 1" trophy</a
            >
        </li>
        <!-- <li>
            <changelog-date :year="2023" :month="1" :day="9"></changelog-date>
            - Added support for <strong>Chess.com</strong>
            - See
            <span class="dotted-underline text-sky-900 cursor-pointer" @click.prevent="formFill('chesscom', 'Hikaru')">Hikaru</span>,
            <span class="dotted-underline text-sky-900 cursor-pointer" @click.prevent="formFill('chesscom', 'DanielNaroditsky')"
                >Daniel Naroditsky</span
            >,
            <span class="dotted-underline text-sky-900 cursor-pointer" @click.prevent="formFill('chesscom', 'AlexandraBotez')">Alexandra Botez</span>,
            and others
        </li> -->
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
        formFill(type: string, value: string): void {
            this.$emit('form-fill', type, value)
        },
    },
}
</script>
