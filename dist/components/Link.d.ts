import React from "react";
import { LinkProps as NextLinkProps } from "next/link";
import { LinkProps as BaseLinkProps } from "@cloakui/react-primitives/Link";
export type LinkProps = Omit<BaseLinkProps, "internalLinkComponent"> & Omit<NextLinkProps, "href">;
export declare const Link: React.ForwardRefExoticComponent<Omit<LinkProps, "ref"> & React.RefAttributes<HTMLAnchorElement>>;
