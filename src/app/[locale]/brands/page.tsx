import { getTranslations, setRequestLocale } from "next-intl/server";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { PageHero } from "@/components/sections/PageHero";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata({ params }: PageProps<"/[locale]/brands">) {
  return pageMetadata(params, "brands", "/brands");
}

export default async function BrandsPage({ params }: PageProps<"/[locale]/brands">) {
  setRequestLocale((await params).locale as Locale);
  const t = await getTranslations("brandsPage");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
      <section className="container-site pb-24 sm:pb-32">
        <BrandShowcase />
      </section>
    </>
  );
}
