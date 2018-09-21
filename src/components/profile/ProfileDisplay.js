import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileDisplay.css';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';

class Profile extends Component {
  state = {  };

  static propTypes = {
    user: PropTypes.object,
    onEdit: PropTypes.func.isRequired,
  };

  render() { 
    const { user, onEdit } = this.props;
    const { name, greeting, location } = user.profile;
    
    return (
      <div className={styles.profile_display}>
        {user.profile &&        
        <section >
          
          <section className="profile-name">
            <article>
              <h1 className="name">Name: { name }</h1>
              <h3>Greeting: { greeting }</h3>
              <h3>Location: { location }</h3>
              <button name="edit" onClick={onEdit}>CLICK to edit Profile ✎</button>
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