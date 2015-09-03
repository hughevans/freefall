import styles from './Card.css';

import React, { Component } from 'react';

export default class Card extends Component {

  state = {
    width: this.randomSize(),
    height: this.randomSize(),
    x: this.randomPosition(),
    y: this.randomPosition(),
  }

  cardStyle() {
    return {
      left: this.state.x + '%',
      top: this.state.y + '%',
    };
  }

  randomSize() {
    return Math.floor(Math.random() * 300) + 100;
  }

  randomPosition() {
    return Math.floor(Math.random() * 1000) / 10;
  }

  imageSrc() {
    return 'https://placehold.it/' + this.state.width + 'x' + this.state.height;
  }

  render() {
    return (
      <div style={ this.cardStyle() } className={ styles.card }>
        <img src={ this.imageSrc() } height={ this.state.height} width={this.state.width} />
        <div className= { styles.caption }>{ this.props.caption }</div>
      </div>
    );
  }

};
