import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../app/Header';
import QueueForm from './QueueForm';
import Chatroom from './Chatroom';
import { connect } from 'react-redux';
import { getStats, getGames, getQueue2Users, getQueue3Users, getQueue4Users } from './reducers';
import { getProfile } from '../profile/reducers';
import { requestGame, removeGame, getStatsById, loadChatroom, loadQueue2Users, loadQueue3Users, loadQueue4Users } from './actions';
import styles from './Lobby.css';

export class Lobby extends Component {

  static propTypes = {
    profile: PropTypes.object,
    games: PropTypes.string,
    stats: PropTypes.object,
    queue2: PropTypes.number,
    queue3: PropTypes.number,
    queue4: PropTypes.number,
    requestGame: PropTypes.func.isRequired,
    getStatsById: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    removeGame: PropTypes.func.isRequired,
    loadQueue2Users: PropTypes.func.isRequired,
    loadQueue3Users: PropTypes.func.isRequired,
    loadQueue4Users: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { loadQueue2Users, loadQueue3Users, loadQueue4Users } = this.props;
    loadQueue2Users();
    loadQueue3Users();
    loadQueue4Users();
  }

  componentDidUpdate() {
    const { games, history } = this.props;
    if(!games) return;

    history.push({
      pathname: `/games/${games}`
    });
  }

  componentWillUnmount() {
    const { requestGame, removeGame } = this.props;
    removeGame();
    requestGame(true, 'queue2');
    requestGame(true, 'queue3');
    requestGame(true, 'queue4');
  }

  render() { 
    const { requestGame, profile, queue2, queue3, queue4 } = this.props;
    

    return (
      <div className={styles.lobby}>
        <Header/>
        <QueueForm 
          onClick={requestGame}
          queue2Users={queue2}
          queue3Users={queue3}
          queue4Users={queue4}
        />
        <Chatroom profile={profile}/>
      </div>
    );
  }
}
 
export default connect(
  state => ({
    profile: getProfile(state),
    games: getGames(state),
    stats: getStats(state),
    queue2: getQueue2Users(state),
    queue3: getQueue3Users(state),
    queue4: getQueue4Users(state)
  }),
  { requestGame, getStatsById, loadChatroom, removeGame, loadQueue2Users, loadQueue3Users, loadQueue4Users }
)(Lobby);
