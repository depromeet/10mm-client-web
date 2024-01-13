import MISSION_APIS from '@/apis/mission';
import STOPWATCH_APIS from '@/apis/stopwatch';

export * from './record';

const APIS = {
  ...MISSION_APIS,
  ...STOPWATCH_APIS,
};

export default APIS;
