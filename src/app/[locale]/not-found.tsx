import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  const t = useTranslations("notFound");
  return (
    <section className="container-site flex min-h-[80svh] flex-col justify-center pt-24">
      <p className="eyebrow text-gold">404</p>
      <h1 className="mt-4 text-6xl sm:text-8xl">{t("title")}</h1>
      <ButtonLink href="/" className="mt-10 self-start">
        {t("cta")}
      </ButtonLink>
    </section>
  );
}
