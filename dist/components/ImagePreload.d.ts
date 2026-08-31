import { type ImgProps } from "next/dist/shared/lib/get-img-props";
/**
 * Preloads an image outside of the Next.js Image component (e.g. CSS background images).
 * Uses React 19's `preload()` to hoist a `<link rel="preload">` into the document head.
 */
export declare function ImagePreload({ imgAttributes }: {
    imgAttributes: ImgProps;
}): any;
//# sourceMappingURL=ImagePreload.d.ts.map