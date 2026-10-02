import type { NewsItem } from "./types";

// TODO: konten contoh untuk prototype — ganti dengan berita & acara resmi.
export const news: NewsItem[] = [
  {
    slug: "sajikawani-coming-soon",
    brand: "sajikawani",
    date: "2026-09-15",
    title: { en: "Sajikawani is on its way", id: "Sajikawani segera hadir" },
    excerpt: {
      en: "A new fried chicken restaurant joins the RALIN family. Opening details coming soon.",
      id: "Restoran ayam goreng baru bergabung dengan keluarga RALIN. Detail pembukaan segera diumumkan.",
    },
  },
  {
    slug: "tedja-six-spots",
    brand: "tedja-coffee",
    date: "2026-08-20",
    title: { en: "Six Tedja spots across Bandung", id: "Enam Tedja di seluruh Bandung" },
    excerpt: {
      en: "From Saparua to Antapani, Tedja now serves six neighbourhoods across the city.",
      id: "Dari Saparua hingga Antapani, Tedja kini hadir di enam lingkungan di kota ini.",
    },
    image: "/images/tedja-loc-tamblong.webp",
  },
  {
    slug: "tedja-community",
    brand: "tedja-coffee",
    date: "2026-07-30",
    title: { en: "Where communities meet", id: "Tempat komunitas bertemu" },
    excerpt: {
      en: "Padel clubs, music nights and morning rides — how Tedja became a home for Bandung's communities.",
      id: "Klub padel, malam musik, dan morning ride — bagaimana Tedja menjadi rumah bagi komunitas Bandung.",
    },
    image: "/images/tedja-com-automotive.webp",
  },
];
