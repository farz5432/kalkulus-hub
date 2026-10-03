<script setup lang="ts">
const { kategori } = useRoute().params as Record<string, string>
const soal = await useSoal()
const list = computed(() => soal.value.filter(s => s.kategori === kategori))
const items = computed(() => uniq(list.value.map(s => s.sub_kategori)).map(x => ({ label: x, to: `/${encodeURIComponent(kategori)}/${encodeURIComponent(x)}`, count: list.value.filter(s => s.sub_kategori === x).length })))
</script>
<template>
  <Crumb :parts="[kategori]" />
  <h1 class="mb-5 text-3xl font-extrabold">{{ kategori }}</h1>
  <NavCards :items="items" />
</template>
