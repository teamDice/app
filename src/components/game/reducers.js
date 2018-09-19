export const GAME_START = 'GAME_START';
export const GAME_END = 'GAME_END';
export const HAND_START = 'HAND_START';
export const CARD_PLAY = 'CARD_PLAY';
export const EMOTE_CLEAR_ALL = 'EMOTE_CLEAR_ALL';
// export const EMOTE_CLEAR = 'EMOTE_CLEAR';

export const getGame = state => state.game;
export const getHand = state => state.hand;

export function game(state = {}, { type, payload }) {
  switch(type) {
    case GAME_START:
      return payload;
    case GAME_END:
      return null;
    case EMOTE_CLEAR_ALL:
      return {
        ...state,
        players: state.players.map(player => {
          //eslint-disable-next-line
          const { emote, ...rest } = player;
          return rest;
        })
      };
    // case EMOTE_CLEAR:
    //   return {
    //     ...state,
    //     players
    //   }
    default:
      return state;
  }
}

export function hand(state = [], { type, payload }) {
  switch(type) {
    case HAND_START:
      return payload;
    case CARD_PLAY:
      return state.filter(card => card.order === 0);
    default:
      return state;
  }
}

