let cachedModules;
/**
 * Lazily loads and caches Next.js router modules (`next/router`, `next/navigation`).
 * Both may be present in the same project; availability at runtime depends on context.
 */
export function getNextRouterModules() {
    if (cachedModules)
        return cachedModules;
    let pages = null;
    let app = null;
    try {
        pages = require("next/router");
    }
    catch {
        // Pages Router not available
    }
    try {
        app = require("next/navigation");
    }
    catch {
        // App Router not available
    }
    cachedModules = { pages, app };
    return cachedModules;
}
export function stripQueryAndHash(path) {
    const [withoutHash] = path.split("#");
    const [pathname] = withoutHash.split("?");
    return pathname || "/";
}
