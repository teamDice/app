import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import styles from './Avatar.css';
// import avatarImage from './avatar2.png';

class Avatar extends PureComponent {

  static propTypes = {
    avatar: PropTypes.string.isRequired
  };

  
  render() { 

    const { avatar } = this.props;
    // const { avatar } = player;
    return (
      <div>
        {
          avatar &&
        <img className={styles.avatar} src="https://firebasestor...f-a1fe-9a9a6e721345" />
        }
      </div>
      
    );
  }
}
 
export default Avatar;