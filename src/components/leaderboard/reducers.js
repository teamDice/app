export const LEADERS_LOAD = 'LEADERS_LOAD';

export const getLeaders = state => state.leaders;

export function leaders(state = [], { type, payload }) {
  switch(type) {
    case LEADERS_LOAD:
      return payload;
    default:
      return state;
  }
}