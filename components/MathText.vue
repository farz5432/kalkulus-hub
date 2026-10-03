<script setup lang="ts">
// FR-03: mendukung $...$ dan $$...$$ (KaTeX auto-render, hanya di client)
import renderMathInElement from 'katex/contrib/auto-render'
const props = defineProps<{ text: string }>()
const el = ref<HTMLElement>()
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const html = computed(() => props.text.split('\n').map(l => `<p class="mb-2">${esc(l)}</p>`).join(''))
const render = () => el.value && renderMathInElement(el.value, {
  delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
  throwOnError: false,
})
onMounted(render)
watch(html, () => nextTick(render))
</script>
<template><div ref="el" class="overflow-x-auto" v-html="html" /></template>
