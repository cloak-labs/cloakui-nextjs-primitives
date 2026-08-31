import { preload, type PreloadOptions } from "react-dom";
import { type ImgProps } from "next/dist/shared/lib/get-img-props";

function getPreloadOptions(imgAttributes: ImgProps): PreloadOptions {
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
export function ImagePreload({ imgAttributes }: { imgAttributes: ImgProps }) {
  if (imgAttributes.src) {
    preload(imgAttributes.src, getPreloadOptions(imgAttributes));
  }

  return null;
}
