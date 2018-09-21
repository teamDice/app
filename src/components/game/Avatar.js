import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';
import styles from './Avatar.css';

class Avatar extends PureComponent {

  static propTypes = {
    avatar: PropTypes.string.isRequired,
    bid: PropTypes.any,
    emote: PropTypes.string
  };

  
  render() { 

    const { avatar, bid, emote } = this.props;

    const overlay =
      !bid
        ? null
        : bid > 0 
          ? bid
          : 'PASS';
          
    return (
      <div className={styles.avatar}>
        <span>{emote}</span>
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