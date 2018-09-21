import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileDisplay from './ProfileDisplay';
import ProfileForm from './ProfileForm';
import AvatarDisplay from './AvatarDisplay';
import AvatarForm from './AvatarForm';
import { updateProfile } from '../auth/actions';
import { getUser } from '../auth/reducers';
import styles from './Profile.css';

class Profile extends PureComponent {

  state = {
    editingInfo: false,
    editingAvatar: false,
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired
  };
  
  toggleEditingInfo = () => {
    this.setState(({ editingInfo }) => ({ editingInfo: !editingInfo }));
  };

  toggleEditingAvatar = () => {
    this.setState(({ editingAvatar }) => ({ editingAvatar: !editingAvatar }));
  };

  handleEditInfo = profile => {
    const { updateProfile } = this.props;
    return updateProfile(profile)
      .then(() =>this.toggleEditingInfo);
  };

  handleEditAvatar = avatar => {
    const { updateProfile, user } = this.props;
    user.profile.avatar = avatar;
    return updateProfile(user.profile)
      .then(() =>this.toggleEditingAvatar);
  };

  

  render() { 
    const { editingInfo, editingAvatar } = this.state;
    const { user } = this.props;
    const { profile } = user;
    const { avatar } = profile;

    return (
      <div className={styles.profile}>
        {user &&  

          <section>
            {editingAvatar
              ? <AvatarForm toggleEdit={this.toggleEditingAvatar} editAvatar={this.handleEditAvatar} currentAvatar={avatar}/>
              : <Fragment>
                <AvatarDisplay toggleEdit={this.toggleEditingAvatar} imageSource={avatar}/>
                <section className="profile-name">             
                  {editingInfo
                    ? <ProfileForm
                      profile={profile}
                      onComplete={this.handleComplete}
                      onCancel={this.handleEndEdit}
                    />
                    : <ProfileDisplay
                      profile={profile}
                      onEdit={this.handleEditInfo}
                    />
                  }
                </section>
              </Fragment>
            }
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
  { updateProfile }
)(Profile);
