import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { siteUrl } from "@/content/site";
import { routing, type Locale } from "@/i18n/routing";
import { alternates } from "@/lib/metadata";
import "../globals.css";

const hostGrotesk = localFont({
  src: [
    { path: "../fonts/HostGrotesk-VariableFont_wght.ttf", weight: "300 800", style: "normal" },
    { path: "../fonts/HostGrotesk-Italic-VariableFont_wght.ttf", weight: "300 800", style: "italic" },
  ],
  variable: "--font-host-grotesk",
  display: "swap",
});

export const viewport: Viewport = { themeColor: "#0d0c0b" };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const locale = (await params).locale as Locale;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(siteUrl),
    title: { default: t("title"), template: `%s · ${t("siteName")}` },
    description: t("description"),
    alternates: alternates(locale, ""),
    openGraph: { title: t("title"), description: t("description"), siteName: t("siteName"), type: "website" },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} data-scroll-behavior="smooth" className={hostGrotesk.variable}>
      <body className="flex min-h-svh flex-col">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
