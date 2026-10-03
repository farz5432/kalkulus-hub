# Kalkulus Hub v2.0 (Nuxt 3 + Supabase)

1. Buat project Supabase, jalankan `supabase/schema.sql` di SQL Editor.
2. `cp .env.example .env` lalu isi `SUPABASE_URL` dan `SUPABASE_KEY` (anon key).
3. `npm install && npm run dev`
4. Deploy ke Vercel/Netlify, set dua env var yang sama.

Konten dikelola lewat Supabase Table Editor, tanpa redeploy.
Catatan: di SQL Editor, string biasa tidak butuh escape backslash ganda; yang memakai `E'...'` butuh `\\`.
