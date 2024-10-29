import NextLink, { LinkProps as NextLinkProps } from "next/link";
import {
  Link as BaseLink,
  LinkProps as BaseLinkProps,
} from "@cloakui/react-primitives/Link";
import React from "react";
import { withProps } from "@cloakui/react-primitives/withProps";

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
      ...props
    },
    ref
  ) => {
    return (
      <BaseLink
        ref={ref}
        internalLinkComponent={withProps(NextLink, {
          legacyBehavior,
          passHref,
          replace,
          scroll,
          prefetch,
          shallow,
          locale,
        })}
        frontendUrl={process.env.NEXT_PUBLIC_SITE_URL}
        {...props}
      />
    );
  }
);

Link.displayName = "Link";
