import Image from "next/image";
import { useLocale } from "next-intl";
import { team, type TeamMember } from "@/content/team";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { localize } from "@/lib/localize";

function MemberCard({ member, large }: { member: TeamMember; large?: boolean }) {
  const locale = useLocale() as Locale;
  return (
    <figure className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-bone">
        <Image
          src={member.image}
          alt={member.name ?? ""}
          fill
          sizes={large ? "(min-width: 1024px) 26vw, 48vw" : "(min-width: 1024px) 13vw, (min-width: 640px) 20vw, 32vw"}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      {member.name && (
        <figcaption className="mt-3">
          <p className={cn("leading-tight", large ? "text-xl" : "text-sm")}>{member.name}</p>
          {member.role && <p className="mt-0.5 text-xs text-bone-muted">{localize(member.role, locale)}</p>}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Grid tim. Desktop: 7 kolom — dua potret utama 2×2, 13 potret lain mengisi pas 3 baris.
 * Mobile/tablet: flex-wrap terpusat agar baris terakhir tidak menggantung di kiri.
 */
export function TeamGrid() {
  return (
    <div className="reveal-stagger flex flex-wrap justify-center gap-3 sm:gap-4 lg:grid lg:grid-cols-7">
      {team.map((member) => (
        <div
          key={member.image}
          className={cn(
            member.featured
              ? "w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)] lg:col-span-2 lg:row-span-2 lg:w-auto"
              : "w-[calc(33.333%-0.5rem)] sm:w-[calc(20%-0.8rem)] lg:w-auto",
          )}
        >
          <MemberCard member={member} large={member.featured} />
        </div>
      ))}
    </div>
  );
}
