import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

type PageKey = "about" | "brands" | "news" | "careers" | "contact";

export function alternates(locale: Locale, path: string): Metadata["alternates"] {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, `/${l}${path}`]));
  return { canonical: `/${locale}${path}`, languages: { ...languages, "x-default": `/${routing.defaultLocale}${path}` } };
}

export async function pageMetadata(params: Promise<{ locale: string }>, key: PageKey, path: string): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  return { title: t(key), alternates: alternates(locale, path) };
}
