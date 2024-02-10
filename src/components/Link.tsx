import NextLink, { LinkProps as NextLinkProps } from "next/link";
import {
  Link as BaseLink,
  LinkProps as BaseLinkProps,
} from "@cloakui/react-primitives/Link";

export type LinkProps = Omit<BaseLinkProps, "internalLinkComponent"> &
  Omit<NextLinkProps, "href">;

export const Link = (props: LinkProps) => {
  return <BaseLink internalLinkComponent={NextLink} {...props} />;
};
