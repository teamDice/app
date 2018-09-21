import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class AvatarDisplay extends PureComponent {

  static propTypes = {
    imageSource: PropTypes.string,
    toggleEdit: PropTypes.func.isRequired
  };

  render() { 
    const { imageSource, toggleEdit } = this.props;

    return (
      <div className="profile-avatar">
        <button onClick={toggleEdit}>
          <i className="fas fa-edit"></i>
        </button>
        <img src={imageSource} />
      </div>
    );
  }
}
 
export default AvatarDisplay;