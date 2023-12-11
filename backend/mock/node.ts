import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Call the setupServer function
export const server = setupServer(...handlers);

