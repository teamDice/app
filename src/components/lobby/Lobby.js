import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PlayerDisplay from './PlayerDisplay';
import { connect } from 'react-redux';
import { getGames, getStats } from './reducers';
import { getUser } from '../auth/reducers';
import { requestGame, getStatsById } from './actions';
import styles from './Lobby.css';

export class Lobby extends Component {

  static propTypes = {
    user: PropTypes.object,
    games: PropTypes.string,
    stats: PropTypes.object,
    requestGame: PropTypes.func.isRequired,
    getStatsById: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { getStatsById, user } = this.props;
    getStatsById(user.profile._id);
  }

  componentDidUpdate() {
    const { games, history } = this.props;
    if(!games) return;
    history.push({
      pathname: `/games/${games}`
    });
  }

  render() { 
    const { user, requestGame, stats } = this.props;

    return (
      <div className={styles.lobby}>
        <PlayerDisplay profile={user.profile} stats={stats}/>
        {user && <button onClick={requestGame}>PLAY GORTS</button>}
      </div>
    );
  }
}
 
export default connect(
  state => ({
    user: getUser(state),
    games: getGames(state),
    stats: getStats(state)
  }),
  { requestGame, getStatsById }
)(Lobby);
