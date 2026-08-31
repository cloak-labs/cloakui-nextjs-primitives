"use client";

import React from "react";
import { stripQueryAndHash } from "../utils/nextRouterModules";
import { useNextRouterHooks } from "./useNextRouterHooks";

/**
 * Returns the current pathname, compatible with both Next.js router types.
 * Pages Router: derived from `router.asPath` (query/hash stripped).
 * App Router: `usePathname()` (optionally with search params when `includeSearchParams` is true).
 */
export function usePathname(options?: { includeSearchParams?: boolean }): string {
  const includeSearchParams = options?.includeSearchParams ?? false;
  const { pagesRouter, appPathname, appSearchParams } = useNextRouterHooks({
    includeSearchParams,
  });

  return React.useMemo(() => {
    if (pagesRouter?.asPath) {
      return stripQueryAndHash(pagesRouter.asPath);
    }

    if (appPathname) {
      if (includeSearchParams && appSearchParams) {
        const search = appSearchParams.toString();
        return search ? `${appPathname}?${search}` : appPathname;
      }
      return appPathname;
    }

    if (typeof window !== "undefined") {
      return stripQueryAndHash(window.location.pathname + window.location.search);
    }

    return "/";
  }, [
    pagesRouter?.asPath,
    appPathname,
    appSearchParams,
    includeSearchParams,
  ]);
}
