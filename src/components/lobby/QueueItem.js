import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

class QueueItem extends Component {

  state = {
    searching: false
  };

  static propTypes = {
    playersWaiting: PropTypes.number,
    queueType: PropTypes.string,
    handleQueue: PropTypes.func.isRequired,

  };

  handleClick = () => {
    const { handleQueue, queueType } = this.props;
    const { searching } = this.state;

    handleQueue(searching, queueType);
     
    this.setState({ searching: !searching });
  };

  render() { 
    const { queueType, playersWaiting } = this.props;
    const { searching } = this.state;

    return (
      <article 
        className={searching ? 'queueSelected' : 'queue'}
        onClick={this.handleClick}
      >
        <div>
          
          {searching ? 
            <div className='sweet-loading'>
              <ClipLoader
                sizeUnit={'px'}
                size={20}
                color={'white'}
                loading={this.state.loading}
              />
              &nbsp;Searching...
            </div> 
            : `Find ${queueType}-player Game `}
        </div>
        <div>
          <h4>{playersWaiting}</h4>
          <p>Players in Queue</p>
        </div>
      </article>
    );
  }
}
 
export default QueueItem;