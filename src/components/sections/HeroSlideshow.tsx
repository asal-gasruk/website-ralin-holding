"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

const INTERVAL_MS = 6000;

/** Latar hero: foto bergantian dengan crossfade + efek zoom pelan (ala video). */
export function HeroSlideshow({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(() => setIndex((current) => (current + 1) % images.length), INTERVAL_MS);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden" aria-hidden="true">
      {images.map((src, i) => (
        <div
          key={src}
          className={cn("absolute inset-0 transition-opacity duration-[1500ms]", i === index ? "opacity-100" : "opacity-0")}
        >
          {/* key berubah → animasi zoom diputar ulang setiap foto tampil */}
          <div key={i === index ? `active-${index}` : src} className={cn("absolute inset-0", i === index && "animate-ken-burns")}>
            <Image src={src} alt="" fill priority={i === 0} sizes="100vw" className="object-cover" />
          </div>
        </div>
      ))}
    </div>
  );
}
