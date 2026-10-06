export interface Soal {
  id: string | number; kode_soal: string; kategori: string; sub_kategori: string; materi: string
  tingkat_kesulitan: 'Mudah' | 'Sedang' | 'Sulit'; pertanyaan: string; pembahasan: string
  grafik: string | null; gambar_url: string | null
}

type Field = 'kategori' | 'sub_kategori' | 'materi'
const norm = (s: string) => s.trim().replace(/\s+/g, ' ')

const canon = (rows: Soal[], field: Field) => {
  const groups = new Map<string, Map<string, number>>()
  for (const r of rows) {
    const label = norm(r[field])
    const key = label.toLowerCase()
    const g = groups.get(key) ?? new Map<string, number>()
    g.set(label, (g.get(label) ?? 0) + 1)
    groups.set(key, g)
  }
  const best = new Map<string, string>()
  groups.forEach((g, key) => best.set(key, [...g.entries()].sort((a, b) => b[1] - a[1])[0][0]))
  for (const r of rows) r[field] = best.get(norm(r[field]).toLowerCase())!
}

const numOf = (s: string) => { const m = (s ?? '').match(/\d+/); return m ? parseInt(m[0], 10) : Infinity }

export const useSoal = async () => {
  const soal = useState<Soal[]>('soal', () => [])
  if (!soal.value.length) {
    const { data, error } = await useSupabaseClient().from('soal').select('*')
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    const rows = (data ?? []) as Soal[]
    rows.sort((a, b) => numOf(a.kode_soal) - numOf(b.kode_soal) || (a.kode_soal ?? '').localeCompare(b.kode_soal ?? ''))
    ;(['kategori', 'sub_kategori', 'materi'] as Field[]).forEach(f => canon(rows, f))
    soal.value = rows
  }
  return soal
}
export const uniq = (a: string[]) => [...new Set(a)]