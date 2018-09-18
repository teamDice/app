import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { connect } from 'react-redux';
import { tryLoadUser } from '../auth/actions';
import { getCheckedAuth } from '../auth/reducers';
import Header from './Header';
import Home from './Home';
import Game from '../game/Game';
import Auth from '../auth/Auth';
import Lobby from '../lobby/Lobby';
import LeaderboardDisplay from '../leaderboard/LeaderboardDisplay';
import styles from './App.css';

class App extends Component {

  static propTypes = {
    tryLoadUser: PropTypes.func.isRequired,
    checkedAuth: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.tryLoadUser();
  }

  render() { 
    const { checkedAuth } = this.props;

    return (
      <Router>
        <div className={styles.app}>
          <Header/>

          <main>
            {checkedAuth &&
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/auth" component={Auth}/>
                <Route exact path="/lobby" component={Lobby}/>
                <Route exact path="/leaderboard" component={LeaderboardDisplay}/>
                {/* Placeholder game route for static html */}
                {/* <Route exact path="/game" component={GameDisplay}/> */}

                <PrivateRoute path="/games/:gameKey" component={Game}/>
                <Redirect to="/"/>
              </Switch>
            }
          </main>
        </div>
      </Router>
    );
  }
}
 
export default connect(
  state => ({ checkedAuth: getCheckedAuth(state) }),
  { tryLoadUser }
)(App);