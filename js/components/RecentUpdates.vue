<template>
    <div class="border-t border-gray-300 mt-4 text-bold font-bold pt-2">Recent Updates</div>
    <ul class="text-sm">
        <li>
            <changelog-date :year="2023" :month="1" :day="8"></changelog-date>
            - Added support for <strong>Chess.com</strong>
            - See
            <a href="#" class="dotted-underline" @click.prevent="formFill('chesscom', 'Hikaru')">Hikaru</a>,
            <a href="#" class="dotted-underline" @click.prevent="formFill('chesscom', 'DanielNaroditsky')">Daniel Naroditsky</a>, and others
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
