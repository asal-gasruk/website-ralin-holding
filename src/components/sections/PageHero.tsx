import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  body?: string;
  image?: string;
}

/** Header halaman: judul besar, opsional foto latar redup. */
export function PageHero({ eyebrow, title, body, image }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden">
      {image && (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 animate-ken-burns object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/75 to-ink/40" />
        </>
      )}
      <div className="container-site pt-40 pb-16 sm:pt-48 sm:pb-20">
        <SectionHeading as="h1" eyebrow={eyebrow} title={title} body={body} className="animate-fade-up max-w-3xl" />
      </div>
    </section>
  );
}
