import styles from './App.css';

import React, { Component } from 'react';

import Card from './Card/Card';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.preloadInitialImages();
  }

  state = {
    cards: this.generateCards(),
    currentCard: 0,
    preLoadedImages: 0,
  }

  generateCards() {
    let cards = [];

    for (let num = 0; num < 40; num++) {
      cards.push(this.generateCard(num));
    }

    return cards;
  }

  generateCard(num) {
    let height = this.randomSize();
    let width = this.randomSize();

    return {
      displayed: false,
      height: height,
      width: width,
      src: 'https://unsplash.it/' + this.retinaSize(width) + '/' + this.retinaSize(height),
      zIndex: num + 1,
    }
  }

  randomSize() {
    return Math.floor(Math.random() * 300) + 100;
  }

  retinaSize(size) {
    if (window.devicePixelRatio === undefined) {
      return size;
    } else {
      return Math.floor(size * window.devicePixelRatio);
    }
  }

  preloadInitialImages() {
    for (let index = 0; index < 5; index++) {
      this.preloadImage(index);
    }
  }

  preloadImage(index) {
    let img = new Image();
    img.src = this.state.cards[index].src;
    img.onload = this.preloadedImage;
  }

  preloadedImage = () => {
    let preLoadedImages = this.state.preLoadedImages;
    let cards = this.state.cards;

    preLoadedImages++;

    if (preLoadedImages == 5) {
      this.startFreefall();
    }

    this.setState({ preLoadedImages: preLoadedImages });
  }

  preLoadNextImageAfterAnimation() {
    let nextCard = this.state.currentCard + 5;

    if (nextCard >= this.state.preLoadedImages && nextCard < this.state.cards.length) {
      setTimeout(() => this.preloadImage(nextCard), 2000);
    }
  }

  startFreefall() {
    this.addCard();
    this.setState({
      playing: true,
      loaded: true
    });
    this.freefallTimer = setInterval(this.addCard, 3000);
  }

  addCard = () => {
    let cards = this.state.cards;
    let currentCard = this.state.currentCard;
    let nextCard = currentCard + 1;

    if (nextCard < cards.length) {
      this.preLoadNextImageAfterAnimation();

      cards[currentCard].displayed = true;

      this.setState({
        currentCard: nextCard,
        cards: cards,
      });
    } else if (nextCard == cards.length) {
      cards.forEach((thisCard, index) => {
        thisCard.fadeOut = true;
      });

      this.setState({
        currentCard: nextCard,
        cards: cards,
      });
    } else {
      cards.forEach((thisCard, index) => {
        thisCard.displayed = false;
        thisCard.fadeOut = false;
      });

      this.setState({
        currentCard: 0,
        cards: cards,
      });
    }
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

    this.setState({ cards: cards });
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

  cardsOrLoading() {
    if (this.state.loaded) {
      return this.cards();
    } else {
      return (
        <div className={ styles.loading }>
          loading…
        </div>
      )
    }
  }

  stopStartLabel() {
    return this.state.playing ? 'Pause' : 'Resume';
  }

  stopStart = () => {
    if (this.state.playing) {
      clearInterval(this.freefallTimer);
      this.setState({ playing: false })
    } else {
      this.startFreefall()
    }
  }

  stopStartButton() {
    if (this.state.playing != undefined) {
      return (
        <a className= { styles.stopStart } onClick={ this.stopStart }>
          { this.stopStartLabel() }
        </a>
      )
    }
  }

  render() {
    return (
      <div className={ styles.canvas }>
        { this.cardsOrLoading() }
        { this.stopStartButton() }
      </div>
    );
  }
}
