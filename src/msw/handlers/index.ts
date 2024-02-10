import feedHandlers from './feed';
import followHandlers from './follow';
import memberHandlers from './member';
import missionHandlers from './mission';
import recordHandlers from './record';

const handlers = [...missionHandlers, ...recordHandlers, ...memberHandlers, ...followHandlers, ...feedHandlers];

export default handlers;
