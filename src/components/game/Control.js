import React, { PureComponent, Fragment } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import styles from './Control.css';
import { connect } from 'react-redux';
import { getUser } from '../auth/reducers';

class Control extends PureComponent {
  state = {
    emoting: false,
    bidding: false
  };

  static propTypes = {
    game: PropTypes.object.isRequired,
    hand: PropTypes.array.isRequired,
    user: PropTypes.object,
    postMove: PropTypes.func
  };

  toggleEmoting = () => {
    this.setState(({ emoting }) => ({ emoting: !emoting }));
  };

  toggleBidding = () => {
    this.setState(({ bidding }) => ({ bidding: !bidding }));
  };

  render() { 
    const { emoting, bidding, bid } = this.state;
    const { hand, game, user, postMove } = this.props;
    const { phase, turn, players } = game;
    let totalPlayed;
    if(players && players[0].played) {
      totalPlayed = players.reduce(((acc, cur) => acc + cur.played.length), 0);
      console.log('totalPlayed', totalPlayed);
    }


    if(user.profile._id !== turn) {
      return (
        <section className={styles.control}>
          {emoting && <Emotes toggle={this.toggleEmoting}/>}
          {!emoting &&
          <Fragment>
            <div>
              <button onClick={this.toggleEmoting}>Emote</button>
            </div>
            <div className="disabled">
              {hand.map((card, i) => (
                <Card key={i} card={card}/>
              ))}
            </div>
          </Fragment>
          }
        </section>
      );
    }

    switch(phase) {
      case 1:
        return (
          <section className={styles.control}>
            {emoting && <Emotes toggle={this.toggleEmoting}/>}
            {bidding && 
              <Bids 
                toggle={this.toggleBidding} 
                minBid={1}
                maxBid={totalPlayed}
                phase={phase}
                postMove={postMove}
              />}
            {!emoting && !bidding &&
              <Fragment>
                <div>
                  <button onClick={this.toggleEmoting}>Emote</button>
                  <button onClick={this.toggleBidding}>Bid</button>
                </div>
                <div className="hand">
                  {hand.map((card, i) => (
                    <Card 
                      key={i} 
                      card={card}
                      postMove={postMove}
                    />
                  ))}
                </div>
              </Fragment>
            }
          </section>
        );

      case 2:
        // const highestBid = Math.max(...players.map(player => player.bid));
        // console.log('Highbid', highestBid);
        return (
          <section className={styles.control}>
            {emoting && <Emotes toggle={this.toggleEmoting}/>}
            {!emoting &&
              <Bids 
                emoteToggle={this.toggleEmoting} 
                bid={
                  bid
                }
                changeBid={this.handleBidChange}
                phase={phase}
              />}
          </section>
        );
      case 3:
        return (
          <section className={styles.control}>
            {emoting && <Emotes toggle={this.toggleEmoting}/>}
            {!emoting &&
              <Bids 
                emoteToggle={this.toggleEmoting} 
                bid={bid}
                changeBid={this.handleBidChange}
                phase={phase}
              />}
          </section>
        );
      default: 
        return (
          <section className={styles.control}>
            {emoting && <Emotes toggle={this.toggleEmoting}/>}
            {!emoting &&
              <Fragment>
                <div>
                  <button onClick={this.toggleEmoting}>Emote</button>
                </div>
                <div className="disabled">
                  {hand.map((card, i) => (
                    <Card key={i} card={card}/>
                  ))}
                </div>
              </Fragment>
            }
          </section>
        );
    }
  }
}
 
export default connect(
  state => ({
    user: getUser(state),
  }),
  null
)(Control);

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
 
class Bids extends PureComponent {

  state = {
    bid: 0
  };

  static propTypes = {
    toggle: PropTypes.func,
    minBid: PropTypes.number.isRequired,
    maxBid: PropTypes.number.isRequired,
    phase: PropTypes.number,
    emoteToggle: PropTypes.func,
    postMove: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.setState({ bid: this.props.minBid });
  }

  handleIncrement = () => {
    this.setState(({ bid }) => ({ bid: bid + 1 }));
  };

  handleDecrement = () => {
    this.setState(({ bid }) => ({ bid: bid - 1 }));
  };

  handleBid = () => {
    this.props.postMove(this.state);
  };

  render() { 
    const { toggle, minBid, maxBid, phase, emoteToggle } = this.props;
    const { bid } = this.state;

    switch(phase) {
      case 1:
        return (
          <div className="bids">
            <i onClick={toggle} className="fas fa-times"></i>
            {bid <= minBid ? 
              <i className="fa fa-minus"></i>
              : <i className="fa fa-minus" onClick={this.handleDecrement}></i>
            }
            <p>{bid}</p>
            {bid >= maxBid ?
              <i className="fa fa-plus"></i>
              : <i className="fa fa-plus" onClick={this.handleIncrement}></i>
            }
            <button onClick={this.handleBid}>Bid</button>
          </div>
        );
      case 2:
        return (
          <div className="bids">
            <button onClick={emoteToggle}>Emote</button>
            <button>Pass</button>
            {bid <= 1 ? 
              <i className="fa fa-minus"></i>
              : <i className="fa fa-minus" onClick={() => changeBid(-1)}></i>
            }
            <p>{bid}</p>
            {bid >= 8 ?
              <i className="fa fa-plus"></i>
              : <i className="fa fa-plus" onClick={() => changeBid(+1)}></i>
            }
            <button>Bid</button>
          </div>
        );
      case 3:
        return (
          <div className="bids">
            <button onClick={emoteToggle}>Emote</button>
            <h4>Flip {bid} squirrels</h4>
          </div>
        );
      default:
        return (
          <div className="bids">
            <h6>The game is not happening right now!</h6>
          </div>
        );
    }
  }
}