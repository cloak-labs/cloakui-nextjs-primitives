import { LinkProps as NextLinkProps } from "next/link";
import { LinkProps as BaseLinkProps } from "@cloakui/react-primitives";
export type LinkProps = Omit<BaseLinkProps, "internalLinkComponent"> & Omit<NextLinkProps, "href">;
export declare const Link: (props: LinkProps) => import("react/jsx-runtime").JSX.Element;
