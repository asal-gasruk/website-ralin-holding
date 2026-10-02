import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { brands } from "@/content/brands";
import type { Brand } from "@/content/types";
import { Link } from "@/i18n/navigation";
import { brandSurface } from "@/lib/brand-style";
import { cn } from "@/lib/cn";
import { localize } from "@/lib/localize";


function BrandPanel({ brand, index }: { brand: Brand; index: number }) {
  const t = useTranslations("brandsPage");
  const tc = useTranslations("common");
  const locale = useLocale();
  const isSoon = brand.status === "comingSoon";

  return (
    <Link
      href={`/brands/${brand.slug}`}
      className="reveal group relative isolate flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-3xl sm:min-h-[34rem]"
    >
      {brand.cover ? (
        <>
          <Image
            src={brand.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="-z-20 object-cover transition-transform duration-[1200ms] group-hover:scale-105"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        </>
      ) : (
        // Placeholder visual untuk brand yang belum punya foto
        <div className={cn("absolute inset-0 -z-10", brandSurface[brand.color])}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_55%)]" />
          <span
            aria-hidden="true"
            className="absolute -top-6 -right-4 font-display text-[9rem] leading-none text-white/10 transition-transform duration-[1200ms] group-hover:-translate-x-4 sm:text-[12rem]"
          >
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      )}

      <div className="p-6 sm:p-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="eyebrow text-bone/80">{localize(brand.category, locale)}</span>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-[0.625rem] font-medium tracking-[0.18em] uppercase",
              isSoon ? "bg-bone text-ink" : "border border-bone/40 text-bone",
            )}
          >
            {isSoon ? t("comingSoon") : t("open")}
          </span>
        </div>
        <h3 className="mt-4 text-5xl sm:text-6xl">{brand.name}</h3>
        <p className="mt-3 max-w-md font-display text-xl text-bone/80 italic">{localize(brand.tagline, locale)}</p>
        <span className="mt-6 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase transition-colors group-hover:text-gold">
          {tc("discover")}
          <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function BrandShowcase({ exclude }: { exclude?: string }) {
  const list = brands.filter((brand) => brand.slug !== exclude);
  return (
    <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
      {list.map((brand, index) => (
        <BrandPanel key={brand.slug} brand={brand} index={index} />
      ))}
    </div>
  );
}
