<script setup lang="ts">
const { kategori, sub } = useRoute().params as Record<string, string>
const soal = await useSoal()
const list = computed(() => soal.value.filter(s => s.kategori === kategori && s.sub_kategori === sub))
const base = `/${encodeURIComponent(kategori)}/${encodeURIComponent(sub)}`
const items = computed(() => uniq(list.value.map(s => s.materi)).map(m => ({ label: m, to: `${base}/${encodeURIComponent(m)}`, count: list.value.filter(s => s.materi === m).length })))
</script>
<template>
  <Crumb :parts="[kategori, sub]" />
  <h1 class="mb-5 text-3xl font-extrabold">{{ sub }}</h1>
  <NavCards :items="items" />
</template>
