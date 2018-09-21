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
      <tr className='leaderContainer'>
        <td className='leaderName'>Username: {user.name}</td>
        <td className='leaderWins'>Wins: {wins}</td>
      </tr>
    );
  }
}
 
export default User;