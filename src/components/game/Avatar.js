import React, { PureComponent } from 'react';
import avatar from '../../assets/avatar.png';
import PropTypes from 'prop-types';
import styles from './Avatar.css';

class Avatar extends PureComponent {
  state = {  }
  render() { 
    return (
      <img className={styles.avatar} src={avatar}/>
    );
  }
}
 
export default Avatar;