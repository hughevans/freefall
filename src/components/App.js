import styles from './App.css';

import React, { Component } from 'react';

import Card from './0-Card/Card';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.startFreefall();
  }

  state = {
    currentCard: 0,
    cards: this.generateCards(),
  }

  generateCards() {
    let cards = [];

    for (var num = 0; num < 20; num++) {
      cards.push(this.generateCard(num));
    }

    return cards;
  }

  generateCard(num) {
    let height = this.randomSize();
    let width = this.randomSize();

    return {
      id: num + 1,
      displayed: num == 0,
      height: height,
      width: width,
      src: 'https://placehold.it/' + width + 'x' + height,
    }
  }

  randomSize() {
    return Math.floor(Math.random() * 300) + 100;
  }

  startFreefall() {
    this.freefallTimer = setInterval(this.addCard, 3000);
  }

  addCard = () => {
    let cards = this.state.cards;
    let currentCard = this.state.currentCard;
    let nextCard = ((currentCard + 1) >= cards.length) ? currentCard : (currentCard + 1);

    cards[currentCard].displayed = true;

    this.setState({
      currentCard: nextCard,
      cards: cards,
    });
  }

  cards() {
    return this.state.cards.map((card) => {
      if (card.displayed) {
        return <Card key={ card.id } card={ card } />;
      }
    });
  }

  render() {
    return (
      <div className={ styles.canvas }>
        { this.cards() }
      </div>
    );
  }
}
