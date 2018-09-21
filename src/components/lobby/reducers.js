// import { GAME_END } from '../game/reducers';

export const GAMES_LOAD = 'GAMES_LOAD';
export const STATS_LOAD = 'STATS_LOAD';
export const CHAT_LOAD = 'CHAT_LOAD';
export const GAMES_REMOVE = 'GAMES_REMOVE';
export const QUEUE_2_LOAD = 'QUEUE_2_LOAD';
export const QUEUE_3_LOAD = 'QUEUE_3_LOAD';
export const QUEUE_4_LOAD = 'QUEUE_4_LOAD';

export const getGames = state => state.games;
export const getStats = state => state.stats;
export const getChatroom = state => state.chatroom;
export const getQueue2Users = state => state.queue2;
export const getQueue3Users = state => state.queue3;
export const getQueue4Users = state => state.queue4;

export function games(state = '', { type, payload }) {
  switch(type) {
    case GAMES_LOAD:
      return payload;
    case GAMES_REMOVE:
      return '';
    default:
      return state;
  }
}

export function stats(state = {}, { type, payload }) {
  switch(type) {
    case STATS_LOAD:
      return payload;
    default:
      return state;
  }
}

export function chatroom(state = [], { type, payload }) {
  switch(type) {
    case CHAT_LOAD:
      return payload;
    default:
      return state;
  }
}

export function queue2(state = 0, { type, payload }) {
  switch(type) {
    case QUEUE_2_LOAD:
      return payload;
    default:
      return state;
  }
}
export function queue3(state = 0, { type, payload }) {
  switch(type) {
    case QUEUE_3_LOAD:
      return payload;
    default:
      return state;
  }
}
export function queue4(state = 0, { type, payload }) {
  switch(type) {
    case QUEUE_4_LOAD:
      return payload;
    default:
      return state;
  }
}