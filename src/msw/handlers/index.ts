import missionHandlers from './mission';
import recordHandlers from './record';

const handlers = [...missionHandlers, ...recordHandlers];

export default handlers;
