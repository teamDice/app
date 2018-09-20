import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.css';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';

class Profile extends Component {
  state = {  };

  static propTypes = {
    user: PropTypes.object,
  
  };

  render() { 
    const { user } = this.props;
    const { name, greeting, location } = user.profile;
    
    return (
      <div className={styles.profile}>
        {user.profile &&        
        <section >
          <div className="profile-avatar">
            <img src="https://toolnavy.com/customavatars/avatar38224_10.gif" />
            {/* <img src="https://firebasestor...f-a1fe-9a9a6e721345f" /> */}
          </div>
          <section className="profile-name">
            <article>
              <h1 className="name">Name: { name }</h1>
              <h3>Greeting: { greeting }</h3>
              <h3>Location: { location }</h3>
            </article>
            
          </section>
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

)(Profile);
