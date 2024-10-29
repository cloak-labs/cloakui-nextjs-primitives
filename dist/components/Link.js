import { jsx as _jsx } from "react/jsx-runtime";
import NextLink from "next/link";
import { Link as BaseLink, } from "@cloakui/react-primitives/Link";
import React from "react";
import { withProps } from "@cloakui/react-primitives/withProps";
export const Link = React.forwardRef(({ replace, scroll, legacyBehavior, passHref, prefetch, shallow, locale, ...props }, ref) => {
    return (_jsx(BaseLink, { ref: ref, internalLinkComponent: withProps(NextLink, {
            legacyBehavior,
            passHref,
            replace,
            scroll,
            prefetch,
            shallow,
            locale,
        }), frontendUrl: process.env.NEXT_PUBLIC_SITE_URL, ...props }));
});
Link.displayName = "Link";
