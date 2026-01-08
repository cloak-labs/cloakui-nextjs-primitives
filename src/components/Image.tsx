import React from "react";
import NextImage from "next/image";
import { Link } from "./Link";
import { cx } from "@cloakui/styles";
import type { TImageProps } from "@cloakui/types";
import type { CSSProperties } from "react";

export type ImageProps = Omit<
  TImageProps<CSSProperties>,
  "src" | "alt" | "width" | "height"
> &
  React.ComponentProps<typeof NextImage>;

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      src,
      href,
      target,
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
      onClick,
      ...props
    },
    ref
  ) => {
    const Wrapper = caption ? "figure" : "div"; // important for accessiblity reasons to wrap image with <figure> when it has an accompanying caption
    return (
      <Wrapper
        className={cx(
          "group relative flex flex-col",
          onClick && "cursor-pointer",
          cntrClassName
        )} // this relative wrapper is important
        style={cntrStyle}
        onClick={onClick}
      >
        <Link
          href={href}
          // it's important to conditionally add classNames only when href is present, because classNames can't be applied to a Fragment (the fallback):
          {...(href ? { target, className: "h-full relative" } : {})}
          fallbackAs={React.Fragment}
        >
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
            dangerouslySetInnerHTML={{
              __html: caption,
            }}
          />
        )}
      </Wrapper>
    );
  }
);

Image.displayName = "Image";
