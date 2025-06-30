import { type ImgProps } from "next/dist/shared/lib/get-img-props";
/**
 * This component is taken and adapted from Next.js internals. It enables us to manually preload images outside of the Next.js image component (eg. to preload CSS background images).
 */
export declare function ImagePreload({ imgAttributes }: {
    imgAttributes: ImgProps;
}): import("react/jsx-runtime").JSX.Element;
