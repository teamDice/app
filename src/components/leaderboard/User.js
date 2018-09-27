import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class User extends PureComponent {
  static propTypes = {
    user: PropTypes.object,
    wins: PropTypes.number
  };

  render() { 
    const { user, wins } = this.props;
    return (  
      <tr>
        <td className='leaderName'>{user.name}</td>
        <td>{wins}</td>
      </tr>
    );
  }
}
 
export default User;