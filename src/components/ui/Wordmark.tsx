import { cn } from "@/lib/cn";

/** Wordmark RALIN sementara (teks). TODO: ganti dengan logo resmi. */
export function Wordmark({ className }: { className?: string }) {
  return <span className={cn("font-display text-2xl leading-none tracking-[0.32em]", className)}>RALIN</span>;
}
