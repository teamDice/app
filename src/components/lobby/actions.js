import { ERROR } from '../app/reducers';
import { getUser } from '../auth/reducers';
import { GAMES_LOAD, STATS_LOAD, LEADERS_LOAD } from './reducers';
import { playersRef, userGamesRef } from '../../services/firebaseRef';
import { getStatsById as _getStats, getLeaderboard } from '../../services/api';

export const requestGame = () => {
  return (dispatch, getState) => {
    const user = getUser(getState());
    const profileId = user.profile._id;
    
    playersRef.child(profileId)
      .set(true)
      .then(() => {
        userGamesRef.child(profileId).on('value', snapshot => {
          if(snapshot.val()) {
            dispatch({
              type: GAMES_LOAD,
              payload: Object.keys(snapshot.val())[0]
            });
          }
        });
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: err.message
        });
      });
  };
};

export const getStatsById = id => ({
  type: STATS_LOAD,
  payload: _getStats(id)
});

export const loadLeaders = () => ({
  type: LEADERS_LOAD,
  payload: getLeaderboard()
});