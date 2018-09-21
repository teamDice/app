import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

class QueueItem extends Component {

  state = {
    searching: false
  };

  static propTypes = {
    playersWaiting: PropTypes.string,
    queueType: PropTypes.string,
    onClick: PropTypes.func.isRequired
  };

  handleClick = () => {
    const { onClick, queueType } = this.props;
    const { searching } = this.state;

    onClick(searching, `queue${queueType}`);
     
    this.setState({
      searching: !this.state.searching
    });
  };

  render() { 
    const { queueType } = this.props;
    const { searching } = this.state;

    return (
      <article>
        <div 
          onClick={this.handleClick}
          className={this.state.searching ? 'queueSelected' : 'queue'}
        >
          
          {searching ? <div className='sweet-loading'>
            <ClipLoader
              sizeUnit={'px'}
              size={30}
              color={'white'}
              loading={this.state.loading}
            />
          </div> 
            : queueType} 
        </div>
      </article>
    );
  }
}
 
export default QueueItem;