import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import NextImage from "next/image";
import { parseHtml } from "@cloakui/react-primitives";
import { Link } from "./Link";
import React from "react";
import { cx } from "@cloakui/styles";
const VALID_LOADING_VALUES = ["lazy", "eager", undefined];
export const Image = React.forwardRef(({ src, href, width = 800, height = 400, alt, caption, quality = 75, priority = false, placeholder = "empty", blurDataURL, className, style, cntrClassName, cntrStyle, captionClassName, ...props }, ref) => {
    const Wrapper = caption ? "figure" : "div"; // important for accessiblity reasons to wrap image with <figure> when it has an accompanying caption
    return (_jsxs(Wrapper, { className: cx("group relative", cntrClassName), style: cntrStyle, children: [_jsx(Link, { href: href, className: "relative", children: _jsx(NextImage, { ref: ref, src: src, className: className, style: style, width: width, height: height, alt: alt, quality: quality, priority: priority, placeholder: placeholder == "blur" ? (blurDataURL ? "blur" : "empty") : "empty", blurDataURL: blurDataURL, ...props }) }), caption && (_jsx("figcaption", { className: captionClassName, children: parseHtml(caption) }))] }));
});
Image.displayName = "Image";
