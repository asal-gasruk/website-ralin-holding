import { getTranslations, setRequestLocale } from "next-intl/server";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { HomeHero } from "@/components/sections/HomeHero";
import { NewsCard } from "@/components/sections/NewsCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { brands } from "@/content/brands";
import { news } from "@/content/news";
import type { Locale } from "@/i18n/routing";
import Image from "next/image";

// Angka yang sudah pasti saja; TODO: tambah tahun berdiri & total outlet resmi RALIN
const TEDJA_LOCATIONS = 6;

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  setRequestLocale((await params).locale as Locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  const stats = [
    { value: String(brands.length), label: t("stats.brands") },
    { value: String(TEDJA_LOCATIONS), label: t("stats.locations") },
    { value: "Bandung", label: t("stats.city") },
  ];

  return (
    <>
      <HomeHero />

      <section id="intro" className="container-site scroll-mt-20 py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="reveal lg:col-span-7">
            <SectionHeading eyebrow={t("intro.eyebrow")} title={t("intro.title")} />
          </div>
          <div className="reveal lg:col-span-5 lg:pt-12">
            <p className="text-lg leading-relaxed text-bone-muted">{t("intro.body")}</p>
            <ButtonLink href="/about" variant="text" className="mt-8">
              {t("intro.cta")}
            </ButtonLink>
          </div>
        </div>
        <dl className="reveal-stagger mt-20 grid grid-cols-3 gap-4 border-t border-bone/10 pt-10">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="font-display text-3xl break-words text-bone sm:text-7xl">{stat.value}</dd>
              <dt className="mt-2 text-[0.6875rem] tracking-[0.18em] text-bone-muted uppercase">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <BrandMarquee />

      <section className="container-site py-24 sm:py-32">
        <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t("brands.eyebrow")} title={t("brands.title")} />
          <ButtonLink href="/brands" variant="outline">
            {tc("viewAll")}
          </ButtonLink>
        </div>
        <BrandShowcase />
      </section>

      <section className="relative isolate overflow-hidden">
        <Image src="/images/tedja-journal-people.webp" alt="" fill sizes="100vw" className="-z-20 object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
        <div className="container-site py-28 sm:py-36">
          <div className="reveal max-w-xl">
            <SectionHeading eyebrow={t("careers.eyebrow")} title={t("careers.title")} body={t("careers.body")} />
            <ButtonLink href="/careers" className="mt-10">
              {t("careers.cta")}
            </ButtonLink>
          </div>
        </div>
      </section>

      <section className="container-site py-24 sm:py-32">
        <div className="reveal mb-12 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow={t("news.eyebrow")} title={t("news.title")} />
          <ButtonLink href="/news" variant="outline">
            {tc("viewAll")}
          </ButtonLink>
        </div>
        <div className="reveal-stagger grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
