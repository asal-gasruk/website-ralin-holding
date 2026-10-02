import { getTranslations, setRequestLocale } from "next-intl/server";
import { NewsCard } from "@/components/sections/NewsCard";
import { PageHero } from "@/components/sections/PageHero";
import { news } from "@/content/news";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata({ params }: PageProps<"/[locale]/news">) {
  return pageMetadata(params, "news", "/news");
}

export default async function NewsPage({ params }: PageProps<"/[locale]/news">) {
  setRequestLocale((await params).locale as Locale);
  const t = await getTranslations("newsPage");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
      <section className="container-site pb-24 sm:pb-32">
        <div className="reveal-stagger grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard key={item.slug} item={item} />
          ))}
        </div>
      </section>
    </>
  );
}
