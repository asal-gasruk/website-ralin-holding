import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/sections/ContactForm";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { office, officeMapEmbedUrl } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  return pageMetadata(params, "contact", "/contact");
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const locale = (await params).locale as Locale;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  return (
    <>
      <section className="container-site grid gap-16 pt-40 pb-16 sm:pt-48 sm:pb-20 lg:grid-cols-12">
        <div className="animate-fade-up lg:col-span-5">
          <SectionHeading as="h1" eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
          <address className="mt-12 border-t border-bone/10 pt-8 not-italic">
            <p className="eyebrow text-gold">{t("office")}</p>
            <p className="mt-4 font-display text-2xl leading-snug">PT Rasa Kuliner Indocipta</p>
            <p className="mt-2 leading-relaxed text-bone-muted">
              {office.lines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <a
              href={office.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-bone uppercase transition-colors hover:text-gold"
            >
              {t("openMaps")}
              <Icon name="arrow-up-right" className="size-4" />
            </a>
          </address>
          {/* TODO: email & telepon resmi RALIN */}
        </div>
        <div className="animate-fade-up [animation-delay:150ms] lg:col-span-6 lg:col-start-7 lg:pt-16">
          <ContactForm />
        </div>
      </section>

      {/* Peta kantor pusat — filter gelap agar menyatu dengan tema */}
      <section className="container-site pb-24 sm:pb-32">
        <div className="reveal relative aspect-[4/3] overflow-hidden rounded-3xl border border-bone/10 bg-ink-800 sm:aspect-[21/9]">
          <iframe
            src={officeMapEmbedUrl(locale)}
            title={t("mapTitle")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="absolute inset-0 size-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.7)_contrast(0.95)]"
          />
        </div>
      </section>
    </>
  );
}
