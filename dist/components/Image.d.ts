import { ImageLoader } from "next/image";
import type { TImageProps } from "@cloakui/types";
import type { CSSProperties } from "react";
import React from "react";
export interface StaticImageData {
    src: string;
    height: number;
    width: number;
    blurDataURL?: string;
    blurWidth?: number;
    blurHeight?: number;
}
export interface StaticRequire {
    default: StaticImageData;
}
export type StaticImport = StaticRequire | StaticImageData;
export type NextImageProps = Omit<JSX.IntrinsicElements["img"], "src" | "srcSet" | "ref" | "alt" | "width" | "height" | "loading"> & {
    src: string | StaticImport;
    alt: string;
    width?: number | `${number}`;
    height?: number | `${number}`;
    fill?: boolean;
    loader?: ImageLoader;
    quality?: number | `${number}`;
    priority?: boolean;
    loading?: LoadingValue;
    placeholder?: PlaceholderValue;
    blurDataURL?: string;
    unoptimized?: boolean;
    /**
     * @deprecated Use `onLoad` instead.
     * @see https://nextjs.org/docs/app/api-reference/components/image#onload
     */
    onLoadingComplete?: OnLoadingComplete;
    /**
     * @deprecated Use `fill` prop instead of `layout="fill"` or change import to `next/legacy/image`.
     * @see https://nextjs.org/docs/api-reference/next/legacy/image
     */
    layout?: string;
    /**
     * @deprecated Use `style` prop instead.
     */
    objectFit?: string;
    /**
     * @deprecated Use `style` prop instead.
     */
    objectPosition?: string;
    /**
     * @deprecated This prop does not do anything.
     */
    lazyBoundary?: string;
    /**
     * @deprecated This prop does not do anything.
     */
    lazyRoot?: string;
};
export type PlaceholderValue = "blur" | "empty" | `data:image/${string}`;
declare const VALID_LOADING_VALUES: readonly ["lazy", "eager", any];
type LoadingValue = (typeof VALID_LOADING_VALUES)[number];
export type OnLoadingComplete = (img: HTMLImageElement) => void;
export type ImageProps = Omit<TImageProps<CSSProperties>, "src" | "alt" | "width" | "height"> & NextImageProps;
export declare const Image: React.ForwardRefExoticComponent<Omit<TImageProps<CSSProperties>, "src" | "alt" | "width" | "height"> & Omit<React.DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, "src" | "srcSet" | "ref" | "alt" | "width" | "height" | "loading"> & {
    src: string | StaticImport;
    alt: string;
    width?: number | `${number}`;
    height?: number | `${number}`;
    fill?: boolean;
    loader?: ImageLoader;
    quality?: number | `${number}`;
    priority?: boolean;
    loading?: LoadingValue;
    placeholder?: PlaceholderValue;
    blurDataURL?: string;
    unoptimized?: boolean;
    /**
     * @deprecated Use `onLoad` instead.
     * @see https://nextjs.org/docs/app/api-reference/components/image#onload
     */
    onLoadingComplete?: OnLoadingComplete;
    /**
     * @deprecated Use `fill` prop instead of `layout="fill"` or change import to `next/legacy/image`.
     * @see https://nextjs.org/docs/api-reference/next/legacy/image
     */
    layout?: string;
    /**
     * @deprecated Use `style` prop instead.
     */
    objectFit?: string;
    /**
     * @deprecated Use `style` prop instead.
     */
    objectPosition?: string;
    /**
     * @deprecated This prop does not do anything.
     */
    lazyBoundary?: string;
    /**
     * @deprecated This prop does not do anything.
     */
    lazyRoot?: string;
} & React.RefAttributes<HTMLImageElement>>;
export {};
