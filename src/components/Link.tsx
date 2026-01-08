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
    const _isAnchorLink = React.useMemo(
      () => isAnchorLink(href, baseUrl),
      [href, baseUrl]
    );

    const internalLinkComponent = React.useMemo(
      () =>
        withProps(NextLink, {
          legacyBehavior,
          passHref,
          replace,
          scroll: _isAnchorLink ? false : scroll,
          prefetch,
          shallow,
          locale,
        }),
      [
        legacyBehavior,
        passHref,
        replace,
        _isAnchorLink,
        scroll,
        prefetch,
        shallow,
        locale,
      ]
    );

    return (
      <BaseLink
        ref={ref}
        href={href}
        internalLinkComponent={internalLinkComponent}
        frontendUrl={baseUrl}
        {...props}
      />
    );
  }
);

Link.displayName = "Link";
