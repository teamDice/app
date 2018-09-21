import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './AvatarForm.css';

class AvatarForm extends PureComponent {
  state = {
    imageUrls: [
      'https://firebasestorage.googleapis.com/v0/b/snakes-game-2b62c.appspot.com/o/avatars%2Fbald_eagle.png?alt=media&token=d898359f-641d-41bc-b0ec-e4b6af3b8c96',
      'https://firebasestorage.googleapis.com/v0/b/snakes-game-2b62c.appspot.com/o/avatars%2Fcat.png?alt=media&token=71adc026-fb44-4685-bd96-a0f9298e6d91',
      'https://firebasestorage.googleapis.com/v0/b/snakes-game-2b62c.appspot.com/o/avatars%2Fdolphin.png?alt=media&token=3ba4a9ae-6ee3-43d1-8410-2b1aedf65961',
      'https://firebasestorage.googleapis.com/v0/b/snakes-game-2b62c.appspot.com/o/avatars%2Ffennec-fox.png?alt=media&token=63634bcf-2d99-4c90-9dc0-d686c777ae09',
      'https://firebasestorage.googleapis.com/v0/b/snakes-game-2b62c.appspot.com/o/avatars%2Fkangaroo.png?alt=media&token=50800cb0-bd32-4f7a-8ebc-f2f544580cc4',
      'https://firebasestorage.googleapis.com/v0/b/snakes-game-2b62c.appspot.com/o/avatars%2Fleopard.png?alt=media&token=952eef55-4d74-46bf-a4f3-dd71bdaca961',
      'https://firebasestorage.googleapis.com/v0/b/snakes-game-2b62c.appspot.com/o/avatars%2Fmonkey.png?alt=media&token=4410423d-8c4a-4164-8bd0-e8257400fe8f',
      'https://firebasestorage.googleapis.com/v0/b/snakes-game-2b62c.appspot.com/o/avatars%2Forangutan.png?alt=media&token=196cfc08-6b32-4520-a6ba-2908baab8855',
      'https://firebasestorage.googleapis.com/v0/b/snakes-game-2b62c.appspot.com/o/avatars%2Fowl.png?alt=media&token=129d1724-ce3d-4b99-9a76-10b9c118c94d',
      'https://firebasestorage.googleapis.com/v0/b/snakes-game-2b62c.appspot.com/o/avatars%2Fpanda.png?alt=media&token=a0eb0eeb-d528-4623-abfb-603e94bb63f7',
      'https://firebasestorage.googleapis.com/v0/b/snakes-game-2b62c.appspot.com/o/avatars%2Fpitbull.png?alt=media&token=cb85421f-b015-4df6-8313-d9e122733626',
      'https://firebasestorage.googleapis.com/v0/b/snakes-game-2b62c.appspot.com/o/avatars%2Ftiger.png?alt=media&token=f47e4257-9760-4ea9-b9c0-be76084e477e',
    ],
    selected: null
  };

  static propTypes = {
    currentAvatar: PropTypes.string,
    toggleEdit: PropTypes.func
  };

  componentDidMount() {
    const { imageUrls } = this.state;
    const { currentAvatar } = this.props;

    const selected = imageUrls.find(url => currentAvatar === url);

    this.setState({ selected });
  }

  changeSelected = selected => {
    this.setState({ selected });
  };

  render() { 
    
    const { imageUrls, selected } = this.state;
    
    return (
      <div className={styles.avatarForm}>
        <section>
          {imageUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              onClick={() => this.changeSelected(url)}
              className={selected === url ? 'selected' : null}
            />
          ))}
        </section>
        <section>
          <button>
            <i className="fas fa-times"></i>
          </button>
          <button className="save-button">Save</button>
        </section>
      </div>
    );
  }
}
 
export default AvatarForm;