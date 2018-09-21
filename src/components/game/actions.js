import { GAME_LOAD, GAME_END, CARD_PLAY, HAND_START, EMOTE_CLEAR_ALL, getGame } from './reducers';
import { getUser } from '../auth/reducers';
import { gamesRef, handsRef } from '../../services/firebaseRef';
import { postRecord } from '../../services/api';


export const startGame = gameKey => {

  return (dispatch, getState) => {
    gamesRef.child(gameKey).on('value', snapshot => {
      const game = snapshot.val();
      game.key = gameKey;
      if(game.winner) {
        const { profile } = getUser(getState());
        setTimeout(
          () => {
            return Promise.all([
              dispatch({
                type: GAME_END,
                payload: game.winner === profile._id ? postRecord(game) : null
              }),
              handsRef.child(profile._id).remove(),
              handsRef.child(profile._id).off('value'),
              gamesRef.child(gameKey).remove(),
              gamesRef.child(gameKey).off('value')
            ]);
          },
          3000);
      }
      else {
        dispatch({
          type: GAME_LOAD,
          payload: game
        });
      }
    });
  };
};

export const loadHand = () => {
  return (dispatch, getState) => {
    const { profile } = getUser(getState());
    handsRef.child(profile._id).on('value', snapshot => {
      const startingState = snapshot.val();

      if(startingState) {
        const hand = Object.values(startingState.hand);
        dispatch({
          type: HAND_START,
          payload: hand
        });
      }
    });

  };
};

export const unloadGame = gameKey => {
  gamesRef.child(gameKey).off('value');
  return {
    type: GAME_END,
    payload: null
  };
};

export const clearEmotes = gameKey => {
  gamesRef.child(gameKey).child('phase').set(1);

};


// export const clearEmote = () => ({ type: EMOTE_CLEAR });
