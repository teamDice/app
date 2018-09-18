import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class User extends PureComponent {
  static propTypes = {
    user: PropTypes.object
  };

  render() { 
    const { user } = this.props;
    return (  
      <tr>
        <td>{user.name}</td>
        <td>{user.totalWin}</td>
        <td>{user.totalGames}</td>
        <td>{user.winPercent}</td>
      </tr>
    );
  }
}
 
export default User;