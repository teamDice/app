import { GAME_START, GAME_END, CARD_PLAY, HAND_START, getGame } from './reducers';
import { getUser } from '../auth/reducers';
import { gamesRef, handsRef } from '../../services/firebaseRef';


export const loadGame = gameKey => {

  return (dispatch, getState) => {
    gamesRef.child(gameKey).on('value', snapshot => {
      const game = snapshot.val();
      game.key = gameKey;

      dispatch({
        type: GAME_START,
        payload: game
      });
      
    });
  };


};

export const loadHand = () => {

  return (dispatch, getState) => {
    const { profile } = getUser(getState());
    handsRef.child(profile._id).on('value', snapshot => {
      const hand = Object.values(snapshot.val());
      dispatch({
        type: HAND_START,
        payload: hand
      });
    });

  };
};

