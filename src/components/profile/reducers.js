export const LOGOUT = 'LOGOUT';
export const PROFILE_LOAD = 'PROFILE_LOAD';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
import { USER_AUTH } from '../auth/reducers';

export const getProfile = state => state.profile;

export function profile(state = {}, { type, payload }) {
  switch(type) {
    case PROFILE_LOAD:
      return payload;
    case USER_AUTH:
      return { ...payload.profile };
    case LOGOUT:
      return {};
    case PROFILE_UPDATE:
      return payload;
    default:
      return state;
  }
}