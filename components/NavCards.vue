<script setup lang="ts">
defineProps<{ items: { label: string; to: string; count: number }[] }>()
</script>
<template>
  <div class="grid gap-3 sm:grid-cols-2">
    <NuxtLink v-for="i in items" :key="i.to" :to="i.to"
      class="rounded-xl border border-stone-800 bg-stone-900 p-4 transition hover:-translate-y-0.5 hover:border-amber-400">
      <h3 class="text-lg font-semibold">{{ i.label }}</h3>
      <p class="text-sm text-stone-400">{{ i.count }} soal</p>
    </NuxtLink>
  </div>
</template>
