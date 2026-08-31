import type { NextRouter } from "next/router";
import type { ReadonlyURLSearchParams } from "next/navigation";

export type PagesRouterModule = Pick<
  typeof import("next/router"),
  "useRouter"
>;

export type AppRouterModule = Pick<
  typeof import("next/navigation"),
  "useRouter" | "usePathname" | "useSearchParams"
>;

/** Derived from `next/navigation`'s `useRouter` (not exported as a named type in all Next versions). */
export type AppRouterInstance = ReturnType<AppRouterModule["useRouter"]>;

export type { NextRouter, ReadonlyURLSearchParams };

type NextRouterModules = {
  pages: PagesRouterModule | null;
  app: AppRouterModule | null;
};

let cachedModules: NextRouterModules | undefined;

/**
 * Lazily loads and caches Next.js router modules (`next/router`, `next/navigation`).
 * Both may be present in the same project; availability at runtime depends on context.
 */
export function getNextRouterModules(): NextRouterModules {
  if (cachedModules) return cachedModules;

  let pages: PagesRouterModule | null = null;
  let app: AppRouterModule | null = null;

  try {
    pages = require("next/router") as PagesRouterModule;
  } catch {
    // Pages Router not available
  }

  try {
    app = require("next/navigation") as AppRouterModule;
  } catch {
    // App Router not available
  }

  cachedModules = { pages, app };
  return cachedModules;
}

export function stripQueryAndHash(path: string): string {
  const [withoutHash] = path.split("#");
  const [pathname] = withoutHash.split("?");
  return pathname || "/";
}
