import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  body?: string;
  as?: "h1" | "h2";
  className?: string;
}

export function SectionHeading({ eyebrow, title, body, as: Heading = "h2", className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <p className="eyebrow text-gold">{eyebrow}</p>
      <Heading className="mt-4 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</Heading>
      {body && <p className="mt-5 max-w-xl text-base leading-relaxed text-bone-muted sm:text-lg">{body}</p>}
    </div>
  );
}
