export const mainNav = [
  { key: "about", href: "/about" },
  { key: "brands", href: "/brands" },
  { key: "news", href: "/news" },
  { key: "careers", href: "/careers" },
  { key: "contact", href: "/contact" },
] as const;

// TODO: ganti dengan domain resmi RALIN
export const socials = {
  instagram: "https://www.instagram.com/ralinside",
} as const;

/** Alamat terdaftar PT Rasa Kuliner Indocipta */
const OFFICE_QUERY = "Ruby Commercial, Jl. Bulevar Utama No.8, Rancabolang, Gedebage, Bandung";

export const office = {
  lines: ["Ruko Ruby Commercial No. 8", "Jl. Bulevar Utama, Rancabolang", "Kec. Gedebage, Kota Bandung", "Jawa Barat"],
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(OFFICE_QUERY)}`,
} as const;

/** URL embed peta untuk <iframe> (tanpa API key), mengikuti bahasa halaman. */
export function officeMapEmbedUrl(locale: string): string {
  const params = new URLSearchParams({ q: OFFICE_QUERY, z: "16", hl: locale, output: "embed" });
  return `https://maps.google.com/maps?${params.toString()}`;
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
