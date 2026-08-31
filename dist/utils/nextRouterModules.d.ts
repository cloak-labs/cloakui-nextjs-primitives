import type { NextRouter } from "next/router";
import type { ReadonlyURLSearchParams } from "next/navigation";
export type PagesRouterModule = Pick<typeof import("next/router"), "useRouter">;
export type AppRouterModule = Pick<typeof import("next/navigation"), "useRouter" | "usePathname" | "useSearchParams">;
/** Derived from `next/navigation`'s `useRouter` (not exported as a named type in all Next versions). */
export type AppRouterInstance = ReturnType<AppRouterModule["useRouter"]>;
export type { NextRouter, ReadonlyURLSearchParams };
type NextRouterModules = {
    pages: PagesRouterModule | null;
    app: AppRouterModule | null;
};
/**
 * Lazily loads and caches Next.js router modules (`next/router`, `next/navigation`).
 * Both may be present in the same project; availability at runtime depends on context.
 */
export declare function getNextRouterModules(): NextRouterModules;
export declare function stripQueryAndHash(path: string): string;
//# sourceMappingURL=nextRouterModules.d.ts.map