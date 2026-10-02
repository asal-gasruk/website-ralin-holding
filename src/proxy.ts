import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Semua path kecuali API, internal Next.js, dan file statis (yang punya ekstensi)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
