import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactForm } from "@/components/sections/ContactForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

export function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  return pageMetadata(params, "contact", "/contact");
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  setRequestLocale((await params).locale as Locale);
  const t = await getTranslations("contactPage");

  return (
    <section className="container-site grid gap-16 pt-40 pb-24 sm:pt-48 sm:pb-32 lg:grid-cols-12">
      <div className="animate-fade-up lg:col-span-5">
        <SectionHeading as="h1" eyebrow={t("eyebrow")} title={t("title")} body={t("body")} />
        {/* TODO: alamat kantor, email & telepon resmi RALIN */}
      </div>
      <div className="animate-fade-up [animation-delay:150ms] lg:col-span-6 lg:col-start-7 lg:pt-16">
        <ContactForm />
      </div>
    </section>
  );
}
