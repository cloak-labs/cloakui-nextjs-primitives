"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Image = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const image_1 = __importDefault(require("next/image"));
const react_primitives_1 = require("@cloakui/react-primitives");
const Link_1 = require("./Link");
const react_1 = __importDefault(require("react"));
const styles_1 = require("@cloakui/styles");
const VALID_LOADING_VALUES = ["lazy", "eager", undefined];
exports.Image = react_1.default.forwardRef(({ src, href, width = 800, height = 400, alt, caption, quality = 75, priority = false, placeholder = "empty", blurDataURL, className, style, cntrClassName, cntrStyle, captionClassName, ...props }, ref) => {
    const Wrapper = caption ? "figure" : "div"; // important for accessiblity reasons to wrap image with <figure> when it has an accompanying caption
    return ((0, jsx_runtime_1.jsxs)(Wrapper, { className: (0, styles_1.cx)("group relative", cntrClassName), style: cntrStyle, children: [(0, jsx_runtime_1.jsx)(Link_1.Link, { href: href, className: "relative", children: (0, jsx_runtime_1.jsx)(image_1.default, { ref: ref, src: src, className: className, style: style, width: width, height: height, alt: alt, quality: quality, priority: priority, placeholder: placeholder == "blur" ? (blurDataURL ? "blur" : "empty") : "empty", blurDataURL: blurDataURL, ...props }) }), caption && ((0, jsx_runtime_1.jsx)("figcaption", { className: captionClassName, children: (0, react_primitives_1.parseHtml)(caption) }))] }));
});
exports.Image.displayName = "Image";
