export const PROFILE_LOAD = 'PROFILE_LOAD';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';

export const getProfile = state => state.Profile;

export function profile(state = {}, { type, payload }) {
  switch(type) {
    case GAME_LOAD:
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