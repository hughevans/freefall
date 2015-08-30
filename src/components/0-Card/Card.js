import styles from './Card.css';

import React, { Component } from 'react';

export default class Card extends Component {

  render() {
    return (
      <div className={styles.card}>
        <img src="https://placehold.it/350x350" />
        <div>{ this.props.caption }</div>
      </div>
    );
  }

};
