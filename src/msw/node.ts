import handlers from '@/msw/handlers';
import { setupServer } from 'msw/node';

export const server = setupServer(...handlers);
