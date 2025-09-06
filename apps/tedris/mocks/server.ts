import { setupServer } from 'msw/node';
import { createHandlers } from '@madrasah/msw/tedrisat';

const API_BASE_URL = process.env.NEXT_PUBLIC_TEDRISAT_API_BASE_URL;

const handlers = createHandlers(API_BASE_URL!);

export const server = setupServer(...handlers);