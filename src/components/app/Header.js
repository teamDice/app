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
          {/* <h1>Snakes & Squirrels</h1> */}
          <nav>
            <ul>
              <li>
                <NavLink exact to="/">
                  <i className="fas fa-home"></i>
                </NavLink>
              </li>
              { user &&
                <li>
                  <NavLink exact to="/lobby">
                    <i className="fas fa-home">Play</i>
                  </NavLink>
                </li>
              }
              <li>
                <NavLink
                  activeStyle={{ borderBottom: '2px solid black' }}
                  exact to="/leaderboard"
                >
                  <i className="fas fa-list-ol"></i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  activeStyle={{ borderBottom: '2px solid black' }}
                  exact to="/profile"
                >
                  <i className="fas fa-user"></i>
                </NavLink>
              </li>
              <li>
                { user
                  ? <NavLink to="/" onClick={logout}><i className="fas fa-sign-out-alt"></i></NavLink>
                  : <NavLink to="/auth"><i className="fas fa-sign-in-alt"></i></NavLink>
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