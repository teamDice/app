import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styles from './FormControl.css';

class FormControl extends PureComponent {

  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.element
  };

  render() {
    const { label, children } = this.props;

    return (
      <section className={styles.formControl}>
        {label && 
          <label>{label}:</label>
        }
        <section className="control">
          {children}
        </section>
      </section>
    );
  }
}

export default FormControl;