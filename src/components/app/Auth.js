import React, { Component } from 'react';
import { connect } from 'react-redux';
import { userSignUp } from './actions';
import PropTypes from 'prop-types';

class Auth extends Component {

  state = {
    name: '',
    email: '',
    password: '',
    matchingPassword: ''
  };

  static propTypes = {
    userSignUp: PropTypes.func.isRequired
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = event => {
    const { userSignUp } = this.props;
    event.preventDefault();
    const { target: { elements } } = event;
    const { name, email, password } = elements;
    userSignUp({
      name: name.value,
      email: email.value,
      password: password.value,
    });
    this.setState({ 
      name: '',
      email: '',
      password: '',
      matchingPassword: ''
    });
  };

  render() {
    const {
      name,
      email,
      password,
      matchingPassword
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:&nbsp;
          <input 
            required
            value={name}
            name="name"
            onChange={this.handleChange}
          >
          </input>
        </label>
        <br/>
        <label>
          Email:&nbsp;
          <input 
            required
            value={email}
            name="email"
            onChange={this.handleChange}
          >
          </input>
        </label>
        <br/>
        <label>
          Password:&nbsp;
          <input 
            required
            value={password} 
            name="password" 
            type="password"
            onChange={this.handleChange}
          >
          </input>
        </label>
        <br/>
        <label>
          Retype Password:&nbsp;
          <input 
            required 
            value={matchingPassword}
            name="matchingPassword" 
            type="password"
            onChange={this.handleChange}
          >
          </input>
        </label>
        <br/>
        <button type="submit">Sign Up</button>
      </form>
    );
  }
}

export default connect(
  null,
  { userSignUp }
)(Auth);