import type { Localized } from "./types";

export interface TeamMember {
  image: string;
  /** TODO: isi nama & jabatan resmi; kartu menampilkan teks hanya bila tersedia */
  name?: string;
  role?: Localized;
  /** Ditampilkan lebih besar (mengikuti susunan foto tim resmi) */
  featured?: boolean;
}

// Potret dipotong dari foto "The Team" PT Rasa Kuliner Indocipta (@ralinside).
export const team: TeamMember[] = Array.from({ length: 15 }, (_, i) => ({
  image: `/images/team/member-${String(i + 1).padStart(2, "0")}.webp`,
  featured: i < 2,
}));
