import styles from './Card.css';

import React, { Component } from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.adjustPosition();
  }

  state = {
    width: this.randomSize(),
    height: this.randomSize(),
    rotation: this.randomRotation(),
    x: this.randomPosition(),
    y: this.randomPosition(),
  }

  adjustPosition() {
    let pecentageOfWidth = 100 / window.screen.width * this.state.width;
    let pecentageOfHeight = 100 / window.screen.height * this.state.height;

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

  randomSize() {
    return Math.floor(Math.random() * 300) + 100;
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

  imageSrc() {
    return 'https://placehold.it/' + this.state.width + 'x' + this.state.height;
  }

  render() {
    return (
      <div style={ this.cardStyle() } className={ styles.card }>
        <img src={ this.imageSrc() } height={ this.state.height} width={ this.state.width } />
        <div className={ styles.caption }>{ this.props.caption }</div>
      </div>
    );
  }

};
