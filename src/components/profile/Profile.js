import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileDisplay from './ProfileDisplay';
import ProfileForm from './ProfileForm';
import { update } from './actions';
import { getUser } from '../auth/reducers';

class Profile extends Component {

  state = {
    editing: false
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

  render() { 
    const { editing } = this.state;
    const { user } = this.props;
    const { profile } = user;

    return (
      <li>
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
      </li>
    );
  }
}
 
export default connect(
  state => ({
    user: getUser(state)
  }),
  { update }
)(Profile);
