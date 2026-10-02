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

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
