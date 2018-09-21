import { get, post, put } from './request';

const URL = '/api';
const AUTH_URL = `${URL}/auth`;
const PROFILE_URL = `${URL}/profile`;
const RECORD_URL = `${URL}/records`;
const SIGNUP_URL = `${AUTH_URL}/signup`;
const SIGNIN_URL = `${AUTH_URL}/signin`;

export const signup = credentials => post(SIGNUP_URL, credentials);
export const signin = credentials => post(SIGNIN_URL, credentials);

export const postRecord = game => {
  delete game.key;
  post(RECORD_URL, game);
};

export const verifyUser = token => {
  return get(`${AUTH_URL}/verify`, {
    headers: {
      Authorization: token
    }
  });
};

export const getLeaderboard = () => get(`${RECORD_URL}/ranks/leaderboard`);

export const getStatsById = id => get(`${RECORD_URL}/stats/${id}`);  

export const getProfile = () => get(PROFILE_URL);
export const putProfile = data => put(PROFILE_URL, data);