<template>
    <div class="border-t border-gray-300 mt-4 text-bold font-bold pt-2">Recent Updates</div>
    <ul class="text-sm">
        <li>
            <changelog-date :year="2024" :month="11" :day="13"></changelog-date>
            - Added <strong>Mona Lisa Checkmate</strong> trophy
            <br>
            &nbsp; Credit to
            <span class="dotted-underline text-sky-900 cursor-pointer" @click.prevent="formFill('chesscom', 'KNVB')">GM Aman Hambleton</span>
            from Chessbrah. <a href="https://www.youtube.com/watch?v=XAlcDWQ6iTM" class="dotted-underline text-sky-900" target="_blank">See video here</a>
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
        formFill(type: string, value: string): void {
            this.$emit('form-fill', type, value)
        },
    },
}
</script>
