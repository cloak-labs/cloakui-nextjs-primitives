"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Link = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const react_primitives_1 = require("@cloakui/react-primitives");
const Link = (props) => {
    return (0, jsx_runtime_1.jsx)(react_primitives_1.Link, { internalLinkComponent: link_1.default, ...props });
};
exports.Link = Link;
