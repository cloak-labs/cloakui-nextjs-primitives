"use client";
import React from "react";
import { useNextRouterHooks } from "./useNextRouterHooks";
/**
 * Prevents client-side navigation while active (e.g. during CMS Block preview-mode).
 * Pages Router: throws on `routeChangeStart`.
 * App Router: intercepts anchor clicks within the document.
 */
export function useAbortNavigation(message) {
    const messageRef = React.useRef(message);
    const { pagesRouter } = useNextRouterHooks();
    React.useEffect(() => {
        messageRef.current = message;
    }, [message]);
    React.useEffect(() => {
        if (pagesRouter?.events) {
            const handler = () => {
                throw new Error(messageRef.current);
            };
            pagesRouter.events.on("routeChangeStart", handler);
            return () => {
                pagesRouter.events?.off("routeChangeStart", handler);
            };
        }
        const handleClick = (event) => {
            const target = event.target;
            if (!(target instanceof Element))
                return;
            const anchor = target.closest("a[href]");
            if (!anchor || !(anchor instanceof HTMLAnchorElement))
                return;
            const href = anchor.getAttribute("href");
            if (!href ||
                href.startsWith("#") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")) {
                return;
            }
            if (anchor.target === "_blank" ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey) {
                return;
            }
            try {
                const url = new URL(href, window.location.href);
                if (url.origin !== window.location.origin)
                    return;
            }
            catch {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            throw new Error(messageRef.current);
        };
        document.addEventListener("click", handleClick, true);
        return () => {
            document.removeEventListener("click", handleClick, true);
        };
    }, [pagesRouter]);
}
