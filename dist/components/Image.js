import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import NextImage from "next/image";
import { Link } from "./Link";
import { cx } from "@cloakui/styles";
export const Image = React.forwardRef(({ src, href, target, width = 800, height = 400, alt, caption, quality = 75, priority = false, placeholder = "empty", blurDataURL, className, style, cntrClassName, cntrStyle, captionClassName, onClick, ...props }, ref) => {
    const Wrapper = caption ? "figure" : "div"; // important for accessiblity reasons to wrap image with <figure> when it has an accompanying caption
    return (_jsxs(Wrapper, { className: cx("group relative flex flex-col", onClick && "cursor-pointer", cntrClassName), style: cntrStyle, onClick: onClick, children: [_jsx(Link, { href: href, ...(href ? { target, className: "h-full relative" } : {}), fallbackAs: React.Fragment, children: _jsx(NextImage, { ref: ref, src: src, className: className, style: style, width: width, height: height, alt: alt, quality: quality, priority: priority, placeholder: placeholder == "blur" ? (blurDataURL ? "blur" : "empty") : "empty", blurDataURL: blurDataURL, ...props }) }), caption && (_jsx("figcaption", { className: captionClassName, dangerouslySetInnerHTML: {
                    __html: caption,
                } }))] }));
});
Image.displayName = "Image";
