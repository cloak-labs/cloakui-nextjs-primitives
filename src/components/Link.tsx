import React from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import {
  Link as BaseLink,
  LinkProps as BaseLinkProps,
} from "@cloakui/react-primitives/Link";
import { withProps } from "@cloakui/react-primitives/withProps";
import { isAnchorLink } from "@cloakui/utils";

export type LinkProps = Omit<BaseLinkProps, "internalLinkComponent"> &
  Omit<NextLinkProps, "href">;

export const Link = React.forwardRef<React.ElementRef<"a">, LinkProps>(
  (
    {
      replace,
      scroll,
      legacyBehavior,
      passHref,
      prefetch,
      shallow,
      locale,
      href,
      ...props
    },
    ref
  ) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const _isAnchorLink = isAnchorLink(href, baseUrl);

    return (
      <BaseLink
        ref={ref}
        href={href}
        internalLinkComponent={withProps(NextLink, {
          legacyBehavior,
          passHref,
          replace,
          scroll: _isAnchorLink ? false : scroll,
          prefetch,
          shallow,
          locale,
        })}
        frontendUrl={baseUrl}
        {...props}
      />
    );
  }
);

Link.displayName = "Link";
