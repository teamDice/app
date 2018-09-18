import { GAME_START, GAME_END, CARD_PLAY, getGame } from './reducers';
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


