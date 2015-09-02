import styles from './Card.css';

import React, { Component } from 'react';

export default class Card extends Component {

  state = {
    x: this.randomPosition(),
    y: this.randomPosition(),
  }

  cardStyle() {
    return {
      left: this.state.x + '%',
      top: this.state.y + '%',
    };
  }

  randomPosition() {
    return Math.floor(Math.random() * 1000) / 10;
  }

  render() {
    return (
      <div style={ this.cardStyle() } className={ styles.card }>
        <img src="https://placehold.it/350x350" />
        <div className= { styles.caption }>{ this.props.caption }</div>
      </div>
    );
  }

};
