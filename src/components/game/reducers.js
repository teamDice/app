export const LOAD_GAME = 'LOAD_GAME';

export const getGame = state => state.game;

export function game(state = {}, { type, payload }) {
  switch(type) {
    case LOAD_GAME:
    // PLACEHOLDER RETURNING STATE
      return mockData;
      // return payload;
    default:
      return state;
  }
}







const mockData = {
  players: [
    {
      id: 'player1Id',
      wins: 1,
      hand: 2,
      played: 2,
      bid: null,
      image: 'avatar.png'
    },
    {
      id: 'player2Id',
      wins: 0,
      hand: 3,
      played: 1,
      bid: null,
      image: 'avatar.png'
    },
    {
      id: 'player3Id',
      wins: 0,
      hand: 3,
      played: 1,
      bid: null,
      image: 'avatar.png'
    },
    {
      id: 'player4Id',
      wins: 1,
      hand: 1,
      played: 1,
      bid: null,
      image: 'avatar.png'
    }
  ],
  turn: 'player1Id',
  phase: 1,
  winner: null
};