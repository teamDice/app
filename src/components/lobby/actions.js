import { ERROR } from '../app/reducers';
import { getProfile } from '../profile/reducers';
import { 
  GAMES_LOAD, 
  GAMES_REMOVE, 
  STATS_LOAD, 
  CHAT_LOAD,
  QUEUE_2_LOAD,
  QUEUE_3_LOAD,
  QUEUE_4_LOAD } from './reducers';
import { db } from '../../services/firebase';
import { handsRef, chatRef, queue2Ref, queue3Ref, queue4Ref } from '../../services/firebaseRef';
import { getStatsById as _getStats } from '../../services/api';

const convertToArray = obj => {
  if(!obj) return [];
  return Object.keys(obj).map(key => {
    const each = obj[key];
    each.key = key;
    return each;
  });
};

export const removeGame = () => ({ type: GAMES_REMOVE });

export const requestGame = (searching, queueRef) => {
  return (dispatch, getState) => {

    const profile = getProfile(getState());
    const profileId = profile._id;

    if(searching) {
      db.ref(queueRef).child(profileId).remove();
    }
    
    else {
      db.ref(queueRef).child(profileId)
        .set(profile)
        .then(() => {
          handsRef.child(profileId).on('value', snapshot => {
            const userGame = snapshot.val();
            if(userGame) {
              dispatch({
                type: GAMES_LOAD,
                payload: userGame.gameId
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
      if(snapshot.val()) {
        dispatch({
          type: CHAT_LOAD,
          payload: convertToArray(snapshot.val())
        });
      }
    });
  };
};  

export const getStatsById = id => ({
  type: STATS_LOAD,
  payload: _getStats(id)
});

export const loadQueue2Users = () => {
  return (dispatch) => {
    db.ref(queue2Ref).on('value', snapshot => {
      if(!snapshot.val()) {
        dispatch({
          type: QUEUE_2_LOAD,
          payload: 0
        });
      }
      else {
        dispatch({
          type: QUEUE_2_LOAD,
          payload: Object.keys(snapshot.val()).length
        });
      }
    });
  };
};

export const loadQueue3Users = () => {
  return (dispatch) => {
    db.ref(queue3Ref).on('value', snapshot => {
      if(!snapshot.val()) {
        dispatch({
          type: QUEUE_3_LOAD,
          payload: 0
        });
      }
      else {
        dispatch({
          type: QUEUE_3_LOAD,
          payload: Object.keys(snapshot.val()).length
        });
      }
    });
  };
};

export const loadQueue4Users = () => {
  return (dispatch) => {
    db.ref(queue4Ref).on('value', snapshot => {
      if(!snapshot.val()) {
        dispatch({
          type: QUEUE_4_LOAD,
          payload: 0
        });
      }
      else {
        dispatch({
          type: QUEUE_4_LOAD,
          payload: Object.keys(snapshot.val()).length
        });
      }
    });
  };
};