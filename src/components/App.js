import styles from './App.css';

import React, { Component } from 'react';

import Card from './0-Card/Card';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.startFreefall();
  }

  state = {
    cards: [{
      caption: 'First',
      cardNum: 1,
    }],
  }

  startFreefall() {
    this.freefallTimer = setInterval(this.addCard, 3000);
  }

  addCard = () => {
    let cards = this.state.cards;
    let newCardNum = 1;

    if (this.state.cards.length > 0) {
      newCardNum = this.state.cards[this.state.cards.length - 1].cardNum + 1;
    }

    cards.push({
      caption: 'Caption',
      cardNum: newCardNum,
    });

    if (this.state.cards.length > 20) { cards.shift() }

    this.setState({ cards: cards });
  }

  cards() {
    return this.state.cards.map((card) => {
      return <Card key={ card.cardNum } caption= { card.cardNum + '. ' + card.caption } />;
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
