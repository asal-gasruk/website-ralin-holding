"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/ui/Wordmark";
import { brands } from "@/content/brands";
import { mainNav } from "@/content/site";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { localize } from "@/lib/localize";
import { LocaleSwitcher } from "./LocaleSwitcher";

export function Header() {
  const t = useTranslations("nav");
  const tc = useTranslations("common");
  const pathname = usePathname();
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const close = () => setIsOpen(false);
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        isScrolled || isOpen ? "bg-ink/90 backdrop-blur-md" : "bg-gradient-to-b from-ink/60 to-transparent",
      )}
    >
      <div className="container-site flex h-20 items-center justify-between">
        <Link href="/" aria-label={t("home")} onClick={close}>
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-10">
            {mainNav.map((item) =>
              item.key === "brands" ? (
                <li key={item.key} className="group relative">
                  <Link
                    href={item.href}
                    className={cn(
                      "inline-flex items-center gap-1 text-xs tracking-[0.2em] uppercase transition-colors hover:text-gold",
                      isActive(item.href) ? "text-gold" : "text-bone",
                    )}
                  >
                    {t(item.key)}
                    <Icon name="chevron-down" className="size-3.5 transition-transform group-focus-within:rotate-180 group-hover:rotate-180" />
                  </Link>
                  {/* Dropdown brand */}
                  <div className="invisible absolute top-full left-1/2 w-72 -translate-x-1/2 pt-5 opacity-0 transition-all duration-300 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    <ul className="rounded-2xl border border-bone/10 bg-ink-800/95 p-2 shadow-2xl backdrop-blur-md">
                      {brands.map((brand) => (
                        <li key={brand.slug}>
                          <Link
                            href={`/brands/${brand.slug}`}
                            className="flex items-center justify-between gap-3 rounded-xl px-4 py-3 transition-colors hover:bg-bone/5"
                          >
                            <span>
                              <span className="block font-display text-xl">{brand.name}</span>
                              <span className="text-[0.6875rem] tracking-[0.12em] text-bone-muted uppercase">
                                {localize(brand.category, locale)}
                                {brand.status === "comingSoon" && ` · ${tc("comingSoon")}`}
                              </span>
                            </span>
                            <Icon name="arrow-right" className="size-4 text-bone-muted" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ) : (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-xs tracking-[0.2em] uppercase transition-colors hover:text-gold",
                      isActive(item.href) ? "text-gold" : "text-bone",
                    )}
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block">
            <LocaleSwitcher />
          </div>
          <button
            type="button"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? t("closeMenu") : t("openMenu")}
            className="grid size-10 place-items-center text-bone lg:hidden"
          >
            <Icon name={isOpen ? "close" : "menu"} className="size-6" />
          </button>
        </div>
      </div>

      <div id="mobile-nav" hidden={!isOpen} className="h-[calc(100dvh-5rem)] overflow-y-auto bg-ink lg:hidden">
        <nav aria-label="Mobile" className="container-site flex flex-col py-6">
          {mainNav.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={close}
              className={cn(
                "border-b border-bone/10 py-4 font-display text-3xl transition-colors",
                isActive(item.href) ? "text-gold" : "text-bone",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
          <div className="mt-8">
            <LocaleSwitcher />
          </div>
        </nav>
      </div>
    </header>
  );
}
