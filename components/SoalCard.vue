<script setup lang="ts">
import type { Soal } from '~/composables/useSoal'
defineProps<{ soal: Soal }>()
const open = ref(false) // FR-02: tertutup default
const badge = { Mudah: 'text-emerald-400', Sedang: 'text-amber-400', Sulit: 'text-red-400' }
</script>
<template>
  <article class="mb-4 rounded-2xl border border-stone-800 bg-stone-900 p-5">
    <div class="mb-3 flex items-center justify-between text-sm text-stone-400">
      <span>{{ soal.kode_soal }}</span>
      <span :class="['rounded-full border border-current px-2.5 py-0.5 text-xs font-semibold', badge[soal.tingkat_kesulitan]]">{{ soal.tingkat_kesulitan }}</span>
    </div>
    <MathText :text="soal.pertanyaan" />
    
    <button class="mt-3 rounded-lg px-4 py-2 font-semibold" :class="open ? 'border border-amber-400 text-amber-400' : 'bg-amber-400 text-stone-950'"
      :aria-expanded="open" @click="open = !open">{{ open ? 'Tutup Pembahasan' : 'Buka Pembahasan' }}</button>
    <!-- FR-05: v-if => MathText (dan parsing KaTeX) baru dibuat saat panel dibuka -->
    <div v-if="open" class="solution mt-4">
  <h4 class="mb-2 text-xs font-semibold uppercase tracking-wider t-ac">Pembahasan</h4>
  <img v-if="soal.gambar_url" :src="soal.gambar_url" alt="Gambar pembahasan" class="mb-3 max-w-full rounded-lg" loading="lazy">
  <MathText :text="soal.pembahasan" />
  <FunctionGraph v-if="soal.grafik" :spec="soal.grafik" />
</div>
  </article>
</template>
