// import { GAME_END } from '../game/reducers';

export const GAMES_LOAD = 'GAMES_LOAD';
export const STATS_LOAD = 'STATS_LOAD';
export const CHAT_LOAD = 'CHAT_LOAD';
export const GAMES_REMOVE = 'GAMES_REMOVE';
export const QUEUE_LOAD = 'QUEUE_LOAD';

export const getGames = state => state.games;
export const getChatroom = state => state.chatroom;
export const getQueues = state => state.queues;

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

export function queues(state = {}, { type, payload }) {
  switch(type) {
    case QUEUE_LOAD:
      return payload;
    default:
      return state;
  }
}
