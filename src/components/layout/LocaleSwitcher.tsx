"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const current = useLocale();

  return (
    <div role="group" aria-label={t("language")} className="inline-flex items-center gap-1 text-[0.6875rem] tracking-[0.2em] uppercase">
      {routing.locales.map((locale, index) => (
        <span key={locale} className="inline-flex items-center gap-1">
          {index > 0 && <span className="text-bone/30">/</span>}
          <Link
            href={pathname}
            locale={locale}
            aria-current={locale === current ? "true" : undefined}
            className={cn("px-1 py-1 transition-colors", locale === current ? "text-bone" : "text-bone/50 hover:text-bone")}
          >
            {locale}
          </Link>
        </span>
      ))}
    </div>
  );
}
