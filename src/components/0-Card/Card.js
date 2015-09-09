import styles from './Card.css';

import React, { Component } from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    rotation: this.randomRotation(),
    x: this.determineX(),
    y: this.determineY(),
  }

  determineX() {
    let pecentageOfWidth = 100 / window.screen.width * this.props.card.width;

    return Math.random() * (100 - pecentageOfWidth);
  }

  determineY() {
    let pecentageOfHeight = 100 / window.screen.height * this.props.card.height;

    return Math.random() * (100 - pecentageOfHeight);
  }

  cardStyle() {
    return {
      left: this.state.x + '%',
      top: this.state.y + '%',
      transform: 'rotate(' + this.state.rotation + 'deg)',
      zIndex: this.props.card.zIndex,
    };
  }

  randomRotation() {
    return (Math.pow(Math.random(), 2) * 300 / 10) - (Math.pow(Math.random(), 2) * 300 / 10);
  }

  activateCard = (e) => {
    e.preventDefault();
    this.props.activateCard(this.props.index);
  }

  render() {
    return (
      <a style={ this.cardStyle() } className={ styles.card } onMouseDown={ this.activateCard }>
        <img src={ this.props.card.src } height={ this.props.card.height} width={ this.props.card.width } />
      </a>
    );
  }

};
