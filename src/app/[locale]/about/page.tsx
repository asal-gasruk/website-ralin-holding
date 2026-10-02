import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { PageHero } from "@/components/sections/PageHero";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

const values = ["building", "creating", "growing"] as const;

export function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  return pageMetadata(params, "about", "/about");
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  setRequestLocale((await params).locale as Locale);
  const t = await getTranslations("about");
  const tb = await getTranslations("home.brands");

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} image="/images/tedja-com-business.webp" />

      <section className="container-site grid gap-12 py-24 sm:py-32 lg:grid-cols-12">
        <div className="reveal lg:col-span-5">
          <SectionHeading eyebrow={t("story.eyebrow")} title={t("story.title")} />
        </div>
        <div className="reveal space-y-6 text-lg leading-relaxed text-bone-muted lg:col-span-6 lg:col-start-7 lg:pt-12">
          <p>{t("story.p1")}</p>
          <p>{t("story.p2")}</p>
          <p>{t("story.p3")}</p>
        </div>
      </section>

      <section className="container-site">
        <div className="reveal-stagger grid grid-cols-2 gap-4 sm:grid-cols-4">
          {["tedja-day-morning", "tedja-loc-saparua", "tedja-com-padel", "tedja-day-evening"].map((name, i) => (
            <div key={name} className={i % 2 ? "relative aspect-[3/4] overflow-hidden rounded-2xl sm:mt-16" : "relative aspect-[3/4] overflow-hidden rounded-2xl"}>
              <Image src={`/images/${name}.webp`} alt="" fill sizes="(min-width: 640px) 25vw, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="container-site pt-24 sm:pt-32">
        <SectionHeading eyebrow={t("team.eyebrow")} title={t("team.title")} body={t("team.body")} className="reveal mb-12" />
        <TeamGrid />
      </section>

      <section className="container-site py-24 sm:py-32">
        <SectionHeading eyebrow={t("values.eyebrow")} title={t("values.title")} className="reveal" />
        <ol className="reveal-stagger mt-14 grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 md:grid-cols-3">
          {values.map((key, i) => (
            <li key={key} className="bg-ink p-8">
              <span className="font-display text-5xl text-gold">0{i + 1}</span>
              <h3 className="mt-6 text-2xl">{t(`values.${key}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bone-muted">{t(`values.${key}.body`)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-site pb-24 sm:pb-32">
        <SectionHeading eyebrow={tb("eyebrow")} title={tb("title")} className="reveal mb-12" />
        <BrandShowcase />
      </section>
    </>
  );
}
