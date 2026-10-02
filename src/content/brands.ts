import type { Brand } from "./types";

export const brands: Brand[] = [
  {
    slug: "tedja-coffee",
    name: "Tedja Coffee",
    category: { en: "Coffee & Space", id: "Kopi & Ruang" },
    tagline: { en: "For your stride.", id: "For your stride." },
    description: {
      en: [
        "Tedja is a coffee shop that works as a transition space across strategic points in Bandung — serving functional food and drinks in an environment that supports productivity and daily progress.",
        "From the first espresso in the morning to late conversations at night, every Tedja is designed to help people focus, connect and keep moving.",
      ],
      id: [
        "Tedja adalah coffee shop yang berfungsi sebagai ruang transisi di berbagai titik strategis Bandung, menyediakan asupan fungsional dan lingkungan yang mendukung produktivitas serta progres harian.",
        "Dari espresso pertama di pagi hari hingga obrolan larut malam, setiap Tedja dirancang untuk membantu orang fokus, terhubung, dan terus bergerak.",
      ],
    },
    status: "open",
    color: "tedja",
    logo: "/brands/tedja-mark-white.svg",
    cover: "/images/tedja-hero.webp",
    gallery: [
      "/images/tedja-loc-saparua.webp",
      "/images/tedja-day-morning.webp",
      "/images/tedja-com-padel.webp",
      "/images/tedja-menu-power-latte.webp",
      "/images/tedja-com-music.webp",
      "/images/tedja-loc-kiara-artha.webp",
    ],
    website: "https://www.tedjacoffee.com",
    instagram: "https://www.instagram.com/tedjacoffee",
    facts: [
      { label: { en: "Locations", id: "Lokasi" }, value: { en: "6 spots in Bandung", id: "6 tempat di Bandung" } },
      { label: { en: "Open", id: "Buka" }, value: { en: "From 07:00 daily", id: "Setiap hari mulai 07:00" } },
      { label: { en: "Known for", id: "Dikenal dengan" }, value: { en: "Power Latte & community clubs", id: "Power Latte & komunitas" } },
    ],
  },
  {
    // TODO: lengkapi aset & konten Sajikawani (logo, foto, lokasi) — sajikawani.com belum aktif
    slug: "sajikawani",
    name: "Sajikawani",
    category: { en: "Fried Chicken Restaurant", id: "Restoran Ayam Goreng" },
    tagline: { en: "Coming soon.", id: "Segera hadir." },
    description: {
      en: [
        "Sajikawani is RALIN's upcoming fried chicken restaurant — a new brand currently in preparation.",
        "Stay tuned for the opening announcement, menu and locations.",
      ],
      id: [
        "Sajikawani adalah restoran ayam goreng terbaru dari RALIN — brand baru yang sedang dipersiapkan.",
        "Nantikan pengumuman pembukaan, menu, dan lokasinya.",
      ],
    },
    status: "comingSoon",
    color: "sajikawani",
    website: "http://sajikawani.com",
  },
];

export function getBrand(slug: string): Brand | undefined {
  return brands.find((brand) => brand.slug === slug);
}
