function stripTrailingSlash(url) {
    try {
        const parsed = new URL(url);
        if (parsed.pathname !== "/") {
            parsed.pathname = parsed.pathname.replace(/\/+$/, "");
            return parsed.toString();
        }
        return url;
    }
    catch {
        return url.replace(/\/+$/, "") || url;
    }
}
function robotsFromYoast(robots) {
    if (!robots)
        return undefined;
    const values = Object.values(robots).join(", ").toLowerCase();
    return {
        index: !values.includes("noindex"),
        follow: !values.includes("nofollow"),
    };
}
/**
 * Converts Yoast SEO JSON (from WordPress REST API) to a Next.js Metadata object
 * suitable for App Router `generateMetadata` exports.
 */
export function yoastToMetadata(yoast) {
    if (!yoast)
        return {};
    const metadata = {};
    if (yoast.title)
        metadata.title = yoast.title;
    if (yoast.description)
        metadata.description = yoast.description;
    const robots = robotsFromYoast(yoast.robots);
    if (robots)
        metadata.robots = robots;
    if (yoast.canonical) {
        metadata.alternates = {
            canonical: stripTrailingSlash(yoast.canonical),
        };
    }
    const openGraph = {};
    if (yoast.og_locale)
        openGraph.locale = yoast.og_locale;
    if (yoast.og_type)
        openGraph.type = yoast.og_type;
    if (yoast.og_title)
        openGraph.title = yoast.og_title;
    if (yoast.og_description)
        openGraph.description = yoast.og_description;
    if (yoast.og_url)
        openGraph.url = stripTrailingSlash(yoast.og_url);
    if (yoast.og_site_name)
        openGraph.siteName = yoast.og_site_name;
    if (yoast.og_image?.length) {
        openGraph.images = yoast.og_image.map((img) => ({
            url: img.url,
            width: img.width,
            height: img.height,
            type: img.type,
        }));
    }
    if (Object.keys(openGraph).length > 0) {
        metadata.openGraph = openGraph;
    }
    const twitter = {};
    if (yoast.twitter_card)
        twitter.card = yoast.twitter_card;
    if (yoast.twitter_site)
        twitter.site = yoast.twitter_site;
    if (yoast.twitter_description)
        twitter.description = yoast.twitter_description;
    if (Object.keys(twitter).length > 0) {
        metadata.twitter = twitter;
    }
    if (yoast.schema) {
        metadata.other = {
            "application/ld+json": JSON.stringify(yoast.schema),
        };
    }
    return metadata;
}
