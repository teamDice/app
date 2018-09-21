import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile } from '../profile/reducers';
import { logout } from '../auth/actions';
import { NavLink } from 'react-router-dom';
import Error from './Error';
import styles from './Header.css';

class Header extends Component {

  static propTypes = {
    profile: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

 

  render() { 
    const { profile, logout } = this.props;
    const { name } = profile;

    return (
      <header className={styles.header}>
        <section>
          <div className="header-top">
            {/* <h1>Snakes & Squirrels</h1> */}
            {name && <p>Logged in as {profile.name}</p>}
          </div>
          <nav>
            <ul>
              <li>
                <NavLink exact to="/">
                  <i className="fas fa-home"></i>
                  Home
                </NavLink>
              </li>
              { profile &&
                <li>
                  <NavLink
                    activeStyle={{ color: '#FF570C', textShadow: '1px 1px 5px black' }}
                    exact to="/lobby">
                    <i className="far fa-play-circle"></i>
                    <span>Play</span>
                  </NavLink>
                </li>
              }
              <li>
                <NavLink
                  activeStyle={{ color: '#FF570C', textShadow: '1px 1px 5px black' }}
                  exact to="/leaderboard"
                >
                  <i className="fas fa-list-ol"></i>
                  <span>Leaderboard</span>
                </NavLink>
              </li>
              {name &&
              <li>
                <NavLink
                  activeStyle={{ color: '#FF570C', textShadow: '1px 1px 5px black' }}
                  exact to="/profile"
                >
                  <i className="fas fa-user"></i>
                  <span>Profile</span>
                </NavLink>
              </li>
              }
              <li>
                {name
                  ? <NavLink to="/" onClick={logout}>
                    <i className="fas fa-sign-out-alt"></i>
                    <span>Log Out</span>
                  </NavLink>
                  : <NavLink activeStyle={{ color: '#FF570C', textShadow: '1px 1px 5px black' }} to="/auth">
                    <i className="fas fa-sign-in-alt"></i>
                    <span>Log In</span>
                  </NavLink>
                }
              </li>
            </ul>
          </nav>
        </section>

        <Error/>
      </header>
    );
  }
}
 
export default connect(
  state => ({ profile: getProfile(state) }),
  { logout }
)(Header);