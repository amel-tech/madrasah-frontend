import { MockApiHandlers } from '../../types';
import type { APIService } from '@madrasah/services/tedrisat';

/**
* This is a factory function that creates HTTP handlers for mocking API endpoints.
*/
export const tedrisatHandlers = (baseUrl: string): MockApiHandlers<APIService> => {
  if (!baseUrl) {
    throw new Error("Base URL is required to create mock API handlers.");
  }

  const handlers: MockApiHandlers<APIService> = {}

  return handlers;
};