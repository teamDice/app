import { ERROR } from '../app/reducers';
import { getProfile } from '../profile/reducers';
import { 
  GAMES_LOAD, 
  GAMES_REMOVE, 
  STATS_LOAD, 
  CHAT_LOAD,
  QUEUE_LOAD
} from './reducers';
import { db } from '../../services/firebase';
import { handsRef, chatRef, gameQueuesRef } from '../../services/firebaseRef';

const convertToArray = obj => {
  if(!obj) return [];
  return Object.keys(obj).map(key => {
    const each = obj[key];
    each.key = key;
    return each;
  });
};

export const removeGame = () => ({ type: GAMES_REMOVE });

export const requestGame = (searching, queueType) => {
  return (dispatch, getState) => {

    const profile = getProfile(getState());
    const userId = profile._id;

    if(searching) {
      gameQueuesRef.child(queueType).child(userId).remove();
    }
    
    else {
      gameQueuesRef.child(queueType).child(userId)
        .set(profile)
        .then(() => {
          handsRef.child(userId).on('value', snapshot => {
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


export const loadQueues = () => {
  return (dispatch) => {
    gameQueuesRef.on('value', snapshot => {
      const queues = snapshot.val();
      if(!queues) {
        dispatch({
          type: QUEUE_LOAD,
          payload: {
            '2': 0,
            '3': 0,
            '4': 0
          }
        });
      }
      else {
        dispatch({
          type: QUEUE_LOAD,
          payload: {
            '2': queues[2] ? Object.keys(queues[2]).length : 0,
            '3': queues[3] ? Object.keys(queues[3]).length : 0,
            '4': queues[4] ? Object.keys(queues[4]).length : 0,
          }
        });
      }
    });
  };
};