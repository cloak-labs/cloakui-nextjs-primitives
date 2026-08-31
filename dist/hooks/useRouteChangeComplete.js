"use client";
import React from "react";
import { usePathname } from "./usePathname";
import { useNextRouterHooks } from "./useNextRouterHooks";
/**
 * Invokes a callback when a client-side route transition completes.
 * Pages Router: listens to `routeChangeComplete`.
 * App Router: fires when `usePathname()` changes.
 */
export function useRouteChangeComplete(callback) {
    const pathname = usePathname();
    const callbackRef = React.useRef(callback);
    const { pagesRouter } = useNextRouterHooks();
    React.useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);
    React.useEffect(() => {
        if (pagesRouter?.events) {
            const handler = () => callbackRef.current();
            pagesRouter.events.on("routeChangeComplete", handler);
            return () => {
                pagesRouter.events?.off("routeChangeComplete", handler);
            };
        }
    }, [pagesRouter]);
    const isFirstRender = React.useRef(true);
    React.useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (!pagesRouter?.events) {
            callbackRef.current();
        }
    }, [pathname, pagesRouter]);
}
