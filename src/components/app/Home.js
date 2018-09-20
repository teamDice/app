import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } 
import { NavLink } from 'react-router-dom';
import styles from './Home.css';

export class Home extends Component {
  state = {
    rules: false
  };

  toggleRules = () => {
    this.setState(({ rules }) => ({ rules: !rules }));
  };

  render() { 
    const { rules } = this.state;

    return (
      <div className={styles.home}>
        <hgroup>
          <h1>Snakes &amp; Squirrels</h1>
        </hgroup>
        {rules
          ? <section>
            <h3>How to Play:</h3>
            <p>Each turn, either play a card or make a challenge. The first player to win 2 challenges is the victor!</p>
            <ul>
              <li><strong>Bluffing:</strong> Using emotes and mind games is strongly encouraged.</li>
              <li><strong>Challenges:</strong> Once everyone has played an animal, you can make a bet on how many squirrels you can find.</li>
              <li><strong>Snake Attacked:</strong> If you flip a snake, you lose a random animal.</li>
            </ul>
            <button onClick={this.toggleRules}>
              Back
            </button>
          </section>

          : <section className="buttons">
            <NavLink exact to="/lobby">
              <button>Play</button>
            </NavLink>
            <button onClick={this.toggleRules}>
              Rules
            </button>
            <NavLink exact to="/leaderboard">
              <button>Leaderboard</button>
            </NavLink>
            <NavLink exact to="/profile">
              <button>Profile</button>
            </NavLink>
            <NavLink to="/auth">
              <button>Log In</button>
            </NavLink>
          </section>
       
          
        }
      </div>
    );
  }
}
 
export default connect(
  state => ({
    user: getUser(state)
  }),
  null
)(Home);