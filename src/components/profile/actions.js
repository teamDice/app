import { PROFILE_LOAD, PROFILE_UPDATE } from './reducers';

import { getProfile, putProfile } from '../../services/api';

export const loadProfile = () => ({
  type: PROFILE_LOAD,
  payload: getProfile()
});


export const updateProfile = profile => ({
  type: PROFILE_UPDATE,
  payload: putProfile(profile)
});

