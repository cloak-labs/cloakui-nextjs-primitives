import React from "react";
import NextImage from "next/image";
import { Link } from "./Link";
import { cx } from "@cloakui/styles";
import type { TImageProps } from "@cloakui/types";
import type { CSSProperties } from "react";

export type ImageCntrRef = React.Ref<HTMLDivElement> | React.Ref<HTMLElement>;

export type ImageProps = Omit<
  TImageProps<CSSProperties>,
  "src" | "alt" | "width" | "height"
> &
  React.ComponentProps<typeof NextImage> & {
    cntrElement?:
      | React.ElementType<React.HTMLAttributes<HTMLElement>>
      | React.ReactElement<React.HTMLAttributes<HTMLElement>>;
    cntrRef?: ImageCntrRef;
  };

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
      cntrElement,
      cntrRef,
      cntrClassName,
      cntrStyle,
      captionClassName,
      onClick,
      ...props
    },
    ref,
  ) => {
    const Wrapper = caption ? "figure" : "div"; // important for accessiblity reasons to wrap image with <figure> when it has an accompanying caption
    
    const elementOnClick = React.isValidElement(cntrElement)
      ? cntrElement.props.onClick
      : undefined;

    const instanceOnClick = onClick as unknown as
      | React.MouseEventHandler<HTMLElement>
      | undefined;

    const cntrProps: React.HTMLAttributes<HTMLElement> & {
      style?: CSSProperties;
    } = {
      className: cx(
        "group relative flex flex-col",
        onClick && "cursor-pointer",
        React.isValidElement(cntrElement) ? cntrElement.props.className : undefined,
        cntrClassName,
      ), // this relative wrapper is important
      style: {
        ...(React.isValidElement(cntrElement) ? cntrElement.props.style : undefined),
        ...cntrStyle,
      },
      onClick:
        elementOnClick || instanceOnClick
          ? (e) => {
              elementOnClick?.(e);
              instanceOnClick?.(e);
            }
          : undefined,
    };

    const children = (
      <>
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
      </>
    );

    if (React.isValidElement(cntrElement)) {
      return React.cloneElement(
        cntrElement,
        { ...cntrProps, ref: cntrRef } as unknown as Record<string, unknown>,
        children,
      );
    }

    if (cntrElement) {
      return React.createElement(
        cntrElement,
        { ...cntrProps, ref: cntrRef } as unknown as Record<string, unknown>,
        children,
      );
    }

    return (
      <Wrapper {...cntrProps} ref={cntrRef as unknown as React.Ref<any>}>
        {children}
      </Wrapper>
    );
  },
);

Image.displayName = "Image";
