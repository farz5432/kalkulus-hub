<script setup lang="ts">
// Format kolom grafik: fungsi=x^2; x=-3..3; titik=1,1|2,4
const props = defineProps<{ spec: string }>()
const W = 420, H = 250, P = 28
const g = computed(() => {
  try {
    const o: Record<string, string> = {}
    props.spec.split(';').forEach(s => { const i = s.indexOf('='); if (i > 0) o[s.slice(0, i).trim()] = s.slice(i + 1).trim() })
    const f = new Function('x', `with(Math){return ${o.fungsi.replace(/\^/g, '**')}}`) as (x: number) => number
    const [a, b] = o.x.split('..').map(Number)
    const pts: [number, number][] = []
    for (let i = 0; i <= 160; i++) { const x = a + (b - a) * i / 160, y = f(x); if (isFinite(y)) pts.push([x, y]) }
    const ys = pts.map(p => p[1]), pad = ((Math.max(...ys) - Math.min(...ys)) || 1) * .12
    const lo = Math.min(...ys) - pad, hi = Math.max(...ys) + pad
    const X = (x: number) => P + (x - a) / (b - a) * (W - 2 * P), Y = (y: number) => H - P - (y - lo) / (hi - lo) * (H - 2 * P)
    return {
      line: pts.map(p => `${X(p[0]).toFixed(1)},${Y(p[1]).toFixed(1)}`).join(' '),
      dots: (o.titik || '').split('|').filter(Boolean).map(t => { const [x, y] = t.split(',').map(Number); return { x: X(x), y: Y(y), t: `(${x}, ${y})` } }),
      label: `f(x) = ${o.fungsi}`,
    }
  } catch { return null }
})
</script>
<template>
  <svg v-if="g" :viewBox="`0 0 ${W} ${H}`" class="mt-3 w-full max-w-md rounded-lg border border-stone-800 bg-stone-950" role="img" aria-label="Grafik fungsi">
    <polyline :points="g.line" fill="none" stroke="#fbbf24" stroke-width="2.5" />
    <g v-for="d in g.dots" :key="d.t">
      <circle :cx="d.x" :cy="d.y" r="5" fill="#0c0a09" stroke="#f5f5f4" stroke-width="2" />
      <text :x="d.x + 8" :y="d.y - 8" font-size="11" fill="#a8a29e">{{ d.t }}</text>
    </g>
    <text :x="14" :y="H - 6" font-size="11" fill="#a8a29e">{{ g.label }}</text>
  </svg>
</template>
