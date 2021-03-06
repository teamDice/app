import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileDisplay from './ProfileDisplay';
import ProfileForm from './ProfileForm';
import AvatarDisplay from './AvatarDisplay';
import AvatarForm from './AvatarForm';
import Header from '../app/Header';
import { loadProfile, updateProfile } from './actions';
import { getProfile } from './reducers';
import styles from './Profile.css';

class Profile extends PureComponent {

  state = {
    editingInfo: false,
    editingAvatar: false,
  };

  static propTypes = {
    profile: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
    loadProfile: PropTypes.func.isRequired
  };

  componentDidMount() {
    // this.props.loadProfile();
  }
  
  toggleEditingInfo = () => {
    this.setState(({ editingInfo }) => ({ editingInfo: !editingInfo }));
  };

  toggleEditingAvatar = () => {
    this.setState(({ editingAvatar }) => ({ editingAvatar: !editingAvatar }));
  };

  handleEditInfo = profile => {
    const { updateProfile } = this.props;
    const { name, location, greeting } = profile;
    return updateProfile({ name, location, greeting })
      .then(() =>this.toggleEditingInfo);
  };

  handleEditAvatar = avatar => {
    const { updateProfile, profile } = this.props;
    const { name, location, greeting } = profile;
    return updateProfile({ name, location, avatar, greeting })
      .then(() =>this.toggleEditingAvatar);
  };

  

  render() { 
    const { editingInfo, editingAvatar } = this.state;
    const { profile } = this.props;
    const { avatar } = profile;

    return (
      <div>
        <Header/>
        <section className={styles.profile}>
          {editingAvatar
            ? <AvatarForm toggleEdit={this.toggleEditingAvatar} editAvatar={this.handleEditAvatar} currentAvatar={avatar}/>
            : <Fragment>
              <AvatarDisplay toggleEdit={this.toggleEditingAvatar} imageSource={avatar}/>
              <section className="info">             
                {editingInfo
                  ? <ProfileForm
                    profile={profile}
                    onComplete={this.handleEditInfo}
                    onCancel={this.toggleEditingInfo}
                  />
                  : <ProfileDisplay
                    profile={profile}
                    onEdit={this.toggleEditingInfo}
                  />
                }
              </section>
            </Fragment>
          }
        </section>

        
      </div>

    );
  }
}
 
export default connect(
  state => ({
    profile: getProfile(state)
  }),
  { loadProfile, updateProfile }
)(Profile);
