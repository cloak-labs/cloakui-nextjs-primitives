import { type AppRouterInstance, type NextRouter, type ReadonlyURLSearchParams } from "../utils/nextRouterModules";
export type NextRouterHookResults = {
    pagesRouter: NextRouter | null;
    appRouter: AppRouterInstance | null;
    appPathname: string | null;
    appSearchParams: ReadonlyURLSearchParams | null;
};
type UseNextRouterHooksOptions = {
    includeSearchParams?: boolean;
};
/**
 * Invokes Next.js router hooks from both Pages and App Router modules.
 * Hooks are always called unconditionally to satisfy React's rules of hooks.
 */
export declare function useNextRouterHooks(options?: UseNextRouterHooksOptions): NextRouterHookResults;
export {};
//# sourceMappingURL=useNextRouterHooks.d.ts.map