import React, { PureComponent } from 'react';
import Player from './Player';
import Control from './Control';
import PropTypes from 'prop-types';

class Game extends PureComponent {
  state = {  }
  render() { 
    return (
      <section>
        <h1>Game</h1>
        <Player/>
        <Player/>
        <Player/>
        <Player/>
        <Control/>
      </section>
    );
  }
}
 
export default Game;