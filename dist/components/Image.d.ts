import React from "react";
import NextImage from "next/image";
import type { TImageProps } from "@cloakui/types";
import type { CSSProperties } from "react";
export type ImageProps = Omit<TImageProps<CSSProperties>, "src" | "alt" | "width" | "height"> & React.ComponentProps<typeof NextImage>;
export declare const Image: React.ForwardRefExoticComponent<Omit<ImageProps, "ref"> & React.RefAttributes<HTMLImageElement>>;
