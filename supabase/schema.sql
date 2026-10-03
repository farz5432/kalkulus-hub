create table public.soal (
  id bigserial primary key,
  kode_soal text unique not null,
  kategori varchar(100) not null,
  sub_kategori varchar(100) not null,
  materi varchar(150) not null,
  tingkat_kesulitan varchar(20) check (tingkat_kesulitan in ('Mudah','Sedang','Sulit')),
  pertanyaan text not null,
  pembahasan text not null,
  grafik text,
  gambar_url text,
  created_at timestamptz default now()
);

-- RLS: publik hanya boleh membaca. Tanpa policy insert/update/delete, hanya
-- admin (Dashboard / service role) yang bisa mengubah data.
alter table public.soal enable row level security;
create policy "soal dapat dibaca publik" on public.soal for select to anon, authenticated using (true);

-- Bucket gambar pembahasan (publik baca)
insert into storage.buckets (id, name, public) values ('pembahasan', 'pembahasan', true) on conflict do nothing;

insert into public.soal (kode_soal,kategori,sub_kategori,materi,tingkat_kesulitan,pertanyaan,pembahasan,grafik) values
('Q001','Kalkulus','Kalkulus 1','Limit Fungsi','Mudah',
 'Hitunglah $\lim_{x\to 2}(3x^2-4x+1)$.',
 E'Polinomial kontinu, substitusi langsung.\n$$3(2)^2-4(2)+1=12-8+1=5$$\nJadi limitnya $5$.',
 'fungsi=3*x^2-4*x+1; x=0..3.5; titik=2,5'),
('Q002','Kalkulus','Kalkulus 1','Limit Fungsi','Sedang',
 'Hitunglah $\lim_{x\to 3}\dfrac{x^2-9}{x-3}$.',
 E'Bentuk $\\frac{0}{0}$, faktorkan pembilang.\n$$\\frac{(x-3)(x+3)}{x-3}=x+3$$\n$$\\lim_{x\\to 3}(x+3)=6$$',
 'fungsi=x+3; x=0..6; titik=3,6');
