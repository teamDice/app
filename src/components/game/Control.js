import React, { PureComponent, Fragment } from 'react';
import Card from './Card';
import PropTypes from 'prop-types';
import Bids from './ControlBids';
import Emotes from './ControlEmotes';
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
                players={players}
                phase={phase}
                postMove={postMove}
              />}
            {!emoting && !bidding &&
              <Fragment>
                <div>
                  <button onClick={this.toggleEmoting}>Emote</button>
                  {
                    hand.find(card => card.order > 0) &&
                    <button onClick={this.toggleBidding}>Bid</button>
                  }
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


 
