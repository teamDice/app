import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';
import { logout } from '../auth/actions';
import { NavLink } from 'react-router-dom';
import Error from './Error';
import styles from './Header.css';

class Header extends Component {

  static propTypes = {
    user: PropTypes.object,
    logout: PropTypes.func.isRequired
  };

 

  render() { 
    const { user, logout } = this.props;

    return (
      <header className={styles.header}>
        <section>
          {user && <span>Logged in as {user.profile.name}</span>}
          <h1><NavLink exact to="/">Snakes & Squirrels</NavLink></h1>
          <nav>
            <ul>
              { user &&
                <li>
                  <NavLink
                    activeStyle={{ borderBottom: '2px solid black' }}
                    exact to="/lobby"
                  >
                    Play
                  </NavLink>
                </li>
              }
              <li>
                <NavLink
                  activeStyle={{ borderBottom: '2px solid black' }}
                  exact to="/leaderboard"
                >
                  Leaderboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{ borderBottom: '2px solid black' }}
                  exact to="/profile"
                >
                  Profile
                </NavLink>
              </li>
              <li>
                { user
                  ? <NavLink to="/" onClick={logout}>Logout</NavLink>
                  : <NavLink to="/auth">Login</NavLink>
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
  state => ({ user: getUser(state) }),
  { logout }
)(Header);