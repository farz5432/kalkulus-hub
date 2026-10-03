<script setup lang="ts">
const soal = await useSoal()
const items = computed(() => uniq(soal.value.map(s => s.kategori)).map(k => ({ label: k, to: `/${encodeURIComponent(k)}`, count: soal.value.filter(s => s.kategori === k).length })))
</script>
<template>
  <section class="pt-6">
    <h1 class="text-4xl font-extrabold leading-tight">Latihan Kalkulus,<br>langkah demi langkah.</h1>
    <p class="mb-6 mt-2 text-stone-400">Bank soal persiapan UTS dan UAS dengan pembahasan rinci, rumus LaTeX, dan grafik.</p>
    <NavCards :items="items" />
  </section>
</template>
