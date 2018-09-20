import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styles from './ProfileForm.css';


class ProfileForm extends Component {

  state = {
    avatar: [],
    name: '',
    location: '',
    greeting: ''
  };

  static propTypes = {
    profile: PropTypes.object,
    onComplete: PropTypes.func.isRequired,
    onCancel: PropTypes.func
  };

  componentDidMount() {
    const { profile } = this.props;
    if(!profile) return;

    this.setState(profile);
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onComplete(this.state);
    this.setState({ name: '', location: '', greeting: '' });
  };

  render() { 
    const { name, location, greeting } = this.state;
    const { onCancel } = this.props;

    return ( 
      <Fragment>
        <form className={styles.profile} onSubmit={this.handleSubmit}>
          <h3>Update Profile Details</h3>
          <InputControl name="Name      " value={name} onChange={this.handleChange}/>
          <InputControl name="Location " value={location} onChange={this.handleChange}/>
          <InputControl name="Greeting " value={greeting} onChange={this.handleChange}/>
          <p className="buttons">
            <button type="submit">Update</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </p>
        </form>
      </Fragment>
    );
  }
}

const InputControl = (props) => (
  <p>
    <label>
      {props.name}:
      <input {...props} required/>
    </label>
  </p>
);
 
export default ProfileForm;