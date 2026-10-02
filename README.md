# RALIN — Website Holding (Prototype)

Website holding **PT Rasa Kuliner Indocipta (RALIN)** — rumah bagi brand Tedja Coffee dan Sajikawani.
Prototype; struktur terinspirasi situs grup F&B (hero, portofolio brand, about, kabar, karier, kontak).

## Stack
Next.js 16 (App Router) · Tailwind CSS v4 · next-intl (EN default, ID) · semua halaman statis.

```bash
pnpm install
pnpm dev        # http://localhost:3000 → /en
pnpm build && pnpm start
```

## Struktur
```
messages/{en,id}.json      teks UI
src/content/brands.ts      data brand (tambah brand baru di sini)
src/content/news.ts        kabar terbaru (konten contoh)
src/app/[locale]/          home, about, brands, brands/[slug], news, careers, contact
```

## TODO sebelum rilis
- Logo & brand guideline resmi RALIN (sekarang wordmark teks + palet netral sementara)
- Aset Sajikawani (logo, foto, lokasi) — sajikawani.com belum aktif
- Konten What's New resmi, alamat/email kantor, tujuan form kontak & CV, domain resmi
