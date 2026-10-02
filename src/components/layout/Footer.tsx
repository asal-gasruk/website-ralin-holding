import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/ui/Wordmark";
import { brands } from "@/content/brands";
import { mainNav, socials } from "@/content/site";
import { Link } from "@/i18n/navigation";

const linkClass = "text-sm text-bone-muted transition-colors hover:text-bone";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bone/10 bg-ink">
      <div className="container-site grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Wordmark className="text-4xl" />
          <p className="mt-5 font-display text-2xl text-bone-muted italic">{t("tagline")}</p>
          <a
            href={socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full border border-bone/20 px-4 py-2.5 text-sm text-bone transition-colors hover:border-gold hover:text-gold"
          >
            <Icon name="instagram" className="size-4" />
            @ralinside
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 lg:col-span-7 lg:grid-cols-3">
          <div>
            <h2 className="eyebrow font-sans text-gold">{t("explore")}</h2>
            <ul className="mt-5 space-y-3">
              {mainNav.map((item) => (
                <li key={item.key}>
                  <Link href={item.href} className={linkClass}>
                    {tNav(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow font-sans text-gold">{t("brands")}</h2>
            <ul className="mt-5 space-y-3">
              {brands.map((brand) => (
                <li key={brand.slug}>
                  <Link href={`/brands/${brand.slug}`} className={linkClass}>
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-bone/10">
        <div className="container-site flex flex-col gap-2 py-6 text-xs text-bone-muted sm:flex-row sm:justify-between">
          <p>{t("rights", { year })}</p>
          <a href="#" className="hover:text-bone">
            {t("privacy")}
          </a>
        </div>
      </div>
    </footer>
  );
}
