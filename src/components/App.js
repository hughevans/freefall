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

    for (var num = 0; num < 40; num++) {
      cards.push(this.generateCard(num));
    }

    return cards;
  }

  generateCard(num) {
    let height = this.randomSize();
    let width = this.randomSize();

    return {
      displayed: num == 0,
      height: height,
      width: width,
      src: 'https://placehold.it/' + width + 'x' + height,
      zIndex: num + 1,
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

  activateCard = (index) => {
    let cards = this.state.cards;
    let card = cards[index];
    let topZIndex = this.topZIndex();

    cards.forEach((thisCard) => {
      if (thisCard.displayed && thisCard.zIndex > card.zIndex) {
        thisCard.zIndex--;
      }
    });

    card.zIndex = topZIndex;

    this.setState({ cards: cards })
  }

  topZIndex() {
    let top = 0;
    this.state.cards.forEach(function(card) {
      if (card.displayed && card.zIndex > top) { top = card.zIndex }
    });
    return top;
  }

  cards() {
    return this.state.cards.map((card, index) => {
      if (card.displayed) {
        return <Card key={ index } index={ index } card={ card } activateCard={ this.activateCard } />;
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
