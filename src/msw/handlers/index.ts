import resultHandlers from '@/msw/handlers/result';

import followHandlers from './follow';
import memberHandlers from './member';
import missionHandlers from './mission';
import recordHandlers from './record';

const handlers = [...missionHandlers, ...recordHandlers, ...memberHandlers, ...followHandlers, ...resultHandlers];

export default handlers;
