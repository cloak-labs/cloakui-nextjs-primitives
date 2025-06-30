import Head from "next/head";
import { type ImgProps } from "next/dist/shared/lib/get-img-props";

/**
 * This component is taken and adapted from Next.js internals. It enables us to manually preload images outside of the Next.js image component (eg. to preload CSS background images).
 */
export function ImagePreload({ imgAttributes }: { imgAttributes: ImgProps }) {
  const opts = {
    as: "image",
    imageSrcSet: imgAttributes.srcSet,
    imageSizes: imgAttributes.sizes,
    crossOrigin: imgAttributes.crossOrigin,
    referrerPolicy: imgAttributes.referrerPolicy,
    // TODO: in React 19.0.0 or newer, we must use camelCase (eg. `fetchPriority`)
    fetchpriority: imgAttributes.fetchPriority,
  };

  return (
    <Head>
      <link
        key={
          "__nimg-" +
          imgAttributes.src +
          imgAttributes.srcSet +
          imgAttributes.sizes
        }
        rel="preload"
        // Note how we omit the `href` attribute, as it would only be relevant
        // for browsers that do not support `imagesrcset`, and in those cases
        // it would cause the incorrect image to be preloaded.
        //
        // https://html.spec.whatwg.org/multipage/semantics.html#attr-link-imagesrcset
        href={imgAttributes.srcSet ? undefined : imgAttributes.src}
        {...opts}
      />
    </Head>
  );
}
