import NextImage, { ImageLoader } from "next/image";
import { parseHtml } from "@cloakui/react-primitives";
import { Link } from "./Link";
// import { type ImageProps as NextImageProps } from "next/image";
import type { TImageProps } from "@cloakui/types";
import type { CSSProperties } from "react";
import React from "react";
import { cx } from "@cloakui/styles";

// ============================== START copied Next.js Image types
/* 
  The following types were copied from `next/image` in order to fix a strange
  TypeScript error related to re-exporting Types from an external module.
  Not an ideal solution, but nothing else worked.

  Related GH issue: https://github.com/microsoft/TypeScript/issues/5711
*/

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

export type NextImageProps = Omit<
  JSX.IntrinsicElements["img"],
  "src" | "srcSet" | "ref" | "alt" | "width" | "height" | "loading"
> & {
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

const VALID_LOADING_VALUES = ["lazy", "eager", undefined] as const;
type LoadingValue = (typeof VALID_LOADING_VALUES)[number];

export type OnLoadingComplete = (img: HTMLImageElement) => void;
// ============================== END copied Next.js Image types

export type ImageProps = Omit<
  TImageProps<CSSProperties>,
  "src" | "alt" | "width" | "height"
> &
  NextImageProps;

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      href,
      width = 800,
      height = 400,
      alt,
      caption,
      quality = 75,
      priority = false,
      placeholder = "empty",
      blurDataURL,
      className,
      style,
      cntrClassName,
      cntrStyle,
      captionClassName,
      ...props
    },
    ref
  ) => {
    const Wrapper = caption ? "figure" : "div"; // important for accessiblity reasons to wrap image with <figure> when it has an accompanying caption
    return (
      <Wrapper
        className={cx("group relative", cntrClassName)}
        style={cntrStyle}
      >
        <Link href={href} className="relative">
          <NextImage
            ref={ref}
            src={src}
            className={className}
            style={style}
            width={width}
            height={height}
            alt={alt}
            quality={quality}
            priority={priority}
            placeholder={
              placeholder == "blur" ? (blurDataURL ? "blur" : "empty") : "empty"
            } // prevent user error by not allowing placeholder == 'blur' when user hasn't defined a blurDataURL
            blurDataURL={blurDataURL}
            {...props}
          />
        </Link>
        {caption && (
          <figcaption
            className={captionClassName}
            // style={{ width: "100%", maxWidth: "100%" }}
          >
            {parseHtml(caption)}
          </figcaption>
        )}
      </Wrapper>
    );
  }
);

Image.displayName = "Image";
