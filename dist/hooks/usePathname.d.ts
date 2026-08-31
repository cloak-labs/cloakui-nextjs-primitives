/**
 * Returns the current pathname, compatible with both Next.js router types.
 * Pages Router: derived from `router.asPath` (query/hash stripped).
 * App Router: `usePathname()` (optionally with search params when `includeSearchParams` is true).
 */
export declare function usePathname(options?: {
    includeSearchParams?: boolean;
}): string;
//# sourceMappingURL=usePathname.d.ts.map