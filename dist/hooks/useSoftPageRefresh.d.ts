/**
 * A hook that provides soft page refresh functionality for Next.js applications, meant to
 * speed up development when making changes in a CMS, as it's faster than the default hard refresh.
 *
 * This hook automatically detects and supports both Next.js router types:
 * - **App Router** (`next/navigation`): Uses `router.refresh()` to force data re-fetch
 * - **Pages Router** (`next/router`): Uses `router.replace()` with current URL
 *
 * The hook monitors `pageData` changes to detect when the refresh is complete.
 * When `pageData` changes (indicating new data has been fetched), the loading
 * state is automatically reset.
 *
 * Features:
 * - Automatic router detection and compatibility
 * - Keyboard shortcut support (Ctrl+Q / Cmd+Q)
 * - Loading state management with timeout fallback
 * - Error handling and graceful degradation
 *
 * @param pageData - The page data object that changes when refresh completes.
 *                   Typically passed from your page component's data fetching.
 *
 * @returns Object containing:
 *   - `isRefreshing`: Boolean indicating if refresh is in progress
 *   - `refresh`: Function to trigger a soft page refresh
 */
export declare const useSoftPageRefresh: (pageData: Record<string, any>) => {
    isRefreshing: boolean;
    refresh: () => void;
};
//# sourceMappingURL=useSoftPageRefresh.d.ts.map