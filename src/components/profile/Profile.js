import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileDisplay from './ProfileDisplay';
import ProfileForm from './ProfileForm';
import { update } from './actions';
import { getUser } from '../auth/reducers';
import firebase from 'firebase';
import styles from './Profile.css';

class Profile extends Component {

  state = {
    editing: false,
    imageSource: null
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    update: PropTypes.func
  };

  handleEdit = () => {
    this.setState({ editing: true });
  };

  handleComplete = profile => {
    const { update } = this.props;
    update(profile);
    this.handleEndEdit();
  };

  handleEndEdit = () => {
    this.setState({ editing: false });
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
    const { editing } = this.state;
    const { user } = this.props;
    const { profile } = user;
    const { name, greeting, location } = profile;

    return (
      <div className={styles.profile}>

        {user &&        
          <section >
            <div className="profile-avatar">
              {/* <img src={image} /> */}
              <img src={this.state.imageSource} />
            </div>
            <section className="profile-name">
              <article>
                <h1 className="name">Name: { name }</h1>
                <h3>Greeting: { greeting }</h3>
                <h3>Location: { location }</h3>
              </article>
              
              {editing
                ? <ProfileForm
                  profile={profile}
                  onComplete={this.handleComplete}
                  onCancel={this.handleEndEdit}
                />
                : <ProfileDisplay
                  profile={profile}
                  onEdit={this.handleEdit}
                />
              }
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
  { update }
)(Profile);
