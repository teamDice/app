import { ERROR } from '../app/reducers';
import { getUser } from '../auth/reducers';
import { GAMES_LOAD, STATS_LOAD, LEADERS_LOAD, CHAT_LOAD } from './reducers';
import { db } from '../../services/firebase';
import { handsRef, chatRef } from '../../services/firebaseRef';
import { getStatsById as _getStats, getLeaderboard } from '../../services/api';

const convertToArray = obj => {
  if(!obj) return [];
  return Object.keys(obj).map(key => {
    const each = obj[key];
    each.key = key;
    return each;
  });
};

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

export const loadChatroom = () => {
  return (dispatch) => {
    db.ref(chatRef).on('value', snapshot => {
      // console.log(snapshot.val());
      if(snapshot.val()) {
        dispatch({
          type: CHAT_LOAD,
          payload: convertToArray(snapshot.val())
        });
      }
    });
  };
};

export const sendChat = message => {
  db.ref(chatRef).push({
    name: 'anon',
    text: message
  });
};
  

export const getStatsById = id => ({
  type: STATS_LOAD,
  payload: _getStats(id)
});

export const loadLeaders = () => ({
  type: LEADERS_LOAD,
  payload: getLeaderboard()
});