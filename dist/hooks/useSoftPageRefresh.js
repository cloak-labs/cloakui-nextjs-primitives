import React from "react";
// Try to import both routers and detect which one is available
let pagesRouter = null;
let appRouter = null;
try {
    pagesRouter = require("next/router");
}
catch {
    // Pages router not available
}
try {
    appRouter = require("next/navigation");
}
catch {
    // App router not available
}
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
    // Call router hooks at the top level - we need to call both to avoid conditional hook calls
    let appRouterInstance = null;
    let pagesRouterInstance = null;
    // Always try to call both router hooks to maintain consistent hook order
    try {
        if (appRouter?.useRouter) {
            appRouterInstance = appRouter.useRouter();
        }
    }
    catch (error) {
        // App router not available
    }
    try {
        if (pagesRouter?.useRouter) {
            pagesRouterInstance = pagesRouter.useRouter();
        }
    }
    catch (error) {
        // Pages router not available
    }
    const refresh = React.useCallback(() => {
        if (!appRouterInstance && !pagesRouterInstance) {
            console.warn("No router available for refresh");
            return;
        }
        // Set loading state first
        setIsRefreshing(true);
        try {
            // Try pages router approach first (router.replace throws error in app router, so we catch it and then try the app router approach)
            pagesRouterInstance.replace(pagesRouterInstance.asPath, undefined, {
                scroll: false,
            });
        }
        catch (error) {
            // If pages router approach failed, try app router approach
            try {
                if (appRouterInstance?.refresh) {
                    appRouterInstance.refresh();
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
    }, [appRouterInstance, pagesRouterInstance]);
    React.useEffect(() => {
        setIsRefreshing(false);
    }, [pageData]);
    // Fallback: reset loading state after 40 seconds to prevent getting stuck
    React.useEffect(() => {
        if (isRefreshing) {
            const timer = setTimeout(() => {
                console.warn("Soft refresh timeout - resetting loading state");
                setIsRefreshing(false);
            }, 40000);
            return () => clearTimeout(timer);
        }
    }, [isRefreshing]);
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
