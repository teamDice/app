import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import Control from './Control';
import PropTypes from 'prop-types';

class Game extends PureComponent {
  state = {  }
  render() { 
    return (
      <section>
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