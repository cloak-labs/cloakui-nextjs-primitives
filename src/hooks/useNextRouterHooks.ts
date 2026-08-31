"use client";

import {
  getNextRouterModules,
  type AppRouterInstance,
  type NextRouter,
  type ReadonlyURLSearchParams,
} from "../utils/nextRouterModules";

export type NextRouterHookResults = {
  pagesRouter: NextRouter | null;
  appRouter: AppRouterInstance | null;
  appPathname: string | null;
  appSearchParams: ReadonlyURLSearchParams | null;
};

type UseNextRouterHooksOptions = {
  includeSearchParams?: boolean;
};

/**
 * Invokes Next.js router hooks from both Pages and App Router modules.
 * Hooks are always called unconditionally to satisfy React's rules of hooks.
 */
export function useNextRouterHooks(
  options: UseNextRouterHooksOptions = {},
): NextRouterHookResults {
  const { includeSearchParams = false } = options;
  const { pages, app } = getNextRouterModules();

  let pagesRouter: NextRouterHookResults["pagesRouter"] = null;
  let appRouter: NextRouterHookResults["appRouter"] = null;
  let appPathname: NextRouterHookResults["appPathname"] = null;
  let appSearchParams: NextRouterHookResults["appSearchParams"] = null;

  try {
    if (pages?.useRouter) {
      pagesRouter = pages.useRouter();
    }
  } catch {
    // Pages Router not available in this context
  }

  try {
    if (app?.useRouter) {
      appRouter = app.useRouter();
    }
  } catch {
    // App Router useRouter not available in this context
  }

  try {
    if (app?.usePathname) {
      appPathname = app.usePathname();
    }
  } catch {
    // App Router usePathname not available in this context
  }

  try {
    if (includeSearchParams && app?.useSearchParams) {
      appSearchParams = app.useSearchParams();
    }
  } catch {
    // App Router useSearchParams not available in this context
  }

  return {
    pagesRouter,
    appRouter,
    appPathname,
    appSearchParams,
  };
}
