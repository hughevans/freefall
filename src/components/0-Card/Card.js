import styles from './Card.css';

import React, { Component } from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.adjustPosition();
  }

  state = {
    rotation: this.randomRotation(),
    x: this.randomPosition(),
    y: this.randomPosition(),
  }

  adjustPosition() {
    let pecentageOfWidth = 100 / window.screen.width * this.props.card.width;
    let pecentageOfHeight = 100 / window.screen.height * this.props.card.height;

    if ((pecentageOfWidth + this.state.x) > 90) {
      this.state.x = (90.0 - pecentageOfWidth);
    }

    if ((pecentageOfHeight + this.state.y) > 90) {
      this.state.y = 90.0 - pecentageOfHeight;
    }
  }

  cardStyle() {
    return {
      left: this.state.x + '%',
      top: this.state.y + '%',
      transform: 'rotate(' + this.state.rotation + 'deg)',
    };
  }

  randomPosition() {
    let random = Math.floor(Math.random() * 1000) / 10;

    if (random > 70) {
      random = random - (Math.floor(Math.random() * 300) / 10);
    }

    return random;
  }

  randomRotation() {
    return (Math.pow(Math.random(), 2) * 300 / 10) - (Math.pow(Math.random(), 2) * 300 / 10);
  }


  render() {
    return (
      <div style={ this.cardStyle() } className={ styles.card }>
        <img src={ this.props.card.src } height={ this.props.card.height} width={ this.props.card.width } />
        <div className={ styles.caption }>{ this.props.caption }</div>
      </div>
    );
  }

};
