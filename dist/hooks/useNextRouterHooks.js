"use client";
import { getNextRouterModules, } from "../utils/nextRouterModules";
/**
 * Invokes Next.js router hooks from both Pages and App Router modules.
 * Hooks are always called unconditionally to satisfy React's rules of hooks.
 */
export function useNextRouterHooks(options = {}) {
    const { includeSearchParams = false } = options;
    const { pages, app } = getNextRouterModules();
    let pagesRouter = null;
    let appRouter = null;
    let appPathname = null;
    let appSearchParams = null;
    try {
        if (pages?.useRouter) {
            pagesRouter = pages.useRouter();
        }
    }
    catch {
        // Pages Router not available in this context
    }
    try {
        if (app?.useRouter) {
            appRouter = app.useRouter();
        }
    }
    catch {
        // App Router useRouter not available in this context
    }
    try {
        if (app?.usePathname) {
            appPathname = app.usePathname();
        }
    }
    catch {
        // App Router usePathname not available in this context
    }
    try {
        if (includeSearchParams && app?.useSearchParams) {
            appSearchParams = app.useSearchParams();
        }
    }
    catch {
        // App Router useSearchParams not available in this context
    }
    return {
        pagesRouter,
        appRouter,
        appPathname,
        appSearchParams,
    };
}
