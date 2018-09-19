import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameDisplay from './GameDisplay';
import { startGame, loadHand, clearEmotes, endGame } from './actions';
import { getGame, getHand } from './reducers';
import { getUser } from '../auth/reducers';
// import { db } from '../../services/firebase';
import { movesRef } from '../../services/firebaseRef';

class Game extends PureComponent {

  static propTypes = {
    match: PropTypes.object.isRequired,
    startGame: PropTypes.func.isRequired,
    loadHand: PropTypes.func.isRequired,
    game: PropTypes.object,
    hand: PropTypes.array,
    user: PropTypes.object
  };

  componentDidMount() {
    const { match, startGame, loadHand } = this.props;
    const { gameKey } = match.params;
    startGame(gameKey);
    loadHand();

    setTimeout(() => clearEmotes(gameKey), 3000);
  }

  postMove = move => {
    const { user, match } = this.props;
    const { gameKey } = match.params;
    
    movesRef.child(user.profile._id).set({
      gameId: gameKey,
      ...move
    });
  };


  render() { 
    const { game, hand } = this.props;
    return (
      <section>
        {game && hand &&
          <GameDisplay
            game={game}
            hand={hand}
            postMove={this.postMove}
          />
        }
      </section>
    );
  }
}
 
export default connect(
  state => ({
    game: getGame(state),
    hand: getHand(state),
    user: getUser(state)
  }),
  { startGame, loadHand, endGame }
)(Game);