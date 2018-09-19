import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Emotes extends PureComponent {

  static propTypes = {
    toggle: PropTypes.func.isRequired
  };

  render() { 
    const { toggle } = this.props;

    return (
      <div className="emotes">
        <i onClick={toggle}className="fas fa-times"></i>
        <i className="far fa-laugh-squint"></i>
        <i className="far fa-sad-cry"></i>
        <i className="far fa-grimace"></i>
        <i className="far fa-angry"></i>
      </div>
    );
  }
}

export default Emotes;