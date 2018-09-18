import { ERROR } from '../app/reducers';
import { getUser } from '../auth/reducers';
import { GAMES_LOAD, STATS_LOAD, LEADERS_LOAD } from './reducers';
import { db } from '../../services/firebase';
import { handsRef } from '../../services/firebaseRef';

import { getStatsById as _getStats, getLeaderboard } from '../../services/api';

export const requestGame = (searching, queueRef) => {
  return (dispatch, getState) => {

    const user = getUser(getState());
    const profileId = user.profile._id;

    if(searching) {
      db.ref(queueRef).child(profileId).remove();
    }
    
    else {
      db.ref(queueRef).child(profileId)
        .set(true)
        .then(() => {
          handsRef.child(profileId).on('value', snapshot => {
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
    }
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