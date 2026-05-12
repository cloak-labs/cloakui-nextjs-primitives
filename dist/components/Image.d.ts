import React from "react";
import NextImage from "next/image";
import type { TImageProps } from "@cloakui/types";
import type { CSSProperties } from "react";
export type ImageCntrRef = React.Ref<HTMLDivElement> | React.Ref<HTMLElement>;
export type ImageProps = Omit<TImageProps<CSSProperties>, "src" | "alt" | "width" | "height"> & React.ComponentProps<typeof NextImage> & {
    cntrElement?: React.ElementType<React.HTMLAttributes<HTMLElement>> | React.ReactElement<React.HTMLAttributes<HTMLElement>>;
    cntrRef?: ImageCntrRef;
};
export declare const Image: React.ForwardRefExoticComponent<Omit<ImageProps, "ref"> & React.RefAttributes<HTMLImageElement>>;
//# sourceMappingURL=Image.d.ts.map