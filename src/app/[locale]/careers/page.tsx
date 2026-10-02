import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/sections/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

const reasons = ["learn", "grow", "team"] as const;
const areas = [
  { key: "outlet", body: "outletBody" },
  { key: "management", body: "managementBody" },
  { key: "office", body: "officeBody" },
] as const;

export function generateMetadata({ params }: PageProps<"/[locale]/careers">) {
  return pageMetadata(params, "careers", "/careers");
}

export default async function CareersPage({ params }: PageProps<"/[locale]/careers">) {
  setRequestLocale((await params).locale as Locale);
  const t = await getTranslations("careersPage");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} body={t("body")} image="/images/tedja-journal-people.webp" />

      <section className="container-site py-24 sm:py-32">
        <SectionHeading eyebrow={t("why.eyebrow")} title={t("why.title")} className="reveal" />
        <ol className="reveal-stagger mt-14 grid gap-px overflow-hidden rounded-3xl border border-bone/10 bg-bone/10 md:grid-cols-3">
          {reasons.map((key, i) => (
            <li key={key} className="bg-ink p-8">
              <span className="font-display text-5xl text-gold">0{i + 1}</span>
              <h3 className="mt-6 text-2xl">{t(`why.${key}.title`)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-bone-muted">{t(`why.${key}.body`)}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-site pb-24 sm:pb-32">
        <SectionHeading eyebrow={t("areas.eyebrow")} title={t("areas.title")} className="reveal" />
        <ul className="reveal-stagger mt-12 divide-y divide-bone/10 border-y border-bone/10">
          {areas.map((area) => (
            <li key={area.key} className="grid gap-2 py-8 sm:grid-cols-12 sm:items-baseline">
              <h3 className="text-3xl sm:col-span-5">{t(`areas.${area.key}`)}</h3>
              <p className="text-bone-muted sm:col-span-7">{t(`areas.${area.body}`)}</p>
            </li>
          ))}
        </ul>
        <div className="reveal mt-14 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {/* TODO: arahkan ke portal karier/email HR resmi */}
          <ButtonLink href="/contact">{t("cta")}</ButtonLink>
          <p className="text-sm text-bone-muted">{t("ctaNote")}</p>
        </div>
      </section>
    </>
  );
}
