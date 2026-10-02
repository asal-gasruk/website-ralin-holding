import type { Locale } from "@/i18n/routing";

export type Localized<T = string> = Record<Locale, T>;

export type BrandStatus = "open" | "comingSoon";

export interface Brand {
  slug: string;
  name: string;
  category: Localized;
  tagline: Localized;
  description: Localized<string[]>;
  status: BrandStatus;
  /** Warna identitas brand (token Tailwind tanpa prefix), dipakai untuk aksen kartu & halaman */
  color: string;
  logo?: string;
  cover?: string;
  gallery?: string[];
  website?: string;
  instagram?: string;
  /** Fakta singkat di halaman brand */
  facts?: Array<{ label: Localized; value: Localized }>;
}

export interface NewsItem {
  slug: string;
  brand: string;
  date: string;
  title: Localized;
  excerpt: Localized;
  image?: string;
}
