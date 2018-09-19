import {
  EMOTE_CLEAR_ALL,
  game
} from './reducers';

describe('game reducers', () => {
  it('clears emotes', ()=> {
    const _state = {
      players: [{
        name: 'abc',
        emote: 'laughing'
      },
      {
        name: '123',
        emote: 'crying' 
      }],
      turn: 'abc',
      phase: 1,
      challenger: null
    };

    const expectedState = {
      players: [{
        name: 'abc',
      },
      {
        name: '123',
      }],
      turn: 'abc',
      phase: 1,
      challenger: null
    };

    const state = game(_state, {
      type: EMOTE_CLEAR_ALL,
    });

    expect(state).toEqual(expectedState);
  });
});