import { preload } from "react-dom";
function getPreloadOptions(imgAttributes) {
    return {
        as: "image",
        imageSrcSet: imgAttributes.srcSet,
        imageSizes: imgAttributes.sizes,
        crossOrigin: imgAttributes.crossOrigin,
        referrerPolicy: imgAttributes.referrerPolicy,
        fetchPriority: imgAttributes.fetchPriority,
    };
}
/**
 * Preloads an image outside of the Next.js Image component (e.g. CSS background images).
 * Uses React 19's `preload()` to hoist a `<link rel="preload">` into the document head.
 */
export function ImagePreload({ imgAttributes }) {
    if (imgAttributes.src) {
        preload(imgAttributes.src, getPreloadOptions(imgAttributes));
    }
    return null;
}
