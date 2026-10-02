import type { ReactNode } from "react";

// Di-mount ulang setiap navigasi → transisi halus antar halaman
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
