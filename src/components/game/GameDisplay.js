import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Player from './Player';
import Control from './Control';
import PropTypes from 'prop-types';
import { loadGame } from './actions';
import { getGame } from './reducers';

class Game extends PureComponent {

  static propTypes = {
    loadGame: PropTypes.func.isRequired,
    game: PropTypes.object
  };

  componentDidMount() {
    this.props.loadGame();
  }

  render() { 

    const { game } = this.props;
    const { players, phase } = game;

    return (
      <section>
        {
          players &&
            players.map(player => (
              <Player key={player.id} player={player}/>
            ))
        }
        
        <Control phase={phase}/>
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