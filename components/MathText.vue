<script setup lang="ts">
// Mendukung $..$, $$..$$, \(..\), \[..\], dan \begin{align*}..\end{align*} (multi-baris)
import renderMathInElement from 'katex/contrib/auto-render'
const props = defineProps<{ text: string }>()
const el = ref<HTMLElement>()
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const html = computed(() => {
  const t = props.text
    .replace(/^\s*"|"\s*$/g, '')                       // kutip sisa salinan
    .replace(/\s*\[cite:[^\]]*\]/g, '')                // penanda [cite: ...]
    .replace(/\\begin\{(align\*?|aligned|equation\*?|gather\*?|eqnarray\*?)\}([\s\S]*?)\\end\{\1\}/g,
      (_, __, m) => {
        const rows = m.split('\n').map((l: string) => l.trim().replace(/\\\\\s*$/, '')).filter(Boolean).join(' \\\\ ')
        return `$$\\begin{aligned}${rows}\\end{aligned}$$`
      })
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, m) => `$$${m.trim().replace(/\s*\n\s*/g, ' ')}$$`)
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, m) => `$${m.trim()}$`)
    .replace(/\$\$([\s\S]*?)\$\$/g, (_, m) => `$$${m.trim().replace(/\s*\n\s*/g, ' ')}$$`)
  return t.split('\n')
    .map(l => l.replace(/\s*\\\\\s*$/, ''))            // \\ di ujung baris
    .filter(l => l.trim())
    .map(l => `<p class="mb-2">${esc(l)}</p>`).join('')
})
const render = () => el.value && renderMathInElement(el.value, {
  delimiters: [{ left: '$$', right: '$$', display: true }, { left: '$', right: '$', display: false }],
  throwOnError: false,
})
onMounted(render)
watch(html, () => nextTick(render))
</script>
<template><div ref="el" class="overflow-x-auto" v-html="html" /></template>