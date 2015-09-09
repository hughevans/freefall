import styles from './Card.css';

import React, { Component } from 'react';

export default class Card extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    dragging: false,
    pos: {
      x: this.determineX(),
      y: this.determineY(),
    },
    rel: null,
    rotation: this.randomRotation(),
  }

  componentDidUpdate(props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  }

  onMouseDown = (e) => {
    this.activateCard();

    if (e.button !== 0) return;

    this.setState({
      dragging: true,
      rel: {
        x: e.pageX - (this.state.pos.x / 100 * window.screen.width),
        y: e.pageY - (this.state.pos.y / 100 * window.screen.height),
      },
    });

    e.stopPropagation();
    e.preventDefault();
  }

  onMouseUp = (e) => {
    this.setState({dragging: false});

    e.stopPropagation();
    e.preventDefault();
  }

  onMouseMove = (e) => {
    if (!this.state.dragging) return;

    this.setState({
      pos: {
        x: 100 / window.screen.width * (e.pageX - this.state.rel.x),
        y: 100 / window.screen.height * (e.pageY - this.state.rel.y),
      }
    });

    e.stopPropagation();
    e.preventDefault();
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
      left: this.state.pos.x + '%',
      top: this.state.pos.y + '%',
      transform: 'rotate(' + this.state.rotation + 'deg)',
      zIndex: this.props.card.zIndex,
    };
  }

  randomRotation() {
    return (Math.pow(Math.random(), 2) * 300 / 10) - (Math.pow(Math.random(), 2) * 300 / 10);
  }

  activateCard() {
    this.props.activateCard(this.props.index);
  }

  render() {
    return (
      <a ref="card" style={ this.cardStyle() } className={ styles.card } onMouseDown={ this.onMouseDown }>
        <img src={ this.props.card.src } height={ this.props.card.height} width={ this.props.card.width } />
      </a>
    );
  }

};
