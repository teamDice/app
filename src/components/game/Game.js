import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameDisplay from './GameDisplay';
import { startGame, loadHand, clearEmotes, endGame, unloadGame } from './actions';
import { getGame, getHand } from './reducers';
import { getUser } from '../auth/reducers';
import { db } from '../../services/firebase';

class Game extends PureComponent {

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    startGame: PropTypes.func.isRequired,
    unloadGame: PropTypes.func.isRequired,
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
  }

  componentDidUpdate() {
    const { game, history } = this.props;
    if(game !== null) return;
    history.push({
      pathname: '/lobby'
    });
  }

  componentWillUnmount() {
    const { match, unloadGame } = this.props;
    unloadGame(match.params.gameKey);
  }

  // postEmote = emote => {
  //   const { game, user } = this.props;

  //   return db.ref('games').child()
  // };

  postCard = move => {
    const { user, match } = this.props;
    const { gameKey } = match.params;
    
    db.ref('cardMove').child(user.profile._id).set({
      gameId: gameKey,
      ...move
    });
  };

  postBid = move => {
    const { user, match } = this.props;
    const { gameKey } = match.params;
    
    db.ref('bidMove').child(user.profile._id).set({
      gameId: gameKey,
      ...move
    });
  };

  postFlip = move => {
    const { user, match } = this.props;
    const { gameKey } = match.params;
    
    db.ref('flipMove').child(user.profile._id).set({
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
            postCard={this.postCard}
            postBid={this.postBid}
            postFlip={this.postFlip}
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
  { startGame, loadHand, endGame, unloadGame }
)(Game);