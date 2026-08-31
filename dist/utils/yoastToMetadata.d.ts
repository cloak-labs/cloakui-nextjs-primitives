import type { Metadata } from "next";
export type YoastSEOJson = {
    title?: string;
    description?: string;
    robots?: {
        index: string;
        follow: string;
        "max-snippet"?: string;
        "max-image-preview"?: string;
        "max-video-preview"?: string;
    };
    canonical?: string;
    og_locale?: string;
    og_type?: string;
    og_title?: string;
    og_description?: string;
    og_url?: string;
    og_site_name?: string;
    og_image?: Array<{
        url: string;
        width?: number;
        height?: number;
        type?: string;
    }>;
    article_publisher?: string;
    article_modified_time?: string;
    twitter_card?: string;
    twitter_site?: string;
    twitter_description?: string;
    twitter_misc?: {
        [key: string]: string;
    };
    schema?: {
        "@context": string;
        "@graph": Record<string, string>[];
    };
};
/**
 * Converts Yoast SEO JSON (from WordPress REST API) to a Next.js Metadata object
 * suitable for App Router `generateMetadata` exports.
 */
export declare function yoastToMetadata(yoast?: YoastSEOJson | null): Metadata;
//# sourceMappingURL=yoastToMetadata.d.ts.map