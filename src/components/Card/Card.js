import React, { Component } from 'react';
import './Card.css';

export default class Card extends Component {
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

      document.addEventListener('touchmove', this.onMouseMove);
      document.addEventListener('touchend', this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);

      document.removeEventListener('touchmove', this.onMouseMove);
      document.removeEventListener('touchend', this.onMouseUp);
    }
  }

  onMouseDown = (e) => {
    this.activateCard();

    if (e.type !== 'touchstart' && e.button !== 0) return;

    let data = (e.changedTouches && e.changedTouches[0]) || e;

    this.setState({
      dragging: true,
      rel: {
        x: data.pageX - (this.state.pos.x / 100 * window.screen.width),
        y: data.pageY - (this.state.pos.y / 100 * window.screen.height),
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

    let data = (e.changedTouches && e.changedTouches[0]) || e;

    this.setState({
      pos: {
        x: 100 / window.screen.width * (data.pageX - this.state.rel.x),
        y: 100 / window.screen.height * (data.pageY - this.state.rel.y),
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

  transformCSS() {
    return 'rotate(' + this.state.rotation + 'deg)';
  }

  cardStyle() {
    return {
      left: this.state.pos.x + '%',
      top: this.state.pos.y + '%',
      transform: this.transformCSS(),
      WebkitTransform: this.transformCSS(),
      MozTransform: this.transformCSS(),
      msTransform: this.transformCSS(),
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
      <a
        style={ this.cardStyle() }
        className={ this.props.card.fadeOut ? 'card fadeOutAnim' : 'card' }
        onMouseDown={ this.onMouseDown }
        onTouchStart={ this.onMouseDown }
      >
        <img
          src={ this.props.card.src }
          height={ this.props.card.height}
          width={ this.props.card.width }
          alt="Random from unsplash.it"
        />
      </a>
    );
  }

};
