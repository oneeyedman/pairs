'use strict';

const settings = document.querySelectorAll('.pairs__option-item');
const goBTN = document.querySelector('.pairs__go');
const cards = document.querySelector('.pairs__cards');
const pauseLayer = document.querySelector('.pairs__overlay');

const maxVisibleCards = 2
let visibleCards = 0;
const pairs = {
  a: 0,
  b: 0
};

const resetGame = () => {
  cards.innerHTML = '';
  visibleCards = 0;
  pairs.a = 0;
  pairs.b = 0;
};


const checkSettings = options => {
  for (const option of options) {
    if (option.checked) {
      return option.value;
    }
  }
};

const hideCards = () => {
  const cards = document.querySelectorAll('.card--is-visible');
  for (const c of cards) {
    c.classList.remove('card--is-visible');
  }
  visibleCards = 0;
  pauseLayer.classList.remove('pairs__overlay--active');
};


const cardCounter = c => {
  visibleCards += parseInt(c);
}


const disableCards = (pairID) => {
  const cards = document.querySelectorAll('.card');
  for (const c of cards) {
    if (c.getAttribute('data-pair') === pairID) {
      c.removeEventListener('click', playCard);
      c.classList.add('card--disabled');
    }
  }
  visibleCards = 0;
  pauseLayer.classList.remove('pairs__overlay--active');
};


const checkVisiblePair = () => {
  pauseLayer.classList.add('pairs__overlay--active');
  console.log('comprobando parejas');
  console.log(`cartas visibles: ${visibleCards}`);
  console.log(`carta A: ${pairs.a}`);
  console.log(`carta B: ${pairs.b}`);
  if (pairs.a === pairs.b) {
    console.log('IGUALES!!!');
    disableCards(pairs.a);
  } else {
    console.log('Todo mal');
    //mostrar overflow
    setTimeout(hideCards, 1000);
  }
  console.log('***')
};


const playCard = e => {
  const card = e.currentTarget;

  if (card.classList.contains('card--is-visible')) {
    card.classList.remove('card--is-visible');
    cardCounter(-1);
  } else {
    if (visibleCards === maxVisibleCards) {
      hideCards();
    } else {
      card.classList.add('card--is-visible');
      cardCounter(1);
      if (visibleCards == 1) {
        pairs.a = card.getAttribute('data-pair');
      } else {
        pairs.b = card.getAttribute('data-pair');
      }
      if (visibleCards === maxVisibleCards) {
        checkVisiblePair();
      }
    }

  }


}

const initGame = (data) => {
  for (const card of data) {
    const cardListItem = document.createElement('li');
    cardListItem.className = 'pairs__card';

    const cardItem = document.createElement('div');
    cardItem.className = 'card';
    cardItem.setAttribute('data-pair', card.pair);
    cardItem.addEventListener('click', playCard);

    const cardFront = document.createElement('div');
    cardFront.className = 'card__side card__side--front';

    const cardFrontContent = document.createElement('img');
    cardFrontContent.className = 'card__side-item';
    cardFrontContent.src=card.image;
    cardFront.appendChild(cardFrontContent);

    const cardBack = document.createElement('div');
    cardBack.className = 'card__side card__side--back';

    const cardBackContent = document.createElement('img');
    cardBackContent.className = 'card__side-item';
    cardBackContent.src='https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB';
    cardBack.appendChild(cardBackContent);

    cardItem.append(cardFront, cardBack);
    cardListItem.appendChild(cardItem);
    cards.appendChild(cardListItem);

  }
};


const beginGame = () => {
  resetGame();
  const cardsURL = 'https://raw.githubusercontent.com/Adalab/cards-data/master/' + checkSettings(settings) + '.json';

  fetch(cardsURL)
    .then(response => {
      return response.json();
    })
    .then(gameData => {
      initGame(gameData);
    });
};

goBTN.addEventListener('click', beginGame);



