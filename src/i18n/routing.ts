import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "id"],
  defaultLocale: "en",
  // Selalu buka dalam EN; Bahasa Indonesia hanya lewat pilihan manual di header
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
