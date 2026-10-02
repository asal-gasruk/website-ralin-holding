import Image from "next/image";
import { useLocale } from "next-intl";
import { getBrand } from "@/content/brands";
import type { NewsItem } from "@/content/types";
import type { Locale } from "@/i18n/routing";
import { brandSurface } from "@/lib/brand-style";
import { cn } from "@/lib/cn";
import { formatDate, localize } from "@/lib/localize";


export function NewsCard({ item }: { item: NewsItem }) {
  const locale = useLocale() as Locale;
  const brand = getBrand(item.brand);

  return (
    <article className="group">
      <div className={cn("relative aspect-[4/3] overflow-hidden rounded-2xl", brand ? brandSurface[brand.color] : "bg-ink-700")}>
        {item.image ? (
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 30vw, 90vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center font-display text-4xl text-bone/70">{brand?.name}</span>
        )}
      </div>
      <p className="mt-5 text-[0.6875rem] tracking-[0.18em] text-bone-muted uppercase">
        {brand?.name} · <time dateTime={item.date}>{formatDate(item.date, locale)}</time>
      </p>
      <h3 className="mt-2 text-2xl leading-snug">{localize(item.title, locale)}</h3>
      <p className="mt-2 text-sm leading-relaxed text-bone-muted">{localize(item.excerpt, locale)}</p>
    </article>
  );
}
