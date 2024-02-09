import { jsx as _jsx } from "react/jsx-runtime";
import NextLink from "next/link";
import { Link as BaseLink, } from "@cloakui/react-primitives";
export const Link = (props) => {
    return _jsx(BaseLink, { internalLinkComponent: NextLink, ...props });
};
