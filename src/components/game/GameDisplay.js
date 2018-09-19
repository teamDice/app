import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import Control from './Control';
import PropTypes from 'prop-types';
import { loadGame } from './actions';
import { getGame } from './reducers';

class Game extends PureComponent {

  static propTypes = {
    hand: PropTypes.array.isRequired,
    game: PropTypes.object.isRequired
  };

  render() { 
    const { game, hand } = this.props;
    const { players, phase, turn } = game;

    return (
      <section>
        {
          players &&
            players.map(player => (
              <Player key={player.userId} player={player}/>
            ))
        }
        
        <Control hand={hand} phase={phase} turn={turn}/>
      </section>
    );
  }
}
 
export default connect(
  state => ({
    game: getGame(state)
  }),
  { loadGame }
)(Game);