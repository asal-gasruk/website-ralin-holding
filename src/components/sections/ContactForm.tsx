"use client";

import { useId, useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/Icon";

const topics = ["general", "partnership", "franchise", "media", "careers"] as const;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const REQUIRED = ["name", "email", "topic", "message"] as const;

const fieldClass =
  "w-full border-b border-bone/25 bg-transparent py-3 text-base text-bone placeholder:text-bone/30 transition-colors focus:border-gold focus:outline-none aria-[invalid=true]:border-sajikawani";

/** Form kontak (validasi klien; belum terhubung backend). */
export function ContactForm() {
  const t = useTranslations("contactPage");
  const id = useId();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const next: Record<string, string> = {};
    for (const name of REQUIRED) {
      if (!String(data.get(name) ?? "").trim()) next[name] = t("form.required");
    }
    const email = String(data.get("email") ?? "").trim();
    if (email && !EMAIL_PATTERN.test(email)) next.email = t("form.invalidEmail");
    setErrors(next);
    const first = Object.keys(next)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    // TODO: kirim ke endpoint/email resmi RALIN
    setSent(true);
  };

  if (sent) {
    return (
      <div role="status" className="rounded-3xl border border-bone/10 p-10">
        <span className="grid size-12 place-items-center rounded-full bg-gold text-ink">
          <Icon name="check" className="size-6" />
        </span>
        <h2 className="mt-6 text-4xl">{t("form.successTitle")}</h2>
        <p className="mt-3 text-bone-muted">{t("form.successBody")}</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 text-xs tracking-[0.2em] text-gold uppercase hover:text-bone"
        >
          {t("form.sendAnother")}
        </button>
      </div>
    );
  }

  const field = (name: string) => ({
    id: `${id}-${name}`,
    name,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${id}-${name}-error` : undefined,
  });
  const label = (name: string, text: string, required = true) => (
    <label htmlFor={`${id}-${name}`} className="text-[0.6875rem] tracking-[0.2em] text-bone-muted uppercase">
      {text}
      {required && <span className="text-gold"> *</span>}
    </label>
  );
  const error = (name: string) =>
    errors[name] ? (
      <p id={`${id}-${name}-error`} className="mt-2 text-xs text-sajikawani">
        {errors[name]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-8 sm:grid-cols-2">
      <div>
        {label("name", t("form.name"))}
        <input {...field("name")} autoComplete="name" className={fieldClass} />
        {error("name")}
      </div>
      <div>
        {label("email", t("form.email"))}
        <input {...field("email")} type="email" autoComplete="email" className={fieldClass} />
        {error("email")}
      </div>
      <div>
        {label("company", t("form.company"), false)}
        <input {...field("company")} autoComplete="organization" className={fieldClass} />
      </div>
      <div>
        {label("topic", t("form.topic"))}
        <select {...field("topic")} defaultValue="" className={`${fieldClass} [&>option]:bg-ink`}>
          <option value="" disabled>
            {t("form.choose")}
          </option>
          {topics.map((topic) => (
            <option key={topic} value={topic}>
              {t(`topics.${topic}`)}
            </option>
          ))}
        </select>
        {error("topic")}
      </div>
      <div className="sm:col-span-2">
        {label("message", t("form.message"))}
        <textarea {...field("message")} rows={5} className={`${fieldClass} resize-y`} />
        {error("message")}
      </div>
      <div className="sm:col-span-2">
        <button
          type="submit"
          className="group inline-flex items-center gap-3 rounded-full bg-bone px-7 py-4 text-xs font-medium tracking-[0.18em] text-ink uppercase transition-colors hover:bg-gold"
        >
          {t("form.submit")}
          <Icon name="arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
