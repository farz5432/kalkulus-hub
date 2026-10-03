<script setup lang="ts">
const { kategori, sub, materi } = useRoute().params as Record<string, string>
const soal = await useSoal()
const list = computed(() => soal.value.filter(s => s.kategori === kategori && s.sub_kategori === sub && s.materi === materi))
</script>
<template>
  <Crumb :parts="[kategori, sub, materi]" />
  <h1 class="text-3xl font-extrabold">{{ materi }}</h1>
  <p class="mb-5 mt-1 text-stone-400">{{ list.length }} soal. Coba kerjakan dulu sebelum membuka pembahasan.</p>
  <SoalCard v-for="s in list" :key="s.id" :soal="s" />
  <p v-if="!list.length" class="py-8 text-stone-400">Belum ada soal di materi ini.</p>
</template>
