import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import NextLink from "next/link";
import { Link as BaseLink, } from "@cloakui/react-primitives/Link";
import { withProps } from "@cloakui/react-primitives/withProps";
import { isAnchorLink } from "@cloakui/utils";
export const Link = React.forwardRef(({ replace, scroll, legacyBehavior, passHref, prefetch, shallow, locale, href, ...props }, ref) => {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const _isAnchorLink = React.useMemo(() => isAnchorLink(href, baseUrl), [href, baseUrl]);
    const internalLinkComponent = React.useMemo(() => withProps(NextLink, {
        legacyBehavior,
        passHref,
        replace,
        scroll: _isAnchorLink ? false : scroll,
        prefetch,
        shallow,
        locale,
    }), [
        legacyBehavior,
        passHref,
        replace,
        _isAnchorLink,
        scroll,
        prefetch,
        shallow,
        locale,
    ]);
    return (_jsx(BaseLink, { ref: ref, href: href, internalLinkComponent: internalLinkComponent, frontendUrl: baseUrl, ...props }));
});
Link.displayName = "Link";
