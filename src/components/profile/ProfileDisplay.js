import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileDisplay.css';

class ProfileDisplay extends PureComponent {

  static propTypes = {
    profile: PropTypes.object,
    onEdit: PropTypes.func.isRequired,
  };

  render() { 
    const { profile, onEdit } = this.props;
    const { name, greeting, location } = profile;
    
    return (
      <div className={styles.profile_display}>
        {profile &&        
          <section>
            <h1>{ name }</h1>
            <div className="info-display">
              <div>
                <h3>Greeting:</h3>
                <h3>Location:</h3>
              </div>
              <div>
                <p>{ greeting }</p>
                <p>{ location || 'somewhere' }</p>
              </div>
            </div>
            <button name="edit-icon" onClick={onEdit}>Edit</button>
              
          </section>
        }
      </div>
      
    );

  }
}
 
export default ProfileDisplay;