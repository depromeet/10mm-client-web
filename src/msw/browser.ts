import handlers from '@/msw/handlers';
import { setupWorker } from 'msw/browser';

export const worker = setupWorker(...handlers);
