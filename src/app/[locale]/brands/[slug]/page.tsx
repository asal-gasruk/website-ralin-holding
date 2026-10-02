import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BrandShowcase } from "@/components/sections/BrandShowcase";
import { Icon } from "@/components/ui/Icon";
import { brands, getBrand } from "@/content/brands";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { brandSurface } from "@/lib/brand-style";
import { cn } from "@/lib/cn";
import { localize } from "@/lib/localize";
import { alternates } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return brands.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/brands/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  return {
    title: brand.name,
    description: localize(brand.description, locale as Locale)[0],
    alternates: alternates(locale as Locale, `/brands/${slug}`),
  };
}

const externalLink =
  "group inline-flex items-center gap-3 rounded-full border border-bone/40 px-6 py-3.5 text-xs font-medium tracking-[0.18em] uppercase transition-colors hover:bg-bone hover:text-ink";

export default async function BrandPage({ params }: PageProps<"/[locale]/brands/[slug]">) {
  const { locale: rawLocale, slug } = await params;
  const locale = rawLocale as Locale;
  setRequestLocale(locale);
  const brand = getBrand(slug);
  if (!brand) notFound();

  const t = await getTranslations("brandsPage");
  const tc = await getTranslations("common");
  const isSoon = brand.status === "comingSoon";

  return (
    <>
      {/* Hero brand: foto penuh, atau blok warna brand bila belum ada foto */}
      <section className={cn("relative isolate flex min-h-[85svh] items-end overflow-hidden", !brand.cover && brandSurface[brand.color])}>
        {brand.cover ? (
          <>
            <Image src={brand.cover} alt="" fill priority sizes="100vw" className="-z-20 animate-ken-burns object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
          </>
        ) : (
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
        )}
        <div className="container-site pt-40 pb-16 sm:pb-24">
          <Link
            href="/brands"
            className="mb-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-bone/80 uppercase transition-colors hover:text-gold"
          >
            <Icon name="arrow-left" className="size-4" />
            {tc("backToBrands")}
          </Link>
          <p className="eyebrow animate-fade-up text-bone/80">
            {localize(brand.category, locale)} · {isSoon ? t("comingSoon") : t("open")}
          </p>
          {brand.logo && (
            <Image src={brand.logo} alt="" width={96} height={66} className="animate-fade-up mt-6 h-14 w-auto [animation-delay:80ms]" />
          )}
          <h1 className="animate-fade-up mt-4 text-7xl leading-[0.9] [animation-delay:120ms] sm:text-9xl">{brand.name}</h1>
          <p className="animate-fade-up mt-5 font-display text-2xl text-bone/85 italic [animation-delay:200ms] sm:text-3xl">
            {localize(brand.tagline, locale)}
          </p>
        </div>
      </section>

      <section className="container-site grid gap-12 py-24 sm:py-32 lg:grid-cols-12">
        <div className="reveal lg:col-span-7">
          <p className="eyebrow text-gold">{t("about")}</p>
          <div className="mt-6 space-y-6 font-display text-2xl leading-snug sm:text-3xl">
            {localize(brand.description, locale).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            {brand.website && !isSoon && (
              <a href={brand.website} target="_blank" rel="noopener noreferrer" className={externalLink}>
                {tc("visitWebsite")}
                <Icon name="arrow-up-right" className="size-4" />
              </a>
            )}
            {brand.instagram && (
              <a href={brand.instagram} target="_blank" rel="noopener noreferrer" className={externalLink}>
                {tc("instagram")}
                <Icon name="arrow-up-right" className="size-4" />
              </a>
            )}
          </div>
        </div>

        <aside className="reveal lg:col-span-4 lg:col-start-9">
          {brand.facts ? (
            <>
              <p className="eyebrow text-gold">{t("facts")}</p>
              <dl className="mt-6 divide-y divide-bone/10 border-y border-bone/10">
                {brand.facts.map((fact) => (
                  <div key={fact.label.en} className="py-5">
                    <dt className="text-[0.6875rem] tracking-[0.18em] text-bone-muted uppercase">{localize(fact.label, locale)}</dt>
                    <dd className="mt-1 text-lg">{localize(fact.value, locale)}</dd>
                  </div>
                ))}
              </dl>
            </>
          ) : (
            <div className="rounded-3xl border border-bone/10 p-8">
              <p className="eyebrow text-gold">{t("soonTitle")}</p>
              <p className="mt-4 text-bone-muted">{t("soonBody")}</p>
            </div>
          )}
        </aside>
      </section>

      {brand.gallery && (
        <section className="container-site pb-24 sm:pb-32">
          <p className="eyebrow reveal mb-8 text-gold">{t("gallery")}</p>
          <div className="reveal-stagger grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {brand.gallery.map((src, i) => (
              <div key={src} className={cn("relative overflow-hidden rounded-2xl", i === 0 ? "col-span-2 row-span-2 aspect-square lg:aspect-auto" : "aspect-square")}>
                <Image src={src} alt="" fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover transition-transform duration-700 hover:scale-105" />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="container-site border-t border-bone/10 py-24 sm:py-32">
        <p className="eyebrow reveal mb-10 text-gold">{t("others")}</p>
        <BrandShowcase exclude={brand.slug} />
      </section>
    </>
  );
}
