import memberHandlers from './member';
import missionHandlers from './mission';
import recordHandlers from './record';

const handlers = [...missionHandlers, ...recordHandlers, ...memberHandlers];

export default handlers;
