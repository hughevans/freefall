import styles from './App.css';

import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <h1 className={ styles.heading }>
        Hello,&nbsp;
        <span className={ styles.world }>World</span>
      </h1>
    );
  }
}
