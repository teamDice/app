import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import FormControl from '../shared/FormControl';
import styles from './Credentials.css';

class Credentials extends PureComponent {
  state = { 
    name: '',
    email: '',
    password: '',
    matchPassword: ''
  };

  static propTypes = {
    submit: PropTypes.func.isRequired,
    action: PropTypes.string.isRequired,
    allowName: PropTypes.bool
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.submit(this.state);
  };

  render() { 
    const { action, allowName = false } = this.props;
    const { name, email, password, matchPassword } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.credentials}>
        { allowName &&
          <FormControl label="Name">
            <input name="name" value={name} onChange={this.handleChange}/>
          </FormControl>
        }
        <FormControl label="Email">
          <input name="email" value={email} onChange={this.handleChange}/>
        </FormControl>
        <FormControl label="Password">
          <input name="password" type="password" value={password} onChange={this.handleChange}/>
        </FormControl>

        { allowName &&
          <FormControl label="Retype Password">
            <input name="matchPassword" type="password" value={matchPassword} onChange={this.handleChange}></input>
          </FormControl>
        }
        <button>{action}</button>
      </form>
    );
  }
}
 
export default Credentials;