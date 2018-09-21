import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Profile.css';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';
import firebase from 'firebase';

class Profile extends Component {
  state = { 
    imageSource: null
  };

  static propTypes = {
    user: PropTypes.object,
  };

  componentDidMount() {
    const { profile } = this.props.user;
    const storageRef = firebase.storage().ref();
    const image = storageRef.child(profile.avatar);
    image.getDownloadURL().then((url) => { 
      this.setState({ imageSource: url });
    });

  }

  render() { 
    const { user } = this.props;
    const { name, greeting, location } = user.profile;

    return (
      <div className={styles.profile}>
        {user.profile &&        
        <section >
          <div className="profile-avatar">
            <img src={this.state.imageSource} />
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
