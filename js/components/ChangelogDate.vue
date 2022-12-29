<template>
    <span class="italic">{{ date }}</span>
</template>

<script lang="ts">
export default {
    props: ['year', 'month', 'day'],
    computed: {
        date: function () {
            const date = new Date(Date.UTC(this.year, this.month - 1, this.day, 12, 0, 0))
            return date.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            })
        },
    },
}
</script>
