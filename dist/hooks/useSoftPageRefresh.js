"use client";
import React from "react";
import { useNextRouterHooks } from "./useNextRouterHooks";
/**
 * A hook that provides soft page refresh functionality for Next.js applications, meant to
 * speed up development when making changes in a CMS, as it's faster than the default hard refresh.
 *
 * This hook automatically detects and supports both Next.js router types:
 * - **App Router** (`next/navigation`): Uses `router.refresh()` to force data re-fetch
 * - **Pages Router** (`next/router`): Uses `router.replace()` with current URL
 *
 * The hook monitors `pageData` changes to detect when the refresh is complete.
 * When `pageData` changes (indicating new data has been fetched), the loading
 * state is automatically reset.
 *
 * Features:
 * - Automatic router detection and compatibility
 * - Keyboard shortcut support (Ctrl+Q / Cmd+Q)
 * - Loading state management with timeout fallback
 * - Error handling and graceful degradation
 *
 * @param pageData - The page data object that changes when refresh completes.
 *                   Typically passed from your page component's data fetching.
 *
 * @returns Object containing:
 *   - `isRefreshing`: Boolean indicating if refresh is in progress
 *   - `refresh`: Function to trigger a soft page refresh
 */
export const useSoftPageRefresh = (pageData) => {
    const [isRefreshing, setIsRefreshing] = React.useState(false);
    const originalAsPathRef = React.useRef(null);
    const { pagesRouter, appRouter } = useNextRouterHooks();
    const restoreOriginalUrl = React.useCallback(() => {
        if (typeof window === "undefined")
            return;
        if (!originalAsPathRef.current)
            return;
        try {
            window.history.replaceState(window.history.state, "", originalAsPathRef.current);
        }
        catch {
            // ignore; not critical
        }
        finally {
            originalAsPathRef.current = null;
        }
    }, []);
    const refresh = React.useCallback(() => {
        if (!appRouter && !pagesRouter) {
            console.warn("No router available for refresh");
            return;
        }
        setIsRefreshing(true);
        try {
            if (!pagesRouter?.replace) {
                throw new Error("Pages router not available");
            }
            const currentAsPath = pagesRouter.asPath ??
                (typeof window !== "undefined"
                    ? `${window.location.pathname}${window.location.search}${window.location.hash}`
                    : "/");
            originalAsPathRef.current = currentAsPath;
            const [basePath, hashFragment] = currentAsPath.split("#");
            const url = new URL(basePath || "/", typeof window !== "undefined" ? window.location.origin : "http://n");
            url.searchParams.set("__spr", String(Date.now()));
            const nextAsPath = `${url.pathname}${url.search}${hashFragment ? `#${hashFragment}` : ""}`;
            pagesRouter.replace(nextAsPath, nextAsPath, { scroll: false });
        }
        catch {
            try {
                if (appRouter?.refresh) {
                    appRouter.refresh();
                }
                else {
                    console.warn("No suitable refresh method found");
                    setIsRefreshing(false);
                }
            }
            catch (appError) {
                console.warn("Failed to refresh page:", appError);
                setIsRefreshing(false);
            }
        }
    }, [appRouter, pagesRouter]);
    React.useEffect(() => {
        setIsRefreshing(false);
        restoreOriginalUrl();
    }, [pageData, restoreOriginalUrl]);
    React.useEffect(() => {
        if (isRefreshing) {
            const timer = setTimeout(() => {
                console.warn("Soft refresh timeout - resetting loading state");
                setIsRefreshing(false);
                restoreOriginalUrl();
            }, 40000);
            return () => clearTimeout(timer);
        }
    }, [isRefreshing, restoreOriginalUrl]);
    React.useEffect(() => {
        const handleKeyDown = (event) => {
            if ((event.ctrlKey || event.metaKey) && event.key === "q") {
                event.preventDefault();
                refresh();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [refresh]);
    return { isRefreshing, refresh };
};
