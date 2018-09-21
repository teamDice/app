import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import styles from './Avatar.css';

class Avatar extends PureComponent {

  static propTypes = {
    avatar: PropTypes.string.isRequired,
    bid: PropTypes.any
  };

  
  render() { 

    const { avatar, bid } = this.props;

    const overlay =
      !bid
        ? null
        : bid > 0 
          ? bid
          : 'PASS';
    return (
      <div className={styles.avatar}>
        <p>{overlay}</p>
        {
          avatar &&
          <img src={avatar} />
        }
      </div>
      
    );
  }
}
 
export default Avatar;