import { brands } from "@/content/brands";

/** Pita nama brand bergerak (dekoratif). */
export function BrandMarquee() {
  const row = Array.from({ length: 4 }, () => brands.map((brand) => brand.name)).flat();
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-bone/10 py-6">
      <div className="flex w-max animate-marquee gap-12">
        {[...row, ...row].map((name, i) => (
          <span key={i} className="flex items-center gap-12 font-display text-4xl whitespace-nowrap text-bone/25 sm:text-5xl">
            {name}
            <span className="size-2 rounded-full bg-gold/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
