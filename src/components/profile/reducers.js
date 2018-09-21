export const LOGOUT = 'LOGOUT';
export const PROFILE_LOAD = 'PROFILE_LOAD';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';

export const getProfile = state => state.profile;

export function profile(state = {}, { type, payload }) {
  switch(type) {
    case PROFILE_LOAD:
      return payload;
    case LOGOUT:
      return null;
    case PROFILE_UPDATE:
      return payload;
    default:
      return state;
  }
}