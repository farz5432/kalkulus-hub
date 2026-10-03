export interface Soal {
  id: string | number; kode_soal: string; kategori: string; sub_kategori: string; materi: string
  tingkat_kesulitan: 'Mudah' | 'Sedang' | 'Sulit'; pertanyaan: string; pembahasan: string
  grafik: string | null; gambar_url: string | null
}
// FR-04: satu kali fetch, disimpan di useState (ikut ter-hydrate dari SSR), navigasi berikutnya instan
export const useSoal = async () => {
  const soal = useState<Soal[]>('soal', () => [])
  if (!soal.value.length) {
    const { data, error } = await useSupabaseClient().from('soal').select('*').order('kode_soal')
    if (error) throw createError({ statusCode: 500, statusMessage: error.message })
    soal.value = (data ?? []) as Soal[]
  }
  return soal
}
export const uniq = (a: string[]) => [...new Set(a)]
