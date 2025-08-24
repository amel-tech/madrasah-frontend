import type { HttpHandler } from 'msw';

export type MockApiHandlers<TService> = {
    // This mapped type iterates over all keys (methods) of the TService.
    [K in keyof TService]: TService[K] extends (...args: any[]) => any
        ? HttpHandler
        : never;
};
