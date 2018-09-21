import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Emotes extends PureComponent {

  static propTypes = {
    toggle: PropTypes.func.isRequired,
    postEmote: PropTypes.func
  };

  handleEmote = emote => {
    const { postEmote } = this.props;

    postEmote(emote);
  };

  render() { 
    const { toggle } = this.props;

    return (
      <div className="emotes">
        <i onClick={toggle} className="fas fa-times"></i>
        <i onClick={() => this.handleEmote('😂')} className="far fa-laugh-squint"></i>
        <i onClick={() => this.handleEmote('😢')} className="far fa-sad-cry"></i>
        <i onClick={() => this.handleEmote('🤩')} className="far fa-grimace"></i>
        <i onClick={() => this.handleEmote('😡')} className="far fa-angry"></i>
      </div>
    );
  }
}

export default Emotes;