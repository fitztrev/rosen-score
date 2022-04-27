<template>
    <strong v-if="title" class="text-yellow-400">{{ title }}</strong>
    {{ name }}
</template>

<script>
export default {
    props: ['title', 'name'],
}
</script>
