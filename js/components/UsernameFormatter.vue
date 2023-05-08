<template>
    <strong v-if="title" class="text-yellow-400">{{ title }}</strong>
    {{ username }}
</template>

<script lang="ts">
export default {
    props: {
        title: {
            type: String,
        },
        username: {
            type: String,
            required: true,
        },
    },
}
</script>
