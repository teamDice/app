import { LEADERS_LOAD } from './reducers';
import { getLeaderboard } from '../../services/api';


export const loadLeaders = () => ({
  type: LEADERS_LOAD,
  payload: getLeaderboard()
});