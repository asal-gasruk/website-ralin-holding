import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Icon } from "@/components/ui/Icon";
import { HeroSlideshow } from "./HeroSlideshow";

const heroImages = [
  "/images/tedja-hero.webp",
  "/images/tedja-com-music.webp",
  "/images/tedja-loc-saparua.webp",
  "/images/tedja-com-business.webp",
];

export function HomeHero() {
  const t = useTranslations("home.hero");
  const tc = useTranslations("common");

  return (
    <section className="relative isolate flex min-h-svh items-end overflow-hidden">
      <HeroSlideshow images={heroImages} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />

      <div className="container-site pb-16 sm:pb-24">
        <p className="eyebrow animate-fade-up text-gold">{t("eyebrow")}</p>
        <h1 className="animate-fade-up mt-5 max-w-5xl text-5xl leading-[0.95] [animation-delay:120ms] sm:text-7xl lg:text-8xl">
          {t("title")}
        </h1>
        <p className="animate-fade-up mt-7 max-w-xl text-base leading-relaxed text-bone/80 [animation-delay:240ms] sm:text-lg">
          {t("body")}
        </p>
        <div className="animate-fade-up mt-10 flex flex-col gap-3 [animation-delay:360ms] sm:flex-row">
          <ButtonLink href="/brands">{t("cta")}</ButtonLink>
          <ButtonLink href="/about" variant="outline">
            {t("secondary")}
          </ButtonLink>
        </div>
      </div>

      <a
        href="#intro"
        className="absolute right-4 bottom-8 hidden items-center gap-2 text-[0.625rem] tracking-[0.28em] text-bone/70 uppercase hover:text-bone sm:right-6 md:flex lg:right-10"
      >
        {tc("scroll")}
        <Icon name="arrow-down" className="size-3.5" />
      </a>
    </section>
  );
}
