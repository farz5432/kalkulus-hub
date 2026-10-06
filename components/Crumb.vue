<script setup lang="ts">
const props = defineProps<{ parts: string[] }>()
const route = useRoute()
const href = (i: number) => '/' + Object.values(route.params).slice(0, i + 1).map(p => encodeURIComponent(String(p))).join('/')
// satu tingkat ke atas; kalau sudah di tingkat pertama, kembali ke beranda
const back = computed(() => props.parts.length > 1 ? href(props.parts.length - 2) : '/')
</script>
<template>
  <div class="my-5">
    <NuxtLink :to="back" class="mb-3 inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-stone-800 px-3 py-1.5 text-sm text-stone-300 transition hover:border-amber-400 hover:text-amber-400">← Kembali</NuxtLink>
    <nav class="flex flex-wrap gap-1.5 text-sm text-stone-400" aria-label="Breadcrumb">
      <NuxtLink to="/" class="cursor-pointer text-amber-400 hover:underline">Beranda</NuxtLink>
      <template v-for="(p, i) in parts" :key="p">/ <NuxtLink v-if="i < parts.length - 1" :to="href(i)" class="cursor-pointer text-amber-400 hover:underline">{{ p }}</NuxtLink><span v-else>{{ p }}</span></template>
    </nav>
  </div>
</template>
