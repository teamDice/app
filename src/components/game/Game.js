import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameDisplay from './GameDisplay';
import { startGame, loadHand, endGame, unloadGame } from './actions';
import { removeGame } from '../lobby/actions';
import { getGame, getHand } from './reducers';
import { getProfile } from '../profile/reducers';
import { loadProfile } from '../profile/actions';
import { db } from '../../services/firebase';

class Game extends PureComponent {

  static propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    startGame: PropTypes.func.isRequired,
    unloadGame: PropTypes.func.isRequired,
    loadHand: PropTypes.func.isRequired,
    removeGame: PropTypes.func.isRequired,
    game: PropTypes.object,
    hand: PropTypes.array,
    profile: PropTypes.object,
    loadProfile: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { match, startGame, loadHand, loadProfile } = this.props;
    const { gameKey } = match.params;
    loadProfile();
    startGame(gameKey);
    loadHand();
  }

  componentDidUpdate() {
    const { game, history, removeGame } = this.props;
    if(game !== null) return;
    removeGame();
    history.push({
      pathname: '/lobby'
    });
  }

  componentWillUnmount() {
    const { match, unloadGame } = this.props;
    unloadGame(match.params.gameKey);
  }

  postEmote = emote => {
    const { game, profile } = this.props;
    const player = game.players.find(player => player.userId === profile._id);
    const playerIndex = game.players.indexOf(player);
    const emoteRef = db.ref('games').child(game.key).child('players').child(playerIndex).child('emote');
    return emoteRef.set(emote)
      .then(() => setTimeout(() => emoteRef.remove(), 2000));
  };

  postCard = move => {
    const { profile, match } = this.props;
    const { gameKey } = match.params;
    
    db.ref('cardMove').child(profile._id).set({
      gameId: gameKey,
      ...move
    });
  };

  postBid = move => {
    const { profile, match } = this.props;
    const { gameKey } = match.params;
    
    db.ref('bidMove').child(profile._id).set({
      gameId: gameKey,
      ...move
    });
  };

  postFlip = move => {
    const { profile, match } = this.props;
    const { gameKey } = match.params;
    
    db.ref('flipMove').child(profile._id).set({
      gameId: gameKey,
      ...move
    });
  };


  render() { 
    const { game, hand, profile } = this.props;
    return (
      <section>
        {game && hand &&
          <GameDisplay
            game={game}
            profile={profile}
            hand={hand}
            postCard={this.postCard}
            postBid={this.postBid}
            postFlip={this.postFlip}
            postEmote={this.postEmote}
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
    profile: getProfile(state)
  }),
  { startGame, loadHand, endGame, unloadGame, removeGame, loadProfile }
)(Game);