<script setup lang="ts">
defineProps<{ parts: string[] }>()
const route = useRoute()
const href = (i: number) => '/' + Object.values(route.params).slice(0, i + 1).map(p => encodeURIComponent(String(p))).join('/')
</script>
<template>
  <nav class="my-5 flex flex-wrap gap-1.5 text-sm text-stone-400">
    <NuxtLink to="/" class="text-amber-400">Beranda</NuxtLink>
    <template v-for="(p, i) in parts" :key="p">/ <NuxtLink v-if="i < parts.length - 1" :to="href(i)" class="text-amber-400">{{ p }}</NuxtLink><span v-else>{{ p }}</span></template>
  </nav>
</template>
